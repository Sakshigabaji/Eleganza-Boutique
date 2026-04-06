"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, Upload, Brush, Search, User } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });

export default function DesignerLayout({ children }: { children: React.ReactNode }) {
  const { setUser, user } = useCart();
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.push("/");
    router.refresh();
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-screen bg-[#FDFBF7] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-[#C9A227]/10 flex flex-col justify-between shadow-sm z-20">
        <div className="p-8">
          <h2 className={`${playfair.className} text-2xl text-[#C9A227] tracking-wider mb-12`}>
            Designer Panel
          </h2>

          <nav className="space-y-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
              { id: "upload", label: "Upload Design", icon: <Upload size={18} /> },
              { id: "designs", label: "My Designs", icon: <Brush size={18} /> },
              { id: "explore", label: "Explore", icon: <Search size={18} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-500 hover:bg-[#C9A227]/5 hover:text-[#C9A227] transition-all group font-medium"
              >
                <span className="opacity-70 group-hover:opacity-100">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User & Logout */}
        <div className="p-8 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center text-[#C9A227]">
              <User size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-[#311B14] truncate">{user?.name || "Designer"}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Verified Artist</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#FDFBF7] relative">
        {/* Subtle background glow to unify the space */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#C9A227]/5 to-transparent pointer-events-none"></div>
        <div className="relative p-10 md:p-16">
          {children}
        </div>
      </main>
    </div>
  );
}