import { useMemo, useState } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

export default function App() {
  const [activeRestaurant, setActiveRestaurant] = useState("burger");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [confirmation, setConfirmation] = useState(null);

  const cartCount = useMemo(() => cart.reduce((n, it) => n + it.qty, 0), [cart]);

  const addToCart = (item) => {
    setConfirmation(null);
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  };

  const handleConfirm = (payload) => {
    setConfirmation({
      id: Math.random().toString(36).slice(2, 8).toUpperCase(),
      when: new Date().toLocaleString(),
      ...payload,
    });
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header
        activeRestaurant={activeRestaurant}
        setActiveRestaurant={setActiveRestaurant}
        cartCount={cartCount}
        onCartToggle={() => setCartOpen((o) => !o)}
      />

      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold tracking-wide">
              Family-friendly • Fun • Delicious
            </p>
            <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold text-orange-600 leading-tight">
              Welcome to Mr Happy
            </h1>
            <p className="mt-3 text-gray-700 text-lg">
              Three cheerful spots, one delicious mission: make your day brighter with burgers, pizzas, and global comfort food.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={() => setActiveRestaurant("burger")} className="px-4 py-2 rounded-full bg-yellow-400 text-white font-semibold hover:bg-yellow-500">Explore Burgers</button>
              <button onClick={() => setActiveRestaurant("restaurant")} className="px-4 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600">Explore Restaurant</button>
              <button onClick={() => setActiveRestaurant("combo")} className="px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600">Burgers & Pizza</button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border-4 border-yellow-200 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1600&auto=format&fit=crop"
                alt="Smiling friends enjoying burgers and pizza"
                className="w-full h-72 sm:h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white/80 backdrop-blur rounded-2xl px-4 py-3 shadow border">
              <p className="text-sm font-semibold text-orange-700">Order online for pickup or delivery</p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-yellow-50/60" />
      </section>

      <Menu activeRestaurant={activeRestaurant} onAdd={addToCart} />

      {confirmation && (
        <section className="max-w-3xl mx-auto px-4 py-8">
          <div className="p-5 rounded-2xl border bg-green-50 border-green-200">
            <h3 className="text-xl font-bold text-green-700">Order confirmed!</h3>
            <p className="text-sm text-green-700">Thank you, {confirmation.form.name}. Your order #{confirmation.id} has been placed on {confirmation.when}.</p>
            <p className="text-sm text-green-700">We will contact you at {confirmation.form.phone}. Delivery to {confirmation.form.address} — payment by {confirmation.form.method}.</p>
          </div>
        </section>
      )}

      <Footer />

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        setItems={setCart}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
