import React, { useState, useEffect } from 'react';
import { Bug, Users, Kanban, Filter, Zap, Shield, ArrowRight, Sparkles, Code, Layers, Star, Rocket, Globe, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: Kanban,
      title: "AI-Powered Kanban",
      description: "Intelligent boards that learn from your workflow patterns and suggest optimizations.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      color: "text-blue-400"
    },
    {
      icon: Users,
      title: "Real-time Collaboration",
      description: "Seamlessly work together with live updates, comments, and instant notifications.",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/20 to-emerald-500/20",
      color: "text-green-400"
    },
    {
      icon: Filter,
      title: "Smart Filtering",
      description: "Advanced AI-driven filters that understand context and predict what you need.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      color: "text-purple-400"
    },
    {
      icon: Zap,
      title: "Lightning Speed",
      description: "Optimized for performance with instant loading and smooth animations.",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/20 to-red-500/20",
      color: "text-orange-400"
    },
    {
      icon: Bug,
      title: "Advanced Tracking",
      description: "Comprehensive issue management with automated categorization and priority scoring.",
      gradient: "from-red-500 to-rose-500",
      bgGradient: "from-red-500/20 to-rose-500/20",
      color: "text-red-400"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption and compliance standards.",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-500/20 to-blue-500/20",
      color: "text-indigo-400"
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
        }}>
        </div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}>
        </div>
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Futuristic Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 px-8 py-4 shadow-2xl">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl border border-white/20">
                    <Bug className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                    Track
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-1">
                    Zen
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleNavigateToLogin}
                  className="text-white/80 hover:text-white px-6 py-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Sign In
                </button>
                <button 
                  onClick={handleNavigateToRegister}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto text-center">
            <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              
              {/* Badge */}
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 backdrop-blur-sm mb-8 group hover:scale-105 transition-all duration-300">
                <Star className="h-5 w-5 text-yellow-400 mr-2 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-gray-300 font-medium">Next-generation issue tracking</span>
                <Sparkles className="h-5 w-5 text-blue-400 ml-2 animate-pulse" />
              </div>
              
              {/* Main Heading */}
              <h1 className="text-7xl md:text-9xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                  The Future of
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                  Issue Tracking
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
                Experience next-generation project management with AI-powered insights, 
                quantum-speed performance, and an interface designed for tomorrow's developers.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-7">
                <button 
                  onClick={handleNavigateToRegister}
                  className="group px-12 py-6 text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 font-bold hover:scale-110 border border-white/20"
                >
                  <span className="flex items-center">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl font-bold text-white mb-6">
                Powered by
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-3">
                  Tomorrow's Tech
                </span>
              </h2>
              <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
                Revolutionary features that redefine what's possible in project management
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group relative p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className={`mb-6 p-4 bg-gradient-to-r ${feature.bgGradient} rounded-2xl w-fit border border-white/10 group-hover:scale-110 transition-all duration-300`}>
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl rounded-3xl mx-6"></div>
          <div className="container mx-auto text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-6xl font-bold text-white mb-6">
                Ready to Transform
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-3">
                  Everything?
                </span>
              </h2>
              <p className="text-blue-100 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
                Join the revolution. Experience the future of development workflows today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button 
                  onClick={handleNavigateToRegister}
                  className="group px-16 py-6 text-xl bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-gray-200 rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-500 font-bold hover:scale-110"
                >
                  <span className="flex items-center">
                    <Rocket className="mr-3 h-6 w-6" />
                    Launch Your Project
                    <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl py-16 px-6">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl border border-white/20">
                  <Bug className="h-8 w-8 text-white" />
                </div>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                TrackZen
              </span>
            </div>
            
            <div className="border-t border-white/10 pt-8">
              <p className="text-gray-400 text-lg mb-2">
                © 2024 TrackZen. Engineered for the future of development.
              </p>
              <p className="text-gray-500">
                Powered by quantum computing and designed for tomorrow's developers.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;