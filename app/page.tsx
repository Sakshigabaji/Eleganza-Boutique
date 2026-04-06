"use client";

import { useState } from "react";
import { Heart, ShoppingCart, CheckCircle } from "lucide-react";
import { useCart } from "./context/CartContext";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "600"] });

// --- PRODUCT DATA ---
const rings = [
  { id: 1, name: "Diamond Solitaire Ring", price: "12,999", image: "/images/ring_1.jpg" },
  { id: 2, name: "Rose Gold Band", price: "19,499", image: "/images/ring_2.jpg" },
  { id: 3, name: "Emerald Cut Ring", price: "15,999", image: "/images/ring_3.jpg" },
  { id: 4, name: "Gold Halo Ring", price: "16,999", image: "/images/ring_4.jpg" }
];

const necklaces = [
  { id: 5, name: "Diamond Pearl Drop", price: "18,999", image: "/images/neck_1.jpg" },
  { id: 6, name: "Butterfly Gold Chain", price: "15,999", image: "/images/neck_2.jpg" },
  { id: 7, name: "Multilayer Pearl", price: "19,999", image: "/images/neck_3.jpg" },
  { id: 8, name: "Solitaire Pearl", price: "19,999", image: "/images/neck_4.jpg" }
];

const bracelets = [
  { id: 9, name: "Elegant Gold Knot", price: "1,499", image: "/images/bracelate_1.jpg" },
  { id: 10, name: "Sleek Diamond Bangle", price: "1,399", image: "/images/bracelate_2.jpg" },
  { id: 11, name: "Infinite Love Bracelet", price: "1,699", image: "/images/bracelate_3.jpg" },
  { id: 12, name: "Ruby Heart Charm", price: "1,999", image: "/images/bracelate_4.jpg" }
];

const earrings = [
  { id: 13, name: "Spark Diamond Earrings", price: "1,299", image: "/images/earrings_1.webp" },
  { id: 14, name: "Twist Diamond Studs", price: "1,499", image: "/images/earring_2.jpg" },
  { id: 15, name: "Soft Glow Pearl Drops", price: "1,499", image: "/images/earring_3.jpg" },
  { id: 16, name: "Rose Luxe Pearl Studs", price: "1,599", image: "/images/earring_4.jpg" }
];

const allProducts = [...rings, ...necklaces, ...bracelets, ...earrings];

