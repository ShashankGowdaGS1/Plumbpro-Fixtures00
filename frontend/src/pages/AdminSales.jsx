import { useEffect, useState } from "react";
import { salesApi } from "@/services/api";

const AdminSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await salesApi.getAll();
      // Handle both old format (array) and new format (object with sales)
      setSales(data.sales || data);
    } catch (err) {
      console.error("Failed to fetch sales:", err);
      setError(err.message || "Failed to load sales");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading sales...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchSales}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Sales</h2>
        <p className="text-muted-foreground">
          {sales.length} order{sales.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="bg-card border border-theme rounded-xl overflow-hidden">
        {sales.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No sales yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale._id} className="border-t border-theme">
                    <td className="px-6 py-4">
                      {sale.product?.title || "Unknown Product"}
                    </td>
                    <td className="px-6 py-4">{sale.quantity}</td>
                    <td className="px-6 py-4 font-semibold">₹{sale.totalAmount}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSales;
