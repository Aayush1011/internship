-- Active: 1677152953310@@127.0.0.1@5432@twitter_database@public
CREATE DATABASE twitter_database;

CREATE TABLE twitter_users (
    id SERIAL NOT NULL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    userName VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashedPassword VARCHAR(50) NOT NULL,
    dateOfBirth DATE NOT NULL,
    loggedIn BOOLEAN NOT NULL DEFAULT FALSE,  
    createdAt TIMESTAMP NOT NULL DEFAULT now(),
    updatedAt TIMESTAMP NOT NULL DEFAULT now(),
    deletedAt TIMESTAMP
);

ALTER TABLE twitter_users ADD CONSTRAINT constraintname UNIQUE (userName);

CREATE TABLE twitter_tweet (
    id SERIAL NOT NULL PRIMARY KEY,
    authorId INT NOT NULL,
    tweetContent VARCHAR(280) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT now(),
    updatedAt TIMESTAMP NOT NULL DEFAULT now(),
    deletedAt TIMESTAMP,
    CONSTRAINT  fk_tweet_user
        Foreign Key (authorId) 
            REFERENCES twitter_users(id)
        ON DELETE CASCADE
);

CREATE TABLE tweet_comment (
    id SERIAL NOT NULL PRIMARY KEY,
    authorId INT NOT NULL,
    tweetId INT NOT NULL,
    commentId INT,
    commentContent TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT now(),
    updatedAt TIMESTAMP NOT NULL DEFAULT now(),
    deletedAt TIMESTAMP,
    CONSTRAINT  fk_tc_user
        Foreign Key (authorId) 
            REFERENCES twitter_users(id)
        ON DELETE CASCADE,
    CONSTRAINT  fk_tc_tweet
        Foreign Key (tweetId) 
            REFERENCES twitter_tweet(id)
        ON DELETE CASCADE,
    CONSTRAINT  fk_tc_comment
        Foreign Key (commentId) 
            REFERENCES tweet_comment(id)
        ON DELETE CASCADE        
);

CREATE TABLE twitter_followers (
  id_user INT NOT NULL,
  id_follower INT NOT NULL,
  PRIMARY KEY (id_user, id_follower),
  CONSTRAINT fk_tf_user
    Foreign Key (id_user) 
        REFERENCES twitter_users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_tf_follower
    Foreign Key (id_follower) 
        REFERENCES twitter_users(id)
    ON DELETE CASCADE    
);

CREATE TABLE twitter_hashtags (
   id SERIAL NOT NULL PRIMARY KEY,
   hashtagName VARCHAR(140) NOT NULL
);

CREATE TABLE tweet_hashtag (
    tweetId INT NOT NULL,
    hashtagId INT NOT NULL,
    CONSTRAINT fk_th_tweet
        Foreign Key (tweetId) 
            REFERENCES twitter_tweet(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_th_hashtag
        Foreign Key (hashtagId) 
            REFERENCES twitter_hashtags(id)
        ON DELETE CASCADE 
);

CREATE TABLE twitter_likes (
    userId INT NOT NULL,
    tweetId INT NOT NULL,
    CONSTRAINT fk_likes_user
        Foreign Key (tweetId) 
            REFERENCES twitter_tweet(id)
        ON DELETE CASCADE
);

--creating user
INSERT INTO twitter_users(firstName, lastName, userName, email, hashedPassword, dateOfBirth)  VALUES ('Aayush', 'Adhikari', 'aayush1000', 'test@test.com', '12345678', '1999-03-11');
---------------

--logging in user
UPDATE twitter_users
SET loggedIn = 'true'
WHERE email = 'test@test.com' AND hashedPassword = '12345678';

------------------

--creating tweet
INSERT INTO twitter_tweet(authorId, tweetContent) VALUES(1, 'Wow a tweet');

-----------------

--following user
INSERT INTO twitter_users(firstName, lastName, userName, email, hashedPassword, dateOfBirth) VALUES ('Ram', 'Hari', 'ram1000', 'ram@hari.com', '12345678', '1979-08-23');

INSERT INTO twitter_followers(id_user, id_follower) VALUES (1, 2);
INSERT INTO twitter_followers(id_user, id_follower) VALUES (2, 1);
-----------------

--getting list of user's followers
SELECT * FROM twitter_users AS t_u INNER JOIN twitter_followers AS t_f ON t_u.id = t_f.id_user where t_u.id = 1;
----------------------------------

--getting list of user's following
SELECT * FROM twitter_users AS t_u INNER JOIN twitter_followers AS t_f ON t_u.id = t_f.id_follower where t_u.id = 1;
----------------------------------

--liking a tweet
INSERT INTO twitter_likes VALUES(1, 1);
----------------

--adding hashtag to a tweet
INSERT INTO twitter_hashtags(hashtagName) VALUES('GetWrecked');

INSERT INTO tweet_hashtag (tweetid, hashtagid) VALUES (1, 1);
----------------------------