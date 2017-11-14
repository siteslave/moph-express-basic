-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.10-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for ums
DROP DATABASE IF EXISTS `ums`;
CREATE DATABASE IF NOT EXISTS `ums` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ums`;

-- Dumping structure for table ums.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL DEFAULT '0',
  `password` varchar(200) NOT NULL DEFAULT '0',
  `first_name` varchar(200) NOT NULL DEFAULT '0',
  `last_name` varchar(200) NOT NULL DEFAULT '0',
  `user_type_id` int(3) NOT NULL DEFAULT 0,
  `is_active` char(1) DEFAULT 'Y',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table ums.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_id`, `username`, `password`, `first_name`, `last_name`, `user_type_id`, `is_active`) VALUES
	(2, 'guest', '0', 'Guest', 'Guest', 1, 'Y'),
	(5, 'admin', 'sff', 'admin', 'sdflsdfds', 1, 'Y');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table ums.user_types
DROP TABLE IF EXISTS `user_types`;
CREATE TABLE IF NOT EXISTS `user_types` (
  `user_type_id` int(3) NOT NULL AUTO_INCREMENT,
  `user_type_name` varchar(200) NOT NULL,
  PRIMARY KEY (`user_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table ums.user_types: ~2 rows (approximately)
/*!40000 ALTER TABLE `user_types` DISABLE KEYS */;
INSERT INTO `user_types` (`user_type_id`, `user_type_name`) VALUES
	(1, 'Guest'),
	(2, 'Administrator');
/*!40000 ALTER TABLE `user_types` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
