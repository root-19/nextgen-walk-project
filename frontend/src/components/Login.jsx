import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-r from-green-200 to-green-500">
      <motion.div 
        className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl border border-gray-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-gray-900 text-center">Login</h2>
        
        <motion.div className="mt-6 space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {/* Email Input */}
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          
          {/* Password Input */}
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 shadow-sm"
          />

          {/* Login Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
           className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition-transform"
          >
            Login
          </motion.button>
          
          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <motion.span 
              whileHover={{ scale: 1.1 }}
              className="text-green-500 cursor-pointer hover:underline" 
              onClick={() => navigate("/register")}
            >
              Register
            </motion.span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
