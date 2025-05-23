'use client'

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaShoppingCart, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(3); // Replace with actual cart state
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();

  // Handle scroll for adding background shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Main navigation links - centralized for consistency
  const mainNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Supermarkets', path: '/supermarkets' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];

  // Secondary links for More dropdown
  const moreLinks = [
    { name: 'FAQ', path: '/faq' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 transition-all duration-300 border-b border-gray-800 ${
          isScrolled ? 'bg-black shadow-lg' : 'bg-black/90'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-10 h-10">
            <Image 
              src="/logo.png" 
              alt="Purchasing Lanka International Logo" 
              fill
              className="object-contain"
              sizes="40px"
              priority
            />
          </div>
          <span className="text-white text-lg font-semibold hidden sm:inline-block">
            Purchasing Lanka International
          </span>
        </Link>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex space-x-5 items-center justify-center flex-1 px-4">
          {mainNavLinks.map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              className="relative py-2 px-1 text-sm"
            >
              <span className={pathname === item.path ? 'text-white' : 'text-gray-300 hover:text-white transition-colors'}>
                {item.name}
              </span>
              {pathname === item.path && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                  layoutId="navIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}

          {/* More dropdown */}
          <div className="relative group">
            <button className="flex items-center text-sm space-x-1 text-gray-300 hover:text-white py-2 px-1">
              <span>More</span>
              <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-50 border border-gray-800 hidden group-hover:block">
              {moreLinks.map((item) => (
                <Link 
                  key={item.name}
                  href={item.path}
                  className={`block px-4 py-2 ${
                    pathname === item.path
                      ? 'text-white bg-gray-800'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - cart, user, mobile menu */}
        <div className="flex items-center space-x-4">
          {/* Cart with badge */}
          <Link href="/cart" className="relative text-white hover:text-gray-300 p-1">
            <FaShoppingCart className="text-xl" />
            {cartItems > 0 && (
              <motion.span 
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {cartItems}
              </motion.span>
            )}
          </Link>

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-1 text-white hover:text-gray-300 p-1"
            >
              <FaUser className="text-xl" />
              <FaChevronDown className={`text-xs transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div 
                  className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-50 border border-gray-800"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href="/profile" className="block px-4 py-2 text-white hover:bg-gray-700">My Profile</Link>
                  
                  <div className="border-t border-gray-700 my-1"></div>
                  <Link href="/login" className="block px-4 py-2 text-white hover:bg-gray-700">Sign in</Link>
                  <Link href="/register" className="block px-4 py-2 text-white hover:bg-gray-700">Register</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black pt-16"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              {/* Main navigation links */}
              {[...mainNavLinks, ...moreLinks].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-full"
                >
                  <Link 
                    href={item.path}
                    className={`block text-center py-4 text-xl ${
                      pathname === item.path
                        ? 'text-white font-bold'
                        : 'text-gray-400'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Sign in button */}
              <motion.div
                className="w-full border-t border-gray-800 mt-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Link
                  href="/login"
                  className="block text-center py-4 text-xl text-white font-bold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Space for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}