import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import { useAuth } from "./AuthContext";
import { API_URL } from "../Constants";
import Cookies from "js-cookie";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = Cookies.get("signup_accesstoken");
        const response = await axios.get(`${API_URL}movies/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setMovies(response?.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen cursor-pointer">
      <header className="relative flex justify-center items-center bg-red-600 py-4">
        <h1 className="text-white text-3xl font-bold text-center">
          Netflix Clone
        </h1>
        <div
          onClick={logout}
          className="absolute right-2 p-2 text-black py-1 bg-white rounded-xl hover:bg-gray-200"
        >
          Logout
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie?._id}
              onClick={() => navigate(movie?._id)}
              className="bg-gray-800 cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <img
                src={movie?.poster || "/not_available.jpg?height=300&width=200"}
                alt={`${movie?.title} poster`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {movie?.title}
                </h2>
                <p className="text-gray-400 text-sm mb-2">
                  {movie?.plot?.substring(0, 200)}...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>{movie?.year}</span>
                  <span>{movie?.rated}</span>
                </div>
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-yellow-500">{movie?.imdb?.rating}</span>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{movie?.runtime} min</span>
                </div>
              </div>
              <div className="px-4 py-2 bg-gray-900">
                <p className="text-gray-400 text-xs">
                  {movie?.genres?.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
