import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  

  const fetchCartCount = () => {
    fetch("http://localhost:8000/api/cart/", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setCartCount(data.count || 0);
      })
      .catch(() => setCartCount(0));
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
}


export const useCart = () => useContext(CartContext);