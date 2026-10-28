CREATE TABLE `time_entries` (
	`id` text PRIMARY KEY,
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`timestamp` datetime NOT NULL,
	CONSTRAINT `fk_time_entries_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
