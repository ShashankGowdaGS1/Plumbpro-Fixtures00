import {
  Droplets,
  ShowerHeadIcon,
  Toilet,
  Settings,
} from "lucide-react";

import { Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button.jsx";

const products = [
  {
    id: 1,
    tag: "-20%",
    tagColor: "bg-red-500",
    icon: Droplets,
    category: "Faucets",
    title: "Chrome Pull-Down Kitchen Faucet",
    price: 47.99,
    oldPrice: 59.99,
    rating: 4.5,
    reviews: 142,
    bg: "bg-[#e8e2d9]",
  },
  {
    id: 2,
    tag: "NEW",
    tagColor: "bg-primary",
    icon: ShowerHeadIcon,
    category: "Showers",
    title: "Rainfall Shower Head — 12 Inch",
    price: 89.99,
    rating: 4.6,
    reviews: 89,
    bg: "bg-[#dfeceb]",
  },
  {
    id: 3,
    tag: "TOP PICK",
    tagColor: "bg-black",
    icon: Toilet,
    category: "Toilets",
    title: "Dual Flush Elongated Toilet",
    price: 199.99,
    rating: 4.7,
    reviews: 63,
    bg: "bg-[#e6dcdf]",
  },
  {
    id: 4,
    tag: "-10%",
    tagColor: "bg-red-500",
    icon: Settings,
    category: "Valves",
    title: `Brass Ball Valve 1" Full Port`,
    price: 13.99,
    oldPrice: 15.99,
    rating: 4.4,
    reviews: 210,
    bg: "bg-[#dde4d6]",
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="py-20 px-15 border-t border-border">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-bold uppercase text-secondary">
              Featured Products
            </h2>
            <p className="text-muted-foreground mt-2">
              Handpicked for quality and performance
            </p>
          </div>

          <button className="text-primary uppercase text-sm font-semibold hover:underline underline-offset-4">
            See All Products →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="group rounded-2xl border border-border hover:border-primary/60 bg-card overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              {/* Image area */}
              <div className={`relative h-48 ${p.bg} flex items-center justify-center`}>
                <span className={`absolute top-4 left-4 text-xs text-white px-3 py-1 rounded-full ${p.tagColor}`}>
                  {p.tag}
                </span>

                <button className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white flex items-center justify-center">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </button>

                <div className="h-20 w-20 bg-white rounded-xl">
                  <p.icon className="h-8 w-8 text-muted-foreground mx-auto mt-6" />
                </div>
                
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs uppercase text-primary font-semibold">
                  {p.category}
                </p>

                <h3 className="font-semibold mt-2 leading-snug">
                  {p.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2 text-sm">
                  {"★★★★★".slice(0, Math.round(p.rating))}
                  <span className="text-muted-foreground">
                    ({p.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-lg font-bold">
                      ${p.price}
                    </span>
                    {p.oldPrice && (
                      <span className="ml-2 text-sm line-through text-muted-foreground">
                        ${p.oldPrice}
                      </span>
                    )}
                  </div>

                  <Button size="sm" variant="secondary" className="h-11 w-11 rounded-xl">
                    <Plus className="text-primary-foreground"/>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Banner */}
        <div className="mt-20 rounded-3xl bg-secondary text-white px-10 py-14 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/20 text-primary text-xs uppercase font-semibold ">
              <span className="animate-ping">⚡</span> Limited Time Offer
            </span>

            <h3 className="text-4xl font-bold mt-6">
              Summer Sale <br />
              <span className="block text-primary mt-2 typing-loop w-fit">
                Up to 30% Off
              </span>
            </h3>

            <p className="text-muted-foreground mt-4 max-w-lg">
              On all premium faucets and shower systems.
              Use code: <strong>PLUMB30</strong>
            </p>
          </div>

          <button className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 transition">
            Claim Offer →
          </button>
        </div>

      </div>
    </section>
  );
};