import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect to login if no token
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Unauthorized Access");
        }

        const data = await response.json();
        setAdmin(data);
      } catch (err) {
        setError(err.message);
        localStorage.removeItem("token"); // Remove invalid token
        navigate("/login"); // Redirect to login page
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

        {loading && <p className="text-gray-500 mt-4">Loading...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {admin && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Welcome, {admin.username}!
            </h2>
            <p className="text-gray-500">Email: {admin.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
