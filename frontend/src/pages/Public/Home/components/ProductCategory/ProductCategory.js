import { useEffect, useState } from "react";
import { publicGet } from "../../../../../utils/httpRequest";
function ProductCategory() {
  const [productCategory, setProductCategory] = useState([]);

  useEffect(() => {
    const fetchProductCategory = async () => {
      try {
        const response = await publicGet("/product-category");
        setProductCategory(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductCategory();
  }, []);

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
              alt={category.image}
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
