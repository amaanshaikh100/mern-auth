import React, { useEffect } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  console.log(user);

  return (
    <div>
      <h1>Dashboard</h1>
      <img
        src={`http://localhost:4000/${user.imageCover.replace(/\\/g, "/")}`}
        alt="user profile"
      />
      <h2>Welcome {user.username}</h2>
      <a onClick={handleLogout} href="">
        {user ? "Logout" : ""}
      </a>
    </div>
  );
};

export default Dashboard;
