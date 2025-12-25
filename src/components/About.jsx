import Header from './Header';
import { Film, MessageSquare, Users, Star, Heart, Target, Shield, Zap, Award, Sparkles } from 'lucide-react';
import {useNavigate} from 'react-router'
export default function About() {
  const navigate = useNavigate()
  const features = [
    {
      icon: Star,
      title: 'Rate & Review',
      description: 'Share your thoughts and rate movies with our intuitive 5-star system. Your voice matters!',
      color: 'from-amber-500 to-yellow-500',
      iconColor: 'text-amber-400'
    },
    {
      icon: MessageSquare,
      title: 'Community Reviews',
      description: 'Read honest opinions from movie lovers worldwide. Discover what others think before you watch.',
      color: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-400'
    },
    {
      icon: Film,
      title: 'Vast Library',
      description: 'Access information on thousands of movies, from classics to the latest releases.',
      color: 'from-red-500 to-orange-500',
      iconColor: 'text-red-400'
    },
    {
      icon: Users,
      title: 'Growing Community',
      description: 'Join a passionate community of cinephiles sharing their love for great cinema.',
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-400'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Movies', icon: Film, color: 'text-red-400' },
    { number: '50+', label: 'Reviews', icon: MessageSquare, color: 'text-amber-400' },
    { number: '50+', label: 'Users', icon: Users, color: 'text-orange-400' },
    { number: '4.8', label: 'Avg Rating', icon: Star, color: 'text-yellow-400' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Cinema',
      description: 'We believe in the power of storytelling and the magic of movies.',
      color: 'text-red-400'
    },
    {
      icon: Target,
      title: 'User-Centric',
      description: 'Built by movie lovers, for movie lovers. Your experience is our priority.',
      color: 'text-amber-400'
    },
    {
      icon: Shield,
      title: 'Authentic Reviews',
      description: 'We maintain the integrity of real user opinions and honest feedback.',
      color: 'text-orange-400'
    },
    {
      icon: Zap,
      title: 'Always Improving',
      description: 'Constantly evolving with new features based on community feedback.',
      color: 'text-yellow-400'
    }
  ];
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <Header />

      {/* Hero Section */}
      <div className="relative pt-20 pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-sm rounded-full border border-red-600/30 mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-semibold text-sm">About MovieVerse</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your Gateway to the
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 bg-clip-text text-transparent block mt-2">
              Cinematic Universe
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            MovieVerse is a vibrant community platform where movie enthusiasts come together to discover, review, and celebrate the art of cinema. Built with passion, designed for movie lovers.
          </p>

          <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-red-600/50 hover:shadow-red-600/70 transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 mx-auto cursor-pointer" onClick={() => navigate('/')}>
            <Film className="w-5 h-5" />
            Start Exploring
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative max-w-7xl mx-auto px-4 -mt-16 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:scale-105 text-center group">
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
              <p className="text-3xl font-bold text-white mb-1">{stat.number}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose MovieVerse?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to explore and share your love for movies in one beautiful platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="group bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:scale-105">
              <div className="relative inline-block mb-6">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border border-gray-700">
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-orange-600/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              At MovieVerse, we believe that every movie has a story to tell, and every viewer has a unique perspective to share. Our mission is to create a space where movie enthusiasts can connect, share their passion, and discover their next favorite film through authentic community reviews and ratings.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              We're committed to building the most user-friendly, comprehensive, and engaging movie review platform that celebrates the diversity of cinema and the opinions of its viewers. Whether you're a casual moviegoer or a dedicated cinephile, MovieVerse is your home for all things cinema.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <div key={idx} className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:scale-105 text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700 group-hover:border-red-600/50 transition-colors">
                <value.icon className={`w-8 h-8 ${value.color} group-hover:scale-110 transition-transform`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="relative bg-gradient-to-br from-red-600/20 via-orange-600/20 to-amber-600/20 backdrop-blur-sm rounded-3xl p-12 border border-red-600/30 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-orange-600/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Start discovering amazing movies, sharing your reviews, and connecting with fellow movie lovers today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-red-600/50 hover:shadow-red-600/70 transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 justify-center cursor-pointer" onClick={() => navigate('/')}>
                <Star className="w-5 h-5" />
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Spacing */}
      <div className="pb-20"></div>
    </div>
  );
}
