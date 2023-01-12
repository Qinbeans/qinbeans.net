-- Your SQL goes here
-- Image has a foreign key to blog
CREATE TABLE image (
    id INT NOT NULL PRIMARY KEY,
    blog_id INTEGER NOT NULL,
    data TEXT NOT NULL,
    created DATETIME NOT NULL,
    updated DATETIME NOT NULL,
    FOREIGN KEY (blog_id) REFERENCES blog(id)
);