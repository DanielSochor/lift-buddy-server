DROP DATABASE IF EXISTS fitness_buddy;
CREATE DATABASE fitness_buddy;

USE fitness_buddy;
select 'create users - begin';
CREATE TABLE `users` (
    `user_id` int(11) NOT NULL AUTO_INCREMENT,
    `email_address` varchar(50) NOT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;