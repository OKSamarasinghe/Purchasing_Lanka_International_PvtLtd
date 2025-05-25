'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FaTruck, 
  FaMapMarkerAlt, 
  FaClock, 
  FaShieldAlt, 
  FaMoneyBillWave, 
  FaPhoneAlt, 
  FaEnvelope,
  FaCheck,
  FaShoppingBag,
  FaStore
} from 'react-icons/fa'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1 
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
}

// FAQs about delivery
const deliveryFaqs = [
  {
    question: "How long does delivery take?",
    answer: "Standard delivery typically takes 3-4 hours from the time you place your order. Express delivery options are available in select areas with a delivery time of 1-2 hours for an additional fee."
  },
  {
    question: "What are your delivery charges?",
    answer: "Delivery charges vary based on your location and order value. Standard delivery starts at Rs. 350. Orders above Rs. 3,000 qualify for free standard delivery. You can see the exact delivery charge during checkout."
  },
  {
    question: "What areas do you deliver to?",
    answer: "We currently deliver to Colombo, Dehiwala, Mount Lavinia, Maharagama, Kottawa, Piliyandala, Nugegoda, and surrounding areas. We're continuously expanding our delivery radius. Enter your address during checkout to confirm if we deliver to your area."
  },
  {
    question: "Can I choose a specific delivery time?",
    answer: "Yes, during checkout you can select from available delivery time slots. We offer 2-hour windows for your convenience. For more specific timing needs, please contact our customer service."
  },
  {
    question: "What happens if I'm not home during delivery?",
    answer: "Our delivery team will call you before arrival. If you're not available, we can leave your items with a security guard or neighbor of your choice, or reschedule the delivery for a more convenient time."
  }
];

