import { useState } from 'react';
import {useNavigate, Navigate} from 'react-router'
import Cookies from 'js-cookie';
import { Film, Mail, Lock, User, Eye, EyeOff, Star, Sparkles } from 'lucide-react';
function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const handleSignup = async(e) => {
        e.preventDefault()
        setIsLoading(true);
        const response = await fetch('https://movie-reviews-c3h8.onrender.com/auth/register',{
            method:"POST",
            headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        if(response.ok){
            navigate('/login')
            setError('')
            setFormData({
                username: '',
                password: '',
                name: '',
                email: ''
            })
        }else{
            setError(data.message)
        }
        setIsLoading(false);
    }
    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    }
    if (Cookies.get('jwt_token') !== undefined) {
        return <Navigate to="/" replace />;
    }
    return (
<div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-amber-950 to-gray-950 p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      {/* Signup Form Container */}
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-black/40 rounded-3xl shadow-2xl border border-amber-900/30 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-50"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-amber-600/50 transform hover:scale-110 transition-transform duration-300">
                <Film className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Join MovieVerse</h1>
              <p className="text-gray-400 text-sm">Create your account and start reviewing</p>
            </div>

            <form className="space-y-4" onSubmit={handleSignup}>
              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-400" />
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={handleChange('username')}
                  placeholder="Choose a username"
                  required
                  className="w-full px-4 py-2.5 bg-gray-900/60 border border-amber-900/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-300 hover:bg-gray-900/80 hover:border-amber-800/50"
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleChange('name')}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-2.5 bg-gray-900/60 border border-amber-900/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-300 hover:bg-gray-900/80 hover:border-amber-800/50"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-4 py-2.5 bg-gray-900/60 border border-amber-900/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-300 hover:bg-gray-900/80 hover:border-amber-800/50"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange('password')}
                    placeholder="Create a strong password"
                    required
                    className="w-full px-4 py-2.5 bg-gray-900/60 border border-amber-900/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-300 hover:bg-gray-900/80 hover:border-amber-800/50 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-3 text-red-300 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                disabled={isLoading}
                className="w-full cursor-pointer py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-600/50 hover:shadow-amber-600/70 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Star className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>

              {/* Login Link */}
              <p className="text-center text-gray-400 text-sm pt-2">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-amber-400 cursor-pointer font-semibold hover:text-amber-300 transition-colors hover:underline"
                >
                  Sign In
                </button>
              </p>
            </form>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-amber-600/20 rounded-full blur-2xl"></div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-600/20 rounded-full blur-2xl"></div>
      </div>
    </div>
    
)
}

export default Signup