"use client";

import { useCart } from "../context/CartContext";
import { Plus, Minus, ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "600"] });

export default function CartPage() {
  const { cart, increaseQty, decreaseQty } = useCart();
  const router = useRouter();

  const totalPrice = c  art.reduce(
    (sum: number, item: any) =>
      sum +
      Number(String(item.price).replace(/[^0-9]/g, "") || 0) *
      (item.quantity || 1),
    0
  );

  return (
    <div className={`${montserrat.className} min-h-screen bg-[#FDFBF7] pt-32 pb-20 px-6 relative overflow-hidden`}>

      <div className="absolute w-[600px] h-[600px] bg-[#C9A227]/5 blur-[120px] rounded-full -top-40 -left-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#C9A227]/20 pb-8">
          <div>
            <Link href="/" className="text-[#C9A227] flex items-center gap-2 text-xs uppercase tracking-widest mb-4 hover:gap-3 transition-all">
              <ArrowLeft size={14} /> Back to Boutique
            </Link>
            <h1 className={`${playfair.className} text-5xl text-[#311B14]`}>Shopping Bag</h1>
          </div>
          <p className="text-gray-400 text-sm italic mt-4 md:mt-0">
            {cart.length} {cart.length === 1 ? "Item" : "Items"} selected
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center bg-white/50 backdrop-blur-md p-20 rounded-3xl border border-[#C9A227]/20 max-w-2xl mx-auto shadow-xl">
            <ShoppingBag size={48} className="text-[#C9A227]/30 mx-auto mb-6" />
            <h2 className={`${playfair.className} text-3xl text-[#311B14] mb-4`}>Your bag is empty</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              It looks like you haven't added any treasures to your collection yet.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#311B14] text-[#C9A227] px-12 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#C9A227] hover:text-black transition-all"
            >
              Discover Collections
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item: any) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-2xl border border-[#C9A227]/10 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-32 h-32 shrink-0 overflow-hidden rounded-xl border border-[#F8F5F0]">
                    <img
                      src={item.image || item.img}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={item.name}
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className={`${playfair.className} text-xl text-[#311B14]`}>{item.name}</h3>
                    <p className="text-[#C9A227] font-medium mt-1">
                      ₹{Number(String(item.price).replace(/[^0-9]/g, "")).toLocaleString()}
                    </p>
                  </div>

                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center gap-4 bg-[#F8F5F0] p-2 rounded-full px-4 border border-[#C9A227]/10">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="p-1 hover:text-[#C9A227] transition-colors"
                    >
                      {item.quantity <= 1 ? (
                        <Trash2 size={16} className="text-red-400" />
                      ) : (
                        <Minus size={16} />
                      )}
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity || 1}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="p-1 hover:text-[#C9A227] transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="hidden sm:block text-right min-w-[100px]">
                    <p className="text-xs uppercase tracking-tighter text-gray-400 mb-1">Subtotal</p>
                    <p className="font-bold text-[#311B14]">
                      ₹{(
                        Number(String(item.price).replace(/[^0-9]/g, "")) *
                        (item.quantity || 1)
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:sticky lg:top-32 h-fit">
              <div className="bg-[#311B14] text-white p-8 rounded-3xl shadow-2xl border border-white/10">
                <h2 className={`${playfair.className} text-2xl text-[#C9A227] mb-8`}>Order Summary</h2>

                <div className="space-y-4 text-sm font-light border-b border-white/10 pb-6 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-green-400 uppercase text-[10px] tracking-widest font-bold">
                      Complimentary
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax Included</span>
                    <span>₹0</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-10">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A227] font-bold">Total Amount</p>
                    <p className="text-3xl font-serif mt-1">₹{totalPrice.toLocaleString()}</p>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-[#C9A227] text-black font-bold py-4 rounded-xl text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl active:scale-95"
                >
                  Proceed to Checkout
                </button>

                <p className="text-[9px] text-center mt-6 text-gray-400 uppercase tracking-widest">
                  Secure Checkout with Eleganza Encrypted Systems
                </p>
              </div>

              <div className="mt-6 p-4 border border-[#C9A227]/20 rounded-2xl bg-white/30 text-center">
                <p className="text-[11px] text-gray-500 italic">
                  "Each piece comes with a lifetime authenticity guarantee and luxury packaging."
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}