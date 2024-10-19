const express = require('express');
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

app.get('/', (req, res) => {
    res.json();
});

app.post('/', async (req, res) => {
    if (!req.body.mangaUrl) {
        return res.status(400).json({ error: 'Aucune URL reçue' });
    }
    var msg = req.body.mangaUrl;
    const manga = new MangaCreator(msg);
    const mangaObj = await manga.createManga();
    await db.execute("INSERT INTO manga(nom_manga) VALUES (?);",[mangaObj.mangaName]);

    var [mangaId] = await db.execute("SELECT id_Manga FROM manga WHERE nom_Manga = (?)",[mangaObj.mangaName]);
    mangaId = mangaId[0].id_Manga;
    
    var listeInsert = [];
    var chapters = mangaObj.mangaChapters;
    chapters.forEach((elemnt) => { // TODO revoir ici ya prblm avec les urls c tt le temps les mme
        listeInsert.push(elemnt);
        // console.log(elemnt);
    });

    listeInsert.forEach(async chapter => {
        // console.log(chapter.chapterName);
        await db.execute("INSERT INTO manga_chapter(nom_chapter, fk_id_manga) VALUES (?, ?);", [chapter.chapterName, mangaId]);
    });

    var [chaptersId] = await db.execute("SELECT idmanga_chapter FROM manga_chapter WHERE fk_id_manga = ? ORDER BY idmanga_chapter DESC", [mangaId]);
    chaptersId.forEach(async (el) => {
        var i = 0
        var list = listeInsert[i];
        // console.log(list);
        // await db.execute("INSERT INTO manga_chapter_url(url, manga_chapter_url.index ,fk_id_manga_chapter) VALUES (?,?,?);", [listeInsert[i].listUrlOfChapter, listeInsert[i]]);
    });
    
});

// app.put('/user', (req, res)=> {
//     res.send('Got a put request at /user')
// })

// app.delete('/user', (req, res) => {
//     res.send('Got a DELETE request at /user')
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});