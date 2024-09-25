import { sqliteTable, integer, text, primaryKey} from 'drizzle-orm/sqlite-core';
import crypto from 'crypto'
import { sql } from 'drizzle-orm';

export const User = sqliteTable('User', {
    id: text('Id', { length: 36 }).primaryKey().$defaultFn(()=> crypto.randomUUID()),
    username: text('Username', { length: 30 }),
    password: text('Password', { length: 255 }),
    salt: text('Salt', { length: 255 }),
    email: text('Email', { length: 50 }),
    profilePicture: text('ProfilePicture', { length: 100 }),
    fullName: text('FullName'),
    gender: text('Gender', { length: 1, enum: ["M", "F", "O"] }),
    userAddress: text('UserAddress'),
    phoneNumber: text('PhoneNumber', { length: 50 }),
    roleId: text('RoleId').notNull().references(() => Role.id),
    createdAt: text('CreatedAt').default(sql`current_timestamp`),
});

export const Role = sqliteTable("Role", {
    id: text('Id', { length: 36 }).primaryKey().$defaultFn(()=> crypto.randomUUID()),
    role: text('Role', {length: 50}),
})