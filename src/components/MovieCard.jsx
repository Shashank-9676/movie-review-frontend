import React from "react";
import { Link } from "react-router";

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movies/${movie.imdbID}`}
      className="flex items-center w-full max-w-md grow-1 bg-gray-800 text-white rounded-xl shadow-md hover:scale-[1.02] transition-transform"
    >
      {/* Poster */}
      <img
        className="w-20 h-28 md:w-36 md:h-48 object-cover rounded-l-xl"
        src={
          movie.Poster === "N/A"
            ? "https://www.shutterstock.com/image-vector/not-available-hanging-sign-banner-260nw-614123429.jpg"
            : movie.Poster
        }
        alt={movie.Title}
      />

      {/* Info */}
      <div className="flex flex-col justify-center px-4 py-2">
        <h2 className="font-semibold text-lg">{movie.Title}</h2>
        <p className="text-sm text-gray-400">{movie.Year}</p>
        <p className="text-sm text-gray-400 capitalize">{movie.Type}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
