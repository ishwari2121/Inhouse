import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function createcompany() {
      const navigate = useNavigate();

    const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "", description: "", location: "", CGPAReq: "", website: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User object:", user);
    console.log("Token being sent:", user?.token);

    try {
      const res = await axios.post("http://localhost:5000/api/companies/create", formData, {
        headers: { Authorization: `Bearer ${user.token}` }
    });
      alert(res.data.message);
      navigate("/admin");
      console.log(res.data.message);
      setFormData({ name: "", description: "", location: "", CGPAReq: "", website: "" });
    } catch (error) {
      alert("Failed to create company");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add a Company</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Company Name" onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required className="w-full p-2 border" />
        <input type="number" name="CGPAReq" placeholder="CGPA Required" onChange={handleChange} className="w-full p-2 border" />
        <input type="text" name="website" placeholder="Website" onChange={handleChange} className="w-full p-2 border" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Company</button>
      </form>
    </div>
  );
}
