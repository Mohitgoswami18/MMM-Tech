import { Link } from "react-router-dom";
import { Mail, Phone, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-linear-to-br from-blue-600 via-purple-600 to-blue-600 text-[#ffffff]"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-extrabold">Mom, Money & Mindset</h3>
            <p className="text-sm leading-relaxed text-[#ffffff]/80">
              Teaching kids the power of financial literacy through fun,
              gamified learning experiences. Because smart money skills start
              young!
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-sm text-[#ffffff]/80 transition-colors hover:text-[#ffffff]"
              >
                Home
              </Link>
              <Link
                to="/modules"
                className="text-sm text-[#ffffff]/80 transition-colors hover:text-[#ffffff]"
              >
                Modules
              </Link>
              <a
                href="#about"
                className="text-sm text-[#ffffff]/80 transition-colors hover:text-[#ffffff]"
              >
                About Us
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-bold">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@mommoneymindset.com"
                className="flex items-center gap-2 text-sm text-[#ffffff]/80 transition-colors hover:text-[#ffffff]"
              >
                <Mail size={16} />
                founder@mommoneyandmindset.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm text-[#ffffff]/80 transition-colors hover:text-[#ffffff]"
              >
                <Phone size={16} />
                +-- ----------
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff]/20 text-sm font-bold transition-all hover:scale-110 hover:bg-[#ffffff]/30"
              >
                f
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff]/20 text-sm font-bold transition-all hover:scale-110 hover:bg-[#ffffff]/30"
              >
                X
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff]/20 text-sm font-bold transition-all hover:scale-110 hover:bg-[#ffffff]/30"
              >
                in
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff]/20 text-sm font-bold transition-all hover:scale-110 hover:bg-[#ffffff]/30"
              >
                yt
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-[#ffffff]/20 pt-6 text-center text-sm text-[#ffffff]/70">
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className="text-pink-600" /> for the next
            generation of money-smart kids
          </p>
          <p>
            &copy; {new Date().getFullYear()} Mom, Money & Mindset. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
