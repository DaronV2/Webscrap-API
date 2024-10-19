CREATE DATABASE  IF NOT EXISTS `api` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `api`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: api
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `manga`
--

DROP TABLE IF EXISTS `manga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manga` (
  `id_Manga` int NOT NULL AUTO_INCREMENT,
  `nom_Manga` varchar(45) NOT NULL,
  PRIMARY KEY (`id_Manga`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manga`
--

LOCK TABLES `manga` WRITE;
/*!40000 ALTER TABLE `manga` DISABLE KEYS */;
INSERT INTO `manga` VALUES (1,'test'),(2,'test2'),(6,'test2'),(57,'naruto'),(58,'naruto'),(59,'naruto'),(60,'naruto');
/*!40000 ALTER TABLE `manga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manga_chapter`
--

DROP TABLE IF EXISTS `manga_chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manga_chapter` (
  `idmanga_chapter` int NOT NULL AUTO_INCREMENT,
  `nom_chapter` varchar(45) NOT NULL,
  `fk_id_manga` int NOT NULL,
  PRIMARY KEY (`idmanga_chapter`),
  KEY `fk_id_manga_idx` (`fk_id_manga`),
  CONSTRAINT `fk_id_manga` FOREIGN KEY (`fk_id_manga`) REFERENCES `manga` (`id_Manga`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1299 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manga_chapter`
--

LOCK TABLES `manga_chapter` WRITE;
/*!40000 ALTER TABLE `manga_chapter` DISABLE KEYS */;
INSERT INTO `manga_chapter` VALUES (1,'test volume 1',1),(2,'test volume 2',1),(1083,'Naruto : Volume 72',57),(1084,'Naruto : Volume 71',57),(1085,'Naruto : Volume 70',57),(1086,'Naruto : Volume 69',57),(1087,'Naruto : Volume 68',57),(1088,'Naruto : Volume 62',57),(1089,'Naruto : Volume 67',57),(1090,'Naruto : Volume 66',57),(1091,'Naruto : Volume 65',57),(1092,'Naruto : Volume 64',57),(1093,'Naruto : Volume 63',57),(1094,'Naruto : Volume 61',57),(1095,'Naruto : Volume 60',57),(1096,'Naruto : Volume 59',57),(1097,'Naruto : Volume 58',57),(1098,'Naruto : Volume 57',57),(1099,'Naruto : Volume 56',57),(1100,'Naruto : Volume 55',57),(1101,'Naruto : Volume 54',57),(1102,'Naruto : Volume 53',57),(1103,'Naruto : Volume 52',57),(1104,'Naruto : Volume 51',57),(1105,'Naruto : Volume 50',57),(1106,'Naruto : Volume 49',57),(1107,'Naruto : Volume 48',57),(1108,'Naruto : Volume 47',57),(1109,'Naruto : Volume 46',57),(1110,'Naruto : Volume 45',57),(1111,'Naruto : Volume 44',57),(1112,'Naruto : Volume 43',57),(1113,'Naruto : Volume 42',57),(1114,'Naruto : Volume 41',57),(1115,'Naruto : Volume 40',57),(1116,'Naruto : Volume 39',57),(1117,'Naruto : Volume 38',57),(1118,'Naruto : Volume 37',57),(1119,'Naruto : Volume 36',57),(1120,'Naruto : Volume 35',57),(1121,'Naruto : Volume 34',57),(1122,'Naruto : Volume 33',57),(1123,'Naruto : Volume 32',57),(1124,'Naruto : Volume 31',57),(1125,'Naruto : Volume 30',57),(1126,'Naruto : Volume 29',57),(1127,'Naruto : Volume 28',57),(1128,'Naruto : Volume 27',57),(1129,'Naruto : Volume 26',57),(1130,'Naruto : Volume 25',57),(1131,'Naruto : Volume 24',57),(1132,'Naruto : Volume 23',57),(1133,'Naruto : Volume 22',57),(1134,'Naruto : Volume 21',57),(1135,'Naruto : Volume 20',57),(1136,'Naruto : Volume 19',57),(1137,'Naruto : Volume 18',57),(1138,'Naruto : Volume 17',57),(1139,'Naruto : Volume 16',57),(1140,'Naruto : Volume 15',57),(1141,'Naruto : Volume 14',57),(1142,'Naruto : Volume 13',57),(1143,'Naruto : Volume 12',57),(1144,'Naruto : Volume 11',57),(1145,'Naruto : Volume 10',57),(1146,'Naruto : Volume 9',57),(1147,'Naruto : Volume 8',57),(1148,'Naruto : Volume 7',57),(1149,'Naruto : Volume 6',57),(1150,'Naruto : Volume 5',57),(1151,'Naruto : Volume 4',57),(1152,'Naruto : Volume 3',57),(1153,'Naruto : Volume 2',57),(1154,'Naruto : Volume 1',57),(1155,'Naruto : Volume 72',57),(1156,'Naruto : Volume 71',57),(1157,'Naruto : Volume 69',57),(1158,'Naruto : Volume 70',57),(1159,'Naruto : Volume 62',57),(1160,'Naruto : Volume 68',57),(1161,'Naruto : Volume 61',57),(1162,'Naruto : Volume 67',57),(1163,'Naruto : Volume 66',57),(1164,'Naruto : Volume 65',57),(1165,'Naruto : Volume 64',57),(1166,'Naruto : Volume 63',57),(1167,'Naruto : Volume 60',57),(1168,'Naruto : Volume 59',57),(1169,'Naruto : Volume 58',57),(1170,'Naruto : Volume 57',57),(1171,'Naruto : Volume 56',57),(1172,'Naruto : Volume 55',57),(1173,'Naruto : Volume 54',57),(1174,'Naruto : Volume 53',57),(1175,'Naruto : Volume 52',57),(1176,'Naruto : Volume 51',57),(1177,'Naruto : Volume 50',57),(1178,'Naruto : Volume 49',57),(1179,'Naruto : Volume 48',57),(1180,'Naruto : Volume 47',57),(1181,'Naruto : Volume 46',57),(1182,'Naruto : Volume 45',57),(1183,'Naruto : Volume 44',57),(1184,'Naruto : Volume 43',57),(1185,'Naruto : Volume 42',57),(1186,'Naruto : Volume 41',57),(1187,'Naruto : Volume 40',57),(1188,'Naruto : Volume 39',57),(1189,'Naruto : Volume 38',57),(1190,'Naruto : Volume 37',57),(1191,'Naruto : Volume 36',57),(1192,'Naruto : Volume 35',57),(1193,'Naruto : Volume 34',57),(1194,'Naruto : Volume 33',57),(1195,'Naruto : Volume 32',57),(1196,'Naruto : Volume 31',57),(1197,'Naruto : Volume 30',57),(1198,'Naruto : Volume 29',57),(1199,'Naruto : Volume 28',57),(1200,'Naruto : Volume 27',57),(1201,'Naruto : Volume 26',57),(1202,'Naruto : Volume 25',57),(1203,'Naruto : Volume 24',57),(1204,'Naruto : Volume 23',57),(1205,'Naruto : Volume 22',57),(1206,'Naruto : Volume 21',57),(1207,'Naruto : Volume 20',57),(1208,'Naruto : Volume 19',57),(1209,'Naruto : Volume 18',57),(1210,'Naruto : Volume 17',57),(1211,'Naruto : Volume 16',57),(1212,'Naruto : Volume 15',57),(1213,'Naruto : Volume 14',57),(1214,'Naruto : Volume 13',57),(1215,'Naruto : Volume 12',57),(1216,'Naruto : Volume 11',57),(1217,'Naruto : Volume 10',57),(1218,'Naruto : Volume 9',57),(1219,'Naruto : Volume 8',57),(1220,'Naruto : Volume 7',57),(1221,'Naruto : Volume 6',57),(1222,'Naruto : Volume 5',57),(1223,'Naruto : Volume 4',57),(1224,'Naruto : Volume 3',57),(1225,'Naruto : Volume 2',57),(1226,'Naruto : Volume 1',57),(1227,'Naruto : Volume 72',57),(1228,'Naruto : Volume 71',57),(1229,'Naruto : Volume 70',57),(1230,'Naruto : Volume 69',57),(1231,'Naruto : Volume 68',57),(1232,'Naruto : Volume 62',57),(1233,'Naruto : Volume 67',57),(1234,'Naruto : Volume 66',57),(1235,'Naruto : Volume 65',57),(1236,'Naruto : Volume 64',57),(1237,'Naruto : Volume 63',57),(1238,'Naruto : Volume 61',57),(1239,'Naruto : Volume 60',57),(1240,'Naruto : Volume 59',57),(1241,'Naruto : Volume 58',57),(1242,'Naruto : Volume 57',57),(1243,'Naruto : Volume 56',57),(1244,'Naruto : Volume 55',57),(1245,'Naruto : Volume 54',57),(1246,'Naruto : Volume 53',57),(1247,'Naruto : Volume 52',57),(1248,'Naruto : Volume 51',57),(1249,'Naruto : Volume 50',57),(1250,'Naruto : Volume 49',57),(1251,'Naruto : Volume 48',57),(1252,'Naruto : Volume 47',57),(1253,'Naruto : Volume 46',57),(1254,'Naruto : Volume 45',57),(1255,'Naruto : Volume 44',57),(1256,'Naruto : Volume 43',57),(1257,'Naruto : Volume 42',57),(1258,'Naruto : Volume 41',57),(1259,'Naruto : Volume 40',57),(1260,'Naruto : Volume 39',57),(1261,'Naruto : Volume 38',57),(1262,'Naruto : Volume 37',57),(1263,'Naruto : Volume 36',57),(1264,'Naruto : Volume 35',57),(1265,'Naruto : Volume 34',57),(1266,'Naruto : Volume 33',57),(1267,'Naruto : Volume 32',57),(1268,'Naruto : Volume 31',57),(1269,'Naruto : Volume 30',57),(1270,'Naruto : Volume 29',57),(1271,'Naruto : Volume 28',57),(1272,'Naruto : Volume 27',57),(1273,'Naruto : Volume 26',57),(1274,'Naruto : Volume 25',57),(1275,'Naruto : Volume 24',57),(1276,'Naruto : Volume 23',57),(1277,'Naruto : Volume 22',57),(1278,'Naruto : Volume 21',57),(1279,'Naruto : Volume 20',57),(1280,'Naruto : Volume 19',57),(1281,'Naruto : Volume 18',57),(1282,'Naruto : Volume 17',57),(1283,'Naruto : Volume 16',57),(1284,'Naruto : Volume 15',57),(1285,'Naruto : Volume 14',57),(1286,'Naruto : Volume 13',57),(1287,'Naruto : Volume 12',57),(1288,'Naruto : Volume 11',57),(1289,'Naruto : Volume 10',57),(1290,'Naruto : Volume 9',57),(1291,'Naruto : Volume 8',57),(1292,'Naruto : Volume 7',57),(1293,'Naruto : Volume 6',57),(1294,'Naruto : Volume 5',57),(1295,'Naruto : Volume 4',57),(1296,'Naruto : Volume 3',57),(1297,'Naruto : Volume 2',57),(1298,'Naruto : Volume 1',57);
/*!40000 ALTER TABLE `manga_chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manga_chapter_url`
--

DROP TABLE IF EXISTS `manga_chapter_url`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manga_chapter_url` (
  `idmanga_chapter_url` int NOT NULL AUTO_INCREMENT,
  `url` varchar(100) NOT NULL,
  `index` int NOT NULL,
  `fk_id_manga_chapter` int NOT NULL,
  PRIMARY KEY (`idmanga_chapter_url`),
  KEY `fk_id_manga_chapter_idx` (`fk_id_manga_chapter`),
  CONSTRAINT `fk_id_manga_chapter` FOREIGN KEY (`fk_id_manga_chapter`) REFERENCES `manga_chapter` (`idmanga_chapter`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manga_chapter_url`
--

LOCK TABLES `manga_chapter_url` WRITE;
/*!40000 ALTER TABLE `manga_chapter_url` DISABLE KEYS */;
INSERT INTO `manga_chapter_url` VALUES (1,'https://test.com',1,1);
/*!40000 ALTER TABLE `manga_chapter_url` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-19 20:15:22
