import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import axios from "axios";
import Swal from "sweetalert2";

export default function History() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [walkHistory, setWalkHistory] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 5; // Show only 5 records per page

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized: Please log in.");
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "Please log in to view your history.",
        confirmButtonColor: "#3085d6",
      }).then(() => navigate("/login"));
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserId(response.data.id);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Your session has expired. Redirecting to login...",
          confirmButtonColor: "#d33",
        }).then(() => {
          localStorage.removeItem("token");
          navigate("/login");
        });
      }
    };

    fetchUserProfile();
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;

    const fetchWalkHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/walk/history/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setWalkHistory(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error Fetching Data",
          text: "Failed to retrieve walk history. Please try again later.",
          confirmButtonColor: "#d33",
        });
      }
    };

    fetchWalkHistory();
  }, [userId]);

  // Paginate Data
  const paginatedData = walkHistory.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage
  );

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Walk History
          </h2>

          {walkHistory.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300">
              No walk records found.
            </p>
          ) : (
            <>
              <table className="w-full border-collapse border border-white text-white">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border border-white p-3 text-left">⏳ Time</th>
                    <th className="border border-white p-3 text-left">🔥 Calories</th>
                    <th className="border border-white p-3 text-left">👣 Steps</th>
                    <th className="border border-white p-3 text-left">📏 Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((walk, index) => (
                    <tr key={index} className="border-t border-white">
                      <td className="border border-white p-3">{walk.elapsedTime} min</td>
                      <td className="border border-white p-3">{walk.caloriesBurned} kcal</td>
                      <td className="border border-white p-3">{walk.steps}</td>
                      <td className="border border-white p-3">{walk.distance} km</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-end mt-4">
                <button
                  className={`px-4 py-2 bg-blue-500 text-white rounded ${
                    (currentPage + 1) * recordsPerPage >= walkHistory.length ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={(currentPage + 1) * recordsPerPage >= walkHistory.length}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next ➡️
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
