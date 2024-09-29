export type UserModel = {
    id: string;
    username: string | null;
    password: string | null;
    salt: string | null;
    email: string | null;
    profilePicture: string | null;
    fullName: string | null;
    gender: "M" | "F" | "O" | null;
    userAddress: string | null;
    phoneNumber: string | null;
    role: "Admin" | "Consumer" | "Vendor";
    createdAt: string | null;
};
export type VendorExtraModel = {
    userId: string;
};

export type CartModel = {
    id: string;
    userId: string | null;
    createdAt: string | null;
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