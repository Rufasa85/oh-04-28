DROP DATABASE IF EXISTS movies_db;
CREATE DATABASE movies_db;
USE movies_db;

CREATE TABLE movies(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    movie_name VARCHAR(100) NOT NULL
);

CREATE TABLE reviews(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    review text NOT NULL,
    movie_id INT NOT NULL,
    FOREIGN KEY (movie_id) 
    REFERENCES movies(id)
    ON DELETE CASCADE
);