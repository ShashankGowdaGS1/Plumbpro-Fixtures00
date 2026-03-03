import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button.jsx";

export const Hero = () => {
  return (
    <section className="pt-28 pb-20">
      <div className="container px-15 mx-auto">

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ================= LEFT SECTION ================= */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-border bg-primary/10 text-sm font-semibold uppercase text-primary mb-6">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              premium quality · since 1998
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-6xl uppercase font-bold text-secondary animate-bounce">
              Built For
              <span className="block text-primary">Every Flow.</span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-lg text-muted-foreground text-base sm:text-lg">
              Professional-grade plumbing fixtures crafted for durability,
              precision, and timeless design. From faucets to valves —
              engineered to last.
            </p>

            {/* CTA */}
            <div className="mt-8 flex gap-4">
              <Button size="lg" variant="secondary" className="group">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                View Catalog
              </Button>
            </div>

            {/* Stats */}
            <div className="flex mt-12 gap-12">
              <div>
                <p className="text-3xl font-bold">
                  500<span className="text-primary">+</span>
                </p>
                <p className="text-muted-foreground">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold">
                  12<span className="text-primary">K</span>
                </p>
                <p className="text-muted-foreground">Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold">
                  25<span className="text-primary">Y</span>
                </p>
                <p className="text-muted-foreground">Experience</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SECTION (DESKTOP ONLY) ================= */}
          <div className="hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden bg-[#14110c]">

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

              {/* Content */}
              <div className="relative p-10">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-8">
                  Featured Fixtures
                </p>

                {/* Featured Card */}
                <div className="relative mx-auto w-64 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 p-8 text-center mb-10 hover-lift">
                  <span className="absolute top-4 right-4 text-xs bg-primary text-white px-3 py-1 rounded-full">
                    NEW
                  </span>

                  <div className="text-5xl mb-4">🚿</div>
                  <p className="text-white font-semibold">Rain Shower Pro</p>
                  <p className="text-primary text-sm mt-1">From $89.99</p>
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 text-center hover-lift">
                    <div className="text-3xl mb-3">🚰</div>
                    <p className="text-white text-sm font-medium">Chrome Faucet</p>
                    <p className="text-primary text-xs mt-1">$49.99</p>
                  </div>

                  <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 text-center hover-lift">
                    <div className="text-3xl mb-3">🔩</div>
                    <p className="text-white text-sm font-medium">Ball Valve</p>
                    <p className="text-primary text-xs mt-1">$15.99</p>
                  </div>

                  <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6 text-center hover-lift">
                    <div className="text-3xl mb-3">🧰</div>
                    <p className="text-white text-sm font-medium">PVC Pipe Set</p>
                    <p className="text-primary text-xs mt-1">$29.99</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};