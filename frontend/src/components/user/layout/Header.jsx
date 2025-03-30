import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <header className="bg-green-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/user/UserDashboard" className="text-white text-2xl font-bold">
            <span className="text-green-500">NextGen </span>Health
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 font-bold">
            <Link to="/user/UserDashboard" className="text-white hover:text-gray-200">home</Link>
            <Link to="/user/Walk" className="text-white hover:text-gray-200">Walk</Link>
            <Link to="/user/History" className="text-white hover:text-gray-200">History</Link>

            <button onClick={logout} className="text-white hover:text-gray-200">Logout</button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-green-700 font-bold">
          <Link to="/user/UserDashboard" className="block text-white px-4 py-2">Home</Link>
          <Link to="/user/Walk" className="block text-white px-4 py-2">Walk</Link>
          <Link to="/user/History" className="block text-white px-4 py-2">History</Link>
          <button onClick={logout} className="w-full text-left px-4 py-2 text-white">Logout</button>
        </div>
      )}
    </header>
  );
}
