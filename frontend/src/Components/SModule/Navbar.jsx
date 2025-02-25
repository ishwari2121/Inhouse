import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch companies from backend
  useEffect(() => {
    if (query.length < 2) {
      setCompanies([]);
      return;
    }

    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/companies/search?q=${query}`);
        const data = await res.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
      setLoading(false);
    };

    // Debounce API calls (waits 300ms after last input)
    const timeout = setTimeout(fetchCompanies, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative">
      <nav className="bg-gray-400 p-4 flex items-center justify-between">
        {/* Left Section: Menu Icon + Title */}
        <div className="flex items-center space-x-3">
          <button onClick={() => setIsOpen(true)} className="text-black">
            <Menu size={28} />
          </button>
          <h1 className="text-black text-2xl font-bold">TNP CELL</h1>
        </div>

        {/* Middle Section: Search Input */}
        <div className="relative flex-1 mx-4 max-w-md">
          <Search className="absolute left-3 top-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search companies..."
            className="w-full p-2 pl-10 rounded-lg border border-black-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Search Results Dropdown */}
          {query && (
            <div className="absolute mt-2 bg-white text-black rounded-lg shadow-lg w-full">
              {loading ? (
                <p className="p-2 text-gray-500">Loading...</p>
              ) : companies.length > 0 ? (
                companies.map((company) => (
                  <Link
                    key={company._id}
                    to={`/company/${company._id}`} // Redirect to company details page
                    className="block p-2 hover:bg-gray-100"
                  >
                    <p className="font-bold">{company.name}</p>
                    <p className="text-sm text-gray-600">{company.location}</p>
                  </Link>
                ))
              ) : (
                <p className="p-2 text-gray-500">No results found</p>
              )}
            </div>
          )}
        </div>

        {/* Right Section: Profile & Logout */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="mr-4">Profile</Link>
          <button onClick={logout} className="bg-gray-500 px-3 py-1 rounded">Logout</button>
        </div>
      </nav>

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 h-full w-1/2 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-600">
          <X size={28} />
        </button>

        <div className="flex flex-col h-full justify-between p-6">
          <div className="flex flex-col gap-3">
            <button className="px-4 py-2 w-full text-lg bg-gray-200 rounded hover:bg-gray-300">Profile</button>
            <Link to="/view" className="px-4 py-2 w-full text-lg bg-gray-200 rounded hover:bg-gray-300 text-center flex justify-center">
              View all companies
            </Link>
          </div>
          <button onClick={logout} className="px-4 py-2 w-full text-lg bg-red-500 text-white rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
