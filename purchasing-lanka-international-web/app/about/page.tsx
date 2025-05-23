'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaStore, FaShoppingBasket, FaTruck, FaClock, FaCheckCircle, FaShieldAlt, FaStar, FaHandshake, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [activePoint, setActivePoint] = useState(0);
  
  // Auto-advance through mission points
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePoint((prev) => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);

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

  const missionPoints = [
    {
      title: "Multi-Supermarket Access",
      text: "Browse and order items online from multiple supermarkets",
      icon: <FaStore className="text-white text-2xl" />
    },
    {
      title: "Personalized Selection",
      text: "Select your preferred supermarket based on preferences and location",
      icon: <FaShoppingCart className="text-white text-2xl" />
    },
    {
      title: "Same-Day Delivery",
      text: "Get everything delivered to your doorsteps on the same day",
      icon: <FaTruck className="text-white text-2xl" />
    },
    {
      title: "Convenience First",
      text: "Save time and avoid traffic and crowded shopping experiences",
      icon: <FaClock className="text-white text-2xl" />
    }
  ];

  // Core values
  const coreValues = [
    { value: "Quality", description: "We never compromise on the quality of products we deliver" },
    { value: "Reliability", description: "Consistent, dependable service you can count on every time" },
    { value: "Customer Focus", description: "Your needs and preferences always come first" },
    { value: "Integrity", description: "Honest business practices and transparent pricing" }
  ];

  return (
    <section className="px-4 md:px-16 py-16 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h1>

        {/* Header with Logo */}
        <motion.div 
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src="/purchselankalogo.jpg"
            alt="Purchasing Lanka International Logo"
            width={280}
            height={120}
            className="mb-6"
            priority
          />
        </motion.div>

        {/* Enhanced Company Introduction - Full width and modernized */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative bg-gray-900 p-8 md:p-12 rounded-xl border border-gray-800">
            {/* Background gradient accent */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-800 via-black-900 to-black-950 rounded-t-xl"></div>
            
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <FaHandshake className="mr-3 text-blue-400" /> Who We Are
            </h2>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                <span className="font-semibold text-white">Purchasing Lanka International</span> acts as a trusted middleman between customers and top supermarket
                chains in Sri Lanka. Founded in 2017, we have quickly become the preferred shopping assistant
                for busy professionals and families across Colombo and surrounding areas.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-12">
                We are committed to providing fast, reliable, and friendly service. Whether you're shopping for daily essentials
                or planning a large order, we ensure the best experience every time. Our team personally selects the freshest
                produce and carefully handles your items from store to door.
              </p>
            </div>
            
            {/* Stats in a horizontal layout with improved styling */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { value: "10+", label: "Partner Stores", icon: <FaStore className="text-blue-400" size={28} /> },
                { value: "5000+", label: "Happy Customers", icon: <FaUsers className="text-green-400" size={28} /> },
                { value: "98%", label: "Satisfaction Rate", icon: <FaStar className="text-yellow-400" size={28} /> },
                { value: "15K+", label: "Orders Completed", icon: <FaShoppingCart className="text-purple-400" size={28} /> }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-800 p-6 rounded-lg text-center border border-gray-700 hover:border-gray-500 transition-all duration-300"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                >
                  <div className="flex justify-center mb-3">
                    {stat.icon}
                  </div>
                  <p className="text-white text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Mission Section */}
        <motion.div 
          className="mb-16 bg-gray-900 p-8 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Mission</h2>
          
          <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center max-w-3xl mx-auto">
            Our mission is to make grocery shopping convenient and seamless by providing an innovative platform that connects customers with their favorite supermarkets.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Interactive Mission Points */}
            <div>
              <div className="mb-6">
                {missionPoints.map((point, index) => (
                  <motion.div 
                    key={index}
                    className={`p-4 mb-3 rounded-lg cursor-pointer transition-all duration-300 ${activePoint === index ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
                    onClick={() => setActivePoint(index)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full mr-4 ${activePoint === index ? 'bg-gray-900' : 'bg-gray-700'}`}>
                        {point.icon}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${activePoint === index ? 'text-black' : 'text-white'} text-lg`}>
                          {point.title}
                        </h3>
                        <p className={`${activePoint === index ? 'text-gray-800' : 'text-gray-400'}`}>
                          {point.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Visual representation */}
            <div className="bg-gray-800 rounded-lg p-6 h-full flex items-center justify-center">
              <div className="relative h-64 w-full">
                {activePoint === 0 && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="grid grid-cols-3 gap-3 w-full">
                      {[
                        { name: 'Cargills', logo: '/cargils.jpg' },
                        { name: 'Keells', logo: '/keels.png' },
                        { name: 'Arpico', logo: '/arpico.png' }
                      ].map(store => (
                        <div key={store.name} className="bg-gray-700 p-4 rounded-lg text-center text-white">
                          <div className="w-16 h-16 mx-auto mb-2 relative">
                            <Image
                              src={store.logo}
                              alt={`${store.name} logo`}
                              fill
                              className="object-contain"
                            />
                          </div>
                          {store.name}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {activePoint === 1 && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-gray-700 p-4 rounded-lg text-white w-full">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-12 h-12 relative mr-3 overflow-hidden">
                            <Image
                              src="/keels.png"
                              alt="Keells Super logo"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span>Keells Super</span>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-400 mr-1" />
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-600 p-2 rounded flex items-center justify-center">
                          <span>1.2km away</span>
                        </div>
                        <div className="bg-gray-600 p-2 rounded flex items-center justify-center">
                          <span>4.8 rating</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
)}
                
                {activePoint === 2 && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full space-y-3">
                      <div className="bg-gray-700 p-3 rounded-lg flex justify-between">
                        <div className="flex items-center">
                          <FaShoppingBasket className="text-white mr-2" />
                          <span className="text-white">Order placed</span>
                        </div>
                        <span className="text-green-400">10:00 AM</span>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg flex justify-between">
                        <div className="flex items-center">
                          <FaStore className="text-white mr-2" />
                          <span className="text-white">Shopping completed</span>
                        </div>
                        <span className="text-green-400">11:30 AM</span>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg flex justify-between">
                        <div className="flex items-center">
                          <FaTruck className="text-white mr-2" />
                          <span className="text-white">Out for delivery</span>
                        </div>
                        <span className="text-green-400">12:00 PM</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {activePoint === 3 && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full space-y-3">
                      <div className="bg-gray-700 p-3 rounded-lg text-white">
                        <div className="flex justify-between mb-2">
                          <span>Time spent in traffic</span>
                          <span className="text-red-400">0 minutes</span>
                        </div>
                        <div className="w-full bg-gray-600 h-2 rounded-full">
                          <div className="bg-green-400 h-2 rounded-full w-[5%]"></div>
                        </div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg text-white">
                        <div className="flex justify-between mb-2">
                          <span>Time waiting in queues</span>
                          <span className="text-red-400">0 minutes</span>
                        </div>
                        <div className="w-full bg-gray-600 h-2 rounded-full">
                          <div className="bg-green-400 h-2 rounded-full w-[5%]"></div>
                        </div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg text-white">
                        <div className="flex justify-between mb-2">
                          <span>Time saved shopping online</span>
                          <span className="text-green-400">120+ minutes</span>
                        </div>
                        <div className="w-full bg-gray-600 h-2 rounded-full">
                          <div className="bg-green-400 h-2 rounded-full w-[95%]"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Core Values */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Our Core Values</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900 p-6 rounded-lg text-center h-full flex flex-col"
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {index === 0 && <FaShieldAlt size={24} color="#000000" />}
                  {index === 1 && <FaCheckCircle size={24} color="#000000" />}
                  {index === 2 && <FaShoppingBasket size={24} color="#000000" />}
                  {index === 3 && <FaStar size={24} color="#000000" />}
                </div>
                <h3 className="text-white text-xl mb-3">{item.value}</h3>
                <p className="text-gray-400 flex-grow">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Services Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-white text-center">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={`/service${n}.png`}
                  alt={`Service ${n}`}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Our Team Section */}
        <div className="mb-16">
          {/* Keep your existing team section code */}
          <h2 className="text-3xl font-bold mb-10 text-white text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CEO */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mb-4 bg-gray-700">
                <Image
                  src="/jehanf2.png"
                  alt="Jehan Fernando - CEO"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-1">Jehan Fernando</h3>
              <p className="text-xl text-gray-400 mb-4">CEO & Founder</p>
              <p className="text-gray-300 text-center max-w-md">
                Jehan Fernando With over 15 years of experience in retail and logistics, Jehan founded Purchasing Lanka International
                with a vision to transform grocery shopping in Sri Lanka.
              </p>
            </div>

            {/* New Team Member */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mb-4 bg-gray-700">
                <Image
                  src="/rowans.webp" 
                  alt="New Team Member Name"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-1">Rowan De Soysa</h3>
              <p className="text-xl text-gray-400 mb-4">Marketing Executive</p>
              <p className="text-gray-300 text-center max-w-md">
                With expertise in digital marketing and customer engagement, Rowan leads our marketing strategies to build brand awareness and create meaningful connections with our growing customer base.
              </p>
            </div>

            {/* Director */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mb-4 bg-gray-700">
                <Image
                  src="/priyanthamu.webp"
                  alt="Priyantha - Director"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-1">Priyantha Mahaulpathagama</h3>
              <p className="text-xl text-gray-400 mb-4">Director of Operations</p>
              <p className="text-gray-300 text-center max-w-md">
                Priyantha Mahaulpathagama oversees all operational aspects of our service, ensuring timely deliveries and
                maintaining strong relationships with our supermarket partners.
              </p>
            </div>
          </div>
        </div>

        {/* Our Process */}
        <div className="mb-16">
          {/* Keep your existing process section code */}
          <h2 className="text-3xl font-bold mb-10 text-white text-center">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { 
                step: 1, 
                title: "Place Your Order", 
                text: "Browse our website and add items to your cart",
                icon: <FaShoppingCart size={24} color="#000000" />
              },
              { 
                step: 2, 
                title: "Select Supermarket", 
                text: "Choose your preferred store from our partner network", 
                icon: <FaStore size={24} color="#000000" />
              },
              { 
                step: 3, 
                title: "We Shop For You", 
                text: "Our team carefully selects the freshest items", 
                icon: <FaShoppingBasket size={24} color="#000000" />
              },
              { 
                step: 4, 
                title: "Doorstep Delivery", 
                text: "Receive your groceries at your convenience", 
                icon: <FaTruck size={24} color="#000000" />
              },
            ].map((item) => (
              <div key={item.step} className="bg-gray-900 p-6 rounded-lg text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-white text-lg mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Location */}
        <div className="mb-16">
          {/* Keep your existing location section code */}
          <h2 className="text-3xl font-bold mb-10 text-white text-center">Our Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-white text-xl mb-4">Find Us</h3>
              <p className="text-gray-300 mb-2">
                <strong className="text-white">Address:</strong> MACPAC Building, Dolekanatta Junction, Pilyandala, Sri Lanka
              </p>
              <p className="text-gray-300 mb-2">
                <strong className="text-white">Phone:</strong> +94 2012354842
              </p>
              <p className="text-gray-300 mb-2">
                <strong className="text-white">Email:</strong> info@purchasinglanka.com
              </p>
              <p className="text-gray-300 mb-2">
                <strong className="text-white">Hours:</strong> Monday-Saturday: 8:00 AM - 8:00 PM
              </p>
            </div>
            <div className="rounded-lg overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63332.43529277753!2d79.91619712249715!3d6.801777544977981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae247265e3b6f5b%3A0x9e267614d38ae8cb!2sPiliyandala!5e0!3m2!1sen!2slk!4v1715776744555!5m2!1sen!2slk"
                width="100%"
                height="100%"
                loading="lazy"
                className="border-0 w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-900 p-10 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to simplify your grocery shopping?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their shopping experience with Purchasing Lanka International.
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
        </div>
      </div>
    </section>
  );
}