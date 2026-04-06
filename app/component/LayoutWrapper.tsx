"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CartProvider } from "../context/CartContext";
import React from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Pages where Navbar & Footer should NOT appear
  const hideLayout =
    pathname === "/login" ||
    pathname === "/Signup" ||
    pathname.startsWith("/profile/designer");

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">

        {/* Navbar */}
        {!hideLayout && <Navbar />}

        {/* Page Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        {!hideLayout && <Footer />}

      </div>
    </CartProvider>
  );
}