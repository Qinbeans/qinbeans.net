-- Your SQL goes here
CREATE TABLE message (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    contact VARCHAR(255) NOT NULL,
    subject VARCHAR(64) NOT NULL,
    content TEXT NOT NULL,
    ishuman BOOLEAN NOT NULL DEFAULT FALSE,
    created DATETIME NOT NULL,
    updated DATETIME NOT NULL
);