"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [myDesigns, setMyDesigns] = useState<any[]>([]);
  const [cartMessage, setCartMessage] = useState("");
  
  // New state for Buyer Profile compatibility
  const [purchasedItems, setPurchasedItems] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCart((prev: any[]) => {
      const existing = prev.find((item: any) => item.id === product.id);

      if (existing) {
        return prev.map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    setCartMessage(`${product.name} added to cart`);
    setTimeout(() => setCartMessage(""), 2000);
  };

  const increaseQty = (id: any) => {
    setCart((prev: any[]) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decreaseQty = (id: any) => {
    setCart((prev: any[]) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      if ((item.quantity || 1) <= 1) {
        return prev.filter((i) => i.id !== id);
      }
      return prev.map((i) =>
        i.id === id ? { ...i, quantity: (i.quantity || 1) - 1 } : i
      );
    });
  };

  const addToWishlist = (product: any) => {
    setWishlist((prev: any) => {
      const exists = prev.find((item: any) => item.id === product.id);
      if (exists) return prev.filter((item: any) => item.id !== product.id); 
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: any) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const addDesign = (design: any) => {
    setMyDesigns((prev) => [...prev, design]);
  };

  // --- NEW CODE START ---
  
  // This fixes the "removeDesign is not a function" error
  const removeDesign = (id: any) => {
    setMyDesigns((prev) => prev.filter((design) => design.id !== id));
  };

  // Optional: Function to simulate a purchase
  const clearCartAndPurchase = () => {
    setPurchasedItems((prev) => [...prev, ...cart]);
    setCart([]);
  };

  // --- NEW CODE END ---

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        user,
        setUser,
        addToCart,
        addToWishlist,
        addDesign,
        removeDesign, // Exporting the new function
        removeFromWishlist,
        increaseQty,
        decreaseQty,
        cartMessage,
        myDesigns,
        purchasedItems, // Exporting for Buyer Profile
        clearCartAndPurchase,
        cartCount: cart.reduce((acc, item) => acc + (item.quantity || 1), 0),
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);