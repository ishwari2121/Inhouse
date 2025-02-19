import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Login from "../Pages/Login"
import Signup from "../Pages/Signup";
import Menubar from "../Pages/Menubar";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/menubar" element={<Menubar />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
