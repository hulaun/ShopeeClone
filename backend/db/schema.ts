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
    address: text('Address'),
    phoneNumber: text('PhoneNumber', { length: 50 }),
    dob: text('DOB', { length: 20 }),
    role: text('Role', {length: 20, enum: ["Admin", "Consumer", "Vendor"]}).notNull(),
    status: text('Status', {length: 20, enum: ["Active", "Inactive", "Blocked"]}),
    createdAt: text('CreatedAt').default(sql`current_timestamp`),
})

export const VendorExtra = sqliteTable('VendorExtra', {
    userId: text('UserId', { length: 36 }).primaryKey().references(()=> User.id),
    status: text('Status', {length: 20, enum: ["Pending", "Rejected", "Approved"]}),
})

export const Shop = sqliteTable('Shop', {
    id: text('Id', { length: 36 }).primaryKey().$defaultFn(()=> crypto.randomUUID()),
    name: text('Name', { length: 50 }),
    description: text('Description'),
    shopAddress: text('ShopAddress'),
    phoneNumber: text('PhoneNumber', { length: 50 }),
    shopPicture: text('ShopPicture', { length: 100 }),
    createdAt: text('CreatedAt').default(sql`current_timestamp`),
    ownerId: text('UserId', { length: 36 }).references(()=> User.id),
})

export const VendorShopRelations = sqliteTable('VendorShopRelations', {
    userId: text('UserId', { length: 36 }).references(()=> User.id),
    shopId: text('ShopId', { length: 36 }).references(()=> Shop.id),
},(table)=>{
    return{
        pk: primaryKey({columns: [table.userId, table.shopId]})
    }
})

export const Product = sqliteTable('Product', {
    id: text('Id', { length: 36 }).primaryKey().$defaultFn(()=> crypto.randomUUID()),
    name: text('Name', { length: 50 }),
    description: text('Description'),
    price: integer('Price'),
    discount: integer('Discount'),
    productPicture: text('ProductPicture', { length: 100 }),
    createdAt: text('CreatedAt').default(sql`current_timestamp`),
    shopId: text('ShopId', { length: 36 }).references(()=> Shop.id),
})

export const ChatRoom = sqliteTable('ChatRoom', {
    id: text('Id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text('Name', { length: 50 }),
    createdAt: text('CreatedAt').default(sql`current_timestamp`),
    type: text('Type', { length: 20, enum: ["Private", "Public"] }).notNull(),
});

export const ChatRoomUserRelations = sqliteTable('ChatRoomUserRelations', {
    chatRoomId: text('ChatRoomId', { length: 36 }).references(() => ChatRoom.id),
    userId: text('UserId', { length: 36 }).references(() => User.id),
    userRole: text('UserRole', { length: 20, enum: ["Admin", "Member"] }).notNull(),
    lastSeenAt: text('LastSeenAt').default(sql`current_timestamp`),
    joinedAt: text('JoinedAt').default(sql`current_timestamp`),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.chatRoomId, table.userId] }),
    };
});

export const Messages = sqliteTable('Messages', {
    id: text('Id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    chatRoomId: text('ChatRoomId', { length: 36 }).references(() => ChatRoom.id),
    senderId: text('SenderId', { length: 36 }).references(() => User.id),
    content: text('Content'),
    createdAt: text('CreatedAt').default(sql`current_timestamp`),
    status: text('Status', { length: 20, enum: ["Sent", "Delivered", "Read"] }).notNull(),
});

export const UserRelationship = sqliteTable('UserRelationship', {
    userId: text('UserId', { length: 36 }).references(() => User.id),
    relatedUserId: text('RelatedUserId', { length: 36 }).references(() => User.id),
    relationshipType: text('RelationshipType', { length: 20, enum: ["Friend", "Blocked"] }).notNull(),
    status: text('Status', { length: 20, enum: ["Pending", "Accepted", "Rejected"] }).notNull(),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.userId, table.relatedUserId] }),
    };
});

export const ProductCategory = sqliteTable('ProductCategory', {
    id: text('Id', { length: 36 }).primaryKey().$defaultFn(()=> crypto.randomUUID()),
    name: text('Name', { length: 50 }),
    description: text('Description'),
    image: text('Image', { length: 100 }),
    createdAt: text('CreatedAt').default(sql`current_timestamp`),
})

export const ProductCategoryRelations = sqliteTable('ProductCategoryRelations', {
    productId: text('ProductId', { length: 36 }).references(()=> Product.id),
    categoryId: text('CategoryId', { length: 36 }).references(()=> ProductCategory.id),
},(table)=>{return{
    pk: primaryKey({columns: [table.productId, table.categoryId]}),
}})

export const CartProductsRelations = sqliteTable('CartProductsRelations', {
    cartId: text('CartId', { length: 36 }).references(()=> Cart.id),
    productId: text('ProductId', { length: 36 }).references(()=> Product.id),
    quantity: integer('Quantity'),
    price: integer('Price'),
},(table)=>{return{
    pk: primaryKey({columns: [table.cartId, table.productId]}),
}})

export const Cart = sqliteTable('Cart', {
    id: text('Id', { length: 36 }).primaryKey().$defaultFn(()=> crypto.randomUUID()),
    userId: text('UserId', { length: 36 }).references(()=> User.id),
})

export const Order = sqliteTable('Order', {
    id: text('Id', { length: 36 }).primaryKey().$defaultFn(()=> crypto.randomUUID()),
    cartId: text('CartId', { length: 36 }).references(()=> Cart.id),
    orderDate: text('OrderDate').default(sql`current_timestamp`),
    status: text('Status', {length: 20, enum: ["Pending", "Processing", "Delivered", "Cancelled"]}).notNull(),
    totalAmount: integer('TotalAmount'),
    shippingAddress: text('ShippingAddress'),
    userId: text('UserId', { length: 36 }).references(()=> User.id),
    createdAt: text('CreatedAt').default(sql`current_timestamp`),
})

export const Voucher = sqliteTable('Voucher', {
    id: text('Id', { length: 36 }).primaryKey().$defaultFn(()=> crypto.randomUUID()),
    type: text('Type', {length: 20, enum: ["Percentage", "Fixed"]}).notNull(),
    code: text('Code', { length: 20 }),
    discount: integer('Discount'),
})

export const VoucherRules = sqliteTable('VoucherRules', {
    id: text('Id', { length: 36 }).primaryKey().$defaultFn(()=> crypto.randomUUID()),
    voucherId: text('VoucherId', { length: 36 }).references(()=> Voucher.id),
    dataType: text('DataType', {length: 20, enum: ["Date", "Amount"]}).notNull(),
    value1: text('Value1'),
    value2: text('Value2'),
})

export const VoucherProductRelations = sqliteTable('VoucherProductRelations', {
    voucherId: text('VoucherId', { length: 36 }).references(()=> Voucher.id),
    productId: text('ProductId', { length: 36 }).references(()=> Product.id),
},(table)=>{return{
    pk: primaryKey({columns: [table.voucherId, table.productId]}),
}})

export const UserVoucherRelations = sqliteTable('UserVoucherRelations', {
    userId: text('UserId', { length: 36 }).references(()=> User.id),
    voucherId: text('VoucherId', { length: 36 }).references(()=> Voucher.id),
    status: text('Status', {length: 20, enum: ["Active", "Used", "Expired"]}).notNull(),
    createdAt: text('CreatedAt').default(sql`current_timestamp`),
    expiredAt: text('ExpiredAt'),
},(table)=>{return{
    pk: primaryKey({columns: [table.userId, table.voucherId]}),
}})