import { Star, Plus } from "lucide-react";

const MENUS = {
  burger: {
    tagline: "Gourmet burgers stacked with joy",
    items: [
      {
        id: "b1",
        name: "Classic Happy Burger",
        desc: "Juicy beef patty, cheddar, lettuce, tomato, Happy sauce",
        price: 9.99,
        img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "b2",
        name: "Double Sunshine Burger",
        desc: "Two patties, double cheese, caramelized onions",
        price: 12.99,
        img: "https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "b3",
        name: "Happy Fries Basket",
        desc: "Crispy fries with Happy dust seasoning",
        price: 4.5,
        img: "https://images.unsplash.com/photo-1541599188778-cdc73298e8f8?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    reviews: [
      { name: "Alex", text: "Best burger in town! That Happy sauce is magic.", rating: 5 },
      { name: "Priya", text: "Kids loved it. Super quick service.", rating: 5 },
    ],
  },
  restaurant: {
    tagline: "Casual dining with international flair",
    items: [
      {
        id: "r1",
        name: "Thai Basil Chicken Bowl",
        desc: "Wok-tossed chicken, jasmine rice, chili basil sauce",
        price: 11.5,
        img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "r2",
        name: "Creamy Pesto Pasta",
        desc: "Al dente pasta, basil pesto, cherry tomatoes",
        price: 13.0,
        img: "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8bbf?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "r3",
        name: "Caesar Salad",
        desc: "Crisp romaine, parmesan, house-made dressing",
        price: 8.0,
        img: "https://images.unsplash.com/photo-1566843972141-bd9f6a6d0d66?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    reviews: [
      { name: "Samira", text: "Lovely ambiance and flavorful dishes.", rating: 5 },
      { name: "Jake", text: "Great variety for the whole family.", rating: 4 },
    ],
  },
  combo: {
    tagline: "Burgers meet wood-fired pizzas",
    items: [
      {
        id: "c1",
        name: "Margherita Pizza",
        desc: "Wood-fired crust, fresh mozzarella, basil",
        price: 10.99,
        img: "https://images.unsplash.com/photo-1548365328-9f547fb09550?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "c2",
        name: "Pepperoni Party Pizza",
        desc: "Spicy pepperoni, extra cheese, oregano",
        price: 12.49,
        img: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "c3",
        name: "Smoky BBQ Burger",
        desc: "Beef patty, BBQ glaze, crispy onions",
        price: 11.25,
        img: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479d?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    reviews: [
      { name: "Lina", text: "Pizza crust is perfection. Burger was juicy!", rating: 5 },
      { name: "Tom", text: "One stop for everyone’s cravings.", rating: 5 },
    ],
  },
};

export default function Menu({ activeRestaurant, onAdd }) {
  const data = MENUS[activeRestaurant];

  return (
    <section id="menu" className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-orange-600">Menu</h2>
        <p className="text-gray-600">{data.tagline}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.items.map((item) => (
          <div key={item.id} className="rounded-2xl overflow-hidden border border-yellow-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="h-44 w-full overflow-hidden">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                <span className="text-orange-600 font-extrabold">${item.price.toFixed(2)}</span>
              </div>
              <button
                onClick={() => onAdd({ ...item, restaurant: activeRestaurant })}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition-colors"
              >
                <Plus size={16} /> Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2"><Star className="text-yellow-400"/>Happy Reviews</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.reviews.map((rev, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700">“{rev.text}”</p>
              <p className="text-sm text-gray-500 mt-1">— {rev.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
