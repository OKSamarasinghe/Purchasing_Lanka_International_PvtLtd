'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaClock, FaCheck, FaArrowRight, FaStar, FaPhone } from 'react-icons/fa';

// Supermarket data
const supermarkets = [
  {
    id: "cargills",
    name: "Cargills Food City",
    logo: "/cargils.jpg",
    image: "/cargills-storee.png",
    description: "Sri Lanka's leading retail chain, offering a wide range of groceries, fresh produce, household items, and more at competitive prices.",
    features: ["Wide product selection", "Fresh produce daily", "Island-wide locations", "Competitive pricing", "Weekly specials"],
    location: "Locations across all major cities in Sri Lanka",
    hours: "7:00 AM - 10:00 PM, Open daily",
    rating: 4.5,
    contact: "+94 11 2588588",
    popularCategories: ["Groceries", "Fresh Produce", "Dairy", "Household", "Beverages"],
    specialOffers: ["10% off on fresh vegetables", "Buy 1 Get 1 on selected dairy products", "Loyalty card benefits"]
  },
  {
    id: "keells",
    name: "Keells Super",
    logo: "/keels.png",
    image: "/keells-store.jpg",
    description: "Premium supermarket chain offering quality products, imported goods, and a superior shopping experience with a focus on freshness and variety.",
    features: ["Premium product quality", "Wide range of imported goods", "Fresh meat & seafood counter", "In-house bakery", "Organic section"],
    location: "Premium locations in Colombo and major cities",
    hours: "8:00 AM - 10:00 PM, Open daily",
    rating: 4.7,
    contact: "+94 11 2303500",
    popularCategories: ["Premium Groceries", "Imported Goods", "Fresh Meats", "Bakery", "Ready Meals"],
    specialOffers: ["Premium membership benefits", "Weekend special discounts", "Keells loyalty points"]
  },
  {
    id: "arpico",
    name: "Arpico Supercentre",
    logo: "/arpico.png",
    image: "/arpico-store.png",
    description: "Large-format retail experience that combines groceries, household items, electronics, furniture and more under one roof for convenient one-stop shopping.",
    features: ["Supermarket and department store", "Electronics & appliances", "Furniture section", "Household goods", "Clothing department"],
    location: "Major shopping complexes in Colombo and suburbs",
    hours: "9:00 AM - 9:00 PM, Open daily",
    rating: 4.6,
    contact: "+94 11 2832832",
    popularCategories: ["Groceries", "Electronics", "Household", "Furniture", "Appliances"],
    specialOffers: ["Seasonal sales events", "Household bundle offers", "Exclusive member discounts"]
  },
  {
    id: "supercity",
    name: "Super City",
    logo: "/supercity.webp", 
    image: "/supercity-store.jpg",
    description: "Neighborhood-focused supermarket offering essential groceries, fresh produce, and everyday necessities with convenient locations across residential areas.",
    features: ["Neighborhood locations", "Essential groceries", "Quick shopping experience", "Local products", "Daily fresh items"],
    location: "Multiple residential areas across Colombo",
    hours: "7:30 AM - 9:30 PM, Open daily",
    rating: 4.3,
    contact: "+94 11 2455455",
    popularCategories: ["Groceries", "Fresh Produce", "Bakery", "Dairy", "Household Essentials"],
    specialOffers: ["Daily fresh deals", "Weekend specials", "Student discounts"]
  }
];

