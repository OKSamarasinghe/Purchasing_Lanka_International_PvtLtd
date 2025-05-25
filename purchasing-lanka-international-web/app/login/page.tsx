'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

// Loading component for Suspense fallback
function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <div className="w-48 h-20 bg-gray-700 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="h-8 bg-gray-700 rounded mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
          <div className="animate-pulse">
            <div className="space-y-4">
              <div className="h-12 bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Login form component that uses useSearchParams
function LoginForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // Get redirect URL from search params
  const redirectUrl = searchParams.get('redirect') || '/'
  const error = searchParams.get('error')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Add your login logic here
      console.log('Login attempt:', { email, redirectUrl })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to the intended page or home
      window.location.href = redirectUrl
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black px-4 py-16">
      <div className="max-w-md mx-auto">
        {/* Logo Section */}
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
          <p className="text-gray-400">Sign in to Purchasing Lanka International</p>
        </div>

        {/* Login Form Container */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
          {error && (
            <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded mb-6">
              {error === 'unauthorized' && 'Please sign in to access this page'}
              {error === 'invalid' && 'Invalid email or password'}
              {error === 'expired' && 'Your session has expired. Please sign in again'}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-gray-400"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-white focus:ring-white border-gray-600 bg-gray-800 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-white hover:text-gray-300"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-2 rounded font-medium hover:bg-gray-300 transition flex items-center justify-center"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-white hover:text-gray-300 font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-white hover:text-gray-300 text-sm font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
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