export default function DeliveryInfoPage() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Delivery Information
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Learn more about our delivery process, times, and policies to ensure you get your groceries delivered exactly how and when you want them.
          </p>
        </motion.div>

        {/* Delivery Process */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">How Our Delivery Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  icon: <FaShoppingBag className="text-white text-2xl" />,
                  title: "Place Your Order",
                  description: "Select items from your preferred supermarket and place your order through our website or app."
                },
                {
                  icon: <FaStore className="text-white text-2xl" />,
                  title: "We Shop For You",
                  description: "Our personal shoppers carefully select the freshest items based on your preferences."
                },
                {
                  icon: <FaTruck className="text-white text-2xl" />,
                  title: "Doorstep Delivery",
                  description: "Our delivery team brings your groceries straight to your door at your chosen time slot."
                },
                {
                  icon: <FaCheck className="text-white text-2xl" />,
                  title: "Satisfaction Guaranteed",
                  description: "Not happy with an item? Report within 24 hours for a refund or replacement."
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg text-center border border-gray-700"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                >
                  <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-white text-xl mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Delivery Times and Areas */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Delivery Times */}
          <motion.div 
            className="bg-gray-900 p-8 rounded-lg"
            variants={itemVariants}
          >
            <div className="flex items-center mb-6">
              <div className="bg-gray-800 p-4 rounded-full mr-4">
                <FaClock className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-white">Delivery Times</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-800 pb-4">
                <span className="text-white">Standard Delivery</span>
                <span className="text-gray-400">3-4 hours</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-4">
                <span className="text-white">Express Delivery</span>
                <span className="text-gray-400">1-2 hours</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-4">
                <span className="text-white">Scheduled Delivery</span>
                <span className="text-gray-400">Choose your time slot</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Delivery Hours</span>
                <span className="text-gray-400">9:00 AM - 9:00 PM</span>
              </div>
            </div>
            
            <div className="mt-8 bg-gray-800 p-4 rounded-lg border-l-4 border-white">
              <p className="text-gray-300 text-sm">
                <strong className="text-white">Note:</strong> Delivery times may vary during peak hours and holidays. We'll always keep you updated on your delivery status via SMS and in-app notifications.
              </p>
            </div>
          </motion.div>
          
          {/* Delivery Areas */}
          <motion.div 
            className="bg-gray-900 p-8 rounded-lg"
            variants={itemVariants}
          >
            <div className="flex items-center mb-6">
              <div className="bg-gray-800 p-4 rounded-full mr-4">
                <FaMapMarkerAlt className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-white">Delivery Areas</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="text-white font-medium mb-2">Colombo</h3>
                <ul className="text-gray-400 space-y-1">
                  <li>Colombo 1-15</li>
                  <li>Dehiwala</li>
                  <li>Mount Lavinia</li>
                  <li>Ratmalana</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="text-white font-medium mb-2">Suburban Areas</h3>
                <ul className="text-gray-400 space-y-1">
                  <li>Maharagama</li>
                  <li>Kottawa</li>
                  <li>Piliyandala</li>
                  <li>Nugegoda</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="text-white font-medium mb-2">Outskirt Areas</h3>
                <ul className="text-gray-400 space-y-1">
                  <li>Kaduwela</li>
                  <li>Battaramulla</li>
                  <li>Athurugiriya</li>
                  <li>Malabe</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="text-white font-medium mb-2">Coming Soon</h3>
                <ul className="text-gray-400 space-y-1">
                  <li>Gampaha</li>
                  <li>Negombo</li>
                  <li>Kalutara</li>
                  <li>Panadura</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-gray-300">
                Don't see your area? Contact us to check if we're expanding to your location soon!
              </p>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Delivery Fees & Policies */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Delivery Fees */}
          <motion.div 
            className="bg-gray-900 p-8 rounded-lg"
            variants={itemVariants}
          >
            <div className="flex items-center mb-6">
              <div className="bg-gray-800 p-4 rounded-full mr-4">
                <FaMoneyBillWave className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-white">Delivery Fees</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-800 pb-4">
                <span className="text-white">Standard Delivery</span>
                <span className="text-gray-400">Rs. 350</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-4">
                <span className="text-white">Express Delivery</span>
                <span className="text-gray-400">Rs. 550</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-4">
                <span className="text-white">Free Delivery</span>
                <span className="text-gray-400">Orders above Rs. 5,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Outskirt Areas</span>
                <span className="text-gray-400">Additional Rs. 100-200</span>
              </div>
            </div>
            
            <div className="mt-8 bg-green-900 p-4 rounded-lg">
              <p className="text-gray-200">
                <strong className="text-white">Pro Tip:</strong> Subscribe to our monthly delivery pass for Rs. 1,500/month and get unlimited free deliveries on all your orders!
              </p>
            </div>
          </motion.div>
          
          {/* Delivery Policies */}
          <motion.div 
            className="bg-gray-900 p-8 rounded-lg"
            variants={itemVariants}
          >
            <div className="flex items-center mb-6">
              <div className="bg-gray-800 p-4 rounded-full mr-4">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-white">Delivery Policies</h2>
            </div>
            
            <ul className="space-y-4">
              <li className="flex">
                <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-medium">Fresh Guarantee</h3>
                  <p className="text-gray-400">All perishable items are guaranteed fresh on delivery or your money back.</p>
                </div>
              </li>
              <li className="flex">
                <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-medium">Contactless Delivery</h3>
                  <p className="text-gray-400">Available upon request. Our delivery person will place your order at your doorstep.</p>
                </div>
              </li>              <li className="flex">
                <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-medium">Delivery Updates</h3>
                  <p className="text-gray-400">Real-time SMS and app notifications on your order's journey.</p>
                </div>
              </li>
              <li className="flex">
                <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-medium">Returns & Refunds</h3>
                  <p className="text-gray-400">Report issues within 24 hours for a full refund or replacement.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        
        {/* Frequently Asked Questions */}
        <motion.div 
          className="bg-gray-900 rounded-lg p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {deliveryFaqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <button 
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => toggleQuestion(index)}
                >
                  <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                  <svg 
                    className={`w-5 h-5 text-white transform ${activeQuestion === index ? 'rotate-180' : ''} transition-transform`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {activeQuestion === index && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-400">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Contact Section */}
        <motion.div 
          className="bg-gray-900 rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Have More Questions?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhoneAlt className="text-white text-xl" />
              </div>
              <h3 className="text-white text-xl mb-2">Call Us</h3>
              <p className="text-gray-400 mb-4">Our delivery support is available 7 days a week</p>
              <p className="text-white text-lg">+94 112 345 678</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-white text-xl" />
              </div>
              <h3 className="text-white text-xl mb-2">Email Us</h3>
              <p className="text-gray-400 mb-4">We'll respond to your inquiry promptly</p>
              <p className="text-white text-lg">delivery@purchasinglanka.com</p>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link href="/contact" className="inline-block bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition">
              Contact Our Support Team
            </Link>
          </div>        </motion.div>
      </div>
    </section>
  );
}