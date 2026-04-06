"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { Playfair_Display, Montserrat } from "next/font/google";
import {
  Heart,
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard
} from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"]
});

export default function Navbar() {
  const { cartCount, wishlistCount, user, setUser, cartMessage } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Handle Navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setProfileOpen(false);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
    setMobileOpen(false);
  };

  // Logic to determine profile path
  const profilePath = user?.role === "designer" ? "/profile/designer" : "/profile/buyer";

  return (
    <nav
      className={`${montserrat.className} fixed top-0 w-full z-50 backdrop-blur-xl transition-all duration-500 ${
        scrolled ? "bg-black/80 py-3 shadow-lg" : "bg-transparent py-6"
      } border-b border-[#C9A227]/50`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className={`${playfair.className} text-3xl md:text-4xl tracking-[0.2em] text-[#C9A227] hover:opacity-80 transition-opacity`}
        >
          ELEGANZA
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">
          {["rings", "necklaces", "bracelets", "earrings"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="group relative text-[#C9A227] text-sm uppercase tracking-widest font-medium transition duration-300"
            >
              {item}
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#C9A227] transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* ICONS & ACTIONS */}
        <div className="flex items-center gap-6 text-[#C9A227]">
          {/* WISHLIST */}
          <Link href="/wishlist" className="relative group">
            <Heart size={22} className="group-hover:scale-110 transition-transform" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C9A227] text-black text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* CART */}
          <Link href="/cart" className="relative group">
            <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C9A227] text-black text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* USER PROFILE DROPDOWN */}
          <div className="relative h-fit" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-1 group hover:text-white transition-colors"
            >
              <User size={22} className="group-hover:scale-110 transition-transform" />
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`absolute right-0 mt-6 w-60 bg-[#1a1a1a] border border-[#C9A227]/30 rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden ${
                profileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              {user ? (
                <div className="flex flex-col">
                  <div className="px-5 py-4 border-b border-white/5 bg-[#C9A227]/5">
                    <p className="text-[10px] uppercase tracking-tighter opacity-60">Authenticated {user.role}</p>
                    <p className={`${playfair.className} text-[#C9A227] text-lg truncate`}>{user.name}</p>
                  </div>
                  <Link
                    href={profilePath}
                    onClick={() => setProfileOpen(false)}
                    className="px-5 py-3 hover:bg-[#C9A227]/10 transition text-sm flex items-center gap-3"
                  >
                    <LayoutDashboard size={16} /> My Dashboard
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setProfileOpen(false)}
                    className="px-5 py-3 hover:bg-[#C9A227]/10 transition text-sm"
                  >
                    My Wishlist
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-5 py-3 text-red-400 hover:bg-red-500/10 flex items-center gap-3 border-t border-white/5 text-sm font-bold"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <div className="p-3 flex flex-col gap-2">
                  <Link
                    href="/Signup"
                    onClick={() => setProfileOpen(false)}
                    className="w-full py-3 bg-[#C9A227] text-black text-center text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-colors"
                  >
                    Create Account
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setProfileOpen(false)}
                    className="w-full py-3 text-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <button className="md:hidden text-[#C9A227]" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/95 z-[99] md:hidden transition-all duration-500 ${
          mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {["rings", "necklaces", "bracelets", "earrings"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`${playfair.className} text-[#C9A227] text-4xl capitalize`}
            >
              {item}
            </button>
          ))}
          <div className="pt-10 flex gap-10 text-[#C9A227]">
            <Link href="/cart" onClick={() => setMobileOpen(false)}>
              <ShoppingCart size={32} />
            </Link>
            <Link href="/wishlist" onClick={() => setMobileOpen(false)}>
              <Heart size={32} />
            </Link>
          </div>
        </div>
      </div>

      {/* TOAST MESSAGE */}
      {cartMessage && (
        <div className="fixed bottom-10 right-6 z-[110] animate-bounce">
          <div className="bg-[#C9A227] text-black px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
            <span className="font-bold uppercase tracking-tighter text-xs">Added to collection</span>
          </div>
        </div>
      )}
    </nav>
  );
}