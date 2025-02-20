import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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

    if (!email || !password) {
      alert("Please fill in all the details");
      return;
    } else if (!validRegex.test(email)) {
      alert("Please enter a valid email ID");
      return;
    }

    try {
      const response = await fetch("https://resume-builder-servers.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok && data.message === "Success") {
        navigate("/resume");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative mt-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handlePasswordVisibility}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
              {showPassword ? "🔓" : "🔒"}
              </button>
        </div>

        <p className="mt-3 text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
        </p>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 mt-4 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
