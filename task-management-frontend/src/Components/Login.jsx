import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Login.css";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email.trim() === "" || password.trim() === "") {
        setError("Email or password cannot be blank.");
      } else {
        const response = await fetch(apiUrl + "auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        } else {
          setError(data.message || "Invalid credentials.");
        }
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
        setError("All fields are required.");
      } else {
        const response = await fetch(apiUrl + "auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          alert("Registration successful! Please log in.");
          setIsLogin(true);
        } else {
          setError(data.message || "Registration failed.");
        }
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Logo Section */}
      <div className="flex items-center mb-6">
        <img
          src={logo}
          alt="Collaborative Task Management System"
          className="w-14 h-auto"
        />
        <h1 className="text-xl md:text-2xl font-bold ml-2 text-blue-600">
          Collaborative Task
          <br />
          Management System
        </h1>
      </div>

      {/* Form Card */}
      <div
        className={`relative w-96 h-auto transition-transform duration-500 my-0 mx-auto ${
          isLogin ? "" : "rotate-y-180"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Login Form */}
        <div
          className="absolute bg-white shadow-md rounded-lg p-8 w-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
          <p className="text-sm text-gray-500 mb-6">
            Empower Your Day, One Task at a Time.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-600 mb-4 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-[20px] hover:bg-blue-700 transition duration-200"
            >
              Log In
            </button>
          </form>
          <button
            className="w-full bg-white text-gray-700 font-semibold py-2 rounded-[20px] border border-gray-400 hover:bg-gray-100 transition duration-200 mt-4"
            onClick={() => {
              setError(null);
              setIsLogin(false);
            }}
          >
            New user? <span className="text-blue-600 hover:underline">Register now</span>
          </button>
        </div>

        {/* Registration Form */}
        <div
          className="absolute bg-white shadow-md rounded-lg p-8 w-full"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <h2 className="text-2xl font-semibold mb-4">Register</h2>
          <p className="text-sm text-gray-500 mb-6">
            Create an account to get started.
          </p>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-600 mb-4 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-[20px] hover:bg-blue-700 transition duration-200"
            >
              Register
            </button>
          </form>
          <button
            className="w-full bg-white text-gray-700 font-semibold py-2 rounded-[20px] border border-gray-400 hover:bg-gray-100 transition duration-200 mt-4"
            onClick={() => {
              setError(null);
              setIsLogin(true);
            }}
          >
            Already have an account?{" "}
            <span className="text-blue-600 hover:underline">Log In</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
