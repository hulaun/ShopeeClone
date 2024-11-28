import { useEffect, useState } from "react";
import { publicGet } from "../../../../../utils/httpRequest";
import { useNavigate } from "react-router-dom";
import config from "../../../../../config";

function SuggestedProducts() {
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await publicGet({ path: "/product" });
        setSuggestedProducts(response.data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <h2 className="px-5 text-2xl py-4 border-secondary border-b-4 uppercase text-center text-primary">
        Gợi ý hôm nay
      </h2>
      <div className="bg-grey-100 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-3 p-3">
        {suggestedProducts.map((product) => (
          <Product key={product.id} {...product} />
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
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        console.log("product", product);
        navigate("consumer/view-product/" + product.id);
      }}
      className="h-80 flex flex-col bg-white border border-grey-200"
    >
      <img
        // src={product.productPicture}
        src="https://picsum.photos/200/300"
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
