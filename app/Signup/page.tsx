"use client";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import { Playfair_Display, Montserrat } from "next/font/google";
import { ArrowRight, Mail, Lock, User, Gem, Palette, ShoppingBag, Link as LinkIcon } from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "600"] });

export default function SignupPage() {
  
  const router = useRouter(); // 2. Initialize the router
  const { setUser } = useCart();
  const [role, setRole] = useState<"buyer" | "designer">("buyer");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    portfolio: "", 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock user data to save in Context
      const newUser = {
        name: formData.name,
        email: formData.email,
        role: role // This is the "buyer" or "designer" state from your toggle
      };

      // 1. Save user to global state
      setUser(newUser);

      // 2. Local Storage (Optional but recommended for persistence)
      localStorage.setItem("userRole", role);

      // 3. Redirect
      if (role === "buyer") {
        router.push("/profile/buyer");
      } else {
        router.push("/profile/designer");
      }
    } catch (error) {
      console.error("Signup error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${montserrat.className} min-h-screen flex bg-black text-white relative overflow-hidden`}>
      
      {/* DECORATIVE GOLD GLOWS */}
      <div className="absolute w-[800px] h-[800px] bg-[#C9A227]/10 blur-[150px] rounded-full -top-40 -left-40 pointer-events-none"></div>
      <div className="absolute w-[600px] h-[600px] bg-[#C9A227]/10 blur-[150px] rounded-full bottom-0 right-0 pointer-events-none"></div>

      {/* LEFT SIDE: IMMERSIVE IMAGE */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] relative overflow-hidden">
        <img 
          src={role === "buyer" ? "/images/signup.jpg" : "/images/login.jpg"} 
          alt="Luxury Aesthetics"
          className="absolute inset-0 w-full h-full object-cover opacity-70 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
        
        
        <div className="relative z-10 self-end p-20 max-w-lg animate-in fade-in slide-in-from-left duration-700">
          <Gem className="text-[#C9A227] mb-6 opacity-80" size={40} />
          <h2 className={`${playfair.className} text-5xl text-[#C9A227] mb-6 leading-tight`}>
            {role === "buyer" ? "Curating Your \n Elegance" : "Crafting the \n Future of Luxury"}
          </h2>
          <p className="text-gray-300 text-lg font-light leading-relaxed">
            {role === "buyer" 
              ? "Join as a buyer to discover timeless pieces and receive curated recommendations tailored to your style."
              : "Join as a designer to showcase your artistry to a global audience and define the next era of high jewelry."}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="w-full lg:w-[55%] xl:w-[50%] flex items-center justify-center p-8 md:p-16 xl:p-24 bg-black/80 backdrop-blur-sm z-10">
        <div className="max-w-md w-full">
          
          <div className="text-center mb-12">
            <Link href="/" className={`${playfair.className} text-4xl md:text-5xl tracking-[0.25em] text-[#C9A227] hover:opacity-80 transition-opacity`}>
              ELEGANZA
            </Link>
          </div>

          <div className="flex bg-[#1A1A1A] p-1 rounded-full mb-10 border border-white/10">
            <button
              type="button" // Use type="button" so it doesn't trigger form submit
              onClick={() => setRole("buyer")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${role === "buyer" ? "bg-[#C9A227] text-black" : "text-gray-500 hover:text-white"}`}
            >
              <ShoppingBag size={14} /> Buyer
            </button>
            <button
              type="button" // Use type="button" so it doesn't trigger form submit
              onClick={() => setRole("designer")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${role === "designer" ? "bg-[#C9A227] text-black" : "text-gray-500 hover:text-white"}`}
            >
              <Palette size={14} /> Designer
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <User className="absolute left-0 top-3 text-[#C9A227] opacity-60" size={18} />
              <input
                type="text"
                name="name"
                placeholder={role === "buyer" ? "Full Name" : "Studio / Designer Name"}
                className="w-full bg-transparent border-b border-gray-700 py-3 pl-8 outline-none focus:border-[#C9A227] transition-colors placeholder:text-gray-600 text-white font-light text-sm"
                required
                onChange={handleChange}
              />
            </div>

            <div className="relative group">
              <Mail className="absolute left-0 top-3 text-[#C9A227] opacity-60" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-gray-700 py-3 pl-8 outline-none focus:border-[#C9A227] transition-colors placeholder:text-gray-600 text-white font-light text-sm"
                required
                onChange={handleChange}
              />
            </div>

            {role === "designer" && (
              <div className="relative group animate-in slide-in-from-top duration-300">
                <LinkIcon className="absolute left-0 top-3 text-[#C9A227] opacity-60" size={18} />
                <input
                  type="url"
                  name="portfolio"
                  placeholder="Portfolio / Instagram Link"
                  className="w-full bg-transparent border-b border-gray-700 py-3 pl-8 outline-none focus:border-[#C9A227] transition-colors placeholder:text-gray-600 text-white font-light text-sm"
                  required
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="relative group">
              <Lock className="absolute left-0 top-3 text-[#C9A227] opacity-60" size={18} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full bg-transparent border-b border-gray-700 py-3 pl-8 outline-none focus:border-[#C9A227] transition-colors placeholder:text-gray-600 text-white font-light text-sm"
                required
                onChange={handleChange}
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-0 top-3 text-[#C9A227] opacity-60" size={18} />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full bg-transparent border-b border-gray-700 py-3 pl-8 outline-none focus:border-[#C9A227] transition-colors placeholder:text-gray-600 text-white font-light text-sm"
                required
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <input type="checkbox" id="terms" className="accent-[#C9A227] w-4 h-4" required />
              <label htmlFor="terms" className="text-xs text-gray-400 font-light leading-relaxed">
                I agree to the <Link href="/terms" className="text-[#C9A227] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#C9A227] hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C9A227] text-black py-4 rounded-xl font-bold text-xs uppercase tracking-[0.25em] hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg mt-4 active:scale-95"
            >
              Join as {role} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

          </form>

          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm font-light">
              Already a member?{" "}
              <Link href="/login" className="text-[#C9A227] font-semibold hover:text-white transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}