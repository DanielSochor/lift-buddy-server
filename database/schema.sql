DROP DATABASE IF EXISTS lift_buddy;
CREATE DATABASE lift_buddy;

USE lift_buddy;

select 'create users - begin';
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  -- `first_name` varchar(50) NOT NULL,
  -- `last_name` varchar(50)  NOT NULL,
  `email_address` varchar(50) NOT NULL,
  -- `alias` varchar(50)  NOT NULL,
  `password` varchar(50)  NOT NULL,
  `salt` varchar(50)  NOT NULL,
  `session_token` varchar(50),
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8MB4;
ALTER TABLE users
-- 	ADD CONSTRAINT unique_alias UNIQUE KEY(`alias`);
-- ALTER TABLE users
	ADD CONSTRAINT unique_email UNIQUE KEY(`email_address`);
select 'create users - end';