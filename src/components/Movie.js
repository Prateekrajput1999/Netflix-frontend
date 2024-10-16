import { useState, useEffect } from "react";
import axios from "axios";
import { Star, Clock, Calendar, Globe, Award, Users, Pen } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/UI/Card";
import { Badge } from "../components/UI/Badge";
import { Separator } from "../components/UI/Separator";
import { useParams } from "react-router-dom";
import { API_URL } from "../Constants";
import Cookies from "js-cookie";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token = Cookies.get("signup_accesstoken");
        const response = await axios.get(`${API_URL}movies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movie details. Please try again later.");
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center bg-black items-center h-screen">
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

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Movie not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{movie?.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              {movie?.genres?.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <img
                  src={
                    movie?.poster ?? "/not_available.jpg?height=300&width=200"
                  }
                  alt={`${movie?.title} poster`}
                  className="w-full h-[550px] rounded-lg shadow-lg"
                />
              </div>
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Plot</h2>
                    <p className="text-gray-300">{movie?.fullplot}</p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Cast</h2>
                    <ul className="list-disc list-inside text-gray-300">
                      {movie?.cast?.map((actor) => (
                        <li key={actor}>{actor}</li>
                      ))}
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Crew</h2>
                    <div className="text-gray-300">
                      <p>
                        <strong>Directors:</strong>{" "}
                        {movie?.directors?.join(", ")}
                      </p>
                      <p>
                        <strong>Writers:</strong> {movie?.writers?.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-500 mr-2" />
                        <span>IMDB: {movie?.imdb?.rating}/10</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-red-500 mr-2" />
                        <span>
                          Tomatoes: {movie?.tomatoes?.viewer?.rating}/5
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        <span>{movie?.runtime} min</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span>{new Date(movie?.released).getFullYear()}</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <h2 className="text-xl font-semibold mb-2">Details</h2>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center">
                          <Globe className="w-5 h-5 mr-2" />
                          <span>
                            <strong>Countries:</strong>{" "}
                            {movie?.countries?.join(", ")}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Users className="w-5 h-5 mr-2" />
                          <span>
                            <strong>Languages:</strong>{" "}
                            {movie?.languages?.join(", ")}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Award className="w-5 h-5 mr-2" />
                          <span>
                            <strong>Awards:</strong> {movie?.awards?.text}
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Pen className="w-5 h-5 mr-2" />
                          <span>
                            <strong>Rated:</strong> {movie?.rated}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <h2 className="text-xl font-semibold mb-2">Ratings</h2>
                      <ul className="space-y-2 text-gray-300">
                        <li>
                          <strong>IMDB Votes:</strong> {movie?.imdb?.votes}
                        </li>
                        <li>
                          <strong>Tomatoes Reviews:</strong>{" "}
                          {movie?.tomatoes?.viewer?.numReviews}
                        </li>
                        <li>
                          <strong>Tomatoes Meter:</strong>{" "}
                          {movie?.tomatoes?.viewer?.meter}%
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
