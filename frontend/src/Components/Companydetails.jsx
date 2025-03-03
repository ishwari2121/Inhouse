import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/companies/${id}`);
        setCompany(res.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (!company) return <p className="text-center text-red-500">Company not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800">{company.name}</h2>
        <p className="text-gray-600 mt-2">{company.description}</p>
        <p><strong>📌 Role:</strong> {company.role}</p>
        <p><strong>📍 Location:</strong> {company.location}</p>
        <p><strong>🎓 Eligible Branches:</strong> {company.eligibleBranches.join(", ")}</p>
        <p><strong>📜 Criteria:</strong> {company.companyCriteria}</p>
        <p><strong>🎓 CGPA Required:</strong> {company.cgpa}</p>
        {company.website && (
          <p><strong>🌍 Website:</strong> 
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600"> Visit</a>
          </p>
        )}
        {company.stipend && <p><strong>💰 Stipend:</strong> {company.stipend}</p>}
        {company.studentsPlaced !== undefined && <p><strong>🎯 Students Placed:</strong> {company.studentsPlaced}</p>}

        {/* ✅ Correctly display LinkedIn profiles */}
        {company.linkedinProfiles.length > 0 && (
          <div>
            <p><strong>🔗 LinkedIn Profiles:</strong></p>
            <ul className="list-disc ml-5">
              {company.linkedinProfiles.map((profile, index) => (
                <li key={index} className="text-gray-700">
                  <a href={profile.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                    {profile.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-6">
          <Link to="/student" className="text-blue-500">← Back to Company List</Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
