import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import Header from "./Header";
import { Award, Calendar, Clock, Film, Globe, MessageSquare, TrendingUp, Users, X} from "lucide-react";
import { ProgressBar } from 'react-loader-spinner';
export default function MovieDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorPop, setErrorPop] = useState("");
  const token = Cookies.get("jwt_token");
  const func = () => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://movie-reviews-c3h8.onrender.com/movies/${id}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 404) {
          setError("Movie not found");
          setData(null);
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch movie");
        }

        const result = await res.json();
        setData(result);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  };
  useEffect(func, [id, token]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://movie-reviews-c3h8.onrender.com/movies/${id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rating, comment }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add review");
      }
      func();

      setRating(0);
      setComment("");
      setShowModal(false);
    } catch (err) {
      console.log(err);
      setErrorPop("*Please add a comment");
    }
  };

  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (loading)
    return (
      <>
        <Header />
        <div className="flex items-center bg-gray-900/80 backdrop-blur-md justify-center min-h-[90vh]">
          <ProgressBar visible={true} height="200" width="200" color="#4fa94d" ariaLabel="progress-bar-loading" wrapperStyle={{}} wrapperClass=""/>        
        </div>
      </>
    );
  if (!data) return null;
  const { movieDetails, reviews } = data;

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <Header />

      {/* Hero Section with Backdrop */}
      <div className="relative h-96 overflow-hidden">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <img
            src={movieDetails.Poster}
            alt={movieDetails.Title}
            className="w-full h-full object-cover blur-2xl scale-110 opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-gray-950/80 to-gray-950"></div>
        </div>

        {/* Movie Info Overlay */}
        <div className="relative max-w-7xl mx-auto mt-12 px-4 h-full flex items-end pb-12">
          <div className="flex gap-8 items-end">
            {/* Poster */}
            <div className="hidden md:block">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/50 to-orange-600/50 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={movieDetails.Poster}
                  alt={movieDetails.Title}
                  className="relative w-64 h-96 object-cover rounded-2xl shadow-2xl border-4 border-gray-800 transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Title and Quick Info */}
            <div className="flex-1 pb-4">
              <h1 className="text-5xl font-bold text-white mb-3">
                {movieDetails.Title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  {movieDetails.Year}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-red-400" />
                  {movieDetails.Runtime}
                </span>
                <span className="px-3 py-1 bg-gray-800/80 backdrop-blur-sm rounded-lg text-sm border border-gray-700">
                  {movieDetails.Rated}
                </span>
              </div>

              {/* IMDb Rating */}
              {movieDetails.imdbRating && (
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-xl border border-amber-500/30">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="text-2xl font-bold text-amber-400">
                      {movieDetails.imdbRating}
                    </span>
                    <span className="text-gray-400 text-sm">/ 10</span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    ({movieDetails.imdbVotes} votes)
                  </span>
                </div>
              )}

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2">
                {movieDetails.Genre.split(", ").map((genre, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-sm text-red-400 rounded-lg text-sm border border-red-600/30 font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Movie Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Plot */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Film className="w-6 h-6 text-red-400" />
                Overview
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {movieDetails.Plot}
              </p>
            </div>

            {/* Cast & Crew */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-orange-400" />
                Cast & Crew
              </h2>

              {movieDetails.Director !== "N/A" && (
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 min-w-24 font-semibold">
                    Director:
                  </span>
                  <span className="text-white">{movieDetails.Director}</span>
                </div>
              )}

              {movieDetails.Writer !== "N/A" && (
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 min-w-24 font-semibold">
                    Writer:
                  </span>
                  <span className="text-white">{movieDetails.Writer}</span>
                </div>
              )}

              {movieDetails.Actors !== "N/A" && (
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 min-w-24 font-semibold">
                    Actors:
                  </span>
                  <span className="text-white">{movieDetails.Actors}</span>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-8 h-8 text-amber-400" />
                  User Reviews
                </h2>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-600/50 transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
                >
                  <Star className="w-5 h-5" />
                  Write Review
                </button>
              </div>

              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-12 border border-gray-800 text-center">
                    <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">
                      No reviews yet. Be the first to review!
                    </p>
                  </div>
                ) : (
                  reviews.map((rev) => (
                    <div
                      key={rev._id}
                      className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-red-600/30 transition-colors"
                    >
                      <div className="flex gap-4 items-start">
                        {/* Avatar */}
                        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-red-600 to-orange-600 text-white rounded-full text-lg font-bold shadow-lg flex-shrink-0">
                          {rev.name[0].toUpperCase()}
                        </div>

                        {/* Review Content */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-white text-lg">
                              {rev.name}
                            </p>
                          </div>

                          {/* Star Rating */}
                          <div className="flex items-center gap-1 mb-3">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                size={18}
                                className={
                                  i < rev.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-600"
                                }
                              />
                            ))}
                            <span className="ml-2 text-amber-400 font-semibold">
                              {rev.rating}.0
                            </span>
                          </div>

                          <p className="text-gray-300 leading-relaxed">
                            {rev.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Movie Info Card */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Movie Info</h3>

              {movieDetails.Released && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Release Date</p>
                    <p className="text-white font-medium">
                      {movieDetails.Released}
                    </p>
                  </div>
                </div>
              )}

              {movieDetails.Runtime && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Runtime</p>
                    <p className="text-white font-medium">
                      {movieDetails.Runtime}
                    </p>
                  </div>
                </div>
              )}

              {movieDetails.Language && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Language</p>
                    <p className="text-white font-medium">
                      {movieDetails.Language}
                    </p>
                  </div>
                </div>
              )}

              {movieDetails.Country && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Country</p>
                    <p className="text-white font-medium">
                      {movieDetails.Country}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Film className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Type</p>
                  <p className="text-white font-medium capitalize">
                    {movieDetails.Type}
                  </p>
                </div>
              </div>

              {movieDetails.BoxOffice && movieDetails.BoxOffice !== "N/A" && (
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Box Office</p>
                    <p className="text-white font-medium">
                      {movieDetails.BoxOffice}
                    </p>
                  </div>
                </div>
              )}

              {movieDetails.Awards && movieDetails.Awards !== "N/A" && (
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Awards</p>
                    <p className="text-white font-medium">
                      {movieDetails.Awards}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Ratings Card */}
            {movieDetails.Ratings && movieDetails.Ratings.length > 0 && (
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400" />
                  Ratings
                </h3>

                {movieDetails.Ratings.map((rating, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      {rating.Source}
                    </span>
                    <span className="text-white font-bold">{rating.Value}</span>
                  </div>
                ))}

                {movieDetails.Metascore && movieDetails.Metascore !== "N/A" && (
                  <div className="pt-3 border-t border-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Metascore</span>
                      <div className="px-3 py-1 bg-green-500/20 rounded-lg">
                        <span className="text-green-400 font-bold">
                          {movieDetails.Metascore}
                        </span>
                        <span className="text-gray-400 text-sm">/100</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Poster */}
            <div className="md:hidden">
              <img
                src={movieDetails.Poster}
                alt={movieDetails.Title}
                className="w-full rounded-2xl shadow-2xl border-4 border-gray-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Review Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-gray-950/80 z-50 p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl border border-gray-800 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-amber-400" />
                Write Your Review
              </h3>

              {/* Star Rating */}
              <div className="mb-6">
                <label className="block text-gray-300 font-medium mb-3">
                  Your Rating
                </label>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={36}
                      onClick={() => setRating(i + 1)}
                      onMouseEnter={() => setHover(i + 1)}
                      onMouseLeave={() => setHover(0)}
                      className={`cursor-pointer transition-all ${
                        (hover || rating) > i
                          ? "fill-amber-400 text-amber-400 scale-110"
                          : "text-gray-600 hover:text-gray-500"
                      }`}
                    />
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-amber-400 mt-2 text-sm font-semibold">
                    {rating} {rating === 1 ? "star" : "stars"} selected
                  </p>
                )}
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label className="block text-gray-300 font-medium mb-3">
                  Your Review
                </label>
                <textarea
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all resize-none"
                  rows="4"
                  placeholder="Share your thoughts about this movie..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              {/* Error Message */}
              {errorPop && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-600/50 rounded-lg text-red-300 text-sm">
                  {errorPop}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors border border-gray-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddReview}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-600/50 transform hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Post Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
