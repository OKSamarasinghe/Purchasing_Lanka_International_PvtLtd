'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [strengthChecker, setStrengthChecker] = useState({
    length: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false
  });
  
  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    setStrengthChecker({
      length: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    });
  };
  
  // Form input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Check password strength when password field changes
    if (name === 'password') {
      checkPasswordStrength(value);
    }
    
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
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+\d{1,3})?\s?\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call for registration
      setTimeout(() => {
        setIsSubmitting(false);
        router.push('/login?registered=true');
      }, 1500);
    }
  };
  
  // Calculate password strength percentage
  const getPasswordStrength = () => {
    const { length, hasUpper, hasLower, hasNumber, hasSpecial } = strengthChecker;
    const criteria = [length, hasUpper, hasLower, hasNumber, hasSpecial];
    const passedCriteria = criteria.filter(Boolean).length;
    return (passedCriteria / criteria.length) * 100;
  };
  
  // Get strength text based on percentage
  const getStrengthText = () => {
    const strength = getPasswordStrength();
    
    if (strength === 0) return '';
    if (strength <= 20) return 'Very Weak';
    if (strength <= 40) return 'Weak';
    if (strength <= 60) return 'Medium';
    if (strength <= 80) return 'Strong';
    return 'Very Strong';
  };
  
  // Get strength color based on percentage
  const getStrengthColor = () => {
    const strength = getPasswordStrength();
    
    if (strength <= 20) return 'bg-red-500';
    if (strength <= 40) return 'bg-orange-500';
    if (strength <= 60) return 'bg-yellow-500';
    if (strength <= 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

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
          <h1 className="text-3xl font-bold text-white mb-2">Create an Account</h1>
          <p className="text-gray-400">
            Join Purchasing Lanka International and start shopping across multiple supermarkets
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
              {/* Full Name */}
              <div>
                <label className="block text-gray-400 mb-1 text-sm">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded border ${errors.fullName ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-white`}
                    placeholder="Oshadha Samarasinghe"
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              
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
                    placeholder="oshadhak@gmail.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              {/* Phone */}
              <div>
                <label className="block text-gray-400 mb-1 text-sm">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-500" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded border ${errors.phone ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-white`}
                    placeholder="+94 XX XXX XXXX"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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
                
                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Password Strength</span>
                      <span className="text-xs font-medium" style={{ color: getStrengthColor().replace('bg-', 'text-') }}>
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getStrengthColor()}`} 
                        style={{ width: `${getPasswordStrength()}%` }}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-1 mt-2 gap-1">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${strengthChecker.length ? 'bg-green-500' : 'bg-gray-700'}`}>
                          {strengthChecker.length && <FaCheck className="text-white text-xs" />}
                        </div>
                        <span className="text-xs text-gray-400">At least 8 characters</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${strengthChecker.hasUpper ? 'bg-green-500' : 'bg-gray-700'}`}>
                          {strengthChecker.hasUpper && <FaCheck className="text-white text-xs" />}
                        </div>
                        <span className="text-xs text-gray-400">Uppercase letter</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${strengthChecker.hasLower ? 'bg-green-500' : 'bg-gray-700'}`}>
                          {strengthChecker.hasLower && <FaCheck className="text-white text-xs" />}
                        </div>
                        <span className="text-xs text-gray-400">Lowercase letter</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${strengthChecker.hasNumber ? 'bg-green-500' : 'bg-gray-700'}`}>
                          {strengthChecker.hasNumber && <FaCheck className="text-white text-xs" />}
                        </div>
                        <span className="text-xs text-gray-400">Number</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${strengthChecker.hasSpecial ? 'bg-green-500' : 'bg-gray-700'}`}>
                          {strengthChecker.hasSpecial && <FaCheck className="text-white text-xs" />}
                        </div>
                        <span className="text-xs text-gray-400">Special character</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Confirm Password */}
              <div>
                <label className="block text-gray-400 mb-1 text-sm">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full bg-gray-800 text-white pl-10 pr-10 py-2 rounded border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-white`}
                    placeholder="Confirm password"
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="text-gray-500" />
                    ) : (
                      <FaEye className="text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
              
              {/* Terms and Conditions */}
              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 mr-2"
                  />
                  <span className="text-sm text-gray-400">
                    I agree to the{' '}
                    <Link href="/terms-of-service" className="text-white hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy-policy" className="text-white hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>}
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
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </motion.button>
            </div>
          </form>
          
          <p className="text-center mt-6 text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-white hover:underline">
              Sign In
            </Link>
          </p>
        </motion.div>
        
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>By creating an account, you are agreeing to our</p>
          <p className="mt-1">
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