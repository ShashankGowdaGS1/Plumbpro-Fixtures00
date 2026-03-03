import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { PriceRange } from "@/components/products/PriceRange";
import { useCart } from "@/context/CartContext";

const PRODUCTS_PER_PAGE = 6;
const MAX_CATEGORIES = 5;


const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ================= LIMIT CATEGORIES TO 5 ================= */
  const categories = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.category))];
    return ["ALL", ...unique.slice(0, MAX_CATEGORIES)];
  }, [products]);

  /* ================= COMBINED FILTER ================= */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        activeCategory === "ALL" || p.category === activeCategory;

      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());

      const matchPrice =
        p.price >= priceRange[0] && p.price <= priceRange[1];

      return matchCategory && matchSearch && matchPrice;
    });
  }, [products, activeCategory, search, priceRange]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  /* Reset page when filter changes */
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, search, priceRange]);

  return (
    <section className="bg-background overflow-hidden">

      {/* ================= HERO ================= */}
      <div className="relative bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/10" />
        <div className="relative container mx-auto px-6 py-28">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div>
              <span className="inline-block mb-4 px-4 py-2 text-sm rounded-full border border-primary/40 text-primary">
                PREMIUM FIXTURES
              </span>

              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                OUR <span className="text-primary">PRODUCTS</span>
              </h1>

              <p className="mt-6 text-white/60 max-w-xl">
                Professional-grade plumbing fixtures crafted for durability,
                precision, and timeless design.
              </p>
            </div>

            {/* Search */}
            <div className="flex w-full max-w-xl rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-6 py-4 bg-transparent text-white placeholder:text-white/60 focus:outline-none"
            />

            <button
              type="button"
              className="px-8 rounded-none rounded-r-xl bg-primary text-primary-foreground font-medium hover:opacity-90 active:scale-95 transition"
            >
              Search
            </button>
          </div>

          </div>
        </div>
      </div>

      {/* ================= PRODUCTS SECTION ================= */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[300px_1fr] gap-16">

            {/* ================= SIDEBAR ================= */}
            <aside className="flex flex-col gap-10">

              {/* CATEGORIES */}
              <div className="bg-card border border-theme rounded-2xl p-8">
                <div className="flex justify-between mb-6">
                  <h3 className="font-semibold">CATEGORIES</h3>
                  <button
                    className="text-primary text-sm"
                    onClick={() => setActiveCategory("ALL")}
                  >
                    CLEAR
                  </button>
                </div>

                <ul className="space-y-3">
                  {categories.map((c) => (
                    <li
                      key={c}
                      onClick={() => setActiveCategory(c)}
                      className={`px-4 py-2 rounded-xl cursor-pointer ${
                        activeCategory === c
                          ? "bg-muted font-semibold"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* PRICE RANGE */}
              <PriceRange value={priceRange} onChange={setPriceRange} />

            </aside>

            {/* ================= PRODUCTS ================= */}
            <main className="flex flex-col gap-10">

              <p className="text-muted-foreground">
                Showing{" "}
                <strong>{paginatedProducts.length}</strong> of{" "}
                <strong>{filteredProducts.length}</strong> products
              </p>

              {loading ? (
                <p>Loading products...</p>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {paginatedProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-card border border-theme rounded-2xl p-6 hover-lift transition"
                    >
                      {/* IMAGE */}
                      <div className="h-48 rounded-xl mb-4 overflow-hidden bg-muted">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center text-muted-foreground">
                            No Image
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-primary uppercase mb-1">
                        {product.category}
                      </p>

                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {product.title}
                      </h3>

                      <div className="flex justify-between items-center">
                        <span className="text-xl font-semibold">
                          ₹{product.price}
                        </span>
                        <Button size="sm" variant="secondary" onClick={() => addToCart(product)}>
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ================= PAGINATION ================= */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-3 pt-10">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`h-10 w-10 rounded-xl border ${
                        currentPage === i + 1
                          ? "bg-secondary text-white"
                          : "bg-card"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}

            </main>

          </div>
        </div>
      </div>

    </section>
  );
};

export default ProductsPage;