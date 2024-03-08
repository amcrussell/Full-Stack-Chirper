DROP SCHEMA IF EXISTS chirper_db;
CREATE SCHEMA IF NOT EXISTS chirper_db;
USE chirper_db;
CREATE TABLE users (
	id INT AUTO_INCREMENT,
    handle VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);
CREATE TABLE chirps (
	id INT AUTO_INCREMENT,
    user_id INT,
    body VARCHAR(500),
    location VARCHAR(200),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO users (handle , email) values
("crow", "croww@bing.com"), ("pidgeon", "whiteswan@gmail.com"), ("avocet", "americaw@hotmail.com"), ("flamingo", "longleg@gmail.com"), ("crocodile", "notacroc@protonmail.com");

INSERT INTO chirps (body, location, user_id) VALUES
("CAW", "top of building", "1"), ("CAWWWWW", "above building", "1"), ("caw?", "behind building", "1"), ("caww :(", "behind closed resturaunt", "1"), ("CAW", "in the park", "1"),
("i am great", "behind building", "2"), ("i see food gonna eat it", "tim hortons", "2"), ("that guy was rude smh", "hospital", "2"), ("still got the food tho", "hospital roof", "2"), ("i am still great", "in the park", "2"),
("i love america", "top of building", "3"), ("make sure to pay taxes today", "inside building", "3"), ("dont trust commies", "in the park", "3"), ("watch out for crocodiles", "hospital roof", "3"), ("back home", "inside building", "3"),
("i like shirmp", "swamp", "4"), ("that croc is here i gotta leave", "in the park", "4"), ("shirmp over there 0.0", "behind resturaunt", "4"), ("bleh this sucks", "behind resturaunt", "4"), ("back home", "swamp", "4"),
("hungry :(", "swamp", "5"), ("someone come hang out :/", "swamp", "5"), ("aight im coming there >:)", "in the park", "5"), ("met some friends :D", "hospital", "5"), ("got evicted D:", "swamp", "5");

INSERT INTO users (handle, email) value
("frog", "ribbit@cricket.net");

INSERT INTO chirps (body, location, user_id) Values
("go away @crocodile" , "swamp", "4"), 
("why D: im not doing anything wrong am I @flamingo", "swamp", "5"), 
("yeah @flamingo he isnt doing anything wrong let him be" , "inside building", "3");

CREATE TABLE mentions (
	chirp_id INT,
    user_id INT,
    PRIMARY KEY(chirp_id, user_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (chirp_id) REFERENCES chirps (id)
);

INSERT INTO mentions (chirp_id, user_id) Values
("26", "5"),
("27", "4"),
("28", "4");

SELECT 
	c.*,
   	u.handle,
    u.email
from mentions m
JOIN chirps c ON c.id = m.chirp_id
JOIN users u ON u.id = m.user_id; 

select * from mentions;
select * from chirps;

DELIMITER $$
DROP PROCEDURE IF EXISTS add_mention $$
CREATE PROCEDURE add_mention(IN _user_id INT, IN _body VARCHAR(500), IN _location VARCHAR(200), IN _mentions INT)
BEGIN
	INSERT INTO chirps (user_id, body, location) VALUE ( _user_id , _body , _location );
	SELECT MAX(id) into @most_recent_id from chirps;
	INSERT INTO mentions VALUE (@most_recent_id, _mentions);
	END $$
DELIMITER $$

CALL add_mention(1, '1', '1', 1);


DELIMITER $$
DROP PROCEDURE IF EXISTS delete_chirp $$
CREATE PROCEDURE delete_chirp(IN _chirp_id INT)
BEGIN
    DELETE FROM mentions WHERE chirp_id = _chirp_id;
    DELETE FROM chirps WHERE id = _chirp_id;
	END $$
DELIMITER $$

DELIMITER $$
DROP PROCEDURE IF EXISTS edit_chirp $$
CREATE PROCEDURE edit_chirp(IN _chirp_id INT, IN _body VARCHAR(500), IN _mentioned INT)
BEGIN
	UPDATE chirps SET body = _body WHERE id = _chirp_id;
    DELETE FROM mentions WHERE chirp_id = _chirp_id;
	INSERT INTO mentions VALUE (_chirp_id, _mentioned);
	END $$
DELIMITER $$
select * from mentions;

CREATE USER 'chirper_user'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON chirper_db.* TO 'chirper_user'@'localhost';
FLUSH PRIVILEGES;

