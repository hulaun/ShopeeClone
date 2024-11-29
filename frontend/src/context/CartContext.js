import React, { useContext, useState } from "react";

const CartContext = React.createContext();

export function useNotification() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}
