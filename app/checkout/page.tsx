"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import { Playfair_Display, Montserrat } from "next/font/google";
import { ArrowLeft, CreditCard, Smartphone, Building2, Lock, CheckCircle, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "600"] });

type PaymentMethod = "card" | "upi" | "netbanking";

export default function CheckoutPage() {
  const { cart, clearCartAndPurchase } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  const [shippingData, setShippingData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const totalPrice = cart.reduce(
    (sum: number, item: any) =>
      sum + Number(String(item.price).replace(/[^0-9]/g, "") || 0) * (item.quantity || 1),
    0
  );

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    clearCartAndPurchase();
    setOrderPlaced(true);
    setLoading(false);
  };

  if (orderPlaced) {
    return (
      <div className={`${montserrat.className} min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6`}>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className={`${playfair.className} text-4xl text-[#311B14] mb-4`}>Order Confirmed!</h1>
          <p className="text-gray-500 mb-2 leading-relaxed">
            Your order has been placed successfully. A confirmation will be sent to your registered email.
          </p>
          <p className="text-[#C9A227] font-semibold text-sm uppercase tracking-widest mb-10">
            Estimated delivery: 5–7 business days
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/profile/buyer"
              className="bg-[#311B14] text-[#C9A227] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#C9A227] hover:text-black transition-all"
            >
              View Orders
            </Link>
            <Link
              href="/"
              className="border border-[#C9A227] text-[#C9A227] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#C9A227] hover:text-black transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className={`${montserrat.className} min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6`}>
        <div className="text-center">
          <h2 className={`${playfair.className} text-3xl text-[#311B14] mb-4`}>Your cart is empty</h2>
          <Link href="/" className="text-[#C9A227] font-bold uppercase tracking-widest text-sm border-b border-[#C9A227] pb-1">
            Browse Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${montserrat.className} min-h-screen bg-[#FDFBF7] pt-28 pb-20 px-6`}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <Link href="/cart" className="text-[#C9A227] flex items-center gap-2 text-xs uppercase tracking-widest mb-4 hover:gap-3 transition-all">
            <ArrowLeft size={14} /> Back to Cart
          </Link>
          <h1 className={`${playfair.className} text-4xl md:text-5xl text-[#311B14]`}>Secure Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT — Forms */}
          <div className="lg:col-span-2 space-y-8">

            {/* Shipping Details */}
            <div className="bg-white rounded-3xl p-8 border border-[#C9A227]/15 shadow-sm">
              <h2 className={`${playfair.className} text-2xl text-[#311B14] mb-6`}>Shipping Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: "fullName", label: "Full Name", placeholder: "Sakshi Gabaji", span: false },
                  { key: "phone", label: "Phone Number", placeholder: "+91 98765 43210", span: false },
                  { key: "address", label: "Street Address", placeholder: "123, Marine Drive", span: true },
                  { key: "city", label: "City", placeholder: "Mumbai", span: false },
                  { key: "state", label: "State", placeholder: "Maharashtra", span: false },
                  { key: "pincode", label: "Pincode", placeholder: "400001", span: false },
                ].map(({ key, label, placeholder, span }) => (
                  <div key={key} className={span ? "sm:col-span-2" : ""}>
                    <label className="text-[10px] uppercase tracking-widest text-[#C9A227] mb-1 block font-bold">{label}</label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={(shippingData as any)[key]}
                      onChange={(e) => setShippingData({ ...shippingData, [key]: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors bg-[#FDFBF7] text-[#311B14] placeholder:text-gray-400"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-3xl p-8 border border-[#C9A227]/15 shadow-sm">
              <h2 className={`${playfair.className} text-2xl text-[#311B14] mb-6`}>Payment Method</h2>

              {/* Tabs */}
              <div className="flex gap-3 mb-8 flex-wrap">
                {([
                  { id: "card", label: "Card", icon: CreditCard },
                  { id: "upi", label: "UPI", icon: Smartphone },
                  { id: "netbanking", label: "Net Banking", icon: Building2 },
                ] as const).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setPaymentMethod(id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                      paymentMethod === id
                        ? "bg-[#311B14] text-[#C9A227] border-[#311B14]"
                        : "bg-transparent text-gray-500 border-gray-200 hover:border-[#C9A227] hover:text-[#C9A227]"
                    }`}
                  >
                    <Icon size={14} /> {label}
                  </button>
                ))}
              </div>

              {/* Card Form */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#C9A227] mb-1 block font-bold">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="Name on card"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors bg-[#FDFBF7] text-[#311B14] placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#C9A227] mb-1 block font-bold">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                        maxLength={19}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm outline-none focus:border-[#C9A227] transition-colors bg-[#FDFBF7] text-[#311B14] placeholder:text-gray-400 font-mono tracking-widest"
                      />
                      <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#C9A227] mb-1 block font-bold">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                        maxLength={5}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors bg-[#FDFBF7] text-[#311B14] placeholder:text-gray-400 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#C9A227] mb-1 block font-bold">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                        maxLength={4}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors bg-[#FDFBF7] text-[#311B14] placeholder:text-gray-400 font-mono"
                      />
                    </div>
                  </div>
                  <p className="flex items-center gap-2 text-[11px] text-gray-400 mt-2">
                    <Lock size={12} /> Your card details are encrypted and never stored.
                  </p>
                </div>
              )}

              {/* UPI Form */}
              {paymentMethod === "upi" && (
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#C9A227] mb-1 block font-bold">UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors bg-[#FDFBF7] text-[#311B14] placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-bold">Or pay via</p>
                    <div className="grid grid-cols-3 gap-3">
                      {["GPay", "PhonePe", "Paytm"].map((app) => (
                        <button
                          key={app}
                          onClick={() => setUpiId(app.toLowerCase() + "@okaxis")}
                          className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-wide transition-all ${
                            upiId.startsWith(app.toLowerCase())
                              ? "border-[#C9A227] text-[#C9A227] bg-[#C9A227]/5"
                              : "border-gray-200 text-gray-400 hover:border-[#C9A227]"
                          }`}
                        >
                          {app}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="flex items-center gap-2 text-[11px] text-gray-400">
                    <Lock size={12} /> You will receive a payment request on your UPI app.
                  </p>
                </div>
              )}

              {/* Net Banking Form */}
              {paymentMethod === "netbanking" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#C9A227] mb-1 block font-bold">Select Bank</label>
                    <div className="relative">
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#C9A227] transition-colors bg-[#FDFBF7] text-[#311B14] appearance-none"
                      >
                        <option value="">Choose your bank</option>
                        {["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra", "Punjab National Bank", "Bank of Baroda"].map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <p className="flex items-center gap-2 text-[11px] text-gray-400">
                    <Lock size={12} /> You will be redirected to your bank's secure portal.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="lg:sticky lg:top-28 h-fit space-y-4">
            <div className="bg-[#311B14] text-white p-8 rounded-3xl shadow-xl border border-white/10">
              <h2 className={`${playfair.className} text-xl text-[#C9A227] mb-6`}>Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-52 overflow-y-auto pr-1">
                {cart.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                      <img src={item.image || item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                      <p className="text-[10px] text-gray-400">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="text-[#C9A227] text-xs font-bold shrink-0">
                      ₹{(Number(String(item.price).replace(/[^0-9]/g, "")) * (item.quantity || 1)).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3 text-sm font-light mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-400 text-[10px] uppercase tracking-widest font-bold">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">GST</span>
                  <span>Included</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8 border-t border-white/10 pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#C9A227] font-bold">Total</p>
                  <p className="text-3xl font-serif mt-1">₹{totalPrice.toLocaleString()}</p>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-[#C9A227] text-black font-bold py-4 rounded-xl text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <Lock size={14} /> Place Order
                  </>
                )}
              </button>

              <p className="text-[9px] text-center mt-4 text-gray-400 uppercase tracking-widest">
                Secured by Eleganza Encrypted Systems
              </p>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Lock, label: "SSL Secure" },
                { icon: CheckCircle, label: "Authentic" },
                { icon: CreditCard, label: "Safe Pay" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="bg-white border border-[#C9A227]/15 rounded-2xl p-3 flex flex-col items-center gap-1">
                  <Icon size={16} className="text-[#C9A227]" />
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 text-center">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}