import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CompanyDetails() {
  const { id } = useParams(); // Get company ID from URL
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/companies/${id}`);
        setCompany(res.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
      setLoading(false);
    };

    fetchCompanyDetails();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 mt-5">Loading...</p>;
  if (!company) return <p className="text-center text-red-500 mt-5">Company not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800">{company.name}</h1>
      <p className="text-gray-600 mt-2">{company.description}</p>
      <p className="mt-3">
        <span className="font-bold">📍 Location:</span> {company.location}
      </p>
      <p className="mt-2">
        <span className="font-bold">🎓 CGPA Requirement:</span> {company.CGPAReq}
      </p>
      {company.website && (
        <p className="mt-2">
          <span className="font-bold">🔗 Website:</span>{" "}
          <a href={company.website} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
            {company.website}
          </a>
        </p>
      )}
    </div>
  );
}
