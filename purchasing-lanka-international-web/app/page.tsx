'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaArrowRight, FaSearch, FaStore, FaTruck, FaStar, FaBoxOpen, FaTag, FaClock } from 'react-icons/fa';

// Featured products data for carousel
const featuredProducts = [
  { id: 1, name: "Rice 5kg", price: 1200, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0" },
  { id: 2, name: "Fresh Vegetables Bundle", price: 850, image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=500" },
  { id: 3, name: "Coconut", price: 150, image: "https://images.unsplash.com/photo-1627245784359-d8264960b62a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29jb251dCUyMG1pbGt8ZW58MHx8MHx8fDA%3D" },
  { id: 4, name: "Shampoo", price: 550, image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hhbXBvb3xlbnwwfHwwfHx8MA%3D%3D" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default as mobile for server rendering

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, []);

  // Check for window size and update mobile state
  useEffect(() => {
    // Set initial state based on client-side window
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll detection for animations
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Function to determine if a product should be visible in carousel
  const shouldShowProduct = (index: number) => {
    if (index === currentSlide) return true;
    
    if (!isMobile) {
      // On desktop, show additional slides
      if (
        index === (currentSlide + 1) % featuredProducts.length || 
        index === (currentSlide + 2) % featuredProducts.length || 
        index === (currentSlide + 3) % featuredProducts.length
      ) {
        return true;
      }
    }
    
    return false;
  };

  return (
    <section className="px-4 md:px-16 py-16 bg-black">
      <div className="max-w-6xl mx-auto"> {/* Added container for consistent width */}
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Your hero section content (unchanged) */}
          <div className="flex justify-center mb-8">
            <Image 
              src="/purchselankalogo.jpg" 
              alt="Purchasing Lanka International Logo" 
              width={500} 
              height={200}
              className="mx-auto"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Oshadha Shopping Made Easy
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Order your groceries online, choose your preferred supermarket, and we&apos;ll deliver everything straight to your doorstep.
          </p>
          
          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex max-w-lg mx-auto mb-8">
            <input
              type="text"
              placeholder="What are you looking for today?"
              className="flex-grow px-6 py-3 rounded-l-full bg-gray-800 text-white focus:outline-none border border-gray-700 focus:border-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-white text-black rounded-r-full hover:bg-gray-300 transition flex items-center"
            >
              <FaSearch className="mr-2" /> Search
            </button>
          </form>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/products">
              <motion.button 
                className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition w-full md:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Ordering
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button 
                className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition w-full md:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Fixed Featured Products Carousel */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-white mb-2">Featured Products</h2>
            <p className="text-gray-400">Handpicked favorites just for you</p>
          </div>

          {/* Fixed carousel container with proper constraints */}
          <div className="relative overflow-hidden">
            {/* Carousel Navigation */}
            <button 
              className="hidden md:block absolute left-0 z-10 bg-black/60 p-3 rounded-full text-white hover:bg-black" 
              onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)}
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            {/* Products grid (instead of overflow) - FIXED VERSION */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className={shouldShowProduct(index) ? 'block' : 'hidden md:block'}
                >
                  <Link href={`/products?id=${product.id}`}>
                    <div className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer group h-full">
                      <div className="relative h-48 overflow-hidden">
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill
                          className="object-cover group-hover:scale-110 transition duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-white font-medium text-lg mb-1">{product.name}</h3>
                        <p className="text-gray-400">Rs. {product.price.toLocaleString()}</p>
                        <button className="mt-3 bg-white text-black px-3 py-1 rounded text-sm flex items-center opacity-0 group-hover:opacity-100 transition">
                          <FaShoppingCart className="mr-1" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            <button 
              className="hidden md:block absolute right-0 z-10 bg-black/60 p-3 rounded-full text-white hover:bg-black" 
              onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)}
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-4">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 mx-1 rounded-full transition-all ${currentSlide === index ? 'w-6 bg-white' : 'w-2 bg-gray-500'}`}
              ></button>
            ))}
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div 
          className="mb-20"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <h2 className="text-3xl font-semibold text-white mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="bg-gray-900 p-6 rounded-lg shadow text-center hover:shadow-xl transition">
              <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaShoppingCart className="text-white text-2xl" />
                </motion.div>
              </div>
              <h3 className="text-white text-xl mb-3">Order Online</h3>
              <p className="text-gray-400 mb-4">Browse our extensive catalog of groceries and household items. Add your favorites to cart with a simple click.</p>
              <Link href="/products">
                <button className="text-white bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition flex items-center mx-auto">
                  Browse Products <FaArrowRight className="ml-2" />
                </button>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gray-900 p-6 rounded-lg shadow text-center hover:shadow-xl transition">
              <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaStore className="text-white text-2xl" />
                </motion.div>
              </div>
              <h3 className="text-white text-xl mb-3">Choose Your Supermarket</h3>
              <p className="text-gray-400 mb-4">Select from our partnered supermarket chains. Compare prices and find the best deals for your grocery needs.</p>
              <Link href="/supermarkets">
                <button className="text-white bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition flex items-center mx-auto">
                  View Supermarkets <FaArrowRight className="ml-2" />
                </button>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gray-900 p-6 rounded-lg shadow text-center hover:shadow-xl transition">
              <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <motion.div 
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <FaTruck className="text-white text-2xl" />
                </motion.div>
              </div>
              <h3 className="text-white text-xl mb-3">Get Doorstep Delivery</h3>
              <p className="text-gray-400 mb-4">We pick up your items and deliver them to your location. Track your order in real-time for maximum convenience.</p>
              <Link href="/contact">
                <button className="text-white bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition flex items-center mx-auto">
                  Delivery Info <FaArrowRight className="ml-2" />
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Special Offers Banner */}
        <motion.div 
          className="mb-20 bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">First Order Special</h2>
              <p className="text-gray-300 text-lg mb-3">Get 10% off on your first order!</p>
              <p className="text-gray-400">Use code: <span className="text-white font-bold">WELCOME-TO-PLI</span></p>
            </div>
            <Link href="/products">
              <motion.button 
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now <FaArrowRight className="ml-2" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Supermarket Selection Preview */}
        <motion.div 
          className="mb-20"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <h2 className="text-3xl font-semibold text-white mb-8 text-center">Choose from Top Supermarkets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-xl transition group">
              <div className="h-40 bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/supercity.webp" 
                  alt="Super City" 
                  width={120} 
                  height={60}
                  className="group-hover:scale-110 transition duration-300" 
                />
              </div>
              <h3 className="text-white text-xl mb-2">Super City</h3>
              <p className="text-gray-400 mb-4">Get fresh groceries from Sri Lanka&apos;s leading supermarket chain. Known for quality and variety.</p>
              <div className="flex items-center justify-between">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 mr-1" />
                  ))}
                  <FaStar className="text-gray-600" />
                </div>
                <Link href="/supermarkets?id=supercity">
                  <button className="text-white bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 transition text-sm">
                    View Store
                  </button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-xl transition group">
              <div className="h-40 bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/keels.png" 
                  alt="Keells" 
                  width={120} 
                  height={60} 
                  className="group-hover:scale-110 transition duration-300"
                />
              </div>
              <h3 className="text-white text-xl mb-2">Keells Super</h3>
              <p className="text-gray-400 mb-4">Quality products for everyday living with island-wide locations. Premium shopping experience.</p>
              <div className="flex items-center justify-between">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 mr-1" />
                  ))}
                </div>
                <Link href="/supermarkets?id=keells">
                  <button className="text-white bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 transition text-sm">
                    View Store
                  </button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-xl transition group">
              <div className="h-40 bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/arpico.png" 
                  alt="Arpico" 
                  width={120} 
                  height={60} 
                  className="group-hover:scale-110 transition duration-300"
                />
              </div>
              <h3 className="text-white text-xl mb-2">Arpico Supercentre</h3>
              <p className="text-gray-400 mb-4">Everything your home needs, delivered with care and quality. One-stop shopping solution.</p>
              <div className="flex items-center justify-between">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 mr-1" />
                  ))}
                  <FaStar className="text-yellow-500 opacity-50" />
                </div>
                <Link href="/supermarkets?id=arpico">
                  <button className="text-white bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 transition text-sm">
                    View Store
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/supermarkets">
              <motion.button 
                className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Supermarkets
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-white mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white text-lg mb-2">Save Time</h3>
              <p className="text-gray-400">No more waiting in queues. Order from the comfort of your home.</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white text-lg mb-2">Quality Products</h3>
              <p className="text-gray-400">We pick the freshest items just as if you were shopping yourself.</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-white text-lg mb-2">Compare Prices</h3>
              <p className="text-gray-400">Get the best deals by comparing prices across different supermarkets.</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white text-lg mb-2">Support 24/7</h3>
              <p className="text-gray-400">Our customer service team is available around the clock to assist you.</p>
            </div>
          </div>
        </motion.div>

        {/* New Delivery Services Section (Replacement for Mobile App) */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-white mb-10 text-center">Our Delivery Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg hover:shadow-xl transition duration-300">
              <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-white text-2xl" />
              </div>
              <h3 className="text-white text-xl text-center mb-3">Same-Day Delivery</h3>
              <p className="text-gray-400 text-center mb-4">Order before 2:00 PM and receive your groceries the same day. Available in all cities.</p>
              <ul className="text-gray-400">
                <li className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Delivery within 2-4 hours
                </li>
                <li className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Live order tracking
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Standard delivery fee applies
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg hover:shadow-xl transition duration-300">
              <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBoxOpen className="text-white text-2xl" />
              </div>
              <h3 className="text-white text-xl text-center mb-3">Express Delivery</h3>
              <p className="text-gray-400 text-center mb-4">Need your groceries urgently? Our express service ensures delivery within 1-2 hours.</p>
              <ul className="text-gray-400">
                <li className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Priority processing
                </li>
                <li className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Available 7 days a week
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Additional Rs. 200 fee
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg hover:shadow-xl transition duration-300">
              <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTag className="text-white text-2xl" />
              </div>
              <h3 className="text-white text-xl text-center mb-3">Free Delivery</h3>
              <p className="text-gray-400 text-center mb-4">Enjoy free delivery on all orders above Rs. 5,000. No promo code needed.</p>
              <ul className="text-gray-400">
                <li className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  No minimum order quantity
                </li>
                <li className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Standard delivery times apply
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Automatically applies at checkout
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/contact">
              <motion.button 
                className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Delivery Information
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-white mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-gray-900 p-6 rounded-lg shadow"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                  <Image 
                    src="/cus11.jpeg" 
                    alt="Customer 1" 
                    width={48} 
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Kalani D.</h4>
                  <p className="text-gray-400">Colombo 7</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 mr-1" />
                ))}
              </div>
              <p className="text-gray-300 italic">
                &quot;Purchasing Lanka International has saved me so much time! I can now get all my favorite products from Food City without leaving my home.&quot;
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-900 p-6 rounded-lg shadow"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                  <Image 
                    src="/cus2.png" 
                    alt="Customer 2" 
                    width={48} 
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Anjana R.</h4>
                  <p className="text-gray-400">Colombo 5</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 mr-1" />
                ))}
                <FaStar className="text-gray-600" />
              </div>
              <p className="text-gray-300 italic">
                &quot;The ability to choose which supermarket I want to order from makes this service truly unique. Highly recommended!&quot;
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-900 p-6 rounded-lg shadow"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                  <Image 
                    src="/cus33.png" 
                    alt="Customer 3" 
                    width={48} 
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Priya D.</h4>
                  <p className="text-gray-400">Colombo 3</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 mr-1" />
                ))}
              </div>
              <p className="text-gray-300 italic">
                &quot;The delivery is always on time and the groceries arrive fresh. Their customer service is excellent when I needed help with my order.&quot;
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-900 p-6 rounded-lg shadow"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                  <Image 
                    src="/cus44.png" 
                    alt="Customer 4" 
                    width={48} 
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Aruvi S.</h4>
                  <p className="text-gray-400">Colombo 4</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 mr-1" />
                ))}
                <FaStar className="text-yellow-500 opacity-50" />
              </div>
              <p className="text-gray-300 italic">
                &quot;Being able to compare prices across different supermarkets before ordering has helped me save money while still getting quality products.&quot;
              </p>
            </motion.div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-semibold text-white mb-4">Ready to get started?</h3>
            <Link href="/products">
              <motion.button 
                className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-300 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      {isVisible && (
        <motion.button
          className="fixed bottom-8 right-8 bg-white text-black p-3 rounded-full shadow-lg z-50"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -5 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </section>
  );
}