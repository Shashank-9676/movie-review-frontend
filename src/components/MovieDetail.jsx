
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "./Header";
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
        const res = await fetch(`https://movie-reviews-c3h8.onrender.com/movies/${id}/reviews`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
    if (token) fetchMovie();
  }
  useEffect(func, [id, token]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://movie-reviews-c3h8.onrender.com/movies/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      });

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
  if (!data) return null; 
  const { movieDetails, reviews } = data;

  return (
    <>
    <Header />
    {loading ? <div className="flex justify-center items-center h-screen"><ClipLoader color="#36d7b7" /></div> :
      <div className="p-4 w-screen pr-2 max-w-screen mx-auto">
        {/* Movie Details */}
        <div className="bg-gray-900 text-white rounded-2xl shadow-lg border border-gray-800 p-6 flex gap-6">
          <img
          src={movieDetails.Poster}
          alt={movieDetails.Title}
          className=" rounded-xl shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold">{movieDetails.Title}</h1>
          <p className="text-gray-400">
            {movieDetails.Year} • {movieDetails.Genre}
          </p>
          <p className="mt-3">{movieDetails.Plot}</p>
          <p className="mt-2 text-yellow-400 font-semibold">
            ⭐ {movieDetails.imdbRating} / 10 ({movieDetails.imdbVotes} votes)
          </p>
          <p className="mt-2 text-gray-400"><span className="text-white">Released On:</span> {movieDetails.Released}</p>
          <p className="mt-2 text-gray-400"><span className="text-white">Runtime:</span> {movieDetails.Runtime}</p>
          <p className="mt-2 text-gray-400"><span className="text-white">Country:</span> {movieDetails.Country}</p>
          <p className="mt-2 text-gray-400"><span className="text-white">Language:</span> {movieDetails.Language}</p>
          {movieDetails.Actors !== 'N/A' && (
            <p className="mt-2 text-gray-400"><span className="text-white">Actors:</span> {movieDetails.Actors}</p>
          )}
          {movieDetails.Director !== 'N/A' && (
            <p className="mt-2 text-gray-400"><span className="text-white">Director:</span> {movieDetails.Director}</p>
          )}
          {movieDetails.Writer !== 'N/A' && (
            <p className="mt-2 text-gray-400"><span className="text-white">Writer:</span> {movieDetails.Writer}</p>
          )}
          <p className="mt-2 text-gray-400"><span className="text-white">Type:</span> {movieDetails.Type}</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
          >
            Add Review
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <h2 className="mt-8 text-4xl text-white font-bold">Reviews</h2>
      <div className="mt-4 space-y-4">
        {reviews.length === 0 ? (
          <img className="mx-auto" src="https://i.ytimg.com/vi/1vAHfDvNDmw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAX_CLYMqEkqmVgIL09qifK21OMJA" alt="No reviews yet" />
        ) : (
          reviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-gray-100 p-4 rounded-xl flex gap-4 items-start"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full text-lg font-bold">
                {rev.name[0].toUpperCase()}
              </div>
              <div>
                <p className="font-semibold">{rev.name}</p>
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < rev.rating ? "fill-yellow-500" : ""}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mt-1">{rev.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Add Review */}
      <>
        {showModal && (
          <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="bg-white p-6 rounded-2xl w-96 shadow-xl"
            >
              <h3 className="text-xl font-bold mb-4">Add Review</h3>

              {/* Star Rating */}
              <div className="flex gap-2 mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={28}
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHover(i + 1)}
                    onMouseLeave={() => setHover(0)}
                    className={`cursor-pointer ${
                      (hover || rating) > i
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Comment Input */}
              <textarea required
                className="w-full border rounded-lg p-2"
                rows="3"
                placeholder="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <p className="text-red-500">{errorPop}</p>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button type="submit"
                  onClick={handleAddReview}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Post Review
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>}
    </>
  );
}

