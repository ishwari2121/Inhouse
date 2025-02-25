import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import axios from "axios";

const ViewCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/companies/view");
        setCompanies(res.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Company List</h2>
      {companies.length === 0 ? (
        <p className="text-center text-gray-600">No companies available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Link to={`/company/${company._id}`} key={company._id} className="block">
              {/* ✅ Clickable Card */}
              <div className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-gray-800">{company.name}</h3>
                <p className="text-gray-600 mt-2">{company.description}</p>
                <p className="mt-2"><strong>📍 Location:</strong> {company.location}</p>
                <p><strong>🎓 CGPA Required:</strong> {company.CGPAReq}</p>
                <p className="text-gray-500 text-sm mt-3"><strong>🧑‍💼 Created By:</strong> {company.createdBy?.username || "Unknown"}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCompanies;
