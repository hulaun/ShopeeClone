import { useState } from "react";

function SuggestedProducts() {
  const [SuggestedProducts, setSuggestedProducts] = useState([
    {
      id: 1,
      name: "Iphone 12 Pro Max",
      image: "https://via.placeholder.com/150",
      price: 13_000_000,
      category: "Phones",
      description: "The most powerful iPhone ever",
      manufacturer: "Apple",
    },
    {
      id: 2,
      name: "Samsung Galaxy S21 Ultra",
      image: "https://via.placeholder.com/150",
      price: 12_000_000,
      category: "Phones",
      description: "The most powerful Samsung phone ever",
      manufacturer: "Samsung",
    },
    {
      id: 3,
      name: "Macbook Pro 2021",
      image: "https://via.placeholder.com/150",
      price: 40_000_000,
      category: "Laptops",
      description: "The most powerful Macbook ever",
      manufacturer: "Apple",
    },
    {
      id: 4,
      name: "Dell XPS 15",
      image: "https://via.placeholder.com/150",
      price: 30_000_000,
      category: "Laptops",
      description: "The most powerful Dell laptop ever",
      manufacturer: "Dell",
    },
    {
      id: 5,
      name: "Sony WH-1000XM4",
      image: "https://via.placeholder.com/150",
      price: 5_000_000,
      category: "Headphones",
      description: "The most powerful Sony headphones ever",
      manufacturer: "Sony",
    },
    {
      id: 6,
      name: "Airpods Pro",
      image: "https://via.placeholder.com/150",
      price: 4_000_000,
      category: "Headphones",
      description: "The most powerful Apple headphones ever",
      manufacturer: "Apple",
    },
    {
      id: 7,
      name: "Canon EOS R5",
      image: "https://via.placeholder.com/150",
      price: 60_000_000,
      category: "Cameras",
      description: "The most powerful Canon camera ever",
      manufacturer: "Canon",
    },
    {
      id: 8,
      name: "Sony A7R IV",
      image: "https://via.placeholder.com/150",
      price: 50_000_000,
      category: "Cameras",
      description: "The most powerful Sony camera ever",
      manufacturer: "Sony",
    },
    {
      id: 9,
      name: "Samsung Galaxy Watch 4",
      image: "https://via.placeholder.com/150",
      price: 7_000_000,
      category: "Watches",
      description: "The most powerful Samsung watch ever",
      manufacturer: "Samsung",
    },
    {
      id: 10,
      name: "Apple Watch Series 6",
      image: "https://via.placeholder.com/150",
      price: 8_000_000,
      category: "Watches",
      description: "The most powerful Apple watch ever",
      manufacturer: "Apple",
    },
  ]);

  return (
    <div className="bg-white">
      <h2 className="px-5 text-2xl py-4 border-secondary border-b-4 uppercase text-center text-primary">
        Gợi ý hôm nay
      </h2>
      <div className="bg-grey-100 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-3 p-3">
        {SuggestedProducts.map((product) => (
          <Product key={product.name} {...product} />
        ))}
      </div>
    </div>
  );
}

const truncateTwoLinesStyle = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
function Product(product) {
  return (
    <div className="h-80 flex flex-col bg-white border border-grey-200">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 object-cover"
      />
      <div className="h-full flex flex-col justify-between p-2">
        <div className="text-lg" style={truncateTwoLinesStyle}>
          {product.name}
        </div>
        <div className="text-primary font-bold">
          đ {product.price.toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default SuggestedProducts;
