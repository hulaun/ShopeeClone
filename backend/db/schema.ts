import { sqliteTable, integer, text, primaryKey} from 'drizzle-orm/sqlite-core';

export const User = sqliteTable('User', {
    id: integer('Id').primaryKey({ autoIncrement: true }),
    username: text('Username', { length: 30 }),
    password: text('Password', { length: 255 }),
    salt: text('Salt', { length: 255 }),
    email: text('Email', { length: 50 }),
    profilePicture: text('ProfilePicture', { length: 100 }),
    fullName: text('FullName'),
    gender: text('Gender', { length: 1, enum: ["M", "F", "O"] }),
    userAddress: text('UserAddress'),
    phoneNumber: text('PhoneNumber', { length: 50 }),
});