import { useEffect, useState } from "react";

const AdminSales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch("http://localhost:5000/api/sales", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setSales(data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Sales</h2>

      <div className="bg-card border border-theme rounded-xl overflow-hidden">
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
                  {sale.product?.title}
                </td>
                <td className="px-6 py-4">{sale.quantity}</td>
                <td className="px-6 py-4">₹{sale.totalAmount}</td>
                <td className="px-6 py-4">
                  {new Date(sale.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSales;