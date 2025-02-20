import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all the details");
      return;
    } else if (!validRegex.test(email)) {
      alert("Please enter a valid email ID");
      return;
    }

    try {
      const response = await fetch("https://resume-builder-servers.vercel.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.status === 400 && data.message === "User already exists") {
        alert("User already exists. Please log in.");
      } else if (response.ok) {
        alert("Registration successful!");
        navigate("/");
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register. Please check your network or server.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handlePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {showPassword ? "🔓" : "🔒"}
            </button>
          </div>
          <p className="text-sm text-gray-600 text-center">
            Already have an account? <Link to="/" className="text-blue-500">Login</Link>
          </p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
