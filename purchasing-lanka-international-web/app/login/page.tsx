'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

// Loading component for Suspense fallback
function LoginLoading() {
  return (
    <section className="px-4 md:px-16 py-16 bg-black min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 w-[200px] h-[80px] bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 bg-gray-700 rounded mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6 md:p-8">
          <div className="animate-pulse space-y-5">
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Login form component that uses useSearchParams
function LoginForm() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Get redirect URL from search params
  const redirectUrl = searchParams.get('redirect') || '/'
  const error = searchParams.get('error')
  const registered = searchParams.get('registered')

  // Form input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Validate form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsSubmitting(true)
      
      try {
        // Add your login logic here
        console.log('Login attempt:', { email: formData.email, redirectUrl })
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Redirect to the intended page or home
        window.location.href = redirectUrl
      } catch (error) {
        console.error('Login failed:', error)
        setErrors({ general: 'Login failed. Please try again.' })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <section className="px-4 md:px-16 py-16 bg-black min-h-screen">
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
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">
            Sign in to your Purchasing Lanka International account
          </p>
        </div>
        
        <motion.div 
          className="bg-gray-900 rounded-lg p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {registered && (
            <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded mb-6">
              Account created successfully! Please sign in.
            </div>
          )}

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded mb-6">
              {error === 'unauthorized' && 'Please sign in to access this page'}
              {error === 'invalid' && 'Invalid email or password'}
              {error === 'expired' && 'Your session has expired. Please sign in again'}
            </div>
          )}

          {errors.general && (
            <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded mb-6">
              {errors.general}
            </div>
          )}

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
                <label className="block text-gray-400 mb-1 text-sm">Password</label>
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
                    placeholder="Enter your password"
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

              {/* Remember Me & Forgot Password */}
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
                <Link
                  href="/forgot-password"
                  className="text-sm text-white hover:underline"
                >
                  Forgot password?
                </Link>
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
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-white hover:underline">
              Sign Up
            </Link>
          </p>
        </motion.div>
        
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>
            <Link href="/" className="text-white hover:underline">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

// Main login page component with Suspense boundary
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  )
}