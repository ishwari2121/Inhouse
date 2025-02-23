import React, { useState,useContext  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";


const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      console.log("Login Response:", res.data);
      login(res.data);
      navigate(res.data.user.role === "admin" ? "/admin" : "/student");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Welcome Back</h2>
        

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            onChange={handleChange} 
            required 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
