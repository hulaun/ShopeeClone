CREATE TABLE `Role` (
	`Id` text(36) PRIMARY KEY NOT NULL,
	`Role` text(50)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`Id` text(36) PRIMARY KEY NOT NULL,
	`Username` text(30),
	`Password` text(255),
	`Salt` text(255),
	`Email` text(50),
	`ProfilePicture` text(100),
	`FullName` text,
	`Gender` text(1),
	`UserAddress` text,
	`PhoneNumber` text(50),
	`RoleId` text NOT NULL,
	`CreatedAt` text DEFAULT current_timestamp,
	FOREIGN KEY (`RoleId`) REFERENCES `Role`(`Id`) ON UPDATE no action ON DELETE no action
);
