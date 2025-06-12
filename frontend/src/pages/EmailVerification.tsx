import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, Bug } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    const verify = async () => {
      try {
        const result = await verifyEmail(token);
        setStatus('success');
        setMessage(result || 'Email verified successfully!');
        toast.success('Email verified successfully!');
        
        setTimeout(() => {
          navigate('/login?verified=true');
        }, 3000);
      } catch (error: any) {
        setStatus('error');
        setMessage(error.message || 'Email verification failed');
        toast.error(error.message || 'Email verification failed');
      }
    };

    verify();
  }, [searchParams, verifyEmail, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl text-center">
        <div>
          <Bug className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Email Verification
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {status === 'loading' && 'Verifying your email address...'}
            {status === 'success' && 'Your email has been verified successfully!'}
            {status === 'error' && 'Email verification failed'}
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-center">
            {status === 'loading' && <Loader2 className="h-16 w-16 animate-spin text-blue-600" />}
            {status === 'success' && <CheckCircle className="h-16 w-16 text-green-600" />}
            {status === 'error' && <XCircle className="h-16 w-16 text-red-600" />}
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {message}
          </p>
          
          {status === 'success' && (
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Redirecting to login page in 3 seconds...
            </p>
          )}
          
          {status === 'error' && (
            <Button asChild className="w-full">
              <Link to="/login">
                Back to Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
