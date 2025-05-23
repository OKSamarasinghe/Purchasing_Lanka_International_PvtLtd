'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaChevronUp } from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      // Here you would typically send this to your API
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-black text-white pt-16 pb-6 border-t border-gray-800">
      <div className="px-4 md:px-16 max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Image src="/logo.png" alt="Purchasing Lanka International" width={40} height={40} className="mr-2" />
              <span className="text-lg font-semibold">Purchasing Lanka International</span>
            </div>
            <p className="text-gray-400 mb-6">
              We deliver groceries from your favorite supermarkets directly to your doorstep. Shop with ease, save time, and enjoy convenience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 transition">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-green-600 transition">
                <FaWhatsapp size={18} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-800 transition">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/supermarkets" className="text-gray-400 hover:text-white transition">
                  Supermarkets
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">MACPAC Building, Dolekanatta Junction, Pilyandala, Sri Lanka</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-gray-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">+94 2012354842</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-gray-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">info@purchasinglanka.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-white font-medium mb-2">Business Hours</h4>
              <p className="text-gray-400 text-sm">Monday - Friday: 8:00AM - 8:00PM</p>
              <p className="text-gray-400 text-sm">Saturday - Sunday: 9:00AM - 6:00PM</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for promotions, special offers, and updates on new products.
            </p>
            {subscribed ? (
              <div className="bg-green-900 bg-opacity-30 text-green-400 p-3 rounded border border-green-700 mb-4">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:outline-none focus:border-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition font-medium"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Oshadha Samarasinghe. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition">
              Terms of Service
            </Link>
            <Link href="/faq" className="text-gray-400 hover:text-white text-sm transition">
              FAQ
            </Link>
          </div>
        </div>
        
        {/* Scroll to top button */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={scrollToTop}
            className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition focus:outline-none"
          >
            <FaChevronUp />
          </button>
        </div>
        
        
      </div>
    </footer>
  );
}