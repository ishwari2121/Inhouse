import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useContext, createContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/AdminDashboard";
import StudentDashboard from "./Pages/StudentDashboard";
import Profile from "./Pages/Profile";
import Create from "./Pages/Teacher/createcompany";
import View from "./Pages/viewcompanies";
import CompanyDetails from "./Components/Companydetails";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./Pages/ResetPassword";
import PostQue from "./Components/SModule/PostQue";
import ViewQues from "./Components/SModule/ViewQues";

// ✅ Create and export resetContext
export const resetContext = createContext(null);

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
};

const App = () => {
  const [email, setEmail] = useState(""); // ✅ Store email globally

  return (
    <resetContext.Provider value={{ email, setEmail }}>  {/* ✅ Provide context */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
          <Route path="/company/:id" element={<CompanyDetails />} />
          <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
          <Route path="/student" element={<PrivateRoute role="student"><StudentDashboard /></PrivateRoute>} />
          <Route path="/login/reset-password" element={<ResetPassword />} />
          <Route path="/api/question/save/:id" element={<PostQue/>}/>
          <Route path="/api/question/view/:id" element={<ViewQues/>}/>
        </Routes>
      <Toaster />
    </resetContext.Provider>
  );
};

export default App;
