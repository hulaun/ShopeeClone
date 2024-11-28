import { db } from "../../config/db";
import { Shop, Product, ProductCategory, ProductCategoryRelations } from "../../../db/schema";
import { ProductCategoryModel, ProductModel, ShopModel } from "../models/model";
import { eq } from "drizzle-orm";
const faker =require("faker");

// Function to generate random shop data
function generateRandomShop(ownerId: string) {
  return {
    name: faker.company.companyName(),
    description: faker.lorem.sentence(),
    shopAddress: faker.address.streetAddress(),
    phoneNumber: faker.phone.phoneNumber(),
    shopPicture: faker.image.imageUrl(),
    ownerId: ownerId,
  };
}

// Function to generate random product data
function generateRandomProduct(shopId: string) {
  return {
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    price: faker.commerce.price(10000, 1000000),
    discount: faker.datatype.number({ min: 0, max: 50 }),
    productPicture: faker.image.imageUrl(),
    shopId: shopId,
  };
}

// Function to generate random product category data
function generateRandomProductCategory() {
  return {
    name: faker.commerce.department(),
    description: faker.lorem.sentence(),
    image: faker.image.imageUrl(),
  };
}

async function insertProductCategoryRelationsIntoDb(productId: string, categoryId: string) {
  try {
    console.log("Inserting product category:", productId, categoryId);
    await db.insert(ProductCategoryRelations).values({ productId, categoryId }).run();
  } catch (error) {
    console.error("Error inserting product categories:", error);
  }
}

// Function to insert shops into the database
async function insertShopsIntoDb(shops: any[]) {
  try {
    const shopIds = [];
    for (const shop of shops) {
      console.log("Inserting shop:", shop);
      const id = await db.insert(Shop).values({ ...shop }).returning({ id: Shop.id });
      shopIds.push(id[0].id);
    }
    return shopIds;
  } catch (error) {
    console.error("Error inserting shops:", error);
  }
}

// Function to insert products into the database
async function insertProductsIntoDb(products: any[]) {
  try {
    const productIds = [];
    for (const product of products) {
      console.log("Inserting product:", product);
      const id = await db.insert(Product).values({ ...product }).returning({ id: Product.id });
      productIds.push(id[0].id);
    }
    return productIds;
  } catch (error) {
    console.error("Error inserting products:", error);
  }
}

// Function to insert product categories into the database
async function insertProductCategoriesIntoDb(categories: any[]) {
  try {
    const categoryIds = [];
    for (const category of categories) {
      console.log("Inserting product category:", category);
      const id = await db.insert(ProductCategory).values({ ...category }).returning({ id: ProductCategory.id });
      categoryIds.push(id[0].id);
    }
    return categoryIds;
  } catch (error) {
    console.error("Error inserting product categories:", error);
  }
}

// Function to generate and insert seed data for shops, products, and product categories
async function generateAndInsertSeedData() {
  const shops = Array.from({ length: 4 }, ()=>{return generateRandomShop("e87a65d2-a1d2-40c9-a333-eee1ec300bd3")});
  const categories = Array.from({ length: 10 }, generateRandomProductCategory);

  const shopIds = await insertShopsIntoDb(shops);
  const categoryIds = await insertProductCategoriesIntoDb(categories);

  const products:any[] = [];
  shopIds?.forEach((shopId) =>{
    products.push(...(Array.from({ length:10},()=>{
      return generateRandomProduct(shopId)
    })))
  });

  const productIds = await insertProductsIntoDb(products);

  productIds?.forEach((productId) => {
    if (categoryIds) {
      const numberOfCategories = faker.datatype.number({ min: 1, max: categoryIds.length });
      const selectedCategories:any[] = faker.helpers.shuffle(categoryIds).slice(0, numberOfCategories);
      selectedCategories.forEach((categoryId) => {
        insertProductCategoryRelationsIntoDb(productId, categoryId);
      });
    }
  });
  console.log("Seed data generated and inserted successfully");
}

async function modifyThePriceInProduct(){
  try{
    const products:ProductModel[] = await db.select().from(Product);
    for(const product of products){
      const newPrice = product.price?product.price/25344:100000;
      await db.update(Product).set({price: newPrice}).where(eq(Product.id, product.id)).run();
    }
  }catch(error){
    console.error("Error modifying the price in product:", error);
  }
}

module.exports = {
  generateRandomShop,
  generateRandomProduct,
  generateRandomProductCategory,
  insertShopsIntoDb,
  insertProductsIntoDb,
  insertProductCategoriesIntoDb,
  generateAndInsertSeedData,
  modifyThePriceInProduct,
};