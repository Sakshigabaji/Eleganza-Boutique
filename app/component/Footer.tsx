"use client";

import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function Footer() {
  return (
    <footer className={`${montserrat.className} bg-black text-[#e6e6e6] pt-20 pb-10 border-t border-[#a87a04]/20`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMN 1: BRAND STORY */}
          <div className="space-y-6">
            <h2 className={`${playfair.className} text-3xl font-semibold tracking-[0.2em] text-[#C9A227]`}>
              ELEGANZA
            </h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Crafting timeless legacies through exquisite artistry. Our jewelry is designed for those who appreciate the finer details of luxury and elegance.
            </p>
            <div className="flex gap-5 text-gray-300">
              <a href="#" className="hover:text-[#C9A227] transition-all hover:-translate-y-1"><Instagram size={20} /></a>
              <a href="#" className="hover:text-[#C9A227] transition-all hover:-translate-y-1"><Facebook size={20} /></a>
              <a href="#" className="hover:text-[#C9A227] transition-all hover:-translate-y-1"><Twitter size={20} /></a>
              <a href="#" className="hover:text-[#C9A227] transition-all hover:-translate-y-1"><Mail size={20} /></a>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div>
            <h4 className={`${playfair.className} text-lg text-[#C9A227] mb-6 font-medium`}>The Collections</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#rings" className="hover:text-white transition-colors">Bespoke Rings</a></li>
              <li><a href="#necklaces" className="hover:text-white transition-colors">Statement Necklaces</a></li>
              <li><a href="#earrings" className="hover:text-white transition-colors">Diamond Studs</a></li>
              <li><a href="#bracelets" className="hover:text-white transition-colors">Gold Bracelets</a></li>
            </ul>
          </div>

          {/* COLUMN 3: BOUTIQUE INFO */}
          <div>
            <h4 className={`${playfair.className} text-lg text-[#C9A227] mb-6 font-medium`}>Assistance</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C9A227] shrink-0" />
                <span>123 Luxury Lane, Fifth Avenue<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#C9A227] shrink-0" />
                <span>+1 (212) 555-0123</span>
              </li>
              <li><a href="#" className="hover:text-white transition-colors block ml-8">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors block ml-8">Privacy Policy</a></li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER */}
          <div>
            <h4 className={`${playfair.className} text-lg text-[#C9A227] mb-6 font-medium`}>Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Join the inner circle for exclusive previews and offers.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-b border-gray-700 py-2 outline-none focus:border-[#C9A227] transition-colors text-sm"
              />
              <button className="text-left text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A227] hover:text-white transition-colors mt-2">
                Subscribe →
              </button>
            </form>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray-500">
          <p>© 2026 ELEGANZA LUXURY HOUSE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookies</a>
            <a href="#" className="hover:text-white">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}