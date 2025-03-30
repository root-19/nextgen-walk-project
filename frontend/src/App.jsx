import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashboard from   "./components/admin/AdminDashboard";
import UserDashboard from "./components/user/UserDashboard";
import Walk from "./components/user/Walk";
import History from "./components/user/History";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/user/UserDashboard" element={<UserDashboard />} />
        <Route path="/user/Walk" element={<Walk />} />
        <Route path="/user/History" element={<History />} />
      </Routes>
    </Router>
  );
}
