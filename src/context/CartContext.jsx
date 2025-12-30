import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  
  

  const fetchCartCount = () => {
    fetch(`${API_BASE}/api/cart/`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setCartCount(data.items?.length || 0);
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