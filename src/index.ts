// Importing all the libs useful for the code
import Fastify, { fastify } from 'fastify'
import { RowDataPacket } from "mysql2/promise";
import dotenv from "dotenv";
import { MySQL } from './dbHandler/db';
import {MangaListItem} from './Objects/mangaListItem';
import {MangaCreator} from './mangacreator/MangaCreator';

dotenv.config();
const server = fastify();

// Initialize connexion to db
const db = new MySQL({
    host: 'localhost',      // L'hôte MySQL (souvent 'localhost')
    user: 'root',           // Nom d'utilisateur MySQL
    password: 'root',           // Mot de passe MySQL (mettre votre propre mot de passe)
    database: 'api'      // Nom de la base de données que vous avez créée
});
  
// Launching API server
server.listen({ port: 30001 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});

// Replying all the mangas stored if exists
server.get('/mangas',async (request, reply) => {
  try {
    const [result] = await db.queryRows("SELECT nom_Manga,id_manga FROM api.manga;", []);
    toItem(result);
    if (result.length === 0) {
      return reply.code(404).send({ mangalist: "Il n'y a aucun manga stocké", success : false});
    } else {
      return reply.code(200).send({ mangalist: result, success : true});
    }
  }catch(err) {
    console.log(err);
    return reply.code(404).send({ mangalist: "error", success : false});
  }
});

// Reply a manga thanks to the manga ID, you gave in param
server.get('/mangas/:manga', async (request, reply) => {
  const { manga } = request.params as {manga : string};
  if (!manga) {
    return reply.code(400).send({ result: "Invalid manga ID provided.", success : false});
  }try {
      const [result] = await db.queryRows("SELECT nom_Manga, mc.nom_chapter FROM api.manga JOIN api.manga_chapter mc ON id_Manga = mc.fk_id_manga WHERE id_Manga = (?);", [manga]);
      if (result.length === 0 && result) {
        return reply.code(404).send({ result: "Il faut rechercher le manga par son ID, pour le trouver entrez 'mangalist' en param. Le manga n'existe pas, veuillez le créer en suivant la procédure ici : " , success : false});
      } else {
        return reply.code(200).send({ result: result, success : true });
      }
  } catch (err) {
    console.log(err);
    return reply.code(404).send({ result: "error", success : false });
  }
});

// Replying the chapter datas thanks to the params : mangaId, ChapterIndex
server.get('/:idManga/:chapterName', async (request, reply) => {
  const { idManga } = request.params as {idManga : number};
  const { chapterName } = request.params as {chapterName : string};
  try {
      const [result] = await db.queryRows("SELECT nom_chapter, mcu.url, mcu.`index` FROM manga_chapter JOIN manga_chapter_url mcu ON idmanga_chapter = mcu.fk_id_manga_chapter WHERE fk_id_manga = (?) AND nom_chapter = (?);", [idManga, chapterName]);
      if (result.length == 0) {
          return reply.code(404).send({ result: "Le chapitre n'existe pas", success : false });
      } else {
          return reply.code(200).send({ result: result, success : true });
      }
  } catch (err) {
      console.log(err);
      return reply.status(404).send({ result: err, success : false });
  }
});

server.post('/', async (request, reply) => {
  const { mangaUrl } = request.body as { mangaUrl : string};
  if (!mangaUrl) {
      return reply.code(400).send({ error: 'Aucune URL reçue', success : false });
  }
  var msg = mangaUrl;
  const regex = /\/([^\/]+)\/$/;
  if (!msg.match(regex)) {
      console.log("err");
      return reply.code(404).send({ resultat: "L'URL entrée n'est pas bonne", success : false });
  }
  const manga = new MangaCreator(msg);
  const mangaObj = await manga.createManga();
  if (mangaObj){
    try{
        await db.queryResult("INSERT INTO manga(nom_manga) VALUES (?);", [mangaObj.mangaName]);
    }catch(e : any){
      return reply.code(404).send({ error: e, success : false });
    }

    var [mangaId] = await db.queryRows("SELECT id_Manga FROM manga WHERE nom_Manga = (?)", [mangaObj.mangaName]);
    mangaId = mangaId[0].id_Manga;

    var listeChap : any = [];
    var chapters = mangaObj.mangaChapters;
    chapters.forEach((elemnt : any) => {
        listeChap.push(elemnt);
    });
    for (const chapter of listeChap) {
        try{
          const [res] = await db.queryResult("INSERT INTO manga_chapter(nom_chapter, fk_id_manga, chapter_index) VALUES (?, ?, ?);", [chapter.chapterName, mangaId, chapter.chapterIndex]);
          const list = chapter.listUrlOfChapter;
          for (const url in list) {
              await db.queryResults("INSERT INTO manga_chapter_url(url, manga_chapter_url.index ,fk_id_manga_chapter) VALUES (?,?,?);", [list[url].url, list[url].index, res.insertId])
          }
        } catch (e : any){
          return reply.code(404).send({error : e, success : false});
        }
        
    };
    return reply.status(200).send({ resultat: "Manga bien ajouté" , success : true});
  }
});

function toItem(result : RowDataPacket[]) {
  var res : Array<MangaListItem> = [];
  result.forEach((row) => {
    const item = new MangaListItem(row['nom_Manga'], row['id_manga']);
    res.push(item);
  });
  return res;
}