import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";
import { toast } from "sonner";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully!");
    setUser(null);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md shadow-sm font-['Helvetica']">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-extrabold tracking-tight text-[#00796B] lg:text-3xl">
            <span>Mom</span>
            <span>,&nbsp;</span>
            <span>Money</span>
            <span>&nbsp;&&nbsp;</span>
            <span>Mindset</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link
            to="/"
            className="rounded-xl px-3 py-2 text-base font-bold text-[#00796B] transition-colors hover:bg-[#00796B]/10 hover:text-[#00796B]"
          >
            Home
          </Link>
          <Link
            to="/modules"
            className="rounded-xl px-3 py-2 text-base font-bold text-[#00796B] transition-colors hover:bg-[#00796B]/10 hover:text-[#00796B]"
          >
            Modules
          </Link>
          <a
            href="#about"
            className="rounded-xl px-3 py-2 text-base font-bold text-[#00796B] transition-colors hover:bg-[#00796B]/10 hover:text-[#00796B]"
          >
            About
          </a>
          <a
            href="#contact"
            className="rounded-xl px-3 py-2 text-base font-bold text-[#00796B] transition-colors hover:bg-[#00796B]/10 hover:text-[#00796B]"
          >
            Contact
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          {!user ? (
            <div className="flex items-center gap-3">
              <button
                className="rounded-full border-2 border-[#00796B] px-5 py-2 text-sm font-['Poppins'] font-semibold text-[#00796B] transition-all hover:scale-105 hover:bg-[#00796B] hover:text-[#FFFFFF]"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="rounded-full bg-[#00796B] px-5 py-2 text-sm font-['Poppins'] font-semibold text-[#FFFFFF] shadow-md transition-all hover:scale-105 hover:bg-[#005f56]"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                className="rounded-full border-2 border-[#00796B] px-5 py-2 text-sm font-['Poppins'] font-semibold text-[#00796B] transition-all hover:scale-105 hover:bg-[#00796B] hover:text-[#FFFFFF]"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
              <button
                className="rounded-full bg-[#00796B] px-5 py-2 text-sm font-['Poppins'] font-semibold text-[#FFFFFF] shadow-md transition-all hover:scale-105 hover:bg-[#005f56]"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="rounded-xl p-2 text-[#00796B] lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-[#00796B]/20 bg-[#FFFFFF] px-4 pb-4 pt-2 lg:hidden font-['Helvetica']">
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-bold text-[#00796B] transition-colors hover:bg-[#00796B]/10"
            >
              Home
            </Link>
            <Link
              to="/modules"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-bold text-[#00796B] transition-colors hover:bg-[#00796B]/10"
            >
              Modules
            </Link>
            <a
              href="#about"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-bold text-[#00796B] transition-colors hover:bg-[#00796B]/10"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-bold text-[#00796B] transition-colors hover:bg-[#00796B]/10"
            >
              Contact
            </a>

            <div className="mt-2 flex gap-3">
              {!user ? (
                <>
                  <button
                    className="rounded-full border-2 border-[#00796B] px-5 py-2 text-sm font-['Poppins'] font-semibold text-[#00796B] transition-all hover:scale-105 hover:bg-[#00796B] hover:text-[#FFFFFF]"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="flex-1 rounded-full bg-[#00796B] px-5 py-2 text-sm font-['Poppins'] font-semibold text-[#FFFFFF] shadow-md transition-all hover:bg-[#005f56]"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <button
                  className="rounded-full border-2 border-[#00796B] px-5 py-2 text-sm font-['Poppins'] font-semibold text-[#00796B] transition-all hover:scale-105 hover:bg-[#00796B] hover:text-[#FFFFFF]"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
