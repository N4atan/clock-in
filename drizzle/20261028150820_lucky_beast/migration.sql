PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_time_entries` (
	`id` text PRIMARY KEY,
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`timestamp` integer NOT NULL,
	CONSTRAINT `fk_time_entries_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_time_entries`(`id`, `user_id`, `type`, `timestamp`) SELECT `id`, `user_id`, `type`, `timestamp` FROM `time_entries`;--> statement-breakpoint
DROP TABLE `time_entries`;--> statement-breakpoint
ALTER TABLE `__new_time_entries` RENAME TO `time_entries`;--> statement-breakpoint
PRAGMA foreign_keys=ON;