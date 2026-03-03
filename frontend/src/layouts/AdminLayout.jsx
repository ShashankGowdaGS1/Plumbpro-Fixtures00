import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, LogOut, BadgeIndianRupee } from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();

  const username = "Admin User"; // Later you can store this in localStorage

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-background">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-card border-r border-theme flex flex-col h-screen">

        {/* TOP CONTENT */}
        <div className="p-6 flex-1">

          <h2 className="text-xl font-bold mb-10">Admin Panel</h2>

          <nav className="flex flex-col gap-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-muted"
                }`
              }
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-muted"
                }`
              }
            >
              <Package size={18} />
              Products
            </NavLink>

            <NavLink
              to="/admin/sales"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-muted"
                }`
              }
            >
              <BadgeIndianRupee size={18} />
              Sales
            </NavLink>
          </nav>

        </div>

        {/* 🔻 FIXED BOTTOM LOGOUT */}
        <div className="p-6 border-t border-theme">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl cursor-pointer hover:bg-muted transition text-muted-foreground hover:text-red-500"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col">

        {/* ===== TOP HEADER ===== */}
        <header className="h-16 bg-card border-b border-theme flex items-center justify-between px-8">

          <h1 className="text-lg font-semibold">
            Dashboard Overview
          </h1>

          {/* USER SECTION */}
          <div className="flex items-center gap-3">

            <div className="text-sm font-medium">
              {username}
            </div>

            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              {getInitials(username)}
            </div>

          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-8 flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;