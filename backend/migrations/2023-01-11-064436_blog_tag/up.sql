-- Your SQL goes here
-- Foreign key to blog table and tag table
CREATE TABLE blog_tag (
    id INT NOT NULL PRIMARY KEY,
    blog_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (blog_id) REFERENCES blog(id),
    FOREIGN KEY (tag_id) REFERENCES tag(id)
);