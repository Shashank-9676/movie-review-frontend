import { useState } from 'react'
import Header from './Header'
import MovieCard from './MovieCard'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Search, TrendingUp, Sparkles, Clock, ChevronDown, Film } from 'lucide-react';

function Home() {
    const [search, setSearch] = useState('')
    const [error, setError] = useState('')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])
    const [totalResults, setTotalResults] = useState(0)
    const [response, setResponse] = useState(true)
    const searchMovies = async() => {
        if (search.length < 3) {
            setError('Please enter at least 3 characters')
            setResults([])
            return
        }
        setLoading(true)
        const response = await fetch(`https://www.omdbapi.com/?s=${search}&page=${page}&apikey=89882e4e`)
        const data = await response.json()
        setResponse(data.Response)
        if (data.Response === 'False') {
            setResults([])
        } else {
            setResults(prevResults => [...prevResults, ...data.Search])
            setPage(page => page + 1);
            setTotalResults(parseInt(data.totalResults))
        }
        setLoading(false)
        setError('')
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchMovies()
        }
    }


  return (
    <>  
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <Header />
      {/* Hero Section with Search */}
      <div className="relative pt-12 pb-20 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Hero Text */}
          <div className="mb-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Discover Your Next
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> Favorite Movie</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Search millions of movies, read reviews, and share your thoughts
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center gap-3 bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-2 shadow-2xl hover:border-red-900/50 transition-all duration-300">
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search className="w-5 h-5 text-red-400" />
                <input
                  type="search"
                  placeholder="Search for movies, series, episodes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-lg"
                />
              </div>
              <button
                onClick={searchMovies}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-600/50 transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  'Search'
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-600/50 rounded-lg text-red-300 text-sm animate-pulse">
                {error}
              </div>
            )}
          </div>

          {/* Quick Filters */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button className="px-4 py-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-red-600/50 rounded-lg text-gray-300 hover:text-white transition-all duration-200 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-400" />
              <span className="text-sm">Trending</span>
            </button>
            <button className="px-4 py-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-amber-600/50 rounded-lg text-gray-300 hover:text-white transition-all duration-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm">Popular</span>
            </button>
            <button className="px-4 py-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-orange-600/50 rounded-lg text-gray-300 hover:text-white transition-all duration-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <span className="text-sm">Latest</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {loading && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Searching for movies...</p>
          </div>
        )}

        {results.length > 0 ? (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Search Results</h2>
                <p className="text-gray-400 text-sm mt-1">Found {totalResults} movies</p>
              </div>
            </div>

            {/* Movie Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {results.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>

            {/* Load More Button */}
            {(page - 1) * 10 < totalResults && (
              <div className="flex justify-center pt-8">
                <button
                  onClick={searchMovies}
                  disabled={loading}
                  className="px-8 py-4 bg-gray-800/80 hover:bg-gray-800 border border-gray-700  cursor-pointer hover:border-red-600/50 rounded-xl text-white font-semibold shadow-lg hover:shadow-red-600/30 transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <span>Load More Movies</span>
                      <ChevronDown className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : response === 'False' ? (
          // No Results State
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-full flex items-center justify-center mb-6">
              <Search className="w-16 h-16 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Movies Found</h3>
            <p className="text-gray-400 max-w-md mb-6">
              We couldn't find any movies matching your search. Try different keywords or check the spelling.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setResults([]);
                setResponse(true);
              }}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all cursor-pointer "
            >
              Clear Search
            </button>
          </div>
        ) : (
          // Empty State (Initial)
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur-2xl opacity-20"></div>
              <div className="relative w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border-4 border-gray-700">
                <Film className="w-16 h-16 text-red-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">Start Your Movie Journey</h3>
            <p className="text-gray-400 text-lg max-w-md mb-8">
              Search for any movie, series, or episode to explore ratings, reviews, and detailed information.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-gray-500 text-xs mb-1">Try searching for</p>
                <p className="text-red-400 font-semibold">Inception</p>
              </div>
              <div className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-gray-500 text-xs mb-1">Try searching for</p>
                <p className="text-amber-400 font-semibold">The Matrix</p>
              </div>
              <div className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-gray-500 text-xs mb-1">Try searching for</p>
                <p className="text-orange-400 font-semibold">Avatar</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
    )
}

export default Home