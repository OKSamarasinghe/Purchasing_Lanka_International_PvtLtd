'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaTrash, FaMinus, FaPlus, FaTruck, FaArrowLeft, FaStore, FaInfoCircle, FaLock, FaTag } from 'react-icons/fa';

// Enhanced mock products with more variety
const mockProducts = [
  { id: 1, name: "Rice 5kg", price: 1200, category: "Groceries", supermarket: "Cargills", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", quantity: 1 },
  { id: 13, name: "Tomatoes 500g", price: 180, category: "Fresh Produce", supermarket: "Keells", image: "https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&q=80&w=500", quantity: 2 },
  { id: 7, name: "Milk Powder 400g", price: 850, category: "Dairy", supermarket: "Cargills", image: "https://images.unsplash.com/photo-1722518252679-3a77ae458836?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", quantity: 1 },
  { id: 5, name: "Fresh Chicken 1kg", price: 920, category: "Meat", supermarket: "Keells", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", quantity: 1 },
  { id: 22, name: "Coconut Oil 750ml", price: 650, category: "Cooking", supermarket: "Cargills", image: "https://images.unsplash.com/photo-1599451897608-ad6eb8676edf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvY29udXQlMjBvaWx8ZW58MHx8MHx8fDA%3D", quantity: 1 },
];

export default function CartPage() {
  // State management code remains the same
  const [cartItems, setCartItems] = useState(mockProducts);
  const [selectedSupermarket, setSelectedSupermarket] = useState('');
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    email: '',
    deliveryTime: 'standard',
    paymentMethod: 'cash'
  });
  const [notification, setNotification] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 5000 ? 0 : 350;
  const expressDeliveryFee = deliveryDetails.deliveryTime === 'express' ? 200 : 0;
  const discount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + deliveryFee + expressDeliveryFee - discount;

  // Extract unique supermarkets from cart items
  const availableSupermarkets = [...new Set(cartItems.map(item => item.supermarket))];
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && event.target && !modalRef.current.contains(event.target as Node)) {
        setShowInfoModal(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? {...item, quantity: newQuantity} : item
      )
    );
    showNotification('Cart updated');
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    showNotification('Item removed from cart');
  };

  // Clear entire cart
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
      showNotification('Cart cleared');
    }
  };

  // Apply coupon code
  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'FIRST10' || couponCode.toUpperCase() === 'WELCOME' || couponCode.toUpperCase() === 'WELCOME-TO-PLI') {
      setDiscountApplied(true);
      showNotification('10% discount applied!');
    } else {
      showNotification('Invalid coupon code');
    }
  };

  // Show notification
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  // Proceed with checkout steps
  const proceedToNextStep = () => {
    if (checkoutStep === 1) {
      if (cartItems.length === 0) {
        showNotification('Your cart is empty');
        return;
      }
      if (availableSupermarkets.length > 1 && !selectedSupermarket) {
        showNotification('Please select a supermarket');
        return;
      }
      setCheckoutStep(2);
    } else if (checkoutStep === 2) {
      // Validate delivery details
      const { fullName, address, phone, email } = deliveryDetails;
      if (!fullName || !address || !phone || !email) {
        showNotification('Please fill in all required fields');
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        showNotification('Please enter a valid email address');
        return;
      }
      setCheckoutStep(3);
    } else if (checkoutStep === 3) {
      // Process payment and complete order
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setCheckoutStep(4);
      }, 2000);
    }
  };

  // Handle input change for delivery details
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter items by selected supermarket
  const filteredItems = selectedSupermarket 
    ? cartItems.filter(item => item.supermarket === selectedSupermarket)
    : cartItems;

  return (
    <section className="px-4 md:px-16 py-16 bg-black min-h-screen">
      {/* Enhanced animated notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 bg-white text-black p-4 rounded-lg shadow-lg z-50"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header with Progress Indicator */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-0">Shopping Cart</h1>
          
          {/* Steps indicator with improved styling */}
          {checkoutStep > 1 && checkoutStep < 4 && (
            <div className="flex items-center w-full max-w-md">
              <div className={`flex-1 text-center relative ${checkoutStep >= 1 ? 'text-white' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${checkoutStep >= 1 ? 'bg-white text-black' : 'bg-gray-700'}`}>1</div>
                <div className="mt-1 text-sm">Cart</div>
              </div>
              <div className={`flex-1 h-1 ${checkoutStep >= 2 ? 'bg-white' : 'bg-gray-700'}`}></div>
              <div className={`flex-1 text-center ${checkoutStep >= 2 ? 'text-white' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${checkoutStep >= 2 ? 'bg-white text-black' : 'bg-gray-700'}`}>2</div>
                <div className="mt-1 text-sm">Delivery</div>
              </div>
              <div className={`flex-1 h-1 ${checkoutStep >= 3 ? 'bg-white' : 'bg-gray-700'}`}></div>
              <div className={`flex-1 text-center ${checkoutStep >= 3 ? 'text-white' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${checkoutStep >= 3 ? 'bg-white text-black' : 'bg-gray-700'}`}>3</div>
                <div className="mt-1 text-sm">Review</div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Empty cart message */}
        {cartItems.length === 0 && checkoutStep === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 p-8 rounded-lg text-center"
          >
            <div className="bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingCart className="text-gray-400 text-4xl" />
            </div>
            <h2 className="text-2xl text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link href="/products">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-6 py-3 rounded hover:bg-gray-300 transition"
              >
                Browse Products
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* Step 1: Cart Items - Now with animations */}
        {cartItems.length > 0 && checkoutStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2">
              {/* Supermarket Selection with enhanced UI */}
              {availableSupermarkets.length > 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-900 p-5 rounded-lg mb-6"
                >
                  <h2 className="text-xl text-white font-medium mb-3">Choose Supermarket</h2>
                  <p className="text-gray-400 mb-4">You have items from multiple supermarkets. Please select one to proceed:</p>
                  <div className="flex flex-wrap gap-2">
                    {availableSupermarkets.map(supermarket => (
                      <motion.button 
                        key={supermarket}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-5 py-2 rounded-full transition-all ${selectedSupermarket === supermarket ? 'bg-white text-black font-medium' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                        onClick={() => setSelectedSupermarket(supermarket)}
                      >
                        <FaStore className="inline mr-2" /> {supermarket}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Cart Items Table with improved styling */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="hidden md:grid md:grid-cols-12 text-gray-400 p-4 border-b border-gray-800 bg-gray-800">
                  <div className="col-span-6 font-medium">Product</div>
                  <div className="col-span-2 text-center font-medium">Price</div>
                  <div className="col-span-2 text-center font-medium">Quantity</div>
                  <div className="col-span-2 text-center font-medium">Total</div>
                </div>

                <div className="max-h-[500px] overflow-y-auto">
                  {filteredItems.map((item, index) => (
                    <motion.div 
                      key={item.id} 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 border-b border-gray-800 flex flex-col md:grid md:grid-cols-12 gap-4 items-center"
                    >
                      <div className="col-span-6 flex items-center w-full">
                        <div className="w-16 h-16 bg-gray-800 rounded overflow-hidden mr-4 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{item.name}</h3>
                          <p className="text-gray-400 text-sm">
                            {item.category} • {item.supermarket}
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 text-sm flex items-center mt-1 hover:text-red-300"
                          >
                            <FaTrash size={12} className="mr-1" /> Remove
                          </motion.button>
                        </div>
                      </div>
                      <div className="col-span-2 text-white text-center">
                        Rs. {item.price.toLocaleString()}
                      </div>
                      <div className="col-span-2 flex items-center justify-center">
                        <div className="flex items-center bg-gray-800 rounded">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-400 hover:text-white"
                          >
                            <FaMinus size={12} />
                          </motion.button>
                          <span className="px-3 text-white">{item.quantity}</span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-400 hover:text-white"
                          >
                            <FaPlus size={12} />
                          </motion.button>
                        </div>
                      </div>
                      <div className="col-span-2 text-white font-medium text-center">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <div className="flex justify-between mt-4">
                <Link href="/products">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center text-white hover:underline"
                  >
                    <FaArrowLeft className="mr-2" /> Continue Shopping
                  </motion.button>
                </Link>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={clearCart} 
                  className="text-red-400 hover:text-red-300"
                >
                  Clear Cart
                </motion.button>
              </div>
            </div>

            {/* Order Summary with improved UI */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900 p-5 rounded-lg shadow-lg sticky top-24"
              >
                <h2 className="text-xl text-white font-medium mb-4 pb-2 border-b border-gray-800">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <div className="flex items-center">
                      <span>Delivery Fee</span>
                      <button 
                        className="ml-2 text-gray-500 hover:text-white"
                        onClick={() => setShowInfoModal(true)}
                      >
                        <FaInfoCircle size={14} />
                      </button>
                    </div>
                    <span>{deliveryFee > 0 ? `Rs. ${deliveryFee}` : 'Free'}</span>
                  </div>
                  {deliveryDetails.deliveryTime === 'express' && (
                    <div className="flex justify-between text-gray-300">
                      <span>Express Delivery</span>
                      <span>Rs. {expressDeliveryFee}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Discount</span>
                      <span>- Rs. {discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-gray-800 flex justify-between font-bold text-white">
                    <span>Total</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Coupon Code with improved styling */}
                <div className="mb-5">
                  <label className="block text-gray-300 text-sm mb-1">Have a coupon?</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="flex-grow bg-gray-800 text-white px-3 py-2 rounded-l focus:outline-none focus:ring-1 focus:ring-gray-600"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={discountApplied}
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={applyCoupon}
                      disabled={discountApplied || !couponCode}
                      className={`px-4 py-2 rounded-r ${
                        discountApplied
                          ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                          : 'bg-white text-black hover:bg-gray-300'
                      }`}
                    >
                      Apply
                    </motion.button>
                  </div>
                  {discountApplied && (
                    <p className="text-green-500 text-sm mt-1 flex items-center">
                      <FaTag className="mr-1" /> 10% discount applied!
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={proceedToNextStep}
                  className={`w-full bg-white text-black py-3 rounded font-medium hover:bg-gray-200 transition flex items-center justify-center ${
                    (cartItems.length === 0 || (availableSupermarkets.length > 1 && !selectedSupermarket))
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  disabled={cartItems.length === 0 || (availableSupermarkets.length > 1 && !selectedSupermarket)}
                >
                  Proceed to Checkout
                </motion.button>

                {/* Free delivery threshold message */}
                {subtotal < 5000 && (
                  <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                    <p className="text-gray-300 text-sm text-center">
                      Add <span className="text-white font-medium">Rs. {(5000 - subtotal).toLocaleString()}</span> more to get FREE delivery!
                    </p>
                  </div>
                )}
                
                <div className="mt-4 flex items-center justify-center text-gray-500 text-xs">
                  <FaLock className="mr-1" /> Secure Checkout
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Shipping, Payment, and Confirmation Steps (remain the same) */}
        {/* Step 2: Delivery Information */}
        {checkoutStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-900 p-6 rounded-lg">
                <h2 className="text-2xl text-white mb-6">Delivery Information</h2>
                
                {/* Rest of the Delivery Information section stays the same */}
                {/* ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-400 mb-1">Full Name*</label>
                    <input
                      type="text"
                      name="fullName"
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-600"
                      value={deliveryDetails.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Phone Number*</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-600"
                      value={deliveryDetails.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-400 mb-1">Email*</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-600"
                    value={deliveryDetails.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-400 mb-1">Full Address*</label>
                  <textarea
                    name="address"
                    rows={3}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-600"
                    value={deliveryDetails.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-400 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-600"
                      value={deliveryDetails.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-600"
                      value={deliveryDetails.postalCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-400 mb-1">Delivery Time</label>
                  <select
                    name="deliveryTime"
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-600"
                    value={deliveryDetails.deliveryTime}
                    onChange={handleChange}
                  >
                    <option value="standard">Standard Delivery (2-4 hours)</option>
                    <option value="express">Express Delivery (1-2 hours) +Rs.200</option>
                    <option value="scheduled">Scheduled Delivery (Select time slot)</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-400 mb-1">Payment Method</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className={`border ${deliveryDetails.paymentMethod === 'cash' ? 'border-white' : 'border-gray-700'} rounded p-3 flex items-center cursor-pointer`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={deliveryDetails.paymentMethod === 'cash'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Cash on Delivery
                    </label>
                    <label className={`border ${deliveryDetails.paymentMethod === 'card' ? 'border-white' : 'border-gray-700'} rounded p-3 flex items-center cursor-pointer`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={deliveryDetails.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Credit Card
                    </label>
                    <label className={`border ${deliveryDetails.paymentMethod === 'online' ? 'border-white' : 'border-gray-700'} rounded p-3 flex items-center cursor-pointer`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={deliveryDetails.paymentMethod === 'online'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Online Banking
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={() => setCheckoutStep(1)}
                    className="flex items-center text-gray-400 hover:text-white"
                  >
                    <FaArrowLeft className="mr-2" />
                    Back to Cart
                  </button>
                  <button
                    onClick={proceedToNextStep}
                    className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300 transition"
                  >
                    Continue to Review
                  </button>
                </div>
              </div>
            </div>
            
            {/* Order Summary (Step 2) */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h2 className="text-xl text-white mb-4 pb-2 border-b border-gray-800">Order Summary</h2>
                {/* Rest of Order Summary stays the same */}
                {/* ... */}
                <div className="max-h-72 overflow-y-auto mb-4">
                  {filteredItems.map(item => (
                    <div key={item.id} className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gray-800 rounded overflow-hidden mr-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-white text-sm">{item.name}</h4>
                        <p className="text-gray-400 text-xs">{item.quantity} × Rs. {item.price.toLocaleString()}</p>
                      </div>
                      <div className="text-white">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee > 0 ? `Rs. ${deliveryFee}` : 'Free'}</span>
                  </div>
                  {deliveryDetails.deliveryTime === 'express' && (
                    <div className="flex justify-between text-gray-300">
                      <span>Express Delivery</span>
                      <span>Rs. {expressDeliveryFee}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Discount</span>
                      <span>- Rs. {discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-gray-800 flex justify-between font-bold text-white">
                    <span>Total</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="text-gray-400 text-sm">
                  <p className="flex items-center mb-2">
                    <FaStore className="mr-2" />
                    Supermarket: {selectedSupermarket || filteredItems[0]?.supermarket}
                  </p>
                  <p className="flex items-center">
                    <FaTruck className="mr-2" />
                    Estimated delivery: {deliveryDetails.deliveryTime === 'express' ? '1-2 hours' : '2-4 hours'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Order Review */}
        {checkoutStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-900 p-6 rounded-lg">
                <h2 className="text-2xl text-white mb-6">Review Your Order</h2>
                
                <div className="mb-6 bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg text-white mb-3">Delivery Address</h3>
                  <p className="text-gray-400">{deliveryDetails.fullName}</p>
                  <p className="text-gray-400">{deliveryDetails.address}</p>
                  <p className="text-gray-400">
                    {deliveryDetails.city} {deliveryDetails.postalCode && `, ${deliveryDetails.postalCode}`}
                  </p>
                  <p className="text-gray-400">{deliveryDetails.phone}</p>
                  <p className="text-gray-400">{deliveryDetails.email}</p>
                  <button 
                    onClick={() => setCheckoutStep(2)} 
                    className="text-gray-300 underline text-sm mt-2"
                  >
                    Edit
                  </button>
                </div>
                
                <div className="mb-6 bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg text-white mb-3">Delivery Method</h3>
                  <p className="text-gray-400">
                    {deliveryDetails.deliveryTime === 'standard' && 'Standard Delivery (2-4 hours)'}
                    {deliveryDetails.deliveryTime === 'express' && 'Express Delivery (1-2 hours)'}
                    {deliveryDetails.deliveryTime === 'scheduled' && 'Scheduled Delivery'}
                  </p>
                  <button 
                    onClick={() => setCheckoutStep(2)} 
                    className="text-gray-300 underline text-sm mt-2"
                  >
                    Edit
                  </button>
                </div>
                
                <div className="mb-6 bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg text-white mb-3">Payment Method</h3>
                  <p className="text-gray-400">
                    {deliveryDetails.paymentMethod === 'cash' && 'Cash on Delivery'}
                    {deliveryDetails.paymentMethod === 'card' && 'Credit Card'}
                    {deliveryDetails.paymentMethod === 'online' && 'Online Banking'}
                  </p>
                  <button 
                    onClick={() => setCheckoutStep(2)} 
                    className="text-gray-300 underline text-sm mt-2"
                  >
                    Edit
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="flex items-center text-gray-400 hover:text-white"
                  >
                    <FaArrowLeft className="mr-2" />
                    Back
                  </button>
                  <button
                    onClick={proceedToNextStep}
                    className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300 transition flex items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Order Summary (Step 3) */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h2 className="text-xl text-white mb-4 pb-2 border-b border-gray-800">Order Summary</h2>
                {/* Rest of Step 3 Order Summary stays the same */}
                {/* ... */}
                <div className="max-h-72 overflow-y-auto mb-4">
                  {filteredItems.map(item => (
                    <div key={item.id} className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gray-800 rounded overflow-hidden mr-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-white text-sm">{item.name}</h4>
                        <p className="text-gray-400 text-xs">{item.quantity} × Rs. {item.price.toLocaleString()}</p>
                      </div>
                      <div className="text-white">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee > 0 ? `Rs. ${deliveryFee}` : 'Free'}</span>
                  </div>
                  {deliveryDetails.deliveryTime === 'express' && (
                    <div className="flex justify-between text-gray-300">
                      <span>Express Delivery</span>
                      <span>Rs. {expressDeliveryFee}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Discount</span>
                      <span>- Rs. {discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-gray-800 flex justify-between font-bold text-white">
                    <span>Total</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="text-gray-400 text-sm">
                  <p className="flex items-center mb-2">
                    <FaStore className="mr-2" />
                    Supermarket: {selectedSupermarket || filteredItems[0]?.supermarket}
                  </p>
                  <p className="flex items-center">
                    <FaTruck className="mr-2" />
                    Estimated delivery: {deliveryDetails.deliveryTime === 'express' ? '1-2 hours' : '2-4 hours'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Order Confirmation */}
        {checkoutStep === 4 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 p-8 rounded-lg text-center max-w-2xl mx-auto"
          >
            <motion.div 
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-24 h-24 rounded-full bg-green-900 mx-auto mb-6 flex items-center justify-center"
            >
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h2 className="text-3xl text-white mb-4">Thank You For Your Order!</h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Your order has been placed successfully. We've sent a confirmation to your email address. 
              Our team is preparing your items for delivery.
            </p>
            <div className="bg-gray-800 rounded-lg p-5 max-w-md mx-auto mb-6">
              <div className="flex justify-between text-gray-400 mb-3">
                <span>Order ID:</span>
                <span className="font-mono text-white">#PL{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between text-gray-400 mb-3">
                <span>Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-gray-400 mb-3">
                <span>Estimated Delivery:</span>
                <span>{deliveryDetails.deliveryTime === 'express' ? '1-2 hours' : '2-4 hours'}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Total Amount:</span>
                <span className="text-white">Rs. {total.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 transition"
                >
                  Back to Home
                </motion.button>
              </Link>
              <Link href="/products">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black px-6 py-3 rounded hover:bg-gray-300 transition"
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Delivery Info Modal */}
        {showInfoModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
            <motion.div 
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 rounded-lg p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl text-white">Delivery Information</h3>
                <button 
                  onClick={() => setShowInfoModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="text-gray-300 space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Standard Delivery</h4>
                  <p>Free for orders over Rs. 5,000. For orders under Rs. 5,000, a fee of Rs. 350 applies.</p>
                  <p className="text-sm text-gray-400 mt-1">Delivery within 2-4 hours of order confirmation.</p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Express Delivery</h4>
                  <p>An additional Rs. 200 on top of the standard delivery fee.</p>
                  <p className="text-sm text-gray-400 mt-1">Receive your order within 1-2 hours.</p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Scheduled Delivery</h4>
                  <p>Choose a preferred time slot for your delivery.</p>
                  <p className="text-sm text-gray-400 mt-1">Standard delivery fees apply.</p>
                </div>
              </div>
              
              <button
                className="mt-6 bg-white text-black w-full py-2 rounded hover:bg-gray-300 transition"
                onClick={() => setShowInfoModal(false)}
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}