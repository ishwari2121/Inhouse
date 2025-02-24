import React, { useState,useContext } from 'react'
import { Link } from "react-router-dom";
import { Menu ,X } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";


export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false); 
    const { user, logout } = useContext(AuthContext);

    return (

    <div className='relative'>
        <nav className="bg-gray-400 p-4 flex items-center justify-between">
          {/* Left Section: Menu Icon + Title */}
          <div className= "flex items-center space-x-3">
          <button onClick={()=> setIsOpen(true)} className="text-black">
            <Menu size={28} />
          </button>
            <h1 className="text-black text-2xl font-bold">TNP CELL</h1>
          </div>
    
          {/* Middle Section: Search Input */}
          <div className="flex-1 mx-4 max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 rounded-lg border border-black-300"
            />
          </div>
    
          {/* Right Section: Links */}
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="mr-4">Profile</Link>
            <button onClick={logout} className="bg-grey-500 px-3 py-1 rounded">Logout</button>
          </div>
        </nav>

        <div className={`fixed top-0 left-0 h-full w-1/2 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        {/* Close Button */}
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-600">
          <X size={28} />
        </button>

        {/* Menu Items */}
        <div className="flex flex-col h-full justify-between p-6">
            <div className='flex flex-col gap-3'>
                <button className="px-4 py-2 w-full text-lg bg-gray-200 rounded hover:bg-gray-300">Profile</button>
                <Link to="/view" className="px-4 py-2 w-full text-lg bg-gray-200 rounded hover:bg-gray-300 text-center flex justify-center">View all companies</Link>
                <Link to="/create" className="px-4 py-2 w-full text-lg bg-gray-200 rounded hover:bg-gray-300 text-center flex justify-center">New company to add</Link>
            </div>
          <button className="px-4 py-2 w-full text-lg bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
        </div>
      </div>
        </div>
      );
}