// --- PRODUCT CARD COMPONENT ---
const ProductCard = ({ product }: { product: any }) => {
  const { addToCart, addToWishlist, wishlist } = useCart();
  const isWishlisted = wishlist?.some((item: any) => item.id === product.id);

  return (
    <div className="group relative">
      <button
        onClick={() => addToWishlist(product)}
        className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm p-2.5 rounded-full shadow-sm hover:bg-white transition-all"
      >
        <Heart size={18} className={isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400 group-hover:text-[#C9A227]"} />
      </button>

      <div className="relative overflow-hidden rounded-2xl bg-white border border-[#C9A227]/10 group-hover:border-[#C9A227]/40 transition-all duration-500 shadow-sm hover:shadow-2xl">
        <div className="h-[320px] md:h-[400px] overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        </div>
        
        <div className="p-6 text-center">
          <h3 className={`${playfair.className} text-xl text-[#311B14] mb-2 tracking-tight`}>{product.name}</h3>
          <p className="text-[#C9A227] font-semibold text-lg mb-5">₹{product.price}</p>
          <button
            onClick={() => {
              console.log("Adding to cart:", product.name);
              addToCart(product);
            }}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-black bg-[#C9A227] hover:bg-[#f5d76e] transition-all duration-300 shadow-md active:scale-95"
          >
            <ShoppingCart size={14} /> Add To Collection
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN HOME COMPONENT ---
export default function Home() {
  const { cartMessage } = useCart();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    const filtered = allProducts.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setResults(filtered);
    setTimeout(() => document.getElementById("searchResults")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <main className={`${montserrat.className} bg-[#FDFBF7] text-[#311B14]`}>
      
      {/* --- SUCCESS TOAST --- */}
      {cartMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-black text-[#C9A227] px-8 py-4 rounded-full shadow-2xl animate-bounce border border-[#C9A227]/50">
          <CheckCircle size={20} />
          <span className="text-sm font-bold tracking-widest uppercase">{cartMessage}</span>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] flex items-center justify-center text-center text-white bg-black overflow-hidden">
        <img src="/images/hero_1.png" className="absolute w-full h-full object-cover opacity-60" alt="Hero" />
        <div className="relative z-10 px-6 max-w-4xl">
          <span className="uppercase tracking-[0.4em] text-xs font-semibold mb-4 block">Handcrafted Legacies</span>
          <h1 className={`${playfair.className} text-7xl md:text-9xl text-[#C9A227] mb-6 drop-shadow-2xl`}>Eleganza</h1>
          <form onSubmit={handleSearch} className="flex justify-center">
            <div className="flex bg-white/10 backdrop-blur-xl rounded-full p-2 border border-white/20 w-full max-w-[500px]">
              <input 
                type="text" value={search} onChange={(e) => setSearch(e.target.value)} 
                placeholder="Find your signature piece..." 
                className="flex-1 bg-transparent px-6 py-2 outline-none text-white" 
              />
              <button className="bg-[#C9A227] text-black px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest">Search</button>
            </div>
          </form>
        </div>
      </section>

      {/* --- SEARCH RESULTS --- */}
      {results.length > 0 && (
        <section id="searchResults" className="py-24 px-6 md:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className={`${playfair.className} text-5xl text-[#311B14] mb-12 border-b border-[#C9A227]/20 pb-6`}>Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {results.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
            <button onClick={() => setResults([])} className="mt-10 text-[#C9A227] border-b border-[#C9A227] uppercase text-xs font-bold tracking-widest">Clear Results</button>
          </div>
        </section>
      )}

      {/* --- CATEGORY SECTIONS --- */}
      {[
        { id: "rings", title: "Bespoke Rings", products: rings },
        { id: "necklaces", title: "Timeless Necklaces", products: necklaces },
        { id: "bracelets", title: "Exquisite Bracelets", products: bracelets },
        { id: "earrings", title: "Radiant Earrings", products: earrings }
      ].map((section) => (
        <section key={section.id} id={section.id} className="py-24 px-6 md:px-16">
          <div className="max-w-7xl mx-auto">
            <h2 className={`${playfair.className} text-5xl text-[#311B14] mb-12 border-b border-[#C9A227]/20 pb-6`}>{section.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {section.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-32 bg-[#F8F5F0] px-6 md:px-20 overflow-hidden border-t border-[#C9A227]/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
             <div className="absolute -inset-4 border border-[#C9A227]/20 rounded-3xl translate-x-2 translate-y-2"></div>
             <div className="relative border border-[#C9A227]/20 p-4 rounded-2xl bg-white">
               <img src="/images/hero.png" className="rounded-xl shadow-2xl w-full h-[650px] object-cover" alt="Artisan Craft" />
             </div>
             <div className="absolute -bottom-10 -right-10 hidden md:block bg-white p-8 shadow-2xl rounded-xl border-l-8 border-[#C9A227] max-w-[300px]">
               <p className={`${playfair.className} text-[#311B14] text-xl italic leading-relaxed`}>
                 "Jewelry is a piece of art that tells your story without a single word."
               </p>
            </div>
          </div>
          
          <div className="space-y-10">
            <span className="text-[#C9A227] uppercase tracking-[0.4em] text-sm font-bold">The Heritage</span>
            <h2 className={`${playfair.className} text-6xl text-[#311B14] leading-tight`}>Defining Modern <br /> Luxury House</h2>
            <p className="text-xl leading-relaxed text-gray-600 font-light italic border-l-2 border-[#C9A227] pl-6">
              Founded on the principles of artistic vision and uncompromising quality, Eleganza creates jewelry for those who appreciate the narrative behind the glow. 
            </p>
            <p className="text-lg leading-relaxed text-gray-500">
              Every diamond is hand-selected, every gold band meticulously polished. We blend traditional craftsmanship with contemporary lines to ensure your pieces aren't just accessories, but heirlooms.
            </p>
            <div className="flex gap-10 pt-4">
              <div>
                <p className="text-3xl text-[#C9A227] font-serif">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Pure Gold</p>
              </div>
              <div>
                <p className="text-3xl text-[#C9A227] font-serif">Hand</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Crafted</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}