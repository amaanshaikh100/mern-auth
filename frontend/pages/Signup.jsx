import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageCover, setImageCover] = useState("");

  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup({ username, email, password, imageCover });

    setUsername("");
    setEmail("");
    setPassword("");

    navigate("/dashboard");
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          type="text"
          value={username}
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          value={email}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="text"
          value={password}
        />
        <input
          type="file"
          placeholder="Upload file"
          onChange={(e) => setImageCover(e.target.files[0])}
        />

        <button onClick={handleSignup}>Submit</button>
      </form>
    </div>
  );
};

export default Signup;
