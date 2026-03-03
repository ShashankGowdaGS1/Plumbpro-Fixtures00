import { ArrowRight, Mail, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";

const AboutPage = () => {
  return (
    <section className="bg-background overflow-hidden">

      {/* DARK HERO AREA */}
      <div className="relative px-10 bg-secondary text-secondary-foreground">

        {/* Primary glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* HERO CONTENT */}
        <div className="relative pt-32 pb-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Our Story · Since 1998
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-tight">
                Built on Trust,
                <br />
                <span className="text-primary typing-loop">Driven by Quality.</span>
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-2xl text-muted-foreground text-lg leading-relaxed">
                Since 1998, PlumbPro has been the trusted name in professional plumbing
                fixtures. We supply homes, contractors, and businesses with products
                built to last — combining precision engineering with timeless design.
              </p>

              {/* Actions */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" variant="primary" className="group">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="flex items-center gap-2 text-secondary-foreground border-primary/30"
                >
                  <Mail className="h-4 w-4" />
                  Contact Us
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="relative -mt-16 px-10">
        <div className="container mx-auto px-6">
          <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 text-center divide-x divide-border">

              <div className="py-12 space-y-2">
                <h3 className="text-4xl font-extrabold text-secondary">
                  25<span className="text-primary">+</span>
                </h3>
                <p className="text-sm uppercase tracking-wide text-muted-foreground">
                  Years Experience
                </p>
              </div>

              <div className="py-12 space-y-2">
                <h3 className="text-4xl font-extrabold text-secondary">
                  500<span className="text-primary">+</span>
                </h3>
                <p className="text-sm uppercase tracking-wide text-muted-foreground">
                  Products Available
                </p>
              </div>

              <div className="py-12 space-y-2">
                <h3 className="text-4xl font-extrabold text-secondary">
                  12<span className="text-primary">K+</span>
                </h3>
                <p className="text-sm uppercase tracking-wide text-muted-foreground">
                  Happy Clients
                </p>
              </div>

              <div className="py-12 space-y-2">
                <h3 className="text-4xl font-extrabold text-secondary">
                  98<span className="text-primary">%</span>
                </h3>
                <p className="text-sm uppercase tracking-wide text-muted-foreground">
                  Satisfaction Rate
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* MISSION & VISION */}
      <div className="py-24 px-10 bg-background">
        <div className="container mx-auto px-6">

            {/* Section Header */}
            <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Who We Are
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-secondary">
                Mission & <span className="text-primary">Vision</span>
            </h2>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-8">

            {/* Mission */}
            <div className="bg-muted border border-border rounded-2xl p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">

                <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                    ✓
                </div>
                <h3 className="text-lg font-bold uppercase text-secondary">
                    Our Mission
                </h3>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                To make premium-grade plumbing fixtures accessible to every homeowner,
                contractor, and developer — without compromising on quality, durability,
                or style. We exist to make your spaces work better.
                </p>
            </div>

            {/* Vision */}
            <div className="bg-muted border border-border rounded-2xl p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">

                <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                    🏆
                </div>
                <h3 className="text-lg font-bold uppercase text-secondary">
                    Our Vision
                </h3>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                To be India's most trusted plumbing fixtures brand — known for innovation,
                sustainability, and unwavering commitment to customer satisfaction.
                We aim to set the standard, not just meet it.
                </p>
            </div>

            </div>
        </div>
      </div>

      {/* CORE VALUES */}
      <div className="py-24 px-10 bg-background border-t border-border">
        <div className="container mx-auto px-6">

            {/* Header */}
            <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                <span className="h-2 w-2 rounded-full bg-primary" />
                What We Stand For
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-secondary">
                Our Core <span className="text-primary">Values</span>
            </h2>
            </div>

            {/* Values Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {/* Value 1 */}
            <div className="bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                🛡️
                </div>
                <h3 className="font-bold uppercase mb-3 text-secondary">
                Quality Assured
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                Every fixture passes rigorous quality checks. We never compromise
                on standards.
                </p>
            </div>

            {/* Value 2 */}
            <div className="bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                🏅
                </div>
                <h3 className="font-bold uppercase mb-3 text-secondary">
                Industry Certified
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                Our products meet all national and international plumbing
                certifications.
                </p>
            </div>

            {/* Value 3 */}
            <div className="bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                👥
                </div>
                <h3 className="font-bold uppercase mb-3 text-secondary">
                Customer First
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                Our support team is always ready to assist before and after
                purchase.
                </p>
            </div>

            {/* Value 4 */}
            <div className="bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                ⚡
                </div>
                <h3 className="font-bold uppercase mb-3 text-secondary">
                Fast Delivery
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                Reliable logistics ensure your orders arrive on time, every time.
                </p>
            </div>

            </div>
        </div>
      </div>

      {/* OUR JOURNEY */}
        <div className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6">

            {/* Header */}
            <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                <span className="h-2 w-2 rounded-full bg-primary" />
                How Far We've Come
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-secondary">
                Our <span className="text-primary">Journey</span>
            </h2>
            </div>

            {/* Timeline */}
            <div className="relative max-w-3xl mx-auto">

            {/* Vertical Line */}
            <div className="absolute left-3 top-0 h-full w-[2px] bg-border" />

            <div className="space-y-16">

                {/* Item */}
                {[
                {
                    year: "1998",
                    text: "PlumbPro founded with a passionate team of 3."
                },
                {
                    year: "2005",
                    text: "Expanded product line to over 200 premium fixtures."
                },
                {
                    year: "2012",
                    text: "Launched e-commerce platform reaching customers nationwide."
                },
                {
                    year: "2018",
                    text: "Crossed 10,000 satisfied customers milestone."
                },
                {
                    year: "2024",
                    text: "Introduced smart plumbing fixture range."
                }
                ].map((item, index) => (
                <div key={index} className="relative pl-12">

                    {/* Dot */}
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-primary border-4 border-background" />

                    {/* Content */}
                    <div>
                    <p className="text-sm font-semibold text-primary mb-1">
                        {item.year}
                    </p>
                    <p className="text-secondary leading-relaxed">
                        {item.text}
                    </p>
                    </div>

                </div>
                ))}

            </div>
            </div>

        </div>
        </div>
      {/* MEET THE TEAM */}
        <div className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6">

            {/* Header */}
            <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                <span className="h-2 w-2 rounded-full bg-primary" />
                The People Behind PlumbPro
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-secondary">
                Meet the <span className="text-primary">Team</span>
            </h2>
            </div>

            {/* Team Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* Card 1 */}
            <div className="bg-card border border-border rounded-2xl p-10 text-center hover-lift">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-lg font-bold">
                JC
                </div>

                <h3 className="text-lg font-semibold text-secondary">
                James Carter
                </h3>
                <p className="text-xs uppercase tracking-wide text-primary font-semibold mt-1">
                Founder & CEO
                </p>

                <p className="mt-4 text-muted-foreground leading-relaxed">
                25 years in the plumbing industry. Passionate about bringing
                professional-grade fixtures to everyone.
                </p>
            </div>

            {/* Card 2 */}
            <div className="bg-card border border-border rounded-2xl p-10 text-center hover-lift">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-lg font-bold">
                MS
                </div>

                <h3 className="text-lg font-semibold text-secondary">
                Maria Santos
                </h3>
                <p className="text-xs uppercase tracking-wide text-primary font-semibold mt-1">
                Head of Product
                </p>

                <p className="mt-4 text-muted-foreground leading-relaxed">
                Expert in fixture design and quality assurance. Ensures every
                product meets our high standards.
                </p>
            </div>

            {/* Card 3 */}
            <div className="bg-card border border-border rounded-2xl p-10 text-center hover-lift">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-lg font-bold">
                DK
                </div>

                <h3 className="text-lg font-semibold text-secondary">
                David Kim
                </h3>
                <p className="text-xs uppercase tracking-wide text-primary font-semibold mt-1">
                Lead Engineer
                </p>

                <p className="mt-4 text-muted-foreground leading-relaxed">
                Mechanical engineer with a decade of experience designing
                durable, efficient plumbing systems.
                </p>
            </div>

            </div>
        </div>
        </div>
      {/* FINAL CTA */}
        <div className="py-24 lg:px-10 bg-background border-t border-border">
        <div className="container mx-auto px-6">

            <div className="relative overflow-hidden rounded-3xl bg-secondary text-secondary-foreground px-8 py-20 text-center">

            {/* Primary glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {/* Grid lines */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
                }}
            />

            {/* Content */}
            <div className="relative max-w-3xl mx-auto">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                <div className="h-12 w-12 rounded-full flex items-center justify-center">
                    <Wrench className="w-10 h-10"/>
                </div>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Let’s Work Together
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-tight">
                Ready to Find Your{" "}
                <span className="text-primary">Perfect Fixture?</span>
                </h2>

                {/* Description */}
                <p className="mt-6 text-muted-foreground text-lg">
                Browse our full catalog of 500+ fixtures or get in touch for custom
                orders, bulk pricing, or project consultations.
                </p>

                {/* Actions */}
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="primary" className="group">
                    Browse Products
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                    size="lg"
                    variant="secondary"
                    className="flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(196,106,27,0.35)] transition-all"
                >
                    <Mail className="h-4 w-4" />
                    Contact Us
                </Button>
                </div>

            </div>
            </div>
        </div>
        </div>  

    </section>
  );
};

export default AboutPage;