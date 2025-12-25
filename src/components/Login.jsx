import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Navigate } from 'react-router';
import { Film, Mail, Lock, User, Eye, EyeOff, Star } from 'lucide-react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async(e) => {
        e.preventDefault()
        setIsLoading(true);
        const response = await fetch('https://movie-reviews-c3h8.onrender.com/auth/login', {
            method: 'POST',
            headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        console.log(data)
        if (response.ok) {
            Cookies.set('jwt_token', data.jwt_token,{ expires: 30 })
            setError('')
            setUsername('')
            setPassword('')
            navigate('/', { replace: true });
        } else {
            setError(data.message)
        }
        setIsLoading(false);
    }
    if(Cookies.get('jwt_token') !== undefined){
        return <Navigate to="/" replace />;
    }
    return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-red-950 to-gray-950 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      {/* Login Form Container */}
      <div className="relative w-full max-w-md">
        {/* Glassmorphism card */}
        <div className="backdrop-blur-xl bg-black/40 rounded-3xl shadow-2xl border border-red-900/30 p-8 relative overflow-hidden">
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-50"></div>
          
          <div className="relative z-10">
            {/* Logo and header */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-red-600/50 transform hover:scale-110 transition-transform duration-300">
                <Film className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-gray-400 text-sm">Sign in to explore cinematic reviews</p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              {/* Username Input */}
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4 text-red-400" />
                  Username
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    className="w-full px-4 py-3 bg-gray-900/60 border border-red-900/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 group-hover:bg-gray-900/80 group-hover:border-red-800/50"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-red-400" />
                  Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3 bg-gray-900/60 border border-red-900/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300 group-hover:bg-gray-900/80 group-hover:border-red-800/50 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-3 text-red-300 text-sm animate-pulse">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                disabled={isLoading}
                className="w-full cursor-pointer py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-red-600/50 hover:shadow-red-600/70 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <Star className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>

              {/* Signup Link */}
              <p className="text-center text-gray-400 text-sm">
                Don't have an account?{' '}
                <button onClick={() => navigate('/signup')}
                  type="button"
                  className="text-red-400 cursor-pointer font-semibold hover:text-red-300 transition-colors hover:underline"
                >
                  Create Account
                </button>
              </p>
            </form>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-red-600/20 rounded-full blur-2xl"></div>
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-600/20 rounded-full blur-2xl"></div>
      </div>
    </div>

  )
}
export default Login