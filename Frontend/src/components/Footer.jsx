import { Link } from "react-router-dom";
import { Mail, Phone, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#FFFFFF] text-[#00796B] font-['Quicksand'] border-t border-[#00796B]/15"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-['Helvetica'] font-extrabold">
              Mom, Money & Mindset
            </h3>
            <p className="text-sm leading-relaxed text-[#555]">
              Teaching kids the power of financial literacy through fun,
              gamified learning experiences. Because smart money skills start
              young!
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-['Helvetica'] font-bold">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2 font-['Poppins']">
              <Link
                to="/"
                className="text-sm text-[#555] transition-colors hover:text-[#00796B]"
              >
                Home
              </Link>
              <Link
                to="/modules"
                className="text-sm text-[#555] transition-colors hover:text-[#00796B]"
              >
                Modules
              </Link>
              <a
                href="#about"
                className="text-sm text-[#555] transition-colors hover:text-[#00796B]"
              >
                About Us
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-['Helvetica'] font-bold">Contact Us</h4>

            <div className="flex flex-col gap-3 font-['Poppins']">
              <a
                href="mailto:founder@mommoneyandmindset.com"
                className="flex items-center gap-2 text-sm text-[#555] transition-colors hover:text-[#00796B]"
              >
                <Mail size={16} />
                founder@mommoneyandmindset.com
              </a>

              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm text-[#555] transition-colors hover:text-[#00796B]"
              >
                <Phone size={16} />
                +-- ----------
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {["f", "X", "in", "yt"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00796B]/10 text-sm font-['Poppins'] font-semibold text-[#00796B] transition-all hover:scale-110 hover:bg-[#FFC107] hover:text-[#00796B]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-[#00796B]/15 pt-6 text-center text-sm text-[#777]">
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className="text-[#FFC107]" /> for the
            next generation of money-smart kids
          </p>

          <p className="font-['Poppins']">
            &copy; {new Date().getFullYear()} Mom, Money & Mindset. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
