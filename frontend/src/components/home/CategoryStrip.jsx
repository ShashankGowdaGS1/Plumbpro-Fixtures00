import {
  Droplets,
  ShowerHeadIcon,
  Toilet,
  Settings,
  Wrench,
  Bath
} from "lucide-react";

const categories = [
  { name: "Faucets", icon: Droplets, active: true },
  { name: "Showers", icon: ShowerHeadIcon },
  { name: "Toilets", icon: Toilet },
  { name: "Valves", icon: Settings },
  { name: "Pipes", icon: Wrench },
  { name: "Sinks", icon: Bath },
];

export const CategoryStrip = () => {
  return (
    <section className="py-16 px-15 border-t border-border">
      <div className="container mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold uppercase text-secondary">
            Browse Categories
          </h2>
          <button className="text-primary uppercase text-sm font-semibold hover:underline hover:underline-offset-4">
            View All →
          </button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className={`
                  group cursor-pointer rounded-2xl border p-6 flex flex-col
                  items-center justify-center gap-3 text-center
                  transition-all duration-300
                  ${cat.active
                    ? "bg-secondary text-white border-secondary"
                    : "bg-primary-foreground border-border hover-lift"}
                `}
              >
                <Icon
                  className={`h-8 w-8 ${
                    cat.active
                      ? "text-white"
                      : "text-muted-foreground group-hover:text-primary"
                  }`}
                />
                <span className="uppercase text-sm font-semibold tracking-wide">
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};