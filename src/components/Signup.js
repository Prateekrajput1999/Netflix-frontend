import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { API_URL, BACKEND_URL, FRONTEND_URL } from "../Constants";
import { Spinner } from "./UI/Spinner";

export default function Signup({ initialType = "signup" }) {
  const [type, setType] = useState(initialType);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const isSignup = type === "signup";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/movies");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isLoading) return;
    try {
      if (isSignup) {
        setIsLoading(true);
        await axios.post(`${API_URL}signup/`, { email, password, name });
        setType("login"); // Switch to login after successful signup
      } else {
        setIsLoading(true);
        const response = await axios.post(`${API_URL}login/`, {
          email,
          password,
        });
        Cookies.set("signup_accesstoken", response?.data?.accesstoken, {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error(`Error during ${isSignup ? "signup" : "login"}:`, e);
      setError(
        isSignup
          ? "Signup failed. Please try again."
          : "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-75 bg-blend-overlay bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')]">
      <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          {isSignup ? "Sign Up" : "Log In"}
        </h2>
        <div className="flex items-center justify-center space-x-3">
          <div
            onClick={() => window.open(FRONTEND_URL, "_blank")}
            className=" cursor-pointer shadow-md shadow-yellow-400 hover:bg-gray-800 flex items-center text-white border text-xs font-bold border-white rounded-lg p-1"
          >
            <img alt="github_img" src="github.svg" className="h-6 w-6" />
            <span>Frontend</span>
          </div>
          <div
            onClick={() => window.open(BACKEND_URL, "_blank")}
            className=" cursor-pointer shadow-md shadow-yellow-400 hover:bg-gray-800 flex items-center text-white border text-xs font-bold border-white rounded-lg p-1"
          >
            <img alt="github_img" src="github.svg" className="h-6 w-6" />
            <span>Backend</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Your name"
                required
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
              isLoading
                ? "cursor-default text-gray-300 bg-red-500"
                : "text-white bg-red-600 hover:bg-red-700"
            }`}
          >
            {isSignup ? "Sign Up" : "Log In"}
            {isLoading && <Spinner className="ml-2" variant="lens" size="sm" />}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setType(isSignup ? "login" : "signup")}
            disabled={isLoading}
            className={`text-sm focus:outline-none ${
              isLoading
                ? "text-gray-500 cursor-default"
                : "text-gray-300 hover:underline"
            }`}
          >
            {isSignup
              ? "Already have an account? Log in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
