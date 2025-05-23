'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';

// Wrapper Component for useSearchParams to be inside a <Suspense> boundary
function RegistrationSuccessMessage() {
  const searchParams = useSearchParams();
  const registered = searchParams?.get('registered');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (registered === 'true') {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [registered]);

  if (!show) return null;

  return (
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
  );
}

export default function LoginContent() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        router.push('/');
      }, 1500);
    }
  };

  return (
    <section className="px-4 md:px-16 py-16 bg-black min-h-screen">
      <AnimatePresence>
        <Suspense fallback={null}>
          <RegistrationSuccessMessage />
        </Suspense>
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
          <p className="text-gray-400">Welcome back! Please sign in to your account</p>
        </div>

        <motion.div 
          className="bg-gray-900 rounded-lg p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white mb-1">Email</label>
              <div className="flex items-center bg-gray-800 rounded-md px-3 py-2">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent outline-none w-full text-white"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-white mb-1">Password</label>
              <div className="flex items-center bg-gray-800 rounded-md px-3 py-2">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-transparent outline-none w-full text-white"
                />
                <button
                  type="button"
                  className="text-gray-400 ml-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Don't have an account?{' '}
            <Link href="/register" className="text-green-500 hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