export default function SupermarketsPage() {
  const [selectedSupermarket, setSelectedSupermarket] = useState<string | null>(null);
  
  return (
    <section className="px-4 md:px-16 py-16 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Partner Supermarkets</h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Choose from Sri Lanka's leading supermarket chains. We deliver products from these trusted partners 
            to ensure quality and reliability in every order.
          </p>
        </div>

        {/* Supermarket Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {supermarkets.map((supermarket) => (
            <div 
              key={supermarket.id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >
              {/* Supermarket Header with Logo */}
              <div className="relative h-48">
                <Image 
                  src={supermarket.image}
                  alt={`${supermarket.name} Store`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-6 flex items-center w-full">
                    <div className="h-16 w-16 bg-white rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Image 
                        src={supermarket.logo}
                        alt={supermarket.name}
                        width={64}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-white flex-grow">{supermarket.name}</h2>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">{supermarket.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(supermarket.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Supermarket Details */}
              <div className="p-6">
                <p className="text-gray-300 mb-4">{supermarket.description}</p>
                
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2">Highlights</h3>
                    <ul className="space-y-2">
                      {supermarket.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheck className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-3">
                      <h3 className="text-white font-semibold mb-2">Location</h3>
                      <p className="text-gray-300 flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-gray-400" />
                        {supermarket.location}
                      </p>
                    </div>
                    
                    <div className="mb-3">
                      <h3 className="text-white font-semibold mb-2">Hours</h3>
                      <p className="text-gray-300 flex items-center">
                        <FaClock className="mr-2 text-gray-400" />
                        {supermarket.hours}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-semibold mb-2">Contact</h3>
                      <p className="text-gray-300 flex items-center">
                        <FaPhone className="mr-2 text-gray-400" />
                        {supermarket.contact}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-2">Popular Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {supermarket.popularCategories.map((category, index) => (
                      <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                
                {supermarket.specialOffers && (
                  <div className="mb-6">
                    <h3 className="text-white font-semibold mb-2">Current Offers</h3>
                    <ul className="space-y-2">
                      {supermarket.specialOffers.map((offer, index) => (
                        <li key={index} className="text-gray-300 flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                          {offer}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-6">
                  <button 
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                    onClick={() => setSelectedSupermarket(supermarket.id === selectedSupermarket ? null : supermarket.id)}
                  >
                    {supermarket.id === selectedSupermarket ? 'View Less' : 'View Details'}
                  </button>
                  
                  <Link href="/products">
                    <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition flex items-center">
                      Shop at {supermarket.name.split(' ')[0]}
                      <FaArrowRight className="ml-2" />
                    </button>
                  </Link>
                </div>
                
                {/* Expanded Details (when selected) */}
                {selectedSupermarket === supermarket.id && (
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <h3 className="text-white font-semibold mb-4">About {supermarket.name}</h3>
                    <p className="text-gray-300 mb-4">
                      {supermarket.name} is one of Sri Lanka's trusted supermarket chains, offering a wide range of 
                      products to meet your everyday needs. With a commitment to quality and customer satisfaction,
                      we ensure that every shopping experience is pleasant and convenient.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-white font-medium mb-2">Our Services</h4>
                        <ul className="space-y-2">
                          <li className="text-gray-300">✓ Home delivery available</li>
                          <li className="text-gray-300">✓ Online ordering</li>
                          <li className="text-gray-300">✓ Customer loyalty programs</li>
                          <li className="text-gray-300">✓ Weekly promotions</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-medium mb-2">Payment Methods</h4>
                        <ul className="space-y-2">
                          <li className="text-gray-300">✓ Cash on delivery</li>
                          <li className="text-gray-300">✓ Credit/Debit cards</li>
                          <li className="text-gray-300">✓ Online payments</li>
                          <li className="text-gray-300">✓ Mobile payment apps</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Why choose {supermarket.name}?</h4>
                      <p className="text-gray-300">
                        When you order from {supermarket.name} through our platform, you'll enjoy the same high-quality 
                        products and competitive prices as in-store, with the added convenience of home delivery. 
                        We carefully select and handle all items to ensure they reach you in perfect condition.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* How it Works Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">How Ordering Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-white text-xl mb-2">Select a Supermarket</h3>
              <p className="text-gray-400">Choose from any of our partner supermarkets based on your preferences.</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-white text-xl mb-2">Add Items to Cart</h3>
              <p className="text-gray-400">Browse products from your selected supermarket and add them to your cart.</p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-white text-xl mb-2">Get Doorstep Delivery</h3>
              <p className="text-gray-400">Complete your order and we'll deliver everything to your doorstep.</p>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-xl text-white mb-2">Can I order from multiple supermarkets in one order?</h3>
            <p className="text-gray-300">
              Currently, we can only process orders from one supermarket at a time to ensure efficient delivery. 
              However, you can place multiple orders from different supermarkets.
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-xl text-white mb-2">How do prices compare to in-store shopping?</h3>
            <p className="text-gray-300">
              We strive to maintain the same pricing as in-store, with occasional small differences to cover 
              our service costs. Any price differences will be clearly marked before checkout.
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-xl text-white mb-2">What happens if items are out of stock?</h3>
            <p className="text-gray-300">
              Our shoppers will contact you regarding any out-of-stock items to offer substitutions or 
              remove the item from your order with a refund.
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl text-white mb-2">Do you deliver to all areas in Colombo?</h3>
            <p className="text-gray-300">
              Yes, we currently deliver to all areas within Colombo city and most surrounding suburbs. 
              You can check delivery availability by entering your address during checkout.
            </p>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to Start Shopping?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Choose your preferred supermarket and start adding products to your cart. 
            We'll handle everything from shopping to delivery.
          </p>
          <Link href="/products">
            <button className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-300 transition text-lg font-medium">
              Browse Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}