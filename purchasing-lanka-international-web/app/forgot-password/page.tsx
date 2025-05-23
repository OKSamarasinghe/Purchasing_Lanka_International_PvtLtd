'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

export default function ForgotPasswordPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Form input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({});
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call for password reset
      setTimeout(() => {
        setIsSubmitting(false);
        setResetSent(true);
        
        // Redirect to login page after 5 seconds
        setTimeout(() => {
          router.push('/login');
        }, 5000);
      }, 1500);
    }
  };

  return (
    <section className="px-4 md:px-16 py-16 bg-black min-h-screen">
      <AnimatePresence>
        {resetSent && (
          <motion.div 
            className="fixed top-20 right-4 z-50 bg-green-900 text-white p-4 rounded-lg shadow-lg max-w-md"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <div className="flex items-center">
              <FaCheckCircle className="text-green-400 mr-2 text-xl" />
              <div>
                <p className="font-medium">Reset Link Sent!</p>
                <p className="text-sm text-green-300">Please check your email for password reset instructions</p>
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
          <h1 className="text-3xl font-bold text-white mb-2">Forgot Password</h1>
          <p className="text-gray-400">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>
        
        <motion.div 
          className="bg-gray-900 rounded-lg p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {resetSent ? (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-green-900 rounded-full flex items-center justify-center mb-6">
                <FaCheckCircle className="text-green-400 text-4xl" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Check Your Email</h2>
              <p className="text-gray-400 mb-6">
                We've sent a password reset link to <span className="text-white">{email}</span>. 
                The link will expire in 30 minutes.
              </p>
              <p className="text-gray-500 text-sm">
                Redirecting you to login page in a few seconds...
              </p>
            </div>
          ) : (
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
                      value={email}
                      onChange={handleChange}
                      className={`w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded border ${errors.email ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-white`}
                      placeholder="name@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                      Sending...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </motion.button>
              </div>
            </form>
          )}
          
          <div className="mt-6 text-center">
            <Link 
              href="/login" 
              className="text-gray-400 hover:text-white flex items-center justify-center"
            >
              <FaArrowLeft className="mr-2" />
              Back to Login
            </Link>
          </div>
        </motion.div>
        
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>
            Remember your password?{' '}
            <Link href="/login" className="text-white hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}