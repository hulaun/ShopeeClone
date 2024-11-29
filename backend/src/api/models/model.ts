export type UserModel = {
    id: string;
    username: string | null;
    password: string | null;
    salt: string | null;
    email: string | null;
    profilePicture: string | null;
    fullName: string | null;
    gender: "M" | "F" | "O" | null;
    address: string | null;
    phoneNumber: string | null;
    dob: string | null;
    role: "Admin" | "Consumer" | "Vendor";
    status: "Active" | "Inactive" | "Blocked" | null;
    createdAt: string | null;
};
export type VendorExtraModel = {
    userId: string;
    status: "Pending" | "Rejected" | "Approved" | null;
};

export type ChatRoomModel = {
    id: string;
    name: string | null;
    createdAt: string | null;
    type: "Private" | "Public";
};

export type ChatRoomUserRelationsModel = {
    chatRoomId: string;
    userId: string;
    userRole: "Admin" | "Member";
    lastSeenAt: string | null;
    jointAt: string | null;
};

export type MessagesModel = {
    id: string;
    chatRoomId: string | null;
    senderId: string | null;
    content: string | null;
    createdAt: string | null;
    status: "Sent" | "Delivered" | "Read";
};

export type UserRelationshipModel = {
    userId: string;
    relatedUserId: string;
    relationshipType: "Friend" | "Blocked";
    status: "Pending" | "Accepted" | "Rejected";
};

export type CartModel = {
    id: string;
    userId: string | null;
};

export type ShopModel = {
    id: string;
    name: string | null;
    description: string | null;
    shopAddress: string | null;
    phoneNumber: string | null;
    shopPicture: string | null;
    createdAt: string | null;
    ownerId: string | null;
};

export type VendorShopRelationsModel = {
    userId: string;
    shopId: string;
};

export type ProductModel = {
    id: string;
    name: string | null;
    description: string | null;
    price: number | null;
    discount: number | null;
    productPicture: string | null;
    createdAt: string | null;
    shopId: string | null;
};

export type ProductCategoryModel = {
    id: string;
    name: string | null;
    description: string | null;
    createdAt: string | null;
};

export type ProductCategoryRelationsModel = {
    productId: string;
    categoryId: string;
};

export type CartProductsRelationsModel = {
    orderId: string;
    productId: string;
    quantity: number | null;
};

export type OrderModel = {
    id: string;
    orderDate: string | null;
    status: "Pending" | "Processing" | "Delivered" | "Cancelled";
    totalAmount: number | null;
    userId: string | null;
    createdAt: string | null;
};

export type VoucherModel = {
    id: string;
    type: "Percentage" | "Fixed";
    code: string | null;
    discount: number | null;
};

export type VoucherRulesModel = {
    id: string;
    voucherId: string | null;
    dataType: "Date" | "Amount";
    value1: string | null;
    value2: string | null;
};

export type UserVoucherRelationsModel = {
    userId: string;
    voucherId: string;
    status: "Active" | "Used" | "Expired";
    createdAt: string | null;
    expiredAt: string | null;
};