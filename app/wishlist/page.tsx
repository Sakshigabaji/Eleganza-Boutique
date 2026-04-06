"use client";

import { useCart } from "@/app/context/CartContext";
import { ShoppingCart, Trash2, Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "600"] });

export default function WishlistPage() {
  const { wishlist, addToCart, removeFromWishlist } = useCart();

  return (
    <div className={`${montserrat.className} min-h-screen bg-[#FDFBF7] pt-32 pb-20 px-6 relative overflow-hidden`}>
      
      {/* LUXURY BACKGROUND OVERLAYS */}
      <div className="absolute w-[600px] h-[600px] bg-[#C9A227]/10 blur-[120px] rounded-full -top-40 -left-40 pointer-events-none"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#C9A227]/10 blur-[120px] rounded-full bottom-0 right-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <span className="text-[#C9A227] uppercase tracking-[0.3em] text-xs font-bold mb-3 block">
            Your Curated Collection
          </span>
          <h1 className={`${playfair.className} text-5xl md:text-6xl text-[#311B14]`}>
            My Wishlist
          </h1>
          <div className="w-24 h-[1px] bg-[#C9A227] mx-auto mt-8"></div>
        </div>

        {wishlist.length === 0 ? (
          /* ELEGANT EMPTY STATE */
          <div className="text-center bg-white/50 backdrop-blur-md p-16 rounded-3xl border border-[#C9A227]/20 max-w-2xl mx-auto shadow-xl">
            <div className="w-20 h-20 bg-[#F8F5F0] rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={32} className="text-[#C9A227] opacity-40" />
            </div>
            <h2 className={`${playfair.className} text-3xl text-[#311B14] mb-4`}>
              Your collection is empty
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed">
              Discover our timeless pieces and save your favorites here <br /> to create your dream jewelry set.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-[#311B14] text-[#C9A227] px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#C9A227] hover:text-black transition-all duration-500"
            >
              <ArrowLeft size={16} /> Continue Browsing
            </Link>
          </div>
        ) : (
          /* WISHLIST GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {wishlist.map((item: any) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#C9A227]/10 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* IMAGE CONTAINER */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={item.image} // Changed from item.img to item.image to match Home data
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-lg"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* CONTENT CONTAINER */}
                <div className="p-6 text-center">
                  <h3 className={`${playfair.className} text-xl text-[#311B14] mb-2`}>
                    {item.name}
                  </h3>
                  <p className="text-[#C9A227] font-semibold text-lg mb-6">
                    {item.price}
                  </p>

                  <button
                    onClick={() => addToCart(item)}
                    className="w-full flex items-center justify-center gap-3 bg-[#311B14] text-[#C9A227] py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#C9A227] hover:text-black transition-all duration-300 shadow-md"
                  >
                    <ShoppingCart size={16} />
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}