import { useState } from 'react'
import Header from './Header'
import MovieCard from './MovieCard'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
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
    <>  
    <div className="min-h-screen w-screen text-white bg-[url('https://res.cloudinary.com/dnhc09agd/image/upload/e_background_removal/e_dropshadow:azimuth_220;elevation_60;spread_20/b_rgb:333B4C/f_png,e_improve,e_sharpen/v1757000852/image-vintage-film-strip-word-260nw-385203082_d0z3gc.webp')] bg-fixed bg-cover">
        <Header />
  <div className="flex items-center justify-center mt-6 px-4 ">
    <input className="text-white w-full max-w-md p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700" type="search" name="search" placeholder="Search movies (min 3 chars)" value={search} onChange={(e) => setSearch(e.target.value)} 
    onKeyDown={(e) => {
        if (e.key === 'Enter') {
          searchMovies();
        }
      }}
    />
    <button onClick={searchMovies} className="bg-blue-500 h-10 text-white m-2 px-5 py-2 rounded-lg hover:bg-blue-600 cursor-pointer">Search</button>
  </div>
  
  <p className="text-red-500 mt-2 text-center">{error}</p>
  {loading && <div className="flex justify-center items-center">
    <DotLottieReact
      src="https://lottie.host/4824a7f8-5196-445f-94bd-b0db54471d6a/V0HkJ56JpA.lottie" loop autoplay/>
    </div>}

  {results.length > 0 ? (
    <div className="flex flex-col items-center">
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {loading && <div className="loader"></div>}
        {results.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      <button
        className={`${(page - 1) * 10 >= totalResults ? "hidden" : "w-48 bg-blue-500 text-white p-3 rounded-lg px-5 mt-6 hover:bg-blue-600 cursor-pointer"}`} onClick={() => searchMovies()}>See More
      </button>
    </div>
  ) : response === "False" ? (
    <div className="flex flex-col justify-center items-center h-[70vh] w-full text-center px-6">
      <img src="https://cdn.dribbble.com/userupload/2905353/file/original-2022966da1fc3718d3feddfdc471ae47.png?format=webp&resize=400x300&vertical=center" alt="No results" className="w-128 mb-4"/>
    </div>
  ) : (
    <div className="flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 justify-center w-[70%] items-center h-[50vh] mx-auto rounded-2xl shadow-lg shadow-black/20">
      <img className='h-[60%]' src="https://res.cloudinary.com/dnhc09agd/image/upload/v1757000273/f55f03ca-7dec-4e00-938e-5e5259402d2f_xyewri.png" alt="Empty View" />
    </div>
  )}
</div>
    </>
    )
}

export default Home