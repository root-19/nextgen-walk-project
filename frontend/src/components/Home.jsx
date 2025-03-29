import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-blue-50 to-gray-100">
      <motion.div 
        className="w-full max-w-lg p-8 text-center bg-white shadow-xl rounded-2xl border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-extrabold text-gray-900">Welcome to Walk-In</h1>
        <p className="mt-4 text-lg text-gray-700">
          Join us in leading a healthier lifestyle. Track your progress and stay motivated.
        </p>
        <button
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-md"
          onClick={() => navigate("/Register")}
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
}
