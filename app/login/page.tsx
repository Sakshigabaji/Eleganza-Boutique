"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "../lib/api";
import { useCart } from "../context/CartContext";
import { Playfair_Display, Montserrat } from "next/font/google";
import { Mail, Lock, ArrowRight, Loader2, Landmark } from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "600"] });

export default function Login() {
  const router = useRouter();
  const { setUser } = useCart();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(form);
      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        router.push(`/profile/${data.user.role}`);
        router.refresh();
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err: any) {
      alert(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${montserrat.className} min-h-screen flex bg-black text-white`}>
      
      {/* LEFT PANEL: CINEMATIC VISUAL (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-2/3 relative overflow-hidden border-r border-[#C9A227]/20">
        <img 
          src="/images/login.jpg" 
          alt="The Collection" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-100 animate-[subtleZoom_20s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black"></div>
        
        {/* BRAND QUOTE */}
        <div className="relative z-10 self-center p-24 max-w-2xl">
          <Landmark className="text-[#C9A227] mb-8 opacity-60" size={40} />
          <h2 className={`${playfair.className} text-6xl text-white leading-tight mb-6`}>
            Return to <br /><span className="text-[#C9A227]">Excellence.</span>
          </h2>
          <p className="text-gray-400 text-xl font-light italic border-l-2 border-[#C9A227]/40 pl-8">
            "True luxury is not just what you wear, but the legacy you carry."
          </p>
        </div>
      </div>

      {/* RIGHT PANEL: MINIMALIST LOGIN FORM */}
      <div className="w-full lg:w-1/3 flex items-center justify-center p-8 md:p-16 bg-[#0A0A0A] relative">
        {/* Ambient Glow */}
        <div className="absolute w-64 h-64 bg-[#C9A227]/10 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-sm w-full relative z-10">
          
          {/* BRAND LOGO */}
          <div className="mb-16">
            <Link href="/" className={`${playfair.className} text-4xl tracking-[0.3em] text-[#C9A227]`}>
              ELEGANZA
            </Link>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mt-2">Boutique Exclusive</p>
          </div>

          <div className="mb-10">
            <h1 className={`${playfair.className} text-3xl text-white mb-2`}>Sign In</h1>
            <p className="text-gray-500 text-sm font-light">Access your personal vault and collections.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* EMAIL */}
            <div className="relative group">
              <label className="text-[10px] uppercase tracking-widest text-[#C9A227] mb-1 block opacity-60 group-focus-within:opacity-100 transition-opacity">Email Address</label>
              <div className="flex items-center border-b border-gray-800 group-focus-within:border-[#C9A227] transition-colors">
                <Mail className="text-gray-600 mr-3" size={16} />
                <input
                  type="email"
                  required
                  disabled={loading}
                  className="w-full bg-transparent py-3 outline-none text-white placeholder:text-gray-700 font-light text-sm"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="relative group">
              <label className="text-[10px] uppercase tracking-widest text-[#C9A227] mb-1 block opacity-60 group-focus-within:opacity-100 transition-opacity">Secret Password</label>
              <div className="flex items-center border-b border-gray-800 group-focus-within:border-[#C9A227] transition-colors">
                <Lock className="text-gray-600 mr-3" size={16} />
                <input
                  type="password"
                  required
                  disabled={loading}
                  className="w-full bg-transparent py-3 outline-none text-white placeholder:text-gray-700 font-light text-sm"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="accent-[#C9A227] w-3 h-3" />
                <label htmlFor="remember" className="text-[10px] uppercase tracking-tighter text-gray-500">Remember Me</label>
              </div>
              <Link href="#" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#C9A227] transition-colors">
                Forgot?
              </Link>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group bg-[#C9A227] text-black py-5 rounded-sm font-bold text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-all duration-500 hover:bg-white active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Authorize <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

          </form>

          {/* REDIRECT */}
          <div className="mt-16 pt-8 border-t border-gray-900 text-center">
            <p className="text-gray-500 text-[11px] uppercase tracking-[0.2em] font-light">
              New to the House?{" "}
              <Link
                href="/Signup"
                className="text-[#C9A227] font-bold hover:text-white transition-colors ml-1"
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* CUSTOM ANIMATION STYLES */}
      <style jsx global>{`
        @keyframes subtleZoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
      `}</style>

    </div>
  );
}