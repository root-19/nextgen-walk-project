import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import axios from "axios";
import Swal from "sweetalert2";

export default function Walk() {
  const navigate = useNavigate();
  const [walking, setWalking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [userId, setUserId] = useState(null);
  const [userWeight, setUserWeight] = useState(70); // Default weight (kg)
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [gender, setGender] = useState("male");
  const [motionDetected, setMotionDetected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTimeout(() => navigate("/login"), 2000);
      return;
    }
    axios.get("http://localhost:5000/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setUserId(response.data.id);
        setUserWeight(response.data.weight || 70); // Set weight from user profile
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    let interval;
    if (walking) {
      interval = setInterval(() => {
        const minutesWalked = (Date.now() - startTime) / 60000;
        setElapsedTime(minutesWalked.toFixed(1));

        //MET based on walking speed
        let MET = minutesWalked < 10 ? 2.0 : minutesWalked < 20 ? 3.8 : 5.0;
        const hoursWalked = minutesWalked / 60;
        const calories = MET * userWeight * hoursWalked;

        setCaloriesBurned(calories.toFixed(2));

        const stepsTaken = Math.floor(minutesWalked * 120);
        setSteps(stepsTaken);
        setDistance(((stepsTaken * 0.8) / 1000).toFixed(2));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [walking, startTime, userWeight]);

  useEffect(() => {
    if (walking) {
      window.addEventListener("devicemotion", detectMotion);
    } else {
      window.removeEventListener("devicemotion", detectMotion);
    }
    return () => window.removeEventListener("devicemotion", detectMotion);
  }, [walking]);

  const detectMotion = (event) => {
    if (event.accelerationIncludingGravity.x > 1 || event.accelerationIncludingGravity.y > 1) {
      setMotionDetected(true);
    }
  };

  const startWalking = () => {
    setWalking(true);
    setStartTime(Date.now());
  };

  const stopWalking = () => {
    setWalking(false);
    setShowSavePopup(true);
  };

  const confirmSaveWalk = async () => {
    try {
      await axios.post("http://localhost:5000/api/walk/save", {
        user_id: userId,
        elapsedTime,
        caloriesBurned,
        steps,
        distance,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      Swal.fire({ icon: "success", title: "Walk session saved!", text: "Your walk data has been saved successfully." })
        .then(() => window.location.reload());
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Could not save walk session." });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header />
      {walking && motionDetected && (
        <div className="fixed top-5 right-5 bg-blue-500 text-white p-3 rounded-lg shadow-lg">🚶‍♂️ Walking...</div>
      )}
      {showSavePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-xl font-bold mb-4">Save Walk Data?</p>
            <button onClick={confirmSaveWalk} className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md mr-2">✅ Yes, Save</button>
            <button onClick={() => setShowSavePopup(false)} className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md">❌ Cancel</button>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Walk Tracker</h2>
          <div className="grid grid-cols-2 gap-4">
            <StatBox title="⏳ Time" value={`${elapsedTime} min`} />
            <StatBox title="🔥 Calories" value={`${caloriesBurned} kcal`} color="text-green-600" />
            <StatBox title="👣 Steps" value={steps} color="text-blue-600" />
            <StatBox title="📏 Distance" value={`${distance} km`} color="text-purple-600" />
          </div>
          <button onClick={walking ? stopWalking : startWalking} className={`mt-6 px-8 py-3 rounded-lg shadow-lg w-full ${walking ? "bg-red-500" : "bg-green-700"} text-white`}>
            {walking ? "Stop Walking" : "Start Walk"}
          </button>
        </div>
      </div>
    </div>
  );
}

const StatBox = ({ title, value, color = "text-gray-800" }) => (
  <div className="bg-gray-200 p-4 rounded-lg text-center shadow-md">
    <p className="text-sm font-semibold text-gray-600">{title}</p>
    <p className={`text-xl font-bold ${color}`}>{value}</p>
  </div>
);
