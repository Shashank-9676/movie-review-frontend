import { useNavigate} from 'react-router'
import Cookies from 'js-cookie'
import { Film, Search, Star, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

function Header() {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  

  const logOut = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  };

  const navigateHome = () => {
    navigate('/')
  };


  return (
        <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${
'bg-gradient-to-b from-gray-950 to-gray-900/95 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={navigateHome}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Film className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                MovieVerse
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Review & Discover</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
              Home
            </a>
              <a href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
                About Us
              </a>
              {/* <a href="" className="text-sm text-gray-300 hover:text-white transition-colors">
                Contact Us
              </a> */}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">

            {/* Logout Button - Desktop */}
            <button
              onClick={logOut}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transform hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-800 animate-fadeIn">
            <button className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all flex items-center gap-3 ">
              <span className="font-medium">Home</span>
            </button>
            
            <button className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all flex items-center gap-3">
              <span className="font-medium">Contact Us</span>
            </button>
            
            {/* <button className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all flex items-center gap-3">
              <User className="w-5 h-5 text-orange-400" />
              <span className="font-medium">Profile</span>
            </button> */}
            
            <button
              onClick={logOut}
              className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom border gradient */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
    </header>


  )
}

export default Header
