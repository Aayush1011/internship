-- Active: 1677152953310@@127.0.0.1@5432@blog_application@public
CREATE TYPE roleTypes AS ENUM ('author', 'moderator', 'admin');

CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    userName VARCHAR(50) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    hashedPassword VARCHAR(50) NOT NULL,
    dateOfBirth DATE NOT NULL,
    userRole roleTypes, 
    createdAt TIMESTAMP NOT NULL DEFAULT now(),
    updatedAt TIMESTAMP NOT NULL DEFAULT now(),
    deletedAt TIMESTAMP
);

CREATE INDEX users_userName_index ON users (userName);
CREATE INDEX users_email_index ON users (email);
CREATE INDEX users_id_index ON users (id);

ALTER TABLE IF EXISTS users RENAME TO blog_users;

CREATE TYPE postStatusTypes AS ENUM ('draft', 'published', 'unpublished');

CREATE TABLE posts (
    id SERIAL NOT NULL PRIMARY KEY,
    authorId INT NOT NULL,
    postTitle TEXT NOT NULL UNIQUE,
    postContent TEXT NOT NULL,
    postSummary TEXT NOT NULL,
    postStatus postStatusTypes,
    createdAt TIMESTAMP NOT NULL DEFAULT now(),
    updatedAt TIMESTAMP NOT NULL DEFAULT now(),
    deletedAt TIMESTAMP,
    CONSTRAINT  fk_post_user
        Foreign Key (authorId) 
            REFERENCES users(id)
);

CREATE INDEX posts_id_index ON posts(id);

ALTER TABLE IF EXISTS posts RENAME TO blog_posts;

CREATE TABLE metadata (
    id SERIAL NOT NULL PRIMARY KEY,
    postId INT NOT NULL,
    numberOfViews INTEGER,
    featuredPost BOOLEAN NOT NULL,
    CONSTRAINT fk_metadata_post
        Foreign Key (postId) 
            REFERENCES posts(id)
);

CREATE INDEX metadata_id_index ON metadata(id);

ALTER TABLE IF EXISTS metadata RENAME TO blog_metadata;

CREATE TABLE tags (
    id SERIAL NOT NULL PRIMARY KEY,
    tagName TEXT NOT NULL UNIQUE,
    tagDescription TEXT NOT NULL
);

CREATE INDEX tags_id_index ON tags(id);

ALTER TABLE IF EXISTS tags RENAME TO blog_tags;

CREATE TABLE post_tags (
    postId INT NOT NULL,
    tagId INT NOT NULL,
    CONSTRAINT fk_pt_post
        Foreign Key (postId) 
            REFERENCES posts(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_pt_tag
        Foreign Key (tagId) 
            REFERENCES tags(id)
        ON DELETE CASCADE
);

CREATE TABLE categories (
    id SERIAL NOT NULL PRIMARY KEY,
    categoryName TEXT NOT NULL UNIQUE,
    categoryDescription TEXT NOT NULL
);

CREATE INDEX categories_id_index ON categories(id);

ALTER TABLE IF EXISTS categories RENAME TO blog_categories;

CREATE TABLE post_categories (
    postId INT NOT NULL,
    categoryId INT NOT NULL,
    CONSTRAINT fk_pc_post
        Foreign Key (postId) 
            REFERENCES posts(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_pc_category
        Foreign Key (categoryId) 
            REFERENCES categories(id)
        ON DELETE CASCADE
);


CREATE TABLE post_comments (
    id SERIAL NOT NULL PRIMARY KEY,
    authorId INT NOT NULL,
    postId INT NOT NULL,
    commentId INT,
    content TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT now(),
    updatedAt TIMESTAMP NOT NULL DEFAULT now(),
    deletedAt TIMESTAMP,
    CONSTRAINT fk_comment_user
        Foreign Key (authorId) 
            REFERENCES users(id),
    CONSTRAINT  fk_comment_post
        Foreign Key (postId) 
            REFERENCES posts(id)
        ON DELETE CASCADE,
    CONSTRAINT  fk_comment_comment
        Foreign Key (commentId) 
            REFERENCES post_comments(id)
        ON DELETE CASCADE
);

CREATE INDEX comments_id_index ON post_comments(id);

--inserting new users
INSERT INTO users(firstName, lastName, userName, email, hashedPassword, dateOfBirth, userRole)  VALUES ('Aayush', 'Adhikari', 'aayush1000', 'test@test.com', '12345678', '1999-03-11', 'author');

INSERT INTO users(firstName, lastName, userName, email, hashedPassword, dateOfBirth, userRole)  VALUES ('Ram', 'Hari', 'ram1000', 'ram@hari.com', '12345678', '1979-08-23', 'moderator');

INSERT INTO users(firstName, lastName, userName, email, hashedPassword, dateOfBirth, userRole)  VALUES ('shyam', 'shyam', 'shyam1000', 'shyam@shyam.com', '12345678', '2005-11-11', 'admin');

-----------------------


--creating new posts with draft
INSERT INTO blog_posts(authorId, postTitle, postContent, postSummary, postStatus) VALUES (2, 'What is A for?', 'A for Apple, B for Ball', 'A-Apple, B-Ball', 'draft');

-------------------------------

--publishing posts
UPDATE blog_posts
SET postStatus = 'published'
WHERE id = 2;

------------------

--adding comments/replies
INSERT INTO post_comments (authorid, postid, content) VALUES (2, 2, 'A great comment');

INSERT INTO post_comments (authorid, postid, commentid, content) VALUES (3, 2, 1, 'A great reply');

-------------------------

--retrieving posts by category
INSERT INTO blog_categories (categoryName, categoryDescription) VALUES ('food', 'Different types of food are from various culinaries are included in this category.');

INSERT INTO blog_categories (categoryName, categoryDescription) VALUES ('lifestyle', 'This category is all about lifestyle. Your lifestyle. Your. Lifestyle.');

INSERT INTO post_categories (postId, categoryId) VALUES (2, 1);

INSERT INTO post_categories (postId, categoryId) VALUES (3, 2);

SELECT * FROM blog_posts AS b_p INNER JOIN post_categories AS p_c on b_p.id = p_c.postid INNER JOIN blog_categories AS b_c ON p_c.categoryid = b_c.id WHERE b_c.categoryName = 'food';

-------------------------------

--retrieving featured posts and popular posts

INSERT INTO blog_metadata (postId, numberofviews, featuredpost) VALUES (2, 333, 'true');

INSERT INTO blog_posts(authorId, postTitle, postContent, postSummary, postStatus) VALUES (3, 'A travel Blog Post', 'Travel travel travel', 'About travelling', 'draft');

INSERT INTO blog_metadata (postId, numberofviews, featuredpost) VALUES (3, 222, 'false');

SELECT * FROM blog_posts AS b_p INNER JOIN blog_metadata AS b_m ON b_p.id = b_m.postId WHERE b_m.featuredPost = 'true';

SELECT * FROM blog_posts AS b_p INNER JOIN blog_metadata AS b_m ON b_p.id = b_m.postId WHERE b_m.numberofviews= (SELECT MAX(numberOfViews) FROM blog_metadata);

------------------------------------------------