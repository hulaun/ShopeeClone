import { useParams } from "react-router-dom";
import HomeFooter from "./components/HomeFooter";
import { useEffect, useRef, useState, React } from "react";
import { privateGet, privatePost } from "../../../utils/httpRequest";
import SuggestedProducts from "./components/SuggestedProducts/SuggestedProducts";

function ViewProduct() {
  const [currentProduct, setCurrentProduct] = useState({});
  const quantityRef = useRef();
  const params = useParams();
  useEffect(() => {
    const fetchCurrentProduct = async () => {
      const response = await privateGet({path:`/product/${params.id}`});
      setCurrentProduct(response.data);
    }
    fetchCurrentProduct();
  },[]);

  const handleAddToCart = () => {
    const quantity = quantityRef.current.value;
    console.log("cart",sessionStorage.getItem('cart'))
    if(sessionStorage.getItem('cart') === null){
      const createAndAddToCart=async()=>{
        const response = await privatePost({path:`/cart/`, data:{
          product:{...currentProduct}, 
          quantity:quantity
        }});
        if(response.status === 201){
          sessionStorage.setItem('cart', response.data.cartId);
        }
      }
      createAndAddToCart();
    }else{
      const addToCart = async()=>{
        const response = await privatePost({path:`/cart/${sessionStorage.getItem('cart')}`, data:{
          product:{...currentProduct},
          quantity:quantity
        }});
      }
      addToCart();
    }
  }

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
              <button className="bg-primary text-white px-4 py-2 rounded-md" onClick={handleAddToCart}>Add to cart</button>
              <label htmlFor="quantity">Quantity</label>
              <input ref={quantityRef} type="number" id="quantity" min="1" max="10" className="p-2 border border-grey-300"/>
            </div>
          </section>
        </div>
        <div className="lg:mx-4"><SuggestedProducts/></div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default ViewProduct;
