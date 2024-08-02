create database ShopeeClone
use ShopeeClone

create table [User](
	Id int identity(1,1) primary key,
	Username varchar(30) null,
	Password varchar(255) null,
	Salt VARCHAR(255) NULL,
	Email varchar(50) null,
	ProfilePicture varchar(100) null,
	FullName nvarchar(100) null,
	Gender char(1) CHECK (Gender='M' OR Gender='F'),
	UserAddress nvarchar(100) null,
	PhoneNumber varchar(50) NULL,
)



select * from [User]
select * from [User] where username='adm'

drop table customer
delete from User where username = 'adm'

INSERT INTO User (username, Password, Salt, PhoneNumber)
        VALUES ('adm','adm' , 'haha', '0356864894')

ALTER TABLE [User]
ADD Role VARCHAR(20);

UPDATE [User]
SET Role = 'customer';

UPDATE [User]
SET Role = 'admin'
where [User].username like 'admin%'
