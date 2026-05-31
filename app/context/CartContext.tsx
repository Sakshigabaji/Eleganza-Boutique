"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [myDesigns, setMyDesigns] = useState<any[]>([]);
  const [cartMessage, setCartMessage] = useState("");
  const [purchasedItems, setPurchasedItems] = useState<any[]>([]);

  // ─── Load cart & wishlist from MongoDB when userId exists ────────────────
  // Fix: Navbar / cart badges were not updating reliably because cart/wishlist
  // were only loaded when `user` state changed. Instead, load on mount and
  // whenever localStorage.userId becomes available.
  useEffect(() => {
    const loadIfPossible = async () => {
      const userIdFromStorage = localStorage.getItem("userId");
      if (!userIdFromStorage) return;
      await Promise.all([
        loadCartFromDB(userIdFromStorage),
        loadWishlistFromDB(userIdFromStorage),
      ]);
    };

    // Initial load
    void loadIfPossible();

    // If userId changes (e.g. login in another tab / after redirect), update.
    const onStorage = (e: StorageEvent) => {
      if (e.key === "userId") {
        void loadIfPossible();
      }
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCartFromDB = async (userId: string) => {

    try {
      const res = await fetch(`/api/cart?userId=${userId}`);
      if (!res.ok) return;
      const items = await res.json();
      // Map DB items to local format
      const mapped = items.map((item: any) => ({
        id: item.productId,
        _cartId: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      }));
      setCart(mapped);
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  };

  const loadWishlistFromDB = async (userId: string) => {
    try {
      const res = await fetch(`/api/wishlist?userId=${userId}`);
      if (!res.ok) return;
      const items = await res.json();
      const mapped = items.map((item: any) => ({
        id: item.productId,
        _wishlistId: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
      }));
      setWishlist(mapped);
    } catch (err) {
      console.error("Failed to load wishlist:", err);
    }
  };

  // ─── Add to Cart ──────────────────────────────────────────────────────────
  const addToCart = async (product: any) => {
    const userId = localStorage.getItem("userId");

    // Save to MongoDB if logged in
    if (userId) {
      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          }),
        });
        // Reload from DB to get fresh data
        await loadCartFromDB(userId);
      } catch (err) {
        console.error("Failed to add to cart:", err);
      }
    } else {
      // Not logged in — save to local state only
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
    }

    setCartMessage(`${product.name} added to cart`);
    setTimeout(() => setCartMessage(""), 2000);
  };

  // ─── Increase Quantity ────────────────────────────────────────────────────
  const increaseQty = async (id: any) => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      try {
        await fetch("/api/cart", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, productId: id, action: "increase" }),
        });
        await loadCartFromDB(userId);
      } catch (err) {
        console.error("Failed to increase qty:", err);
      }
    } else {
      setCart((prev: any[]) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        )
      );
    }
  };

  // ─── Decrease Quantity ────────────────────────────────────────────────────
  const decreaseQty = async (id: any) => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      try {
        await fetch("/api/cart", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, productId: id, action: "decrease" }),
        });
        await loadCartFromDB(userId);
      } catch (err) {
        console.error("Failed to decrease qty:", err);
      }
    } else {
      setCart((prev: any[]) => {
        const item = prev.find((i) => i.id === id);
        if (!item) return prev;
        if ((item.quantity || 1) <= 1) return prev.filter((i) => i.id !== id);
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: (i.quantity || 1) - 1 } : i
        );
      });
    }
  };

  // ─── Add to Wishlist ──────────────────────────────────────────────────────
  const addToWishlist = async (product: any) => {
    const userId = localStorage.getItem("userId");
    const alreadyInWishlist = wishlist.find((item: any) => item.id === product.id);

    if (userId) {
      try {
        if (alreadyInWishlist) {
          // Remove from wishlist
          await fetch("/api/wishlist", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ wishlistItemId: alreadyInWishlist._wishlistId }),
          });
        } else {
          // Add to wishlist
          await fetch("/api/wishlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            }),
          });
        }
        await loadWishlistFromDB(userId);
      } catch (err) {
        console.error("Failed to update wishlist:", err);
      }
    } else {
      // Not logged in — local state only
      setWishlist((prev: any) => {
        const exists = prev.find((item: any) => item.id === product.id);
        if (exists) return prev.filter((item: any) => item.id !== product.id);
        return [...prev, product];
      });
    }
  };

  // ─── Remove from Wishlist ─────────────────────────────────────────────────
  const removeFromWishlist = async (id: any) => {
    const userId = localStorage.getItem("userId");
    const item = wishlist.find((i: any) => i.id === id);

    if (userId && item?._wishlistId) {
      try {
        await fetch("/api/wishlist", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wishlistItemId: item._wishlistId }),
        });
        await loadWishlistFromDB(userId);
      } catch (err) {
        console.error("Failed to remove from wishlist:", err);
      }
    } else {
      setWishlist((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // ─── Designs ──────────────────────────────────────────────────────────────
  const addDesign = (design: any) => {
    setMyDesigns((prev) => [...prev, design]);
  };

  const removeDesign = (id: any) => {
    setMyDesigns((prev) => prev.filter((design) => design.id !== id));
  };

  // ─── Purchase ─────────────────────────────────────────────────────────────
  const clearCartAndPurchase = async () => {
    const userId = localStorage.getItem("userId");
    setPurchasedItems((prev) => [...prev, ...cart]);

    if (userId) {
      try {
        await fetch("/api/cart/clear", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
      } catch (err) {
        console.error("Failed to clear cart:", err);
      }
    }
    setCart([]);
  };

  // ─── Logout — clear local state ───────────────────────────────────────────
  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
  };

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
        removeDesign,
        removeFromWishlist,
        increaseQty,
        decreaseQty,
        cartMessage,
        myDesigns,
        purchasedItems,
        clearCartAndPurchase,
        logout, // ← new: use this on logout button
        cartCount: cart.reduce((acc, item) => acc + (item.quantity || 1), 0),
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);