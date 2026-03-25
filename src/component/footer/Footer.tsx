
// import { MapPinIcon, PhoneIcon, EnvelopeIcon, ShoppingCartIcon } from "./icons"; // Your icons or Heroicons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white/90">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12">
          {/* Col 1: About */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              O<sub>2 </sub> Mart
            </h3>
            <p className="text-sm leading-relaxed mb-6 opacity-80">
              Fresh plants delivered to your doorstep. Bringing nature to your
              home with quality indoor, outdoor & flowering plants.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              >
                🛒
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              >
                📘
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              >
                📱
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Plant Care
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Categories
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Indoor Plants
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Outdoor Plants
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Flowering Plants
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Succulents
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Gift Plants
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                {/* <MapPinIcon className="w-5 h-5 mt-1 text-emerald-400 flex-shrink-0" /> */}
                <p className="text-sm leading-relaxed">Delhi, India</p>
              </div>
              <div className="flex items-center gap-3">
                {/* <PhoneIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" /> */}
                <span className="text-sm">+91 9999388976</span>
              </div>
              <div className="flex items-center gap-3">
                {/* <EnvelopeIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" /> */}
                <span className="text-sm">bhauryal@o2mart.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-75">
            <div className="flex flex-wrap gap-4 items-center">
              <span>🛒 Become a Seller</span>
              <span>📢 Advertise</span>
              <span>💳 Gift Cards</span>
              <span>🆘 Help Center</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span>
                © 2026 O<sub>2</sub> Mart
              </span>
              <div className="flex gap-1">
                <span>🪪</span>
                <span>🔒</span>
                <span>📄</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-20 bg-white/20 rounded flex items-center justify-center text-xs font-semibold">
                RuPay
              </div>
              <div className="h-8 w-20 bg-white/20 rounded flex items-center justify-center text-xs font-semibold">
                Visa
              </div>
              <div className="h-8 w-20 bg-white/20 rounded flex items-center justify-center text-xs font-semibold">
                Master Card
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
