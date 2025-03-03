import { createContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';
// Create AuthContext
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage for user on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = (userData) => {
    console.log("Login Response in AuthContext:", userData); // Debugging line
  
    if (!userData.token) {
      console.error("No token received!");
      return;
    }
    const newUser = { ...userData.user, token: userData.token }; // ✅ Store token
    console.log("Updated User Data:", newUser); // Check stored user object
  
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };
  
  

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Successfully logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export AuthContext and AuthProvider
export { AuthContext, AuthProvider };
