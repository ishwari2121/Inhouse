import React, { useState, useContext} from 'react'
import { Link } from "react-router-dom";
import { Menu ,X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";


export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);


    return (

    <div className='relative'>
        <nav className="bg-gray-400 p-4 flex items-center justify-between">
          {/* Left Section: Menu Icon + Title */}
          <div className= "flex items-center space-x-3">
            <h1 className="text-black text-2xl font-bold">TNP CELL</h1>
          </div>
    
          {/* Right Section: Links */}
          <div className="flex items-center space-x-4">
            

            <Link to="/login" className="text-black hover:underline">Login</Link>
                        <Link to="/signup" className="text-black hover:underline">Signup</Link>
                        <Link to="/about" className="text-black hover:underline">About</Link>
          </div>
        </nav>
        </div>
      );
}
