'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChevronDown, FaChevronUp, FaShoppingBasket, FaTruck, FaCreditCard, FaExchangeAlt, FaUserShield, FaShieldAlt } from 'react-icons/fa';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  const [openQuestions, setOpenQuestions] = useState<number[]>([0]); // First question open by default
  const [isVisible, setIsVisible] = useState(false);

  // FAQ categories
  const categories = [
    { id: 'general', name: 'General' },
    { id: 'orders', name: 'Orders & Delivery' },
    { id: 'payment', name: 'Payment' },
    { id: 'returns', name: 'Returns & Refunds' },
    { id: 'account', name: 'Account & Privacy' }
  ];

  // FAQ data
  const faqData = {
    general: [
      {
        question: "What is Purchasing Lanka International?",
        answer: "Purchasing Lanka International is a grocery delivery service that acts as a trusted middleman between customers and top supermarket chains in Sri Lanka. We allow you to browse and order items from multiple supermarkets, select your preferred store, and get everything delivered to your doorstep on the same day."
      },
      {
        question: "How do I place an order?",
        answer: "To place an order, browse our products section, select items you want to purchase, add them to your cart, and proceed to checkout. You can choose your preferred supermarket, specify delivery details, and select your payment method."
      },
      {
        question: "Which areas do you deliver to?",
        answer: "We currently deliver to Colombo and surrounding areas. You can enter your postal code on our website to check if we deliver to your location. We're constantly expanding our delivery network to serve more areas in Sri Lanka."
      },
      {
        question: "What are your operating hours?",
        answer: "Our platform is available 24/7 for placing orders. Deliveries are made between 8:00 AM and 10:00 PM, seven days a week. Customer service is available Monday through Saturday from 8:00 AM to 8:00 PM."
      }
    ],
    orders: [
      {
        question: "How long does delivery take?",
        answer: "Our standard delivery typically takes 2-4 hours from when you place your order. We also offer express delivery (1-2 hours) for an additional fee of Rs. 200. For orders placed after 6:00 PM, delivery may be scheduled for the next morning."
      },
      {
        question: "Can I track my order?",
        answer: "Yes, once your order is confirmed, you'll receive a tracking link via SMS and email. You can use this link to track the status of your order in real-time, from processing to delivery."
      },
      {
        question: "What if I'm not home when my order arrives?",
        answer: "Our delivery personnel will contact you before arriving. If you're not available, we can arrange for a different delivery time or leave with a neighbor if authorized by you. You can specify delivery instructions during checkout."
      },
      {
        question: "Can I change or cancel my order?",
        answer: "You can modify or cancel your order within 15 minutes of placing it. After that, please contact our customer service team directly, and we'll do our best to accommodate changes depending on the order's processing status."
      }
    ],
    payment: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept cash on delivery, credit/debit cards, online bank transfers, and mobile payment apps like FriMi and HNB SOLO. All online transactions are secured with industry-standard encryption."
      },
      {
        question: "Are there any additional fees or charges?",
        answer: "We charge a standard delivery fee of Rs. 350 for orders under Rs. 5,000. Orders above Rs. 5,000 qualify for free delivery. Express delivery (1-2 hours) incurs an additional fee of Rs. 200."
      },
      {
        question: "Do you offer any discounts or promotions?",
        answer: "Yes, we regularly offer promotions and discounts. First-time customers can use code 'WELCOME-TO-PLI' for 10% off their first order. You can also subscribe to our newsletter to receive special offers and updates on new promotions."
      },
      {
        question: "Is it safe to use my credit card on your website?",
        answer: "Absolutely. We use industry-standard SSL encryption to protect your personal and payment information. Your credit card details are never stored on our servers, and all transactions are processed through secure payment gateways."
      }
    ],
    returns: [
      {
        question: "What if I receive damaged or incorrect items?",
        answer: "If you receive damaged or incorrect items, please report it within 24 hours of delivery by contacting our customer service. Provide photos of the items, and we'll arrange for a replacement or refund as per your preference."
      },
      {
        question: "How do refunds work?",
        answer: "Refunds are processed within 3-5 business days after a return is approved. The amount will be credited back to your original payment method. For cash on delivery orders, we can process refunds via bank transfer or store credit."
      },
      {
        question: "Can I return products if I change my mind?",
        answer: "For non-perishable items in their original packaging, we accept returns within 3 days of delivery if you change your mind. For perishable items like fresh produce, dairy, and frozen foods, returns are only accepted if there are quality issues."
      },
      {
        question: "What is your quality guarantee?",
        answer: "We guarantee the freshness and quality of all products delivered. If you're not satisfied with the quality of any item, we'll provide a refund or replacement. We personally select the freshest produce and carefully handle your items from store to door."
      }
    ],
    account: [
      {
        question: "How do I create an account?",
        answer: "To create an account, click on the 'Sign In' button in the top right corner of our website and select 'Register'. Fill in your personal details, including name, email, phone number, and password. Verify your email address to activate your account."
      },
      {
        question: "How is my personal information protected?",
        answer: "We take data privacy seriously. Your personal information is protected using encryption and stored securely. We never share your data with third parties without your consent. For more details, please refer to our Privacy Policy."
      },
      {
        question: "Can I save my favorite items or create shopping lists?",
        answer: "Yes, registered users can save favorite items, create multiple shopping lists, and even save recurring orders for faster checkout. This makes repeat ordering quick and convenient."
      },
      {
        question: "How do I update my delivery address or contact information?",
        answer: "You can update your delivery address and contact information by logging into your account, navigating to the 'Profile' section, and selecting 'Edit Details'. Changes will be reflected immediately for future orders."
      }
    ]
  };

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

  // Toggle question open/close
  const toggleQuestion = (index: number) => {
    if (openQuestions.includes(index)) {
      setOpenQuestions(openQuestions.filter(item => item !== index));
    } else {
      setOpenQuestions([...openQuestions, index]);
    }
  };

  // Filter questions based on search query
  const filteredQuestions = () => {
    if (!searchQuery.trim()) {
      return faqData[activeCategory as keyof typeof faqData];
    }
    
    const lowercaseQuery = searchQuery.toLowerCase();
    
    let results: { question: string; answer: string }[] = [];
    
    // Search in all categories
    Object.values(faqData).forEach(categoryQuestions => {
      const filtered = categoryQuestions.filter(
        item => 
          item.question.toLowerCase().includes(lowercaseQuery) || 
          item.answer.toLowerCase().includes(lowercaseQuery)
      );
      results = [...results, ...filtered];
    });
    
    return results;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="px-4 md:px-16 py-16 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-4">
            <Image 
              src="/purchselankalogo.jpg" 
              alt="Purchasing Lanka International Logo" 
              width={280}
              height={120}
              className="mb-6"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our services, delivery, payments, and more. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div 
          className="mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full px-5 py-4 pl-12 rounded-lg bg-gray-900 text-white border border-gray-800 focus:outline-none focus:border-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-5 text-gray-500" />
            {searchQuery && (
              <button 
                className="absolute right-4 top-5 text-gray-500 hover:text-white"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Categories sidebar - Desktop */}
          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-gray-900 rounded-lg p-5 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`w-full text-left px-4 py-3 rounded-md transition-all ${
                      activeCategory === category.id && !searchQuery
                        ? 'bg-white text-black font-medium'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setSearchQuery('');
                      setOpenQuestions([0]); // Reset open questions
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </nav>
              
              {/* Contact support card */}
              <div className="mt-8 bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h3 className="text-white font-medium mb-2">Need more help?</h3>
                <p className="text-gray-400 text-sm mb-4">Our support team is always ready to assist you.</p>
                <Link href="/contact">
                  <button className="w-full bg-white text-black py-2 rounded hover:bg-gray-300 transition text-sm">
                    Contact Support
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Categories - Mobile */}
          <motion.div 
            className="md:hidden mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex overflow-x-auto pb-3 space-x-2 hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    activeCategory === category.id && !searchQuery
                      ? 'bg-white text-black font-medium'
                      : 'bg-gray-900 text-gray-300'
                  }`}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setSearchQuery('');
                    setOpenQuestions([0]); // Reset open questions
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* FAQ questions */}
          <motion.div 
            className="md:col-span-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Search results heading */}
            {searchQuery && (
              <motion.div 
                className="mb-6" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-xl text-white">
                  {filteredQuestions().length === 0 
                    ? 'No results found' 
                    : `Search results for "${searchQuery}"`}
                </h2>
              </motion.div>
            )}
            
            {/* Category title - only show when not searching */}
            {!searchQuery && (
              <motion.h2 
                className="text-2xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {categories.find(cat => cat.id === activeCategory)?.name || 'General'} Questions
              </motion.h2>
            )}
            
            {filteredQuestions().length === 0 ? (
              <motion.div 
                className="bg-gray-900 rounded-lg p-8 text-center"
                variants={itemVariants}
              >
                <FaSearch className="text-4xl text-gray-600 mb-4 mx-auto" />
                <p className="text-white text-lg mb-3">No results found for "{searchQuery}"</p>
                <p className="text-gray-400 mb-6">Please try a different search term or browse our categories</p>
                <button 
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredQuestions().map((item, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800"
                    variants={itemVariants}
                  >
                    <button
                      className="w-full px-6 py-5 text-left flex justify-between items-center"
                      onClick={() => toggleQuestion(index)}
                    >
                      <h3 className="text-lg text-white font-medium pr-8">{item.question}</h3>
                      {openQuestions.includes(index) ? (
                        <FaChevronUp className="text-gray-400 flex-shrink-0" />
                      ) : (
                        <FaChevronDown className="text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {openQuestions.includes(index) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-5 pt-0 border-t border-gray-800">
                            <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Category illustrations for desktop */}
            {!searchQuery && (
              <motion.div 
                className="hidden md:block mt-10"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative bg-gray-900 rounded-lg p-8 overflow-hidden">
                  <div className="flex justify-between items-center">
                    {activeCategory === 'general' && (
                      <div className="flex gap-6">
                        <div className="bg-gray-800 rounded-full p-4">
                          <FaShoppingBasket className="text-white text-2xl" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="text-white text-xl mb-2">Our Service</h3>
                          <p className="text-gray-400">Browse and order items from multiple supermarkets</p>
                        </div>
                      </div>
                    )}
                    
                    {activeCategory === 'orders' && (
                      <div className="flex gap-6">
                        <div className="bg-gray-800 rounded-full p-4">
                          <FaTruck className="text-white text-2xl" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="text-white text-xl mb-2">Fast Delivery</h3>
                          <p className="text-gray-400">Same-day delivery for all your grocery needs</p>
                        </div>
                      </div>
                    )}
                    
                    {activeCategory === 'payment' && (
                      <div className="flex gap-6">
                        <div className="bg-gray-800 rounded-full p-4">
                          <FaCreditCard className="text-white text-2xl" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="text-white text-xl mb-2">Secure Payments</h3>
                          <p className="text-gray-400">Multiple payment options with top-notch security</p>
                        </div>
                      </div>
                    )}
                    
                    {activeCategory === 'returns' && (
                      <div className="flex gap-6">
                        <div className="bg-gray-800 rounded-full p-4">
                          <FaExchangeAlt className="text-white text-2xl" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="text-white text-xl mb-2">Easy Returns</h3>
                          <p className="text-gray-400">Hassle-free returns and refunds process</p>
                        </div>
                      </div>
                    )}
                    
                    {activeCategory === 'account' && (
                      <div className="flex gap-6">
                        <div className="bg-gray-800 rounded-full p-4">
                          <FaUserShield className="text-white text-2xl" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="text-white text-xl mb-2">Account Security</h3>
                          <p className="text-gray-400">Your data is always protected with us</p>
                        </div>
                      </div>
                    )}
                    
                    <Link href="/contact">
                      <button className="bg-white text-black px-6 py-3 rounded hover:bg-gray-300 transition">
                        Still Have Questions?
                      </button>
                    </Link>
                  </div>
                  
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
        
        {/* Contact support card - Mobile */}
        <motion.div 
          className="md:hidden mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-gray-900 rounded-lg p-6 text-center border border-gray-800">
            <FaShieldAlt className="text-white text-3xl mx-auto mb-4" />
            <h3 className="text-white text-xl mb-3">Can't find your answer?</h3>
            <p className="text-gray-400 mb-6">Our customer support team is here to help you with any questions you might have.</p>
            <Link href="/contact">
              <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium">
                Contact Support
              </button>
            </Link>
          </div>
        </motion.div>
        
        {/* Additional resources */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg text-center border border-gray-800 hover:border-gray-700 transition">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image 
                  src="/delivery.png" 
                  alt="Delivery Information" 
                  width={40}
                  height={40}
                />
              </div>
              <h3 className="text-white text-lg mb-3">Delivery Information</h3>
              <p className="text-gray-400 mb-4">Learn more about our delivery process, timings, and coverage areas.</p>
              <Link href="/delivery-info">
                <button className="text-white hover:underline">Learn More →</button>
              </Link>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg text-center border border-gray-800 hover:border-gray-700 transition">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image 
                  src="/privacy.png" 
                  alt="Privacy Policy" 
                  width={40}
                  height={40}
                />
              </div>
              <h3 className="text-white text-lg mb-3">Privacy Policy</h3>
              <p className="text-gray-400 mb-4">Read our detailed privacy policy to understand how we protect your data.</p>
              <Link href="/privacy-policy">
                <button className="text-white hover:underline">Read Policy →</button>
              </Link>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg text-center border border-gray-800 hover:border-gray-700 transition">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image 
                  src="/terms.jpg" 
                  alt="Terms of Service" 
                  width={40}
                  height={40}
                />
              </div>
              <h3 className="text-white text-lg mb-3">Terms of Service</h3>
              <p className="text-gray-400 mb-4">Check our terms of service for information about your rights and obligations.</p>
              <Link href="/terms-of-service">
                <button className="text-white hover:underline">View Terms →</button>
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Call to action */}
        <motion.div 
          className="mt-16 bg-gray-900 rounded-lg p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to start shopping?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Browse our wide selection of products from top supermarkets in Sri Lanka and enjoy convenient same-day delivery.
          </p>
          <Link href="/products">
            <motion.button 
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Shopping Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
      
      {/* Custom CSS for hiding scrollbars but allowing scroll */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </section>
  );
}