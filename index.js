const express = require('express');
const cors = require('cors');
const { Builder, Browser, By, Key, until } = require('selenium-webdriver')

const mysql = require('mysql2/promise');

const MangaCreator = require('./classes/MangaCreator');
const app = express()
const port = 30001

// Créer une connexion MySQL
const db = mysql.createPool({
    host: 'localhost',      // L'hôte MySQL (souvent 'localhost')
    user: 'root',           // Nom d'utilisateur MySQL
    password: 'root',           // Mot de passe MySQL (mettre votre propre mot de passe)
    database: 'api'      // Nom de la base de données que vous avez créée
});

app.use(express.json());
app.use(cors());

app.get('/:manga', async (req, res) => {
    const mangaName = req.params.manga;
    if (mangaName == "mangalist") {
        try {
            const [result] = await db.execute("SELECT nom_Manga,id_manga FROM api.manga;", []);
            if (result.length == 0) {
                res.status(404).json({ result: "Il n'y a aucun manga stocké" });
            } else {
                res.status(200).json({ result: result });
            }
        } catch (err) {
            console.log(err);
            res.status(404).json({ result: "error" });
        }
    } else {
        try {
            const [result] = await db.execute("SELECT nom_Manga, mc.nom_chapter FROM api.manga JOIN api.manga_chapter mc ON id_Manga = mc.fk_id_manga WHERE id_Manga = (?);", [mangaName]);
            if (result.length == 0) {
                res.status(404).json({ result: "Il faut rechercher le manga par son ID, pour le trouver entrez 'mangalist' en param. Le manga n'existe pas, veuillez le créer en suivant la procédure ici : " });
            } else {
                // console.log({ res: result });
                res.status(200).json({ result: result });
            }
        } catch (err) {
            console.log(err);
            res.status(404).json({ result: "error" });
        }
    }
});

app.get('/:idManga/:chapterName', async (req, res) => {
    const mangaId = req.params.idManga;
    const chapterName = req.params.chapterName;
    try {
        const [result] = await db.execute("SELECT nom_chapter, mcu.url, mcu.`index` FROM manga_chapter JOIN manga_chapter_url mcu ON idmanga_chapter = mcu.fk_id_manga_chapter WHERE fk_id_manga = (?) AND nom_chapter = (?);", [mangaId, chapterName]);
        if (result.length == 0) {
            res.status(404).json({ result: "Le chapitre n'existe pas" });
        } else {
            // result.forEach(async (element) => {
            //     try {
            //         const { statusCode, data, headers } = await curly.post(element.url, { caInfo: certFilePath });
            //         console.log(data);
            //     } catch (e) {
            //         console.log({ "errr": e });
            //     }
            // });
            // console.log({ res: result });
            res.status(200).json({ result: result });
        }
    } catch (err) {
        console.log(err);
        res.status(404).json({ result: err });
    }
});



app.post('/', async (req, res) => {
    if (!req.body.mangaUrl) {
        return res.status(400).json({ error: 'Aucune URL reçue' });
    }
    var msg = req.body.mangaUrl;
    const regex = /\/([^\/]+)\/$/;
    if (! msg.match(regex)) {
        console.log("err");
        res.status(404).json({ resultat: "L'URL entrée n'est pas bonne" });
        return;
    }
    const manga = new MangaCreator(msg);
    const mangaObj = await manga.createManga();
    var err = false;
    var msgErr = "";
    try{
        await db.execute("INSERT INTO manga(nom_manga) VALUES (?);", [mangaObj.mangaName]);
    }catch(e){
        err = true;
        msgErr = e;
    }

    if (err){
        res.status(404).json({ error: msgErr });
        return;
    }

    var [mangaId] = await db.execute("SELECT id_Manga FROM manga WHERE nom_Manga = (?)", [mangaObj.mangaName]);
    mangaId = mangaId[0].id_Manga;

    var listeChap = [];
    var chapters = mangaObj.mangaChapters;
    chapters.forEach((elemnt) => {
        listeChap.push(elemnt);
    });

    for (const chapter of listeChap) {
        const [res] = await db.execute("INSERT INTO manga_chapter(nom_chapter, fk_id_manga) VALUES (?, ?);", [chapter.chapterName, mangaId]);
        console.log(`inseré avec id : ${res.insertId}, nom : ${chapter.chapterName}`);
        const list = chapter.listUrlOfChapter
        for (const url in list) {
            await db.execute("INSERT INTO manga_chapter_url(url, manga_chapter_url.index ,fk_id_manga_chapter) VALUES (?,?,?);", [list[url].url, list[url].index, res.insertId])
        }
    };
    res.status(200).json({ resultat: "Manga bien ajouté" });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});