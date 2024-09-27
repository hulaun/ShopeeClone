CREATE TABLE `Order` (
	`Id` text(36) PRIMARY KEY NOT NULL,
	`OrderDate` text DEFAULT current_timestamp,
	`Status` text(20) NOT NULL,
	`TotalAmount` integer,
	`UserId` text(36),
	FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `OrderProductsRelations` (
	`OrderId` text(36),
	`ProductId` text(36),
	`Quantity` integer,
	PRIMARY KEY(`OrderId`, `ProductId`),
	FOREIGN KEY (`OrderId`) REFERENCES `Order`(`Id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ProductId`) REFERENCES `Product`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Product` (
	`Id` text(36) PRIMARY KEY NOT NULL,
	`Name` text(50),
	`Description` text,
	`Price` integer,
	`Discount` integer,
	`ProductPicture` text(100),
	`CreatedAt` text DEFAULT current_timestamp,
	`ShopId` text(36),
	FOREIGN KEY (`ShopId`) REFERENCES `Shop`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ProductCategory` (
	`Id` text(36) PRIMARY KEY NOT NULL,
	`Name` text(50),
	`Description` text,
	`CreatedAt` text DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE `ProductCategoryRelations` (
	`ProductId` text(36),
	`CategoryId` text(36),
	PRIMARY KEY(`ProductId`, `CategoryId`),
	FOREIGN KEY (`ProductId`) REFERENCES `Product`(`Id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`CategoryId`) REFERENCES `ProductCategory`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Shop` (
	`Id` text(36) PRIMARY KEY NOT NULL,
	`Name` text(50),
	`Description` text,
	`ShopAddress` text,
	`PhoneNumber` text(50),
	`ShopPicture` text(100),
	`CreatedAt` text DEFAULT current_timestamp,
	`UserId` text(36),
	FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`) ON UPDATE no action ON DELETE no action
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
	`Role` text(20) NOT NULL,
	`CreatedAt` text DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE `UserVoucherRelations` (
	`UserId` text(36),
	`VoucherId` text(36),
	`Status` text(20) NOT NULL,
	`CreatedAt` text DEFAULT current_timestamp,
	`ExpiredAt` text,
	PRIMARY KEY(`UserId`, `VoucherId`),
	FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`VoucherId`) REFERENCES `Voucher`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `VendorExtra` (
	`UserId` text(36) PRIMARY KEY NOT NULL,
	FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `VendorShopRelations` (
	`UserId` text(36),
	`ShopId` text(36),
	PRIMARY KEY(`UserId`, `ShopId`),
	FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ShopId`) REFERENCES `Shop`(`Id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Voucher` (
	`Id` text(36) PRIMARY KEY NOT NULL,
	`Type` text(20) NOT NULL,
	`Code` text(20),
	`Discount` integer
);
--> statement-breakpoint
CREATE TABLE `VoucherRules` (
	`Id` text(36) PRIMARY KEY NOT NULL,
	`VoucherId` text(36),
	`DataType` text(20) NOT NULL,
	`Value1` text,
	`Value2` text,
	FOREIGN KEY (`VoucherId`) REFERENCES `Voucher`(`Id`) ON UPDATE no action ON DELETE no action
);
