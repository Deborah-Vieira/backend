/* Criação de usuário */
    CREATE TABLE User_full(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    nickname VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    );

/*Criação de Fotos  */
    CREATE TABLE Photos_full(
	id VARCHAR(255) PRIMARY KEY,
	subtitle VARCHAR(255) NOT NULL,
	author VARCHAR(255) NOT NULL,
	date DATETIME NOT NULL,
	file  VARCHAR(255) NOT NULL ,
	collection VARCHAR(255) NOT NULL,
	FOREIGN KEY (id ) REFERENCES User_full(id),
    FOREIGN KEY (collection ) REFERENCES Collection_full(collection_id)
	);
	
/* Criação das hashtags */
	CREATE TABLE Tags_full(
	tag_id VARCHAR(255) PRIMARY KEY
	);
    
/* Criação de coleções */
    CREATE TABLE Collection_full(
	collection_id VARCHAR(255) PRIMARY KEY
	);
	
/* Junção de Photos e tags */
	CREATE TABLE Photos_Tag (
	tags_id VARCHAR(255),
	photos_id VARCHAR(255),
	FOREIGN KEY (tags_id) REFERENCES Tags_full(tag_id),
	FOREIGN KEY (photos_id ) REFERENCES Photos_full(id)
	);