import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, fetchUserDetails } = useAuth();
  const [loading, setLoading] = useState(true); // Add a loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          await fetchUserDetails(token); // Wait for fetchUserDetails to complete
        } else {
          navigate("/dashboard"); // Redirect to login if no token is found
        }
      } catch (err) {
        console.error("Error from ProtectedRoute:", err);
        navigate("/dashboard"); // Redirect to login on error
      } finally {
        setLoading(false); // Set loading to false after the request is complete
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner while checking authentication
  }

  if (!user) {
    navigate("/signup");
    return null; // Return nothing while redirecting (or use <Navigate to="/login" />)
  }

  return <div>{children}</div>; // Render the protected component if the user is authenticated
};

export default ProtectedRoute;
