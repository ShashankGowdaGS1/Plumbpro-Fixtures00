import { useEffect, useState } from "react";
import { adminApi } from "@/services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockProducts: [],
    recentSales: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      setError(error.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchStats}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-10">Dashboard Overview</h2>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">

        {/* TOTAL PRODUCTS */}
        <div className="bg-card border border-theme rounded-2xl p-8">
          <p className="text-muted-foreground mb-2">
            Total Products
          </p>
          <h3 className="text-4xl font-bold text-primary">
            {stats.totalProducts}
          </h3>
        </div>

        {/* TOTAL ORDERS */}
        <div className="bg-card border border-theme rounded-2xl p-8">
          <p className="text-muted-foreground mb-2">
            Total Orders
          </p>
          <h3 className="text-4xl font-bold text-primary">
            {stats.totalOrders}
          </h3>
        </div>

        {/* TOTAL REVENUE */}
        <div className="bg-card border border-theme rounded-2xl p-8">
          <p className="text-muted-foreground mb-2">
            Total Revenue
          </p>
          <h3 className="text-4xl font-bold text-primary">
            ₹{stats.totalRevenue?.toLocaleString() || 0}
          </h3>
        </div>

      </div>

      {/* LOW STOCK ALERTS */}
      {stats.lowStockProducts && stats.lowStockProducts.length > 0 && (
        <div className="bg-card border border-theme rounded-2xl p-8 mb-12">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Low Stock Alerts
          </h3>
          <div className="space-y-3">
            {stats.lowStockProducts.map((product) => (
              <div 
                key={product._id} 
                className="flex justify-between items-center p-3 bg-red-50 rounded-lg"
              >
                <span className="font-medium">{product.title}</span>
                <span className="text-red-600 font-semibold">
                  Only {product.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECENT SALES */}
      {stats.recentSales && stats.recentSales.length > 0 && (
        <div className="bg-card border border-theme rounded-2xl p-8">
          <h3 className="text-xl font-semibold mb-6">Recent Sales</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentSales.map((sale) => (
                  <tr key={sale._id} className="border-t border-theme">
                    <td className="px-4 py-3">
                      {sale.product?.title || "Unknown"}
                    </td>
                    <td className="px-4 py-3">{sale.quantity}</td>
                    <td className="px-4 py-3 font-semibold">
                      ₹{sale.totalAmount}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
