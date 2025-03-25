import Fastify, { fastify } from 'fastify';
import dotenv from "dotenv";
import { RowDataPacket } from "mysql2/promise";
import { MySQL } from './dbHandler/db';
import { exec } from 'child_process';
import { promisify } from 'util';

dotenv.config();
const server = fastify();

// Initialize connexion to db
const db = new MySQL({
  port: parseInt(process.env.MYSQL_PORT ? process.env.MYSQL_PORT : "3306"),
  host: process.env.MYSQL_ADDRESS,      // L'hôte MySQL 
  user: process.env.MYSQL_USER,           // Nom d'utilisateur MySQL
  password: process.env.MYSQL_PASSWORD,           // Mot de passe MySQL (mettre votre propre mot de passe)
  database: process.env.MYSQL_DB_NAME     // Nom de la base de données que vous avez créée
});

const execPromise = promisify(exec);

server.listen({ port: 30002 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  });

server.get("/download", async (request, reply) => {
    try {
        const [result] = await db.queryRows("SELECT url, path FROM api.manga_chapter_url WHERE downloaded = 0;");
        console.log(result);
        for (const url in result){
            // console.log(result[url]);
            try {
                const res = await execPromise(`python py/CloudflareBypassForScraping/index.py ${result[url].url} ${result[url].path}`);
                console.log(res);
            } catch (error) {
                console.log(`Exception: ${error}`);
            }
        }
        return reply.code(200).send({ mangalist: result, success: true }); 
    } catch (error) {
        console.log(error);
        return reply.code(404).send({ mangalist: "error", success: false });

    }
});