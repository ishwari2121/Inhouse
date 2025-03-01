import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateCompany() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get logged-in user info
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    cgpa: "",
    website: "",
    companyType: "Internship",
    eligibleBranches: "",
    role: "",
    companyCriteria: "",
    stipend: "",
    studentsPlaced: "",
    linkedinProfiles: [],
    createdBy: user?._id || "", // Ensure createdBy is set
  });

  // State for LinkedIn Input
  const [linkedinName, setLinkedinName] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add LinkedIn Profile (Name & URL)
  const addLinkedInProfile = () => {
    if (linkedinName.trim() && linkedinUrl.trim()) {
      setFormData({
        ...formData,
        linkedinProfiles: [
          ...formData.linkedinProfiles,
          { name: linkedinName.trim(), url: linkedinUrl.trim() },
        ],
      });
      setLinkedinName(""); // Clear input
      setLinkedinUrl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create a company.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/companies/create", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert(res.data.message);
      navigate("/admin");
      setFormData({
        name: "",
        description: "",
        location: "",
        cgpa: "",
        website: "",
        companyType: "Internship",
        eligibleBranches: "",
        role: "",
        companyCriteria: "",
        stipend: "",
        studentsPlaced: "",
        linkedinProfiles: [],
        createdBy: user?._id, // Reset to ensure correct user ID
      });
    } catch (error) {
      alert("Failed to create company");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add a Company</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="companyType" onChange={handleChange} value={formData.companyType} className="w-full p-2 border">
          <option value="Internship">Internship</option>
          <option value="Placement">Placement</option>
        </select>
        <input type="text" name="name" placeholder="Company Name" onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required className="w-full p-2 border" />
        <input type="text" name="cgpa" placeholder="CGPA Required" onChange={handleChange} className="w-full p-2 border" />
        <input type="text" name="website" placeholder="Website" onChange={handleChange} className="w-full p-2 border" />
        <input type="text" name="eligibleBranches" placeholder="Eligible Branches" onChange={handleChange} className="w-full p-2 border" />
        <input type="text" name="role" placeholder="Role" onChange={handleChange} className="w-full p-2 border" />
        <input type="text" name="companyCriteria" placeholder="Company Criteria" onChange={handleChange} className="w-full p-2 border" />
        <input type="text" name="stipend" placeholder="Stipend" onChange={handleChange} className="w-full p-2 border" />
        <input type="number" name="studentsPlaced" placeholder="Students Placed" onChange={handleChange} className="w-full p-2 border" />

        {/* ✅ LinkedIn Profile Input */}
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Profile Name"
            value={linkedinName}
            onChange={(e) => setLinkedinName(e.target.value)}
            className="w-full p-2 border"
          />
          <input
            type="text"
            placeholder="Profile URL"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className="w-full p-2 border"
          />
          <button type="button" onClick={addLinkedInProfile} className="bg-green-500 text-white p-2 rounded">Add Profile</button>
        </div>

        {/* ✅ Display Added LinkedIn Profiles */}
        {formData.linkedinProfiles.length > 0 && (
          <ul className="list-disc ml-5 mt-2">
            {formData.linkedinProfiles.map((profile, index) => (
              <li key={index} className="text-gray-700">
                <a href={profile.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {profile.name}
                </a>
              </li>
            ))}
          </ul>
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Company</button>
      </form>
    </div>
  );
}
