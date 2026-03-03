import { Wrench, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button.jsx";
import { NavLink } from "react-router-dom";
import { Link ,useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Orders", href: "/orders" },
  { name: "About Us", href: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border w-full z-10">
      <div className="container mx-auto flex h-16 items-center justify-around px-6">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <Wrench className="bg-secondary text-white p-2 w-10 h-10 rounded-lg" />
          <span className="font-sans text-3xl tracking-wider">
            PLUMB<span className="font-serif text-primary">PRO</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `uppercase whitespace-nowrap transition
                hover:text-primary
                ${isActive ? "underline underline-offset-4 decoration-primary text-secondary translate-y-0.5" : "text-muted-foreground"}`
                }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Search
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 rounded-lg border border-muted bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div> */}

          
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {!token ? (
            <Link to="/admin/login">
              <Button size="lg" variant="outline">
                Admin Login
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/admin/products">
                <Button size="lg" variant="outline">
                  Admin
                </Button>
              </Link>

              <Button size="lg" variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}

          <Button className="ml-2" size="lg" variant="primary">
            Contact Us
          </Button>
        </div>

        {/* Mobile Button */}
        <button
          className="lg:hidden cursor-pointer p-2 rounded-md text-muted-foreground hover:text-primary focus:outline-none"
          onClick={() => setOpen(!open)}
        >
        { open ? <X /> :<Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-muted bg-background backdrop-blur-xs bg-opacity-90">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navLinks.map((link) => (
                <NavLink
                    key={link.name}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                    `uppercase transition ${
                        isActive
                        ? "text-primary underline underline-offset-4"
                        : "text-muted-foreground hover:text-primary"
                    }`
                    }
                >
                    {link.name}
                </NavLink>
                ))}

            {/* Mobile Search
            <input
              type="text"
              placeholder="Search..."
              className="mt-2 px-4 py-2 rounded-lg border border-muted bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            /> */}

            <div>
                <Button size="lg" variant="primary" className="w-full">
                    Contact Us
                </Button>
            </div>

            {/* Login Button */}
            <div className="flex items-center gap-4">
              {!token ? (
                <Link to="/admin/login">
                  <button className="px-6 py-2 rounded-full bg-primary text-white">
                    Admin Login
                  </button>
                </Link>
              ) : (
                <>
                  <Link to="/admin/products">
                    <button className="px-6 py-2 rounded-full border">
                      Admin
                    </button>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 rounded-full bg-black text-white"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
    </nav>
  );
};

export default Navbar;