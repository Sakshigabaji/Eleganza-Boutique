"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import { Playfair_Display, Montserrat } from "next/font/google";
import { Camera, Package, Heart, Settings, MapPin, User as UserIcon } from "lucide-react";
import Link from "next/link";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "600"] });

export default function UserProfile() {
  // Destructuring specifically for the Buyer experience
  const { user, purchasedItems, wishlistCount } = useCart();
  const [photo, setPhoto] = useState<string | null>(null);

  return (
    <div className={`${montserrat.className} min-h-screen bg-[#FDFBF7] pt-32 pb-20 px-6`}>
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER - Updated Title */}
        <div className="mb-12 border-b border-[#C9A227]/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[#C9A227] uppercase tracking-[0.3em] text-xs font-bold mb-2 block">Personal Atelier</span>
            <h1 className={`${playfair.className} text-5xl text-[#311B14]`}>Buyer Dashboard</h1>
          </div>
          <div className="flex gap-4">
             <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full text-xs uppercase tracking-widest hover:bg-[#311B14] hover:text-white transition-all">
                <Settings size={14} /> Account Settings
             </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT SIDE: PROFILE CARD */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-[#C9A227]/20 rounded-3xl p-10 shadow-sm relative overflow-hidden text-center">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A227]/5 rounded-full -mr-16 -mt-16"></div>
              
              <div className="relative flex flex-col items-center">
                {/* ELEGANT PHOTO UPLOADER */}
                <div className="relative group mb-6 inline-block">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#C9A227] p-1 bg-white shadow-xl mx-auto">
                    {photo ? (
                      <img src={photo} className="w-full h-full object-cover rounded-full" alt="Profile" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#F8F5F0] text-[#C9A227]">
                        <UserIcon size={48} strokeWidth={1} />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-[#311B14] text-[#C9A227] p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform">
                    <Camera size={16} />
                    <input type="file" className="hidden" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setPhoto(URL.createObjectURL(file));
                    }} />
                  </label>
                </div>

                {/* Updated Guest Patron to Premium Member */}
                <h3 className={`${playfair.className} text-2xl text-[#311B14] mb-1 uppercase tracking-tight`}>
                  {user?.name || "Premium Member"}
                </h3>
                <p className="text-gray-400 text-sm font-light mb-8 italic">
                  {user?.email || "Exclusive Collection Member"}
                </p>
                
                <div className="w-full grid grid-cols-2 gap-4 py-6 border-t border-gray-100">
                  <div className="text-center border-r border-gray-100">
                    <p className="text-xl font-serif text-[#C9A227]">{purchasedItems?.length || 0}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-serif text-[#C9A227]">{wishlistCount || 0}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Saved</p>
                  </div>
                </div>
              </div>

              {/* Updated Info - Platinum Tag Removed */}
              <div className="mt-4 pt-6 border-t border-gray-100 flex items-center justify-center gap-3 text-sm text-gray-500">
                <MapPin size={16} className="text-[#C9A227]" />
                <span>Mumbai, Maharashtra</span>
              </div>
            </div>

            {/* LOYALTY CARD */}
            <div className="bg-[#311B14] rounded-3xl p-8 text-[#C9A227] relative overflow-hidden">
               <div className="relative z-10">
                 <p className="text-[10px] uppercase tracking-[0.3em] mb-4 opacity-70 font-bold">Loyalty Status</p>
                 <h4 className={`${playfair.className} text-3xl mb-2 italic`}>Gold Tier</h4>
                 <p className="text-xs text-gray-400 font-light leading-relaxed">
                   Enjoy complimentary cleaning services and early access to artisanal releases.
                 </p>
               </div>
               <div className="absolute top-0 right-0 w-24 h-full bg-[#C9A227]/10 -skew-x-12"></div>
            </div>
          </div>

          {/* RIGHT SIDE: CONTENT */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-8">
              <Package size={24} className="text-[#C9A227]" />
              <h2 className={`${playfair.className} text-3xl text-[#311B14]`}>Order list</h2>
            </div>

            {purchasedItems?.length === 0 ? (
              <div className="bg-white border border-dashed border-[#C9A227]/30 rounded-[40px] p-24 text-center">
                <p className="text-gray-400 italic font-light">"The finest collections await your selection."</p>
                <Link href="/" className="mt-8 text-[#C9A227] uppercase tracking-[0.2em] text-xs font-bold border-b border-[#C9A227] pb-1 inline-block hover:text-[#311B14] hover:border-[#311B14] transition-all">
                  Browse Boutique
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {purchasedItems.map((item: any) => (
                  <div key={item.id} className="bg-white p-6 rounded-3xl flex gap-5 border border-gray-100 hover:shadow-xl transition-all">
                    <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden">
                      <img src={item.img || item.image} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div className="flex flex-col justify-center">
                       <p className="text-[10px] uppercase tracking-widest text-[#C9A227] mb-1 font-bold">Delivered</p>
                       <h4 className="font-bold text-[#311B14]">{item.name}</h4>
                       <p className="text-sm text-gray-500 font-medium">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            
            {/* WISHLIST TEASER */}
            <div className="mt-16 bg-[#F8F5F0] rounded-3xl p-10 flex items-center justify-between">
              <div>
                <h3 className={`${playfair.className} text-2xl text-[#311B14] mb-2`}>Your Favorites</h3>
                <p className="text-sm text-gray-500">You have {wishlistCount || 0} items waiting for you.</p>
              </div>
              <Link href="/wishlist" className="bg-[#C9A227] text-black w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#311B14] hover:text-[#C9A227] transition-all">
                <Heart size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}