import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(apiUrl);
    try {
      if (email.trim() == "" || password.trim() == "") {
        setError("Email or password can not be left blank...");
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
          setError(data.message || "Invalid credentials...");
        }
      }
    } catch (error) {
      setError("Something went wrong, Please try again...");
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex items-center">
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
      <div className="bg-white shadow-md rounded-lg p-8 w-96 mx-auto m-10">
        <div className="font-semibold mb-6">
          <h2 className="text-2xl mb-2">Sign In</h2>
          <h4 className="text-sm text-gray-400">
            Empower Your Day, One Task at a Time.
          </h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
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
              name="password"
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
        <div className="w-full bg-white text-gray-700 font-semibold py-[6px] rounded-[20px] border border-gray-400 hover:bg-gray-100 transition duration-200 text-center mt-4">
          New user?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Register now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
