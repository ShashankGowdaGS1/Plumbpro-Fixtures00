export const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-6 py-16">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-wide">
              PLUMB<span className="text-primary">PRO</span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Premium plumbing fixtures crafted for durability,
              performance, and timeless design.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary transition">About Us</li>
              <li className="hover:text-primary transition">Products</li>
              <li className="hover:text-primary transition">Categories</li>
              <li className="hover:text-primary transition">Contact</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary transition">Help Center</li>
              <li className="hover:text-primary transition">Warranty</li>
              <li className="hover:text-primary transition">Installation</li>
              <li className="hover:text-primary transition">FAQs</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@plumbpro.com</li>
              <li>+91 98765 43210</li>
              <li>Mon – Sat, 9AM – 6PM</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">

          <p>© {new Date().getFullYear()} <span className="text-primary/90">PlumbPro Fixtures</span> · All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-primary cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer">Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;