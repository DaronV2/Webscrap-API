import Fastify, { fastify } from 'fastify'
import cors from "cors";
import mysql, { RowDataPacket } from "mysql2/promise";
import dotenv from "dotenv";

import { MySQL } from './dbHandler/db';
import {MangaListItem} from './Objects/mangaListItem';

dotenv.config();

const server = fastify();

const db = new MySQL({
    host: 'localhost',      // L'hôte MySQL (souvent 'localhost')
    user: 'root',           // Nom d'utilisateur MySQL
    password: 'root',           // Mot de passe MySQL (mettre votre propre mot de passe)
    database: 'api'      // Nom de la base de données que vous avez créée
});
  
server.listen({ port: 30001 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});

server.get('/mangas',async (request, reply) => {
  try {
    const [result] = await db.queryRows("SELECT nom_Manga,id_manga FROM api.manga;", []);
    toItem(result);
    if (result.length === 0) {
      return reply.code(404).send({ mangalist: "Il n'y a aucun manga stocké" });
    } else {
      return reply.code(200).send({ mangalist: result });
    }
  }catch(err) {
    console.log(err);
    return reply.code(404).send({ mangalist: "error" });
  }
});

server.get('/mangas/:manga', async (request, reply) => {
  const { manga } = request.params as {manga : string};
  if (!manga) {
    return reply.code(400).send({ result: "Invalid manga ID provided." });
  }try {
      const [result] = await db.queryRows("SELECT nom_Manga, mc.nom_chapter FROM api.manga JOIN api.manga_chapter mc ON id_Manga = mc.fk_id_manga WHERE id_Manga = (?);", [manga]);
      if (result.length === 0 && result) {
        return reply.code(404).send({ result: "Il faut rechercher le manga par son ID, pour le trouver entrez 'mangalist' en param. Le manga n'existe pas, veuillez le créer en suivant la procédure ici : " });
      } else {
        return reply.code(200).send({ result: result });
      }
  } catch (err) {
    console.log(err);
    return reply.code(404).send({ result: "error" });
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