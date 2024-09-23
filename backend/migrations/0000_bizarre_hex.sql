CREATE TABLE `User` (
	`Id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Username` text(30),
	`Password` text(255),
	`Salt` text(255),
	`Email` text(50),
	`ProfilePicture` text(100),
	`FullName` text,
	`Gender` text(1),
	`UserAddress` text,
	`PhoneNumber` text(50)
);
