import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, Tag, X } from "lucide-react";

const PROMOS = {
  HAPPY10: 0.1,
  SMILE15: 0.15,
};

export default function Cart({ open, onClose, items, setItems, onConfirm }) {
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", method: "cash" });

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );
  const discount = useMemo(() => (appliedPromo ? subtotal * appliedPromo : 0), [appliedPromo, subtotal]);
  const delivery = useMemo(() => (subtotal > 30 ? 0 : items.length > 0 ? 4.0 : 0), [subtotal, items.length]);
  const total = useMemo(() => subtotal - discount + delivery, [subtotal, discount, delivery]);

  useEffect(() => {
    const last = localStorage.getItem("mrhappy-last-order");
    if (!last) return;
  }, []);

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (PROMOS[code]) {
      setAppliedPromo(PROMOS[code]);
    }
  };

  const changeQty = (id, delta) => {
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
        .filter((it) => it.qty > 0)
    );
  };

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  const clearCart = () => setItems([]);

  const orderAgain = () => {
    const last = localStorage.getItem("mrhappy-last-order");
    if (last) {
      const parsed = JSON.parse(last);
      setItems(parsed.items || []);
      setForm(parsed.form || form);
      setAppliedPromo(parsed.appliedPromo || null);
    }
  };

  const placeOrder = (e) => {
    e.preventDefault();
    const payload = { items, form, subtotal, discount, delivery, total, appliedPromo };
    localStorage.setItem("mrhappy-last-order", JSON.stringify(payload));
    onConfirm(payload);
    clearCart();
  };

  return (
    <div
      className={`fixed inset-0 bg-black/40 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div className={`absolute right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-xl transform transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-bold">Your Cart</h3>
          <button aria-label="Close cart" onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-64px-280px)]">
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty. Add some deliciousness!</p>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it.id} className="flex gap-3">
                  <img src={it.img} alt={it.name} className="w-20 h-20 rounded-lg object-cover border" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{it.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{it.restaurant}</p>
                      </div>
                      <button className="text-sm text-red-500" onClick={() => removeItem(it.id)}>Remove</button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-2">
                        <button className="p-1" onClick={() => changeQty(it.id, -1)}>
                          <Minus size={16} />
                        </button>
                        <span className="text-sm w-6 text-center">{it.qty}</span>
                        <button className="p-1" onClick={() => changeQty(it.id, 1)}>
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-semibold">${(it.price * it.qty).toFixed(2)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 border-t space-y-3 bg-orange-50/40">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Promo code (HAPPY10, SMILE15)"
                className="w-full pl-9 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <button onClick={applyPromo} className="px-3 py-2 rounded-lg bg-yellow-400 text-white font-semibold">Apply</button>
          </div>
          <div className="text-sm text-gray-600">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            {appliedPromo && (
              <div className="flex justify-between text-green-600"><span>Discount</span><span>- ${discount.toFixed(2)}</span></div>
            )}
            <div className="flex justify-between"><span>Delivery</span><span>{delivery === 0 ? "Free" : `$${delivery.toFixed(2)}`}</span></div>
            <div className="flex justify-between font-bold text-orange-700"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>

          <form onSubmit={placeOrder} className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="border rounded-lg px-3 py-2" />
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="border rounded-lg px-3 py-2" />
            </div>
            <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address" className="border rounded-lg px-3 py-2 w-full" />
            <div className="flex gap-3 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="method" checked={form.method === "cash"} onChange={() => setForm({ ...form, method: "cash" })} />
                Cash on delivery
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="method" checked={form.method === "card"} onChange={() => setForm({ ...form, method: "card" })} />
                Card on delivery
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button type="button" onClick={orderAgain} className="text-sm text-orange-600 underline">Order again</button>
              <button disabled={items.length === 0} className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold disabled:opacity-50">
                Place order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
