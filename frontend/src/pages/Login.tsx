import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Lock, Bug, Eye, EyeOff, User, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, forgotPassword, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Redirect if already logged in
  useEffect(() => {
    if (user && user.isEmailVerified) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Check for verification success message
  useEffect(() => {
    const verified = searchParams.get('verified');
    if (verified === 'true') {
      toast.success("Email verified successfully! You can now log in.");
    }
  }, [searchParams]);

  // Real-time email validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear email-related errors when user starts typing
    if (error.includes("email") || error.includes("Email")) {
      setError("");
    }
  };

  // Real-time password validation
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    // Clear password-related errors when user starts typing
    if (error.includes("password") || error.includes("Password")) {
      setError("");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state
    setError("");

    // Comprehensive validation
    if (!email || !password) {
      const missingFields = [];
      if (!email) missingFields.push("Email");
      if (!password) missingFields.push("Password");
      
      const errorMsg = `Please fill in: ${missingFields.join(", ")}`;
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    // Email length validation
    if (email.length > 254) {
      setError("Email address is too long");
      toast.error("Email address is too long");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsSubmitting(true);
      await login(email.toLowerCase(), password);
      toast.success("Login successful! Welcome back!");
      navigate("/dashboard");
    } catch (err: any) {
      const errorMessage = err.message || "Login failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setError("Please enter your email");
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    if (resetEmail.length > 254) {
      setError("Email address is too long");
      toast.error("Email address is too long");
      return;
    }

    try {
      setError("");
      setIsSubmitting(true);
      await forgotPassword(resetEmail.toLowerCase());
      toast.success("Reset link sent to your email!");
      setShowForgotPassword(false);
      setResetEmail("");
    } catch (err: any) {
      const errorMessage = err.message || "Failed to send reset email";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* TrackZen Logo Navigation */}
      <div className="absolute top-6 left-6 z-30">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative group transform-gpu perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse transform-gpu"></div>
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 p-3 rounded-2xl shadow-2xl border border-white/20 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-y-12 transform-gpu">
              <Bug className="h-8 w-8 text-white drop-shadow-2xl" />
            </div>
          </div>
          <div className="transform transition-all duration-500 group-hover:scale-105 transform-gpu">
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Track
            </span>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-1">
              Zen
            </span>
          </div>
        </Link>
      </div>

      {/* Orbital Rings - Moving around the center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
        {/* Ring 1 - Outer orbit */}
        <div 
          className="absolute w-[550px] h-[500px] rounded-full"
          style={{ 
            animation: 'orbit 20s linear infinite',
            border: '2px solid transparent',
            background: 'linear-gradient(45deg, #ffd700, #ff6b35, #ffd700) border-box',
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor'
          }}
        />

        {/* Ring 2 - Middle orbit */}
        <div 
          className="absolute w-[350px] h-[350px] rounded-full"
          style={{ 
            animation: 'orbit 15s linear infinite reverse',
            border: '1.5px solid transparent',
            background: 'linear-gradient(90deg, #ff6b35, transparent, #ffd700, transparent) border-box',
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            opacity: 0.7
          }}
        />

        {/* Ring 3 - Inner orbit */}
        <div 
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{ 
            animation: 'orbit 12s linear infinite',
            border: '1px solid transparent',
            background: 'linear-gradient(135deg, #ffd700, transparent, #ff6b35) border-box',
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            opacity: 0.5
          }}
        />

        {/* Alternative SVG approach for better browser compatibility */}
        <svg className="absolute w-[400px] h-[400px]" style={{ animation: 'spin 20s linear infinite' }}>
          <circle 
            cx="200" 
            cy="200" 
            r="190" 
            fill="none" 
            stroke="url(#gradient1)" 
            strokeWidth="2"
            opacity="0.8"
            strokeDasharray="50 100"
          />
          <defs>
            <linearGradient id="gradient1">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="50%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#ffd700" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="absolute w-[350px] h-[350px]" style={{ animation: 'spin 15s linear infinite reverse' }}>
          <circle 
            cx="175" 
            cy="175" 
            r="165" 
            fill="none" 
            stroke="url(#gradient2)" 
            strokeWidth="1.5"
            opacity="0.6"
            strokeDasharray="30 60"
          />
          <defs>
            <linearGradient id="gradient2">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="50%" stopColor="transparent" />
              <stop offset="100%" stopColor="#ffd700" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="absolute w-[300px] h-[300px]" style={{ animation: 'spin 12s linear infinite' }}>
          <circle 
            cx="150" 
            cy="150" 
            r="140" 
            fill="none" 
            stroke="url(#gradient3)" 
            strokeWidth="1"
            opacity="0.4"
            strokeDasharray="20 40"
          />
          <defs>
            <linearGradient id="gradient3">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="50%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-white mb-8">
            {showForgotPassword ? "Reset Password" : "Welcome Back"}
          </h2>
          {!showForgotPassword && (
            <p className="text-white/70 text-sm">
              Sign in to your account to continue
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm text-center flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Forms */}
        {showForgotPassword ? (
          /* Forgot Password Form */
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60 z-10" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="pl-12 py-4 bg-transparent border-2 border-white/30 rounded-2xl text-white placeholder:text-white/60 focus:border-white/60 focus:ring-0 backdrop-blur-sm"
                  required
                  disabled={isSubmitting || isLoading}
                  maxLength={254}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 hover:from-pink-600 hover:via-orange-500 hover:to-yellow-500 text-white font-medium border-none shadow-lg text-lg"
            >
              {isSubmitting || isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : null}
              {isSubmitting || isLoading ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-center space-y-4">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setError("");
                  setResetEmail("");
                }}
                className="text-white/70 hover:text-white text-sm transition-colors"
                disabled={isSubmitting || isLoading}
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : (
          /* Login Form */
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60 z-10" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={handleEmailChange}
                  className="pl-12 py-4 bg-transparent border-2 border-white/30 rounded-2xl text-white placeholder:text-white/60 focus:border-white/60 focus:ring-0 backdrop-blur-sm text-lg"
                  required
                  disabled={isSubmitting || isLoading}
                  maxLength={254}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60 z-10" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="pl-12 pr-12 py-4 bg-white/10 border-2 border-white/30 rounded-2xl text-white placeholder:text-white/60 focus:border-white/60 focus:ring-0 backdrop-blur-sm text-lg"
                  required
                  disabled={isSubmitting || isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  disabled={isSubmitting || isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 hover:from-pink-600 hover:via-orange-500 hover:to-yellow-500 text-white font-medium border-none shadow-lg text-lg"
            >
              {isSubmitting || isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : null}
              {isSubmitting || isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="flex justify-between items-center text-sm pt-4">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-white/70 hover:text-white transition-colors"
                disabled={isSubmitting || isLoading}
              >
                Forgot your password?
              </button>
              <Link
                to="/register"
                className="text-white/70 hover:text-white transition-colors"
              >
                Sign up
              </Link>
            </div>
          </form>
        )}
      </div>

      {/* Global Styles */}
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes orbit {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
