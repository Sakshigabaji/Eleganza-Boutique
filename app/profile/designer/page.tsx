"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { Playfair_Display } from "next/font/google";
import { Plus, Heart, Trash2, LayoutDashboard, Sparkles, Image as ImageIcon, IndianRupee, BookmarkMinus } from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });

export default function DesignerProfile() {
  // Destructure from context - ensure these names match your CartContext exactly
  const { user, myDesigns = [], addDesign, removeDesign } = useCart();

  const [designName, setDesignName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [savedDesigns, setSavedDesigns] = useState<any[]>([]);

  const otherDesigns = [
    { id: "o1", name: "Diamond Necklace", price: "22000", img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a" },
    { id: "o2", name: "Gold Ring", price: "15000", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a" },
  ];

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!designName || !price) return;

    const newDesign = {
      id: Date.now().toString(),
      name: designName,
      price: price,
      img: image || "https://via.placeholder.com/300",
    };
    
    addDesign(newDesign);
    setDesignName(""); 
    setPrice(""); 
    setImage(null);
  };

  // Logic for Inspiration Section Buttons
  const toggleSave = (design: any) => {
    const isSaved = savedDesigns.find(s => s.id === design.id);
    if (isSaved) {
      setSavedDesigns(savedDesigns.filter(s => s.id !== design.id));
    } else {
      setSavedDesigns([...savedDesigns, design]);
    }
  };

  return (
    <div className="space-y-20">
      {/* DASHBOARD HERO */}
      <section id="dashboard">
        <header className="mb-12">
          <p className="text-[#C9A227] text-xs uppercase tracking-[0.4em] font-bold mb-4">Aesthetic Studio</p>
          <h1 className={`${playfair.className} text-6xl text-[#311B14]`}>
             {user?.name ? `${user.name}'s Studio` : "The Designer Studio"}
          </h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "My Creations", val: myDesigns.length, icon: <ImageIcon size={20} /> },
            { label: "Studio Saves", val: savedDesigns.length, icon: <Heart size={20} /> },
            { label: "Inspirations", val: otherDesigns.length, icon: <Sparkles size={20} /> },
            { label: "Reach", val: "2.4k", icon: <LayoutDashboard size={20} /> }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-[#C9A227]/10 shadow-sm flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">{stat.label}</p>
                <h3 className="text-3xl font-serif text-[#311B14]">{stat.val}</h3>
              </div>
              <div className="text-[#C9A227] bg-[#C9A227]/5 p-4 rounded-2xl">{stat.icon}</div>
            </div>
          ))}
        </div>
      </section>

      {/* UPLOAD & COLLECTIONS GRID */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* UPLOAD FORM */}
        <section id="upload" className="lg:col-span-1">
          <div className="bg-white p-10 rounded-[40px] border border-[#C9A227]/20 shadow-xl sticky top-10">
            <h2 className={`${playfair.className} text-2xl mb-8 flex items-center gap-3`}>
              <Plus size={22} className="text-[#C9A227]" /> New Design
            </h2>
            <form onSubmit={handleUpload} className="space-y-6">
              <input 
                value={designName} 
                onChange={(e) => setDesignName(e.target.value)}
                placeholder="Design Name" 
                className="w-full p-4 bg-[#F8F5F0] rounded-2xl outline-none focus:ring-1 focus:ring-[#C9A227] text-sm" 
              />
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price" 
                  className="w-full p-4 pl-10 bg-[#F8F5F0] rounded-2xl outline-none focus:ring-1 focus:ring-[#C9A227] text-sm" 
                />
              </div>
              <div className="w-full h-40 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                {image ? <img src={image} className="w-full h-full object-cover" alt="preview" /> : <p className="text-[10px] uppercase tracking-widest text-gray-400">Upload Media</p>}
                <input type="file" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setImage(URL.createObjectURL(file));
                }} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <button className="w-full bg-[#311B14] text-[#C9A227] py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#C9A227] hover:text-black transition-all shadow-lg">
                Publish to Gallery
              </button>
            </form>
          </div>
        </section>

        {/* COLLECTIONS LIST */}
        <section className="lg:col-span-2 space-y-16">
          {/* MY DESIGNS */}
          <div id="designs">
            <h2 className={`${playfair.className} text-3xl mb-8`}>My Studio Collection</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {myDesigns.length === 0 ? (
                <div className="col-span-2 p-20 text-center border-2 border-dashed border-gray-100 rounded-3xl text-gray-400 italic">
                    Your studio gallery is currently empty.
                </div>
              ) : (
                myDesigns.map((d: any) => (
                  <div key={d.id} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 group relative shadow-sm">
                    <img src={d.img} className="w-full h-64 object-cover" alt={d.name} />
                    <div className="p-6 text-center">
                      <h4 className="font-bold text-[#311B14]">{d.name}</h4>
                      <p className="text-[#C9A227] text-sm font-semibold">₹{Number(d.price).toLocaleString()}</p>
                      <button 
                        onClick={() => removeDesign(d.id)}
                        className="mt-4 flex items-center justify-center gap-2 w-full text-red-400 hover:text-red-600 transition-colors text-xs uppercase font-bold tracking-tighter"
                      >
                        <Trash2 size={16} /> Remove Design
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ARTISTIC INSPIRATIONS */}
          <div id="explore">
            <h2 className={`${playfair.className} text-3xl mb-8`}>Artistic Inspirations</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {otherDesigns.map((d) => {
                const isSaved = savedDesigns.find(s => s.id === d.id);
                return (
                  <div key={d.id} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 relative group shadow-sm">
                    <img src={d.img} className="w-full h-64 object-cover transition-transform group-hover:scale-105" alt={d.name} />
                    <div className="p-6">
                      <div className="text-center mb-4">
                        <h4 className="font-bold">{d.name}</h4>
                        <p className="text-[#C9A227] font-semibold">₹{Number(d.price).toLocaleString()}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toggleSave(d)}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all border ${isSaved ? 'bg-[#C9A227] border-[#C9A227] text-white' : 'bg-transparent border-gray-200 text-gray-500 hover:border-[#C9A227] hover:text-[#C9A227]'}`}
                        >
                          <Heart size={14} fill={isSaved ? "white" : "none"} /> {isSaved ? 'Saved' : 'Save'}
                        </button>
                        
                        {isSaved && (
                          <button 
                            onClick={() => toggleSave(d)}
                            className="px-4 py-3 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 transition-all border border-red-100"
                            title="Remove from saved"
                          >
                            <BookmarkMinus size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}