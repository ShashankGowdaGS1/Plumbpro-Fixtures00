import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ Save token
      localStorage.setItem("adminToken", data.token);

      // ✅ Redirect to admin dashboard
      navigate("/admin");
    } catch (err) {
      setError("Server error", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleLogin}
        className="bg-card border border-theme rounded-2xl p-10 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

        {error && (
          <p className="text-red-500 mb-4 text-sm">{error}</p>
        )}

        <input
          type="text"
          placeholder="Admin Username"
          className="w-full mb-4 px-4 py-3 border border-theme rounded-xl"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 border border-theme rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" size="lg" className="w-full">
            Login
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;