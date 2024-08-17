import { useState } from "react";

function ProductCategory() {
  const [productCategory, setProductCategory] = useState([
    {
      name: "Clothing",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Shoes",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Accessories",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Bags",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jewelry",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Watches",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Phones",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Laptops",
      image: "https://via.placeholder.com/150",
    },
  ]);

  return (
    <div className="bg-white">
      <h2 className="px-5 text-2xl py-4 border-grey-100 border-b-2">
        Danh Mục
      </h2>
      <div className="py-3 grid grid-rows-2 grid-flow-col justify-start">
        {productCategory.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center border border-grey-100 w-32"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-24 h-24 object-cover rounded-full"
            />
            <p className="mt-2">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCategory;
