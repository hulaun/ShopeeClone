create database ShopeeClone
use ShopeeClone

create table Users(
	Id int identity(100,1) primary key,
	Username varchar(20) null,
	Password varchar(255) null,
	Email varchar(30),
	GoogleID varchar(100) null,
	FacebookID varchar(100) null,
	ProfilePicture varchar(100) null,
)

select * from users
drop table Users
