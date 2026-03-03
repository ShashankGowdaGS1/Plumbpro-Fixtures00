import { Navigate } from "react-router-dom";

// Utility function to check token validity outside of render
const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token || !isTokenValid(token)) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;
