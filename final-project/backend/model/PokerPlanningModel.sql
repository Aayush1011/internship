CREATE DATABASE `poker_planning`;

CREATE TABLE `participants` (
 `user_id` int(11) NOT NULL,
 `session_id` varchar(100) NOT NULL,
 `role` enum('moderator','member') NOT NULL,
 `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
 PRIMARY KEY (`user_id`,`session_id`) USING BTREE,
 KEY `fk_participant_session` (`session_id`),
 CONSTRAINT `fk_participant_session` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`),
 CONSTRAINT `fk_participant_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `sessions` (
 `id` varchar(100) NOT NULL,
 `name` varchar(100) NOT NULL,
 `description` text NOT NULL,
 `status` enum('active','closed') NOT NULL DEFAULT 'active',
 PRIMARY KEY (`id`),
 UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `stories` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `session_id` varchar(100) NOT NULL,
 `name` varchar(100) NOT NULL,
 `description` text NOT NULL,
 `status` enum('active','closed','pending') NOT NULL DEFAULT 'pending',
 `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
 PRIMARY KEY (`id`),
 KEY `fk_story_session` (`session_id`),
 CONSTRAINT `fk_story_session` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `story_points` (
 `session_id` varchar(100) NOT NULL,
 `story_id` int(11) NOT NULL,
 `user_id` int(11) NOT NULL,
 `points` int(11) NOT NULL,
 `status` enum('active','pending') NOT NULL DEFAULT 'pending',
 PRIMARY KEY (`session_id`,`story_id`,`user_id`),
 KEY `fk_story-points_user` (`user_id`),
 KEY `fk_story-points_story` (`story_id`),
 CONSTRAINT `fk_story-points_session` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`),
 CONSTRAINT `fk_story-points_story` FOREIGN KEY (`story_id`) REFERENCES `stories` (`id`),
 CONSTRAINT `fk_story-points_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `username` varchar(50) NOT NULL,
 `email` varchar(254) NOT NULL,
 `password` varchar(72) NOT NULL,
 `role` varchar(50) NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `username` (`username`),
 UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;