import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch("http://localhost:5000/api/admin/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setStats(data);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-10">Dashboard Overview</h2>

      <div className="grid md:grid-cols-3 gap-8">

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
            ₹{stats.totalRevenue}
          </h3>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;