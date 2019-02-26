/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 10.1.28-MariaDB : Database - portofolio
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`portofolio` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `portofolio`;

/*Table structure for table `company` */

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `fax_number` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `company` */

insert  into `company`(`id`,`name`,`address`,`phone_number`,`fax_number`,`note`,`is_deleted`,`created_by`,`updated_by`,`created_at`,`updated_at`) values (1,'Evil Corp','Somewhere on Hell','+66 666-666-666','-','It\'s hot down here',0,1,1,'2019-02-23 09:37:22','2019-02-23 09:37:27'),(2,'Angel Corp','Somewhere on Heaven','+11 111-222-333','-','It\'s cooler here',0,1,1,'2019-02-23 09:38:14','2019-02-23 09:38:11'),(3,'Nihilist Corp','Unknown','-','-','It\'s non-existant',0,1,1,'2019-02-23 09:38:46','2019-02-23 09:38:53');

/*Table structure for table `employee` */

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) DEFAULT NULL,
  `id_number` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `birth_place` varchar(255) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

/*Data for the table `employee` */

insert  into `employee`(`id`,`company_id`,`id_number`,`name`,`birth_place`,`birth_date`,`gender`,`address`,`phone_number`,`email`,`note`,`is_active`,`is_deleted`,`created_by`,`updated_by`,`created_at`,`updated_at`) values (1,1,'632-30-4695','Tommy S Lucas','Austin, TX','1972-04-02','male','4282 Ashton Lane, Austin 78701, Texas','612-537-2731','lucasTom@hellcorp.com','Hellcorp Administrator',1,0,1,1,'2019-02-23 09:43:27','2019-02-23 09:43:30'),(2,1,'176-70-9883','Margarita K Vilalba','Pittsburgh, PA','1976-06-18','female','362 Pine St, Pittsburgh, Pennsylvania','724-315-0035','vilalba362@hellcorp.com','-',1,0,1,1,'2019-02-23 09:47:15','2019-02-23 09:47:37'),(3,1,'670-07-8696','Bill B Fisher','Tucker, GA','1995-04-27','male','3473 Elk Creek Road, Tucker, Georgia','770-492-7098','bbfisher@hellcorp.com','-',1,0,1,1,'2019-02-26 14:59:12','2019-02-26 14:59:15'),(4,1,'407-82-9821','Carl V Cunningham','Lexington, KY','1983-07-09','male','1075 Stanford Park, Lexington, Kentucky','407-82-9821','cunningam.cv@hellcorp.com','-',1,0,1,1,'2019-02-26 15:04:34','2019-02-26 15:04:37'),(5,2,'109-38-3992','James A Eells','Dedham, MA','1972-08-11','male','3442 Tenmile Road, Dedham, Massachusetts','781-690-8162','ae_james@heaven.com','Heavencorp Administrator',1,0,5,1,'2019-02-26 15:07:17','2019-02-26 15:07:20'),(6,2,'232-90-0009','Carrie W Walker','Walkersville, WV','1969-02-01','female','3257 Fulton Street, Walkersville, West Virginia','304-452-0146','carrie_walker58@heaven.com','-',1,0,5,1,'2019-02-26 15:09:40','2019-02-26 15:09:46'),(7,2,'292-62-1965','Steven J Young','New Philadelphia, OH','1965-10-18','male','3594 Little Street, New Philadelphia, Ohio','330-602-2727','steve_young65@heaven.com','-',1,0,5,1,'2019-02-26 16:16:44','2019-02-26 16:16:48'),(8,1,'213-37-4828','Jessica A Alvarez','Hanover, MD','1967-12-16','female','3829 Beechwood Drive, Hanover, Maryland','410-967-1462','alvaresj@hellcorp.com','-',1,0,1,1,'2019-02-26 16:20:37','2019-02-26 16:20:40'),(9,2,'528-14-7075','David K Price','Salt Lake City, UT','1968-10-27','male','2470 Philadelphia Avenue, Salt Lake City, Utah','801-246-8145','price.david68@heaven.com','-',1,0,5,1,'2019-02-26 16:23:13','2019-02-26 16:23:16'),(10,1,'016-32-3259','Patricia V Hess','Boston, Ma','1985-08-04','female','3913 Single Street, Boston, Massachusetts','781-574-3588','v.hess@hellcorp.com','-',1,0,1,1,'2019-02-26 16:25:48','2019-02-26 16:25:52'),(11,3,'000-00-0000','John Doe','-','0000-00-00','-','-','000-000-0000','-','Nihilist Administrator',1,0,10,10,'0000-00-00 00:00:00','0000-00-00 00:00:00');

/*Table structure for table `endpoint` */

DROP TABLE IF EXISTS `endpoint`;

CREATE TABLE `endpoint` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `can_access` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

/*Data for the table `endpoint` */

insert  into `endpoint`(`id`,`role_id`,`path`,`method`,`can_access`) values (1,1,'IntrospectionQuery','POST',1),(2,1,'endpointAll','GET',1),(3,1,'endpointById','GET',1),(4,1,'createEndpoint','POST',1),(5,1,'updateEndpoint','PUT',1),(6,1,'deleteEndpoint','DELETE',1),(7,1,'employeeAll','GET',1),(8,1,'employeeById','GET',1),(9,1,'createEmployee','POST',1),(10,1,'updateEmployee','PUT',1),(11,1,'deleteEmployee','DELETE',1),(12,1,'companyAll','GET',1),(13,1,'companyById','GET',1),(14,1,'createCompany','POST',1),(15,1,'updateCompany','PUT',1),(16,1,'deleteCompany','DELETE',1),(17,1,'roleAll','GET',1),(18,1,'roleById','GET',1),(19,1,'createRole','POST',1),(20,1,'updateRole','PUT',1),(21,1,'deleteRole','DELETE',1),(23,1,'usersAll','GET',1),(24,1,'usersById','GET',1),(25,1,'createUsers','POST',1),(26,1,'updateUsers','PUT',1),(27,1,'deleteUsers','DELETE',1),(28,1,'viewLoggedUsers','GET',1),(29,1,'updatePassword','PUT',1);

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `role` */

insert  into `role`(`id`,`name`,`is_active`,`is_deleted`,`created_by`,`updated_by`,`createdAt`,`updatedAt`) values (1,'admin',1,0,1,1,'2019-02-23 09:48:08','2019-02-23 09:48:11'),(2,'employee',1,0,1,1,'2019-02-26 14:23:56','2019-02-26 14:23:59');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `is_logged` tinyint(1) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `employee_id` (`employee_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`role_id`,`employee_id`,`company_id`,`username`,`password`,`last_login`,`is_logged`,`is_active`,`is_deleted`,`created_by`,`updated_by`,`created_at`,`updated_at`) values (1,1,1,1,'admin','4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2','2019-02-26 08:18:38',0,1,0,1,1,'2019-02-26 14:28:53','2019-02-26 09:55:59'),(2,2,2,1,'vilalba@hellcorp','fdb015619b5b708ff83ecf0c7f37058d89f7b50fa1bfdf6a37683173f236db2b',NULL,0,1,0,1,1,'2019-02-26 16:35:25','2019-02-26 16:35:25'),(3,2,3,1,'fisher@hellcorp','827961b48d1f730d74322a1d42a04e86b75dd19aa2e7c76061d7d1ea03397964','2019-02-26 09:54:53',0,1,0,1,1,'2019-02-26 16:36:15','2019-02-26 09:55:40'),(4,2,4,1,'cunningham@hellcorp','40e9ebcdde2c35280951faf8f0fdf6d0d6b3c0386af2edc3b73661ca42a60e46',NULL,0,1,0,1,1,'2019-02-26 16:36:37','2019-02-26 16:36:37'),(5,1,5,2,'eells@heaven','8946d0d33a92ffd05d92027eeae5173db5ceea3654cde2868800336a21dfc36f',NULL,0,1,0,5,5,'2019-02-26 16:37:16','2019-02-26 16:37:16'),(6,2,6,2,'walker@heaven','d8b01b2435a39d18015cabdf20afba9ca275412f2eb117f80fb7989c4101c029',NULL,0,1,0,5,5,'2019-02-26 16:38:03','2019-02-26 16:38:03'),(7,2,7,2,'young@heaven','dbba921ce20510210ee7db98e000ee32d0e17f5e93105707acc498d6f8ef5a7e',NULL,0,1,0,5,5,'2019-02-26 16:38:58','2019-02-26 16:38:58'),(8,2,8,1,'alvarez@hellcorp','18d73b091ae88f2bb581b97a8d5119fbc3e5ef0f184d87507fba08dcf32a6dc0',NULL,0,1,0,1,1,'2019-02-26 16:39:19','2019-02-26 16:39:19'),(9,2,9,2,'price@heaven','683b531f41ec88a2f345b727afe59757b73162a340a65c86bba62866f8fe556c',NULL,0,1,0,5,5,'2019-02-26 16:39:47','2019-02-26 16:39:47'),(10,2,10,1,'hess@hellcorp','ea296627cef2bfcc55191afa82a1097794a8eeedc7e7def21d5359db8a2620ca',NULL,0,1,0,1,1,'2019-02-26 16:40:13','2019-02-26 16:40:13');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
