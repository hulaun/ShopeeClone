import { useState } from "react";

function SuggestedProducts() {
  const [SuggestedProducts, setSuggestedProducts] = useState([
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
      <h2 className="px-5 text-2xl py-4 border-secondary border-b-4 uppercase text-center text-primary">
        Gợi ý hôm nay
      </h2>
      <div className="grid grid-cols-4 gap-4 p-5">
        {SuggestedProducts.map((product) => (
          <Product key={product.name} {...product} />
        ))}
      </div>
    </div>
  );
}

function Product(product) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-cover"
      />
      <p className="text-center mt-2">{product.name}</p>
    </div>
  );
}

export default SuggestedProducts;
