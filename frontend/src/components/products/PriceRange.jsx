import { useState } from "react";

export const PriceRange = () => {
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(250);

  return (
    <div className="bg-card rounded-2xl border border-theme p-8">
      <h3 className="font-semibold mb-8">PRICE RANGE</h3>

      {/* Track */}
      <div className="relative h-1 bg-muted rounded-full mb-8">

        {/* Active Bar */}
        <div
          className="absolute h-1 bg-primary rounded-full left-0"
          style={{
            width: `${((maxPrice - minPrice) / 250) * 100}%`,
          }}
        />

        {/* Min */}
        <input
          type="range"
          min="0"
          max="250"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(Math.min(+e.target.value, maxPrice - 10))
          }
          className="absolute w-full h-1 opacity-0 cursor-pointer"
        />

        {/* Max */}
        <input
          type="range"
          min="0"
          max="250"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Math.max(+e.target.value, minPrice + 10))
          }
          className="absolute w-full h-1 opacity-0 cursor-pointer"
        />
      </div>

      {/* Values */}
      <div className="flex justify-between text-sm">
        <span>Min: <strong>${minPrice}</strong></span>
        <span>Max: <strong>${maxPrice}</strong></span>
      </div>
    </div>
  );
};