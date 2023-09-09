-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacation
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int NOT NULL,
  `image` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (52,'amsterdam','Amsterdam vacation is fun! Visit museums, ride bikes, see canals, try Dutch food, and enjoy friendly people. Experience beautiful architecture and vibrant culture. Unforgettable trip!','2023-10-01','2023-10-09',400,'1690817120795.jpg'),(53,'berlin','Berlin is a dynamic city with history, art, and nightlife. Explore landmarks, museums, and parks. Taste delicious food and meet diverse people. A must-visit destination!','2023-09-03','2023-09-08',300,'1690817179907.jpg'),(54,'budapest','Budapest is a charming city with stunning architecture, thermal baths, and rich history. Enjoy Danube River cruises, delicious cuisine, and affordable shopping. Memorable experiences await!','2023-09-14','2023-09-19',300,'1690817249129.jpg'),(55,'crete','Crete is a Greek island paradise with beautiful beaches, ancient ruins, and warm hospitality. Delight in Mediterranean cuisine, explore history, and relax in idyllic surroundings. Unforgettable getaway!','2023-08-15','2023-08-20',200,'1690817343111.jpg'),(56,'istanbul','Istanbul is a magical city where East meets West. Marvel at historic landmarks like Hagia Sophia, taste delicious Turkish cuisine, and experience a vibrant blend of cultures. Enchanting journey awaits!','2023-08-01','2023-08-07',350,'1690817431369.jpg'),(57,'lisbon','Lisbon is a captivating city with colorful streets, historic sites, and stunning views. Enjoy delicious pastries, listen to Fado music, and embrace the warm Portuguese culture. Unforgettable adventure awaits!','2023-07-20','2023-07-28',400,'1690817529918.jpg'),(58,'london','London, a bustling metropolis, offers iconic landmarks like Big Ben and Buckingham Palace. Explore world-class museums, enjoy diverse cuisines, and experience the rich history and vibrant culture. Incredible city!','2023-09-27','2023-10-03',400,'1690818798075.jpg'),(59,'moscow','Moscow, the capital of Russia, boasts grand architecture and historical landmarks like the Kremlin and Red Square. Enjoy rich culture, delicious cuisine, and a fascinating blend of tradition and modernity.','2023-09-06','2023-09-21',1100,'1690819872103.webp'),(60,'new york','New York City, the Big Apple, is a vibrant metropolis with iconic landmarks like Times Square and Statue of Liberty. Experience diverse cultures, world-class entertainment, and endless opportunities. Unforgettable city!','2023-12-21','2024-01-10',1500,'1690819975948.jpg'),(61,'paris','Paris, the City of Lights, enchants with the Eiffel Tower, Louvre Museum, and charming streets. Savor delicious cuisine, embrace art and romance, and immerse in its timeless beauty. Mesmerizing experience!','2024-02-05','2024-02-12',600,'1690820172320.jpg'),(62,'prague','Prague, the heart of Europe, delights with its medieval charm, stunning architecture, and rich history. Explore the Prague Castle, enjoy local beer, and wander through charming cobblestone streets. Enchanting city!','2023-09-02','2023-09-08',350,'1690820225150.webp'),(64,'rome','Rome, the capital of Italy, boasts a rich history spanning over 2,500 years. Explore ancient wonders like the Pantheon and Roman Forum, marvel at the grandeur of the Colosseum, and toss a coin into the Trevi Fountain for luck. Delight in authentic Italian cuisine, indulge in gelato, and experience the passionate spirit of \"la dolce vita.\" With its fascinating blend of historical landmarks, art, culture, and delicious food, Rome offers a truly unforgettable journey through time.','2023-11-09','2023-11-16',500,'1690820471880.jpg'),(65,'thailand','Thailand, the Land of Smiles, captivates with its stunning beaches, exotic islands, and vibrant cities. Explore ancient temples, indulge in flavorful street food, and experience the warm hospitality of its people. From bustling Bangkok to the serene landscapes of Chiang Mai and the paradisiacal shores of Phuket, Thailand offers a diverse and unforgettable travel experience. Enjoy vibrant festivals, discover unique cultural traditions, and immerse yourself in the beauty of this Southeast Asian gem.','2024-04-01','2024-04-29',1700,'1690820560127.webp'),(66,'zurich','Zurich, a Swiss gem, offers scenic beauty, stunning lakes, and mountains. Explore old town charm, visit museums, and savor Swiss chocolates. Enjoy a blend of nature and urban delights. Memorable vacation!','2023-12-01','2023-12-11',500,'1690821245331.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-31 22:24:49
