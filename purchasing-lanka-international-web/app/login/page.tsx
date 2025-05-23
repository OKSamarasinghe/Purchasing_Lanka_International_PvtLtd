'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams?.get('registered');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);

  // Check for successful registration notification
  useEffect(() => {
    if (registered === 'true') {
      setShowRegistrationSuccess(true);
      
      // Hide notification after 5 seconds
      const timer = setTimeout(() => {
        setShowRegistrationSuccess(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [registered]);

  // Form input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call for login
      setTimeout(() => {
        setIsSubmitting(false);
        router.push('/');
        // In a real application, you would:
        // 1. Send credentials to your auth endpoint
        // 2. Store the returned token/user info
        // 3. Redirect to dashboard or home page
      }, 1500);
    }
  };

  return (
    <section className="px-4 md:px-16 py-16 bg-black min-h-screen">
      {/* Registration success notification */}
      <AnimatePresence>
        {showRegistrationSuccess && (
          <motion.div 
            className="fixed top-20 right-4 z-50 bg-green-900 text-white p-4 rounded-lg shadow-lg max-w-md"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <div className="flex items-center">
              <FaCheckCircle className="text-green-400 mr-2 text-xl" />
              <div>
                <p className="font-medium">Registration Successful!</p>
                <p className="text-sm text-green-300">Please login with your new account</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/purchselankalogo.jpg"
              alt="Purchasing Lanka International"
              width={200}
              height={80}
              className="mx-auto mb-4"
            />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
          <p className="text-gray-400">
            Welcome back! Please sign in to your account
          </p>
        </div>
        
        <motion.div 
          className="bg-gray-900 rounded-lg p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-gray-400 mb-1 text-sm">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded border ${errors.email ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-white`}
                    placeholder="name@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-gray-400 text-sm">Password</label>
                  <Link href="/forgot-password" className="text-sm text-gray-400 hover:text-white">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full bg-gray-800 text-white pl-10 pr-10 py-2 rounded border ${errors.password ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-white`}
                    placeholder="Enter password"
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              
              {/* Remember me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-400">Remember me</span>
                </label>
              </div>
              
              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-white text-black py-2 rounded font-medium hover:bg-gray-300 transition flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </motion.button>
            </div>
          </form>
          
          <p className="text-center mt-6 text-gray-400">
            Don't have an account?{' '}
            <Link href="/register" className="text-white hover:underline">
              Create Account
            </Link>
          </p>

          {/* Social Login Options */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-center text-sm text-gray-500 mb-4">Or sign in with</p>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
              >
                <Image src="/google-icon.png" alt="Google" width={20} height={20} className="mr-2" />
                Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded transition"
              >
                <Image src="/facebook-icon.png" alt="Facebook" width={20} height={20} className="mr-2" />
                Facebook
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>
            By signing in, you agree to our{' '}
            <Link href="/terms-of-service" className="text-white hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="text-white hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}