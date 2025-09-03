import { useState } from 'react'
import Header from './Header'
import MovieCard from './MovieCard'
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white ">
  <Header />

  {/* Search Bar */}
  <div className="flex items-center justify-center mt-6 px-4">
    <input
      className="text-white w-full max-w-md p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700"
      type="search"
      name="search"
      placeholder="Search movies (min 3 chars)"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          searchMovies();
        }
      }}
    />
    <button
      onClick={searchMovies}
      className="bg-blue-500 h-12 text-white m-2 px-5 py-2 rounded-lg hover:bg-blue-600"
    >
      Search
    </button>
  </div>

  {/* Error message */}
  <p className="text-red-500 mt-2 text-center">{error}</p>

  {/* Results */}
  {results.length > 0 ? (
    <div className="flex flex-col items-center">
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {loading && <p className="text-center">Loading...</p>}
        {results.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* See More Button */}
      <button
        className={`${
          (page - 1) * 10 >= totalResults
            ? "hidden"
            : "w-48 bg-blue-500 text-white p-3 rounded-lg px-5 mt-6 hover:bg-blue-600"
        }`}
        onClick={() => searchMovies()}
      >
        See More
      </button>
    </div>
  ) : response === "False" ? (
    // No results UI
    <div className="flex flex-col justify-center items-center h-[70vh] w-full text-center px-6">
      <img
        src="https://cdn.dribbble.com/userupload/2905353/file/original-2022966da1fc3718d3feddfdc471ae47.png?format=webp&resize=400x300&vertical=center"
        alt="No results"
        className="w-128 mb-4"
      />
      </div>
  ) : (
    // Empty state before searching
    <div className="flex flex-col justify-center items-center h-[60vh] w-full ">
      <img className='h-[60%] rounded-[50%]' src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSghGZ_sl5xM4hX_dZ9okfdxfxhELjAgE1gue7ieN71SdTl8D9w" alt="" />
      <p className="text-white-500 pt-7 text-lg font-semibold">Search for a movie</p>
    </div>
  )}
</div>

    )
}

export default Home