SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';


-- Schema healthwatch_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema healthwatch_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `healthwatch_db` DEFAULT CHARACTER SET utf8 ;
USE `healthwatch_db` ;

-- -----------------------------------------------------
-- Table `healthwatch_db`.`tblmemberdetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `healthwatch_db`.`tblmemberdetail` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `fk_detId` INT(11) NOT NULL DEFAULT '0' COMMENT 'Foriegn key from member master and is gets updated as news records are inserted',
  `detWeight` VARCHAR(45) NOT NULL DEFAULT '0' COMMENT 'Current weight of the member as he enters to calculated his bmi',
  `detBM` VARCHAR(45) NULL DEFAULT '0' COMMENT 'BMI of the member',
  `detTde` VARCHAR(45) NULL DEFAULT NULL COMMENT 'Current TDE of the member',
  `detDOC` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `healthwatch_db`.`tblmembermaster`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `healthwatch_db`.`tblmembermaster` (
  `memId` INT(11) NOT NULL AUTO_INCREMENT,
  `memFname` VARCHAR(45) NOT NULL COMMENT 'First Name of the User',
  `memLname` VARCHAR(45) NULL DEFAULT NULL COMMENT 'Last Name of the User',
  `memAdd1` VARCHAR(45) NULL DEFAULT NULL COMMENT 'Address Line 1',
  `memAdd2` VARCHAR(45) NULL DEFAULT NULL,
  `memCity` VARCHAR(45) NOT NULL COMMENT 'City Name',
  `memState` VARCHAR(45) NOT NULL COMMENT 'State',
  `memZip` VARCHAR(45) NOT NULL COMMENT 'Zip Code',
  `memEmail` VARCHAR(45) NOT NULL COMMENT 'Email of the member also used as the login name',
  `memTel` VARCHAR(45) NULL DEFAULT NULL,
  `memHeight` VARCHAR(45) NOT NULL COMMENT 'Height of the member',
  `memGoalweight` VARCHAR(45) NOT NULL COMMENT 'Goal weight of the member',
  `memSince` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'This is datetime column is populated automatically as soon  record is inserted',
  `memPwd` VARCHAR(120) NOT NULL COMMENT '160 bit encription password storage using SHA2',
  `memLevel` VARCHAR(45) NOT NULL DEFAULT '1' COMMENT 'This stores the level of achievement of the member as he reaches her mile stones it gets updated.',
  PRIMARY KEY (`memId`),
  UNIQUE INDEX `memEmail_UNIQUE` (`memEmail` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 23
DEFAULT CHARACTER SET = utf8
COMMENT = 'Member Master Table ';

USE `healthwatch_db` ;

-- -----------------------------------------------------
-- procedure SP_CHKPWD
-- -----------------------------------------------------

DELIMITER $$
USE `healthwatch_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CHKPWD`(
IN memNEmail VARCHAR(45),
IN memNPwd VARCHAR(120),
OUT memNcount INT
		
)
BEGIN
		SELECT count(*) FROM tblmembermaster WHERE 
        memPwd = SHA2(memNPWD,224) AND 
        UPPER(memEmail) = UPPER(memNEmail) INTO memNcount;
            
 END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_INSERTNEW
-- -----------------------------------------------------

DELIMITER $$
USE `healthwatch_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_INSERTNEW`(
		IN fname VARCHAR(45),
		IN lname VARCHAR(45),
		IN add1 VARCHAR(45),
		IN add2 VARCHAR(45),
		IN city VARCHAR(45),
		IN state VARCHAR(45),
		IN zip VARCHAR(20),
		IN email VARCHAR(45),
        IN telno VARCHAR(45),
		IN golweight VARCHAR(45),
		IN height VARCHAR(45),
 		IN pwd VARCHAR(120),
        IN weight VARCHAR(10),
        OUT memNId INT (11)
)
BEGIN
		 INSERT INTO tblmembermaster SET
		 memFname=  fname,
		 memLname=  lname,
		 memAdd1=   add1,
		 memAdd2=   add2,
		 memCity=   city,
		 memState=  state,
         memZip =   zip,
		 memEmail=  email,
         memTel =   telno,
		 memGoalweight = golweight,
		 memHeight =height,
		 memPwd =   sha2(pwd,224);
		SELECT memId
			FROM tblmembermaster
			ORDER BY memId DESC 
			LIMIT 1 INTO memNId;
		INSERT INTO 
			tblmemberdetail SET 
			fk_detId = memNId, 
			detWeight = weight;
            
 END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_UPDATE
-- -----------------------------------------------------

DELIMITER $$
USE `healthwatch_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_UPDATE`(
		IN fname VARCHAR(45),
		IN lname VARCHAR(45),
		IN add1 VARCHAR(45),
		IN add2 VARCHAR(45),
		IN city VARCHAR(45),
		IN state VARCHAR(45),
		IN zip VARCHAR(20),
		IN email VARCHAR(45),
        IN telno VARCHAR(45),
		IN golweight VARCHAR(45),
		IN height VARCHAR(45),
 		IN pwd VARCHAR(120),
        IN inmemId INT (11)
)
BEGIN
		 UPDATE tblmembermaster SET
		 memFname=  fname,
		 memLname=  lname,
		 memAdd1=   add1,
		 memAdd2=   add2,
		 memCity=   city,
		 memState=  state,
         memZip =   zip,
		 memEmail=  email,
         memTel =   telno,
		 memGoalweight = golweight,
		 memHeight =height
		  WHERE memid = inmemId;
 END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure SP_UPDPWD
-- -----------------------------------------------------

DELIMITER $$
USE `healthwatch_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_UPDPWD`(
IN memNEmail VARCHAR(45),
IN memNPwd VARCHAR(120),
OUT memNcount INT
)
BEGIN
		UPDATE tblmembermaster SET memPwd = SHA2(memNPWD,224)  WHERE  UPPER(memEmail) = UPPER(memNEmail);
		
        SELECT count(*) FROM tblmembermaster WHERE 
        memPwd = SHA2(memNPWD,224) AND 
        UPPER(memEmail) = UPPER(memNEmail) INTO memNcount;
            
 END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
