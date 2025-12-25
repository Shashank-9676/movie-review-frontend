import React from "react";
import { Link } from "react-router";

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movies/${movie.imdbID}`}
      className="flex items-center w-full max-w-md grow-1 bg-gray-800 text-white rounded-xl shadow-md hover:scale-[1.02] transition-transform"
    >
      <div className="group relative bg-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-900/30 cursor-pointer">
      <div className="relative h-80 w-56 overflow-hidden">
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://www.shutterstock.com/image-vector/not-available-hanging-sign-banner-260nw-614123429.jpg'} 
          alt={movie.Title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Year Badge */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-gray-900/80 backdrop-blur-sm rounded-md text-xs font-semibold text-amber-400 border border-amber-600/30">
          {movie.Year}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-full py-2 cursor-pointer bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            View Details
          </button>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm line-clamp-1 mb-1">{movie.Title}</h3>
        <p className="text-gray-400 text-xs capitalize">{movie.Type}</p>
      </div>
    </div>
    </Link>
  );
}

export default MovieCard;
