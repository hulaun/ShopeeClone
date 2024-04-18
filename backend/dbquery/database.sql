create database ShopeeClone
use ShopeeClone

create table Customer(
	Id int identity(1,1) primary key,
	Username varchar(30) null,
	Password varchar(255) null,
	Email varchar(50),
	GoogleID varchar(100) null,
	FacebookID varchar(100) null,
	ProfilePicture varchar(100) null,
)
SELECT [id], [Username], [Password], [Email], [GoogleID], [FacebookID], [ProfilePicture] FROM [Customer] AS [Customers];
select * from customer
drop table customer

