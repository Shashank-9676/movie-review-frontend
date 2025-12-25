import { Film, Home, Search, ArrowLeft, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
export default function NotFound() {
    const navigate = useNavigate();
  const handleGoHome = () => {
    // alert('Navigate to home (Demo)');
    navigate('/');
  };

  const handleGoBack = () => {
    // alert('Go back (Demo)');
    navigate(-1);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        
        {/* 404 Visual */}
        <div className="mb-8 relative">
          {/* Large 404 Text */}
          <div className="relative">
            <h1 className="text-[180px] md:text-[240px] font-black leading-none">
              <span className="bg-gradient-to-br from-red-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                404
              </span>
            </h1>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-center gap-2 text-red-400 mb-4">
            <AlertCircle className="w-6 h-6" />
            <h2 className="text-2xl md:text-3xl font-bold">Page Not Found</h2>
          </div>
          
          <p className="text-xl text-gray-300 mb-2">
            Oops! This page seems to be missing from our collection.
          </p>
          <p className="text-gray-400">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-red-600/50 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          
          <button
            onClick={handleGoHome}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>
        {/* Footer Message */}
        <div className="mt-8 text-gray-500 text-sm">
          <p>Lost in the movie universe? We'll help you find your way back!</p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 opacity-5">
        <Film className="w-32 h-32 text-white" />
      </div>
      <div className="absolute top-10 right-10 opacity-5">
        <Film className="w-32 h-32 text-white" />
      </div>
    </div>
  );
}