'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaShoppingBag, FaAddressCard, FaHistory, FaHeart, FaCog, FaSignOutAlt, FaPen, FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

// Define types for user and order data
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  memberSince: string;
  avatar: string;
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'cancelled';
  total: number;
  items: OrderItem[];
  supermarket: string;
  paymentMethod: string;
}

export default function ProfilePage() {
  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Mock user data - In a real app, this would come from your API/backend
  const [userData, setUserData] = useState<UserProfile>({
    name: 'Oshadha Samarasinghe',
    email: 'oshadhak@gmail.com',
    phone: '+94 79 123 4567',
    address: '42 Temple Road Pannipitiya',
    city: 'Kottawa',
    postalCode: '10300',
    memberSince: 'January 15, 2023',
    avatar: '/osh.jpg'
  });
  
  // Mock orders data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-1234',
      date: 'May 15, 2023',
      status: 'delivered',
      total: 4550.00,
      supermarket: 'Keells',
      paymentMethod: 'Credit Card',
      items: [
        { id: 1, name: 'Basmati Rice 5kg', price: 1800.00, quantity: 1, image: '/rice.jpg' },
        { id: 2, name: 'Fresh Milk 1L', price: 350.00, quantity: 2, image: '/milk.png' },
        { id: 3, name: 'Eggs (Pack of 10)', price: 450.00, quantity: 1, image: '/eggs.jpg' },
        { id: 4, name: 'Chicken Breast 500g', price: 1600.00, quantity: 1, image: '/chicken.jpg' }
      ]
    },
    {
      id: 'ORD-1189',
      date: 'May 2, 2023',
      status: 'delivered',
      total: 3100.00,
      supermarket: 'Cargills',
      paymentMethod: 'Cash on Delivery',
      items: [
        { id: 5, name: 'Red Rice 5kg', price: 1500.00, quantity: 1, image: '/redrice.jpg' },
        { id: 6, name: 'Coconut Oil 750ml', price: 750.00, quantity: 1, image: '/oil.jpeg' },
        { id: 7, name: 'Carrot 500g', price: 250.00, quantity: 2, image: '/carrot.jpeg' },
        { id: 8, name: 'Tomatoes 500g', price: 350.00, quantity: 1, image: '/tomato.webp' }
      ]
    },
    {
      id: 'ORD-1102',
      date: 'April 20, 2023',
      status: 'delivered',
      total: 2350.00,
      supermarket: 'Arpico',
      paymentMethod: 'Credit Card',
      items: [
        { id: 9, name: 'Sugar 1kg', price: 350.00, quantity: 1, image: '/sugar.webp' },
        { id: 10, name: 'Noodles Pack', price: 200.00, quantity: 5, image: '/noodles.jpeg' },
        { id: 11, name: 'Washing Powder 1kg', price: 750.00, quantity: 1, image: '/washing.jpeg' },
        { id: 12, name: 'Ceylon Tea 400g', price: 650.00, quantity: 1, image: '/teaa.jpeg' }
      ]
    }
  ]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  
  // Handle password input changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  
  // Handle profile update submission
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      showNotification('Profile updated successfully!');
    }, 1500);
  };
  
  // Handle password change submission
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password inputs
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showNotification('New passwords do not match', 'error');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      showNotification('Password must be at least 8 characters long', 'error');
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      showNotification('Password updated successfully!');
    }, 1500);
  };
  
  // Show notification message
  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return `Rs. ${amount.toFixed(2)}`;
  };
  
  // Get status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'processing':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  // Get status text
  const getStatusText = (status: string): string => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'processing':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <section className="px-4 md:px-16 py-16 bg-black min-h-screen">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 z-50 bg-white text-black p-4 rounded-lg shadow-lg max-w-md"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Profile
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden mr-4">
                  <Image
                    src={userData.avatar}
                    alt={userData.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-white font-bold text-xl mb-1">{userData.name}</h2>
                  <p className="text-gray-400 text-sm">{userData.email}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center py-3 px-4 rounded-md ${
                    activeTab === 'overview' 
                      ? 'bg-white text-black' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <FaUser className="mr-3" /> Overview
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center py-3 px-4 rounded-md ${
                    activeTab === 'orders' 
                      ? 'bg-white text-black' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <FaShoppingBag className="mr-3" /> Orders
                </button>
                <button
                  onClick={() => setActiveTab('address')}
                  className={`w-full flex items-center py-3 px-4 rounded-md ${
                    activeTab === 'address' 
                      ? 'bg-white text-black' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <FaAddressCard className="mr-3" /> Address
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center py-3 px-4 rounded-md ${
                    activeTab === 'settings' 
                      ? 'bg-white text-black' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <FaCog className="mr-3" /> Settings
                </button>
              </nav>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4 border-b border-gray-800 pb-2">Need Help?</h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="/faq" className="hover:text-white">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Support
                  </Link>
                </li>
                <li>
                  <button className="flex items-center text-red-400 hover:text-red-300">
                    <FaSignOutAlt className="mr-2" /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* Main Content Area */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                  {!isEditing ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="flex items-center bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                      <FaPen className="mr-2" /> Edit
                    </motion.button>
                  ) : (
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(false)}
                        className="flex items-center bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                      >
                        <FaTimes className="mr-2" /> Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        form="profile-form"
                        type="submit"
                        className="flex items-center bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                              <circle 
                                className="opacity-25" 
                                cx="12" 
                                cy="12" 
                                r="10" 
                                stroke="currentColor" 
                                strokeWidth="4"
                              ></circle>
                              <path 
                                className="opacity-75" 
                                fill="currentColor" 
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaCheck className="mr-2" /> Save
                          </>
                        )}
                      </motion.button>
                    </div>
                  )}
                </div>
                
                {isEditing ? (
                  <form id="profile-form" onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">Full Name</label>
                        <input 
                          type="text"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">Email Address</label>
                        <input 
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">Phone Number</label>
                        <input 
                          type="tel"
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">Profile Picture</label>
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <Image
                              src={userData.avatar}
                              alt={userData.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button 
                            type="button"
                            className="bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                          >
                            Change Picture
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8">
                    <div>
                      <h3 className="text-gray-400 text-sm mb-1">Full Name</h3>
                      <p className="text-white">{userData.name}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-sm mb-1">Email Address</h3>
                      <p className="text-white">{userData.email}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-sm mb-1">Phone Number</h3>
                      <p className="text-white">{userData.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 text-sm mb-1">Member Since</h3>
                      <p className="text-white">{userData.memberSince}</p>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4">Recent Orders</h3>
                  {orders.slice(0, 2).map((order) => (
                    <div 
                      key={order.id} 
                      className="bg-gray-800 p-4 rounded-lg mb-4 hover:bg-gray-700 transition cursor-pointer"
                      onClick={() => setActiveTab('orders')}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white font-medium">{order.id}</p>
                          <p className="text-sm text-gray-400">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">{formatCurrency(order.total)}</p>
                          <div className="flex items-center mt-1">
                            <span className={`w-2 h-2 ${getStatusColor(order.status)} rounded-full mr-2`}></span>
                            <span className="text-sm text-gray-300">{getStatusText(order.status)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center mt-4">
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="text-white hover:underline"
                    >
                      View All Orders
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
                
                {orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <motion.div 
                        key={order.id} 
                        className="bg-gray-800 rounded-lg overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-4 border-b border-gray-700 flex flex-wrap justify-between items-center">
                          <div>
                            <h3 className="text-white font-medium">Order {order.id}</h3>
                            <p className="text-sm text-gray-400">{order.date}</p>
                          </div>
                          <div className="flex space-x-4 items-center">
                            <div className="text-right">
                              <p className="text-sm text-gray-400">Total</p>
                              <p className="font-bold text-white">{formatCurrency(order.total)}</p>
                            </div>
                            <div>
                              <span className={`px-3 py-1 rounded-full text-white text-xs ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="flex flex-wrap justify-between text-sm text-gray-400 mb-3">
                            <p>Supermarket: {order.supermarket}</p>
                            <p>Payment: {order.paymentMethod}</p>
                          </div>
                          
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center">
                                <div className="w-10 h-10 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="ml-3 flex-grow">
                                  <p className="text-white">{item.name}</p>
                                  <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                                </div>
                                <div className="text-white">{formatCurrency(item.price * item.quantity)}</div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 flex justify-end space-x-3">
                            <Link 
                              href={`/orders/${order.id}`}
                              className="text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition text-sm"
                            >
                              View Details
                            </Link>
                            {order.status === 'delivered' && (
                              <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition text-sm">
                                Reorder
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaShoppingBag className="mx-auto text-4xl text-gray-600 mb-4" />
                    <p className="text-gray-400">You haven't placed any orders yet.</p>
                    <Link href="/products" className="mt-4 inline-block bg-white text-black px-6 py-2 rounded hover:bg-gray-300 transition">
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Address Tab */}
            {activeTab === 'address' && (
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Delivery Address</h2>
                  {!isEditing ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="flex items-center bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                      <FaPen className="mr-2" /> Edit
                    </motion.button>
                  ) : (
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(false)}
                        className="flex items-center bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                      >
                        <FaTimes className="mr-2" /> Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        form="address-form"
                        type="submit"
                        className="flex items-center bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition"
                        disabled={isSaving}
                      >
                        {isSaving ? 'Saving...' : (
                          <>
                            <FaCheck className="mr-2" /> Save
                          </>
                        )}
                      </motion.button>
                    </div>
                  )}
                </div>
                
                {isEditing ? (
                  <form id="address-form" onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-gray-400 mb-1 text-sm">Street Address</label>
                        <input 
                          type="text"
                          name="address"
                          value={userData.address}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">City</label>
                        <input 
                          type="text"
                          name="city"
                          value={userData.city}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">Postal Code</label>
                        <input 
                          type="text"
                          name="postalCode"
                          value={userData.postalCode}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-white"
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="bg-gray-800 p-5 rounded-lg">
                    <p className="text-white">{userData.name}</p>
                    <p className="text-gray-300">{userData.address}</p>
                    <p className="text-gray-300">{userData.city} {userData.postalCode}</p>
                    <p className="text-gray-300 mt-2">{userData.phone}</p>
                  </div>
                )}
                
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4">Delivery Tips</h3>
                  <div className="bg-gray-800 p-5 rounded-lg">
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <div className="text-green-500 mt-1 mr-3">✓</div>
                        <p>Ensure someone is available to receive the order during the delivery time slot.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="text-green-500 mt-1 mr-3">✓</div>
                        <p>Keep your phone nearby for delivery updates and communication from our delivery personnel.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="text-green-500 mt-1 mr-3">✓</div>
                        <p>If you live in an apartment complex or gated community, provide access instructions in the order notes.</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                
                <div className="mb-8">
                  <h3 className="text-xl text-white mb-4">Change Password</h3>
                  {!isChangingPassword ? (
                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                      Change Password
                    </button>
                  ) : (
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">Current Password</label>
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"}
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-white pr-10"
                            required
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">New Password</label>
                        <div className="relative">
                          <input 
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-white pr-10"
                            required
                            minLength={8}
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">At least 8 characters</p>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-1 text-sm">Confirm New Password</label>
                        <input 
                          type={showNewPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:border-white"
                          required
                        />
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsChangingPassword(false)}
                          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition flex items-center justify-center"
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <>
                              <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                <circle 
                                  className="opacity-25" 
                                  cx="12" 
                                  cy="12" 
                                  r="10" 
                                  stroke="currentColor" 
                                  strokeWidth="4"
                                ></circle>
                                <path 
                                  className="opacity-75" 
                                  fill="currentColor" 
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Updating...
                            </>
                          ) : 'Update Password'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
                
                <div className="border-t border-gray-800 pt-6 mb-8">
                  <h3 className="text-xl text-white mb-4">Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Email Notifications</p>
                        <p className="text-sm text-gray-400">Receive order updates and promotions</p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" id="email-notifications" className="sr-only" defaultChecked />
                        <label htmlFor="email-notifications" className="block h-6 w-12 rounded-full bg-gray-700 cursor-pointer relative">
                          <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform translate-x-0 peer-checked:translate-x-6"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">SMS Notifications</p>
                        <p className="text-sm text-gray-400">Receive delivery updates via SMS</p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" id="sms-notifications" className="sr-only" />
                        <label htmlFor="sms-notifications" className="block h-6 w-12 rounded-full bg-gray-700 cursor-pointer relative">
                          <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform translate-x-0"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-6">
                  <h3 className="text-xl text-white mb-4">Account Actions</h3>
                  
                  <div className="space-y-4">
                    <button className="text-red-500 hover:text-red-400 flex items-center">
                      <FaSignOutAlt className="mr-2" /> Sign Out of All Devices
                    </button>
                    <button className="text-red-500 hover:text-red-400 flex items-center">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}