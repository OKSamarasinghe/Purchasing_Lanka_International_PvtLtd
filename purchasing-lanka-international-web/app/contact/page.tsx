'use client'

import { useState } from 'react';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-white" />,
      title: "Phone",
      info: "+94 2012354842",
      detail: "Monday to Saturday, 8am to 10pm"
    },
    {
      icon: <FaEnvelope className="text-white" />,
      title: "Email",
      info: "info@purchasinglanka.com",
      detail: "We'll respond within 24 hours"
    },
    {
      icon: <FaMapMarkerAlt className="text-white" />,
      title: "Office",
      info: "MACPAC Building, Dolekanatta",
      detail: "Junction, Pilyandala, Sri Lanka"
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="px-4 md:px-16 py-16 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Have questions about our services or need assistance? We're here to help.
            Our team is ready to assist you with any inquiries you may have.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-900 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
              
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {contactInfo.map((item, index) => (
                  <motion.div key={index} className="flex items-start" variants={itemVariants}>
                    <div className="bg-gray-800 p-3 rounded mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{item.title}</h3>
                      <p className="text-gray-300">{item.info}</p>
                      <p className="text-gray-500 text-sm">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Social Media Links */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition">
                  <FaFacebook className="text-white" />
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-400 transition">
                  <FaTwitter className="text-white" />
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition">
                  <FaInstagram className="text-white" />
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-green-600 transition">
                  <FaWhatsapp className="text-white" />
                </a>
              </div>
              
              <div className="mt-6">
                <h3 className="text-white font-medium mb-2">Business Hours</h3>
                <p className="text-gray-400 text-sm">Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p className="text-gray-400 text-sm">Saturday: 9:00 AM - 7:00 PM</p>
                <p className="text-gray-400 text-sm">Sunday: 10:00 AM - 6:00 PM</p>
                <p className="text-gray-400 text-sm mt-2">Delivery Hours: 8:00 AM - 10:00 PM Daily</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-6">Send Us A Message</h2>
              
              {showSuccess ? (
                <motion.div 
                  className="bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-6 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-green-700 p-3">
                      <FaCheck className="text-white text-xl" />
                    </div>
                  </div>
                  <h3 className="text-xl text-white mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-300">
                    Thank you for contacting us. We'll get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-1 text-sm">Full Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded bg-gray-800 text-white border ${errors.name ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-white`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1 text-sm">Email Address*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded bg-gray-800 text-white border ${errors.email ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-white`}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-1 text-sm">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-white"
                        placeholder="+94 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1 text-sm">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Customer Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="business">Business Partnership</option>
                        <option value="delivery">Delivery Issue</option>
                        <option value="refund">Refund Request</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-1 text-sm">Message*</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-2 rounded bg-gray-800 text-white border ${errors.message ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-white`}
                      placeholder="How can we help you today?"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" id="newsletter" className="mr-2" />
                    <label htmlFor="newsletter" className="text-gray-400 text-sm">Subscribe to our newsletter for updates and promotions</label>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className={`bg-white text-black px-6 py-3 rounded font-medium hover:bg-gray-300 transition flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6">Find Us</h2>
          <div className="bg-gray-900 p-2 rounded-lg overflow-hidden h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63332.43529277753!2d79.91619712249715!3d6.801777544977981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae247265e3b6f5b%3A0x9e267614d38ae8cb!2sPiliyandala!5e0!3m2!1sen!2slk!4v1715776744555!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl text-white mb-2">How do I track my order?</h3>
              <p className="text-gray-400">
                You can track your order by logging into your account and checking the order status. 
                You will also receive SMS and email updates about your delivery.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl text-white mb-2">What if I'm not home for delivery?</h3>
              <p className="text-gray-400">
                Our delivery personnel will contact you before arriving. If you're not available, 
                we can arrange for a different delivery time or leave with a neighbor if authorized.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl text-white mb-2">How do refunds work?</h3>
              <p className="text-gray-400">
                Refunds are processed within 3-5 business days after a return is approved. 
                The amount will be credited back to your original payment method.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl text-white mb-2">What areas do you deliver to?</h3>
              <p className="text-gray-400">
                We currently deliver to all areas within Colombo city and major suburbs. 
                You can check delivery availability during checkout by entering your postal code.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center bg-gray-900 p-10 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Need Immediate Assistance?</h2>
          <p className="text-gray-400 mb-6">
            Our customer support team is available 7 days a week to help you with any questions.
          </p>
          <a href="tel:+94-2012354842">
            <motion.button 
              className="bg-white text-black px-6 py-3 rounded font-medium flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPhone className="mr-2" /> Call Us Now
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}