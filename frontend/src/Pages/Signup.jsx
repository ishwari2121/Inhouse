import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert("Signup Successful");
      console.log(res.data);
    } catch (error) {
      alert("Signup Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Create an Account</h2>
        

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="username" 
            placeholder="Full Name" 
            onChange={handleChange} 
            required 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          
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
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
