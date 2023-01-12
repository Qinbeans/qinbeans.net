-- Your SQL goes here
CREATE TABLE blog (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    subject VARCHAR(64) NOT NULL,
    body TEXT NOT NULL,
    visible BOOLEAN NOT NULL DEFAULT FALSE,
    created DATETIME NOT NULL,
    updated DATETIME NOT NULL
);