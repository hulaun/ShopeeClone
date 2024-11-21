import { useParams } from "react-router-dom";
import HomeFooter from "./components/HomeFooter";
import { useEffect, useRef, useState, React } from "react";
import { privateGet } from "../../../utils/httpRequest";

function ViewProduct() {
  const [currentProduct, setCurrentProduct] = useState({});
  const params = useParams();
  useEffect(() => {
    const fetchCurrentProduct = async () => {
      const response = await privateGet(`/product/${params.id}`);
      setCurrentProduct(response.data);
    }
    fetchCurrentProduct();
  },[]);
  return (
    <div className="bg-grey-100">
      <div className="lg:px-64 py-2">
        <div className="lg:mx-4 my-2 bg-white rounded-md flex p-4 gap-12">
          <section>
            <img src="https://picsum.photos/440/440" alt="" />
          </section>
          <section>
            <div>
              <h1 className="text-2xl">{currentProduct.name}</h1>
              <p>{currentProduct.description}</p>
              <p>{currentProduct.price}</p>
            </div>
          </section>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default ViewProduct;
