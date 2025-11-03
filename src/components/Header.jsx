import { Smile, ShoppingCart } from "lucide-react";

export default function Header({ activeRestaurant, setActiveRestaurant, cartCount, onCartToggle }) {
  const restaurants = [
    { id: "burger", name: "Mr Happy Burger" },
    { id: "restaurant", name: "Mr Happy Restaurant" },
    { id: "combo", name: "Mr Happy Burgers & Pizza" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-yellow-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 grid place-items-center shadow">
            <Smile className="text-white" size={22} />
          </div>
          <div className="leading-tight">
            <p className="text-xl font-extrabold text-orange-600">Mr Happy</p>
            <p className="text-xs text-gray-500">Burgers • Pizza • Good Times</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {restaurants.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRestaurant(r.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeRestaurant === r.id
                  ? "bg-yellow-400 text-white shadow"
                  : "hover:bg-yellow-100 text-gray-700"
              }`}
            >
              {r.name}
            </button>
          ))}
        </nav>

        <button
          onClick={onCartToggle}
          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          aria-label="Open cart"
        >
          <ShoppingCart size={18} />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-white w-6 h-6 grid place-items-center rounded-full shadow">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="md:hidden px-4 pb-3 flex gap-2 overflow-x-auto">
        {restaurants.map((r) => (
          <button
            key={r.id}
            onClick={() => setActiveRestaurant(r.id)}
            className={`px-3 py-2 rounded-full text-sm whitespace-nowrap ${
              activeRestaurant === r.id
                ? "bg-yellow-400 text-white shadow"
                : "bg-yellow-50 text-gray-700"
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>
    </header>
  );
}
