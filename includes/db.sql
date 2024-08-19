
CREATE TABLE IF NOT EXISTS `caposandra` (
  `myCaposandra` tinyint(1) unsigned NOT NULL  PRIMARY KEY,
  `email` varchar(20) NOT NULL,
  `username` varchar(10) NOT NULL,
  `capoKey` varchar(15) NOT NULL,
  `pic` varchar(222) NOT NULL DEFAULT '../../img/profile.png',
);

INSERT INTO `caposandra` SET myCaposandra=1, capoKey="123456", username="JILLF";
--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `myInvestors` (
  `id` int(255) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(80) NOT NULL,
  `username` varchar(50) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `password` varchar(80) NOT NULL,
  `phone` varchar(80) NOT NULL,
  `pic` varchar(222) NOT NULL DEFAULT '../profilePic/profile.png',
  `keyQuestion` varchar(50) NOT NULL,
  `keyAnswer` varchar(50) NOT NULL
  
);

--
-- Table Structure For table `Report`
--

CREATE TABLE IF NOT EXISTS `report` (
  `id` int(100) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `fullname` varchar(20) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `message` varchar(250) NOT NULL,
  `dateAdded` datetime NOT NULL
);

--
-- Table Structure For table `currentInvestors`
--

CREATE TABLE IF NOT EXISTS `currentInvestors` (
  `id` int(100) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `userId` int(100) NOT NULL,
  `refId` varchar(100) NOT NULL,
  `plan` varchar(20) NOT NULL,
  `percent` varchar(5) NOT NULL ,
  `dur` tinyint(3) NOT NULL ,
  `crdCount` tinyint(3) NOT NULL ,
  `widCount` tinyint(3) NOT NULL ,
  `reqStatus` tinyint(3) NOT NULL ,
  `dateAdded` datetime NOT NULL
);


--
-- Table Structure For table `currentInvestors`
--

CREATE TABLE IF NOT EXISTS `withdrawalRequest` (
  `id` int(100) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `userId` int(100) NOT NULL,
  `invId` int(100) NOT NULL,
  `accName` varchar(20) NOT NULL,
  `accNo` varchar(20) NOT NULL,
  `bankName` varchar(20) NOT NULL,
  `bankBranch` varchar(20) NOT NULL,
  `reqAmount` varchar(20) NOT NULL,
  `reqStatus` tinyint(3) NOT NULL ,
  `dateAdded` datetime NOT NULL
);
