import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./layout/Header";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized: Please log in.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setError("Session expired. Redirecting...");
          setTimeout(() => {
            localStorage.removeItem("token");
            navigate("/login");
          }, 2000);
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError("Network error. Please try again.");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 text-center transition-transform transform hover:scale-105">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
        
          </h1>

          {error ? (
            <p className="text-red-500 mt-4">{error}</p>
          ) : user ? (
            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Welcome, {user.username}! 🎉
              </h2>
               <p>{user.id}</p>
              <p className="text-gray-600 dark:text-gray-300">
             {user.email}
              </p>

              {/* <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300"
              >
                Logout
              </button> */}
            </div>
          ) : (
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
