import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const fetchCartCount = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/cart/`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch cart count");

      const data = await res.json();
      setCartCount(data.count || 0);
    } catch (err) {
      console.error("Failed to load cart count", err);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, [API_BASE]);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
