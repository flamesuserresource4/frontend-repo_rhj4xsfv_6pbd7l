import { Facebook, Instagram, MapPin, Phone, Clock, Smile } from "lucide-react";

const LOCATIONS = [
  {
    name: "Mr Happy Burger",
    address: "123 Sunshine Ave",
    phone: "+1 (555) 123-4567",
    hours: "Mon-Sun: 11am - 10pm",
    map:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.840290799494!2d144.9537353159049!3d-37.81627974201348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ5JzAyLjYiUyAxNDTCsDU3JzE0LjQiRQ!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s",
  },
  {
    name: "Mr Happy Restaurant",
    address: "456 Joy Street",
    phone: "+1 (555) 987-6543",
    hours: "Mon-Sun: 12pm - 10pm",
    map:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999022063528!2d2.292292615674106!3d48.85837307928751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzMwLjEiTiAywrAxNycyOS4yIkU!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s",
  },
  {
    name: "Mr Happy Burgers & Pizza",
    address: "789 Rainbow Blvd",
    phone: "+1 (555) 222-3344",
    hours: "Mon-Sun: 11am - 11pm",
    map:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.27991408665!2d-74.25986473166969!3d40.697670068321996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQxJzUxLjYiTiA3NMKwMTUnMDYuOSJX!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s",
  },
];

export default function Footer() {
  return (
    <footer className="mt-12 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 border-t border-yellow-200">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {LOCATIONS.map((loc) => (
            <div key={loc.name} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-400 grid place-items-center"><Smile className="text-white" size={16} /></div>
                <h4 className="font-bold text-orange-700">{loc.name}</h4>
              </div>
              <p className="text-sm text-gray-700 flex items-center gap-2"><MapPin size={16} className="text-red-500"/> {loc.address}</p>
              <p className="text-sm text-gray-700 flex items-center gap-2"><Phone size={16} className="text-green-600"/> {loc.phone}</p>
              <p className="text-sm text-gray-700 flex items-center gap-2"><Clock size={16} className="text-yellow-600"/> {loc.hours}</p>
              <div className="h-36 w-full overflow-hidden rounded-lg border">
                <iframe
                  title={`Map of ${loc.name}`}
                  src={loc.map}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Mr Happy. Bringing smiles, one bite at a time.</p>
          <div className="flex items-center gap-3">
            <a href="#" className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border hover:bg-yellow-50"><Facebook size={16}/> Facebook</a>
            <a href="#" className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border hover:bg-yellow-50"><Instagram size={16}/> Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
