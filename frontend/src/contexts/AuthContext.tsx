import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Type definitions
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  avatar?: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
  data?: {
    user: User;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<string>;
  resendVerification: (email: string) => Promise<string>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5001/api';
axios.defaults.withCredentials = true;

// Add request interceptor to include token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem('token');
      // Don't redirect here, let components handle it
    }
    
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await axios.get<AuthResponse>('/auth/me');
      if (response.data.success && response.data.data) {
        setUser(response.data.data.user);
      }
    } catch (error: any) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await axios.post<AuthResponse>('/auth/login', { 
        email: email.toLowerCase().trim(), 
        password 
      });
      
      if (response.data.success && response.data.data) {
        setUser(response.data.data.user);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<string> => {
    try {
      setIsLoading(true);
      console.log('Attempting registration with:', { name, email, password: '***' });
      
      const response = await axios.post<AuthResponse>('/auth/register', {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password
      });
      
      console.log('Registration response:', response.data);
      
      if (response.data.success) {
        return response.data.message || 'Registration successful! Please check your email to verify your account.';
      }
      
      throw new Error(response.data.message || 'Registration failed');
    } catch (error: any) {
      console.error('Registration error:', error);
      let errorMessage = 'Registration failed';
      
      if (error.response) {
        // Server responded with error status
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data?.errors) {
          // Handle validation errors
          const validationErrors = error.response.data.errors;
          if (Array.isArray(validationErrors) && validationErrors.length > 0) {
            errorMessage = validationErrors[0].msg || validationErrors[0];
          }
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check if the server is running.';
      } else {
        errorMessage = error.message || 'Registration failed';
      }
      
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  const forgotPassword = async (email: string): Promise<string> => {
    try {
      const response = await axios.post<AuthResponse>('/auth/forgot-password', { 
        email: email.toLowerCase().trim() 
      });
      
      if (response.data.success) {
        return response.data.message || 'Reset email sent successfully';
      }
      
      throw new Error(response.data.message || 'Failed to send reset email');
    } catch (error: any) {
      let errorMessage = 'Failed to send reset email';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      throw new Error(errorMessage);
    }
  };

  const resetPassword = async (token: string, password: string): Promise<void> => {
    try {
      const response = await axios.put<AuthResponse>(`/auth/reset-password/${token}`, { password });
      
      if (response.data.success && response.data.data) {
        setUser(response.data.data.user);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
      } else {
        throw new Error(response.data.message || 'Password reset failed');
      }
    } catch (error: any) {
      let errorMessage = 'Password reset failed';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      throw new Error(errorMessage);
    }
  };

  const verifyEmail = async (token: string): Promise<string> => {
    try {
      const response = await axios.get<AuthResponse>(`/auth/verify-email/${token}`);
      
      if (response.data.success) {
        return response.data.message || 'Email verified successfully';
      }
      
      throw new Error(response.data.message || 'Email verification failed');
    } catch (error: any) {
      let errorMessage = 'Email verification failed';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      throw new Error(errorMessage);
    }
  };

  const resendVerification = async (email: string): Promise<string> => {
    try {
      const response = await axios.post<AuthResponse>('/auth/resend-verification', { 
        email: email.toLowerCase().trim() 
      });
      
      if (response.data.success) {
        return response.data.message || 'Verification email sent successfully';
      }
      
      throw new Error(response.data.message || 'Failed to send verification email');
    } catch (error: any) {
      let errorMessage = 'Failed to send verification email';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      throw new Error(errorMessage);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerification,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};