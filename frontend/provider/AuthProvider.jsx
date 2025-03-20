import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user as null
  const [loading, setLoading] = useState(true); // Initialize loading as true

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUserDetails(token);
    } else {
      setLoading(false); // Set loading to false if no token is found
    }
  }, []);

  // Signup function
  const signup = async (userData) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:4000/api/v1/signup",
        data: userData, // Send userData directly
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Place withCredentials at the top level
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token); // Save token to localStorage

        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  // Fetch user details function
  const fetchUserDetails = async (token) => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:4000/api/v1/dashboard",
        headers: {
          authorization: `Bearer ${token}`, // Use lowercase "headers"
        },
      });

      setUser(res.data.data.user); // Update user state with the response data
      console.log(`Auth Provider: ${user}`);
    } catch (err) {
      console.error("Failed to fetch user details", err);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  // Login function (you need to implement this)
  const login = async (credentials) => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:4000/api/v1/login",
        data: credentials,
        withCredentials: true,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token); // Save token to localStorage
        setUser(res.data.user); // Update user state with the response data
        console.log(user);
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  // Logout function (you can implement this if needed)
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Clear user state
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, fetchUserDetails, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
