import HomeFooter from "./components/HomeFooter";
import { useEffect, useRef, useState, React } from "react";
import { privateGet, privatePost } from "../../../utils/httpRequest";

function ViewProduct() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cart = sessionStorage.getItem("cart");
    console.log(cart);
    const fetchCart = async() => {
      try {
        const response = await privateGet({path:'/cart/'+cart});
        setCart(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCart();
    
  }, []);

  const handleCheckout = () => {
    const createOrder = async() => {
      try {
        const response = await privatePost({path:'/order/create_payment_url',
          data: {
            cartId: sessionStorage.getItem("cart"),
            amount: cart.reduce((acc, product) => acc + product.price, 0)
          },
          headers: {
            'Access-Control-Allow-Credentials': true,
          }
        });
        console.log(response.data);
        window.location.href = response.data.url
      } catch (error) {
        console.log(error);
      }
    }
    createOrder();
  }

  return (
    <div className="bg-grey-100">
      <div className="lg:px-64 py-2">
        <div className="lg:mx-4 my-2 bg-white rounded-md flex p-4 gap-12">
          {cart.length === 0 ? (
            <div className="text-center w-full">Cart is empty</div>
          ) : (
            <div className="w-3/4">
              <div className="text-xl font-bold">Cart</div>
              <div className="mt-4">
                {cart.map((product) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <img src={product.image} alt="Product" className="w-20 h-20 object-cover" />
                    <div>
                      <div>{product.name}</div>
                      <div>{product.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default ViewProduct;
