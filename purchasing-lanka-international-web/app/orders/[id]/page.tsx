'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaTruck, 
  FaStore, 
  FaShoppingBag, 
  FaCreditCard, 
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaShoppingCart,
  FaCheck
} from 'react-icons/fa';

// Define types
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
  deliveryAddress?: string;
  customerName?: string;
  phone?: string;
  email?: string;
  deliveryFee?: number;
  discount?: number;
  subtotal?: number;
}

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);
  // State for order data
  const [order, setOrder] = useState<Order | null>(null);
  // State for reorder in progress
  const [reordering, setReordering] = useState(false);
  
  useEffect(() => {
    // In a real app, fetch order details from your API
    // For demo purposes, we'll simulate fetching with mock data
    const fetchOrderDetails = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock order data based on ID
        // In a real app, you would fetch this from your API
        const mockOrders: Record<string, Order> = {
          'ORD-1234': {
            id: 'ORD-1234',
            date: 'May 15, 2023',
            status: 'delivered',
            total: 4550.00,
            subtotal: 4200.00,
            deliveryFee: 350.00,
            discount: 0,
            supermarket: 'Keells',
            paymentMethod: 'Credit Card',
            deliveryAddress: '42 Temple Road, Pannipitiya',
            customerName: 'Oshadha Samarasinghe',
            phone: '+94 79 123 4567',
            email: 'oshadhak@gmail.com',
            items: [
              { id: 1, name: 'Basmati Rice 5kg', price: 1800.00, quantity: 1, image: '/rice.jpg' },
              { id: 2, name: 'Fresh Milk 1L', price: 350.00, quantity: 2, image: '/milk.png' },
              { id: 3, name: 'Eggs (Pack of 10)', price: 450.00, quantity: 1, image: '/eggs.jpg' },
              { id: 4, name: 'Chicken Breast 500g', price: 1600.00, quantity: 1, image: '/chicken.jpg' }
            ]
          },
          'ORD-1189': {
            id: 'ORD-1189',
            date: 'May 2, 2023',
            status: 'delivered',
            total: 3100.00,
            subtotal: 2750.00,
            deliveryFee: 350.00,
            discount: 0,
            supermarket: 'Cargills',
            paymentMethod: 'Cash on Delivery',
            deliveryAddress: '42 Temple Road, Pannipitiya',
            customerName: 'Oshadha Samarasinghe',
            phone: '+94 79 123 4567',
            email: 'oshadhak@gmail.com',
            items: [
              { id: 5, name: 'Red Rice 5kg', price: 1500.00, quantity: 1, image: '/redrice.jpg' },
              { id: 6, name: 'Coconut Oil 750ml', price: 750.00, quantity: 1, image: '/oil.jpeg' },
              { id: 7, name: 'Carrot 500g', price: 250.00, quantity: 2, image: '/carrot.jpeg' },
              { id: 8, name: 'Tomatoes 500g', price: 350.00, quantity: 1, image: '/tomato.webp' }
            ]
          },
          'ORD-1102': {
            id: 'ORD-1102',
            date: 'April 20, 2023',
            status: 'delivered',
            total: 2350.00,
            subtotal: 2000.00,
            deliveryFee: 350.00,
            discount: 0,
            supermarket: 'Arpico',
            paymentMethod: 'Credit Card',
            deliveryAddress: '42 Temple Road, Pannipitiya',
            customerName: 'Oshadha Samarasinghe',
            phone: '+94 79 123 4567',
            email: 'oshadhak@gmail.com',
            items: [
              { id: 9, name: 'Sugar 1kg', price: 350.00, quantity: 1, image: '/sugar.webp' },
              { id: 10, name: 'Noodles Pack', price: 200.00, quantity: 5, image: '/noodles.jpeg' },
              { id: 11, name: 'Washing Powder 1kg', price: 750.00, quantity: 1, image: '/washing.jpeg' },
              { id: 12, name: 'Ceylon Tea 400g', price: 650.00, quantity: 1, image: '/teaa.jpeg' }
            ]
          }
        };
        
        const foundOrder = mockOrders[orderId];
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          // Handle not found - In a real app, you might want to redirect
          console.error('Order not found');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId]);
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return `Rs. ${amount.toFixed(2)}`;
  };
  
  // Status color utility
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
  
  // Status text utility
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
  
  // Handle reorder
  const handleReorder = async () => {
    setReordering(true);
    
    try {
      // In a real app, this would call an API to add items to cart
      // For demo, we'll simulate a delay and redirect to cart
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store cart items in localStorage to simulate persistence
      if (order && order.items) {
        localStorage.setItem('reorderItems', JSON.stringify(order.items));
        router.push('/cart?reorder=true');
      }
    } catch (error) {
      console.error('Error reordering:', error);
      setReordering(false);
    }
  };
  
  // Define step completion based on status
  const getOrderStep = (status: string): number => {
    switch (status) {
      case 'delivered':
        return 4;
      case 'processing':
        return 2;
      case 'cancelled':
        return 0;
      default:
        return 1;
    }
  };
  
  return (
    <section className="px-4 md:px-16 py-16 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <Link href="/profile" className="inline-flex items-center text-gray-400 mb-6 hover:text-white">
          <FaArrowLeft className="mr-2" />
          Back to Profile
        </Link>
        
        {isLoading ? (
          // Skeleton loading state
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="h-8 bg-gray-800 rounded w-1/3 mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-800 rounded w-1/4 mb-8 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="h-32 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-32 bg-gray-800 rounded animate-pulse"></div>
            </div>
            <div className="h-64 bg-gray-800 rounded animate-pulse"></div>
          </div>
        ) : order ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Order header and status */}
            <div className="bg-gray-900 rounded-lg p-6 md:p-8 mb-6">
              <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">Order Details</h1>
                  <p className="text-gray-400 mt-1">Order #{order.id}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`inline-flex px-4 py-2 rounded-full text-white ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>
              
              {/* Order summary info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaShoppingBag className="text-white mr-2" />
                    <h3 className="text-lg text-white">Order Information</h3>
                  </div>
                  <p className="text-gray-400">Date: {order.date}</p>
                  <p className="text-gray-400">Items: {order.items.reduce((total, item) => total + item.quantity, 0)}</p>
                  <p className="text-gray-400">Supermarket: {order.supermarket}</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="text-white mr-2" />
                    <h3 className="text-lg text-white">Delivery Details</h3>
                  </div>
                  <p className="text-gray-400">Address: {order.deliveryAddress}</p>
                  <p className="text-gray-400">Customer: {order.customerName}</p>
                  <p className="text-gray-400">Contact: {order.phone}</p>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    {order.paymentMethod === 'Credit Card' ? (
                      <FaCreditCard className="text-white mr-2" />
                    ) : (
                      <FaMoneyBillWave className="text-white mr-2" />
                    )}
                    <h3 className="text-lg text-white">Payment Information</h3>
                  </div>
                  <p className="text-gray-400">Method: {order.paymentMethod}</p>
                  <p className="text-gray-400">Total: {formatCurrency(order.total)}</p>
                  <p className="text-gray-400">Status: Completed</p>
                </div>
              </div>
              
              {/* Order tracking steps */}
              <div className="mb-8">
                <h3 className="text-white text-lg mb-4">Order Progress</h3>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getOrderStep(order.status) >= 1 ? 'bg-white text-black' : 'bg-gray-800 text-gray-500'}`}>
                    <FaShoppingBag />
                  </div>
                  <div className={`flex-1 h-1 ${getOrderStep(order.status) >= 2 ? 'bg-white' : 'bg-gray-700'}`}></div>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getOrderStep(order.status) >= 2 ? 'bg-white text-black' : 'bg-gray-800 text-gray-500'}`}>
                    <FaStore />
                  </div>
                  <div className={`flex-1 h-1 ${getOrderStep(order.status) >= 3 ? 'bg-white' : 'bg-gray-700'}`}></div>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getOrderStep(order.status) >= 3 ? 'bg-white text-black' : 'bg-gray-800 text-gray-500'}`}>
                    <FaTruck />
                  </div>
                  <div className={`flex-1 h-1 ${getOrderStep(order.status) >= 4 ? 'bg-white' : 'bg-gray-700'}`}></div>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getOrderStep(order.status) >= 4 ? 'bg-white text-black' : 'bg-gray-800 text-gray-500'}`}>
                    <FaCheck />
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-gray-400">Order Placed</span>
                  <span className="text-gray-400">Processing</span>
                  <span className="text-gray-400">Out for Delivery</span>
                  <span className="text-gray-400">Delivered</span>
                </div>
              </div>
            </div>
            
            {/* Order items */}
            <div className="bg-gray-900 rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6">Order Items</h2>
              
              <div className="mb-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex flex-wrap items-center border-b border-gray-800 py-4">
                    <div className="w-16 h-16 bg-gray-800 rounded overflow-hidden mb-4 md:mb-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full md:w-auto md:flex-1 md:ml-4">
                      <h3 className="text-white text-lg">{item.name}</h3>
                      <p className="text-gray-400">Unit Price: {formatCurrency(item.price)}</p>
                    </div>
                    <div className="mt-2 md:mt-0 w-full md:w-auto flex justify-between md:flex-col md:items-end">
                      <span className="text-gray-400 md:mb-1">Qty: {item.quantity}</span>
                      <span className="text-white font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-800 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">{formatCurrency(order.subtotal || 0)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Delivery Fee</span>
                  <span className="text-white">{formatCurrency(order.deliveryFee || 0)}</span>
                </div>
                {order.discount && order.discount > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-green-500">Discount</span>
                    <span className="text-green-500">- {formatCurrency(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-800">
                  <span className="text-lg text-white font-bold">Total</span>
                  <span className="text-lg text-white font-bold">{formatCurrency(order.total)}</span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                <Link href="/contact">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 transition flex items-center justify-center"
                  >
                    <FaEnvelope className="mr-2" />
                    Need Help?
                  </motion.button>
                </Link>
                
                {order.status === 'delivered' && (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-white text-black px-6 py-3 rounded hover:bg-gray-300 transition flex items-center justify-center"
                    onClick={handleReorder}
                    disabled={reordering}
                  >
                    {reordering ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
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
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaShoppingCart className="mr-2" />
                        Reorder
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <h2 className="text-xl text-white mb-4">Order not found</h2>
            <p className="text-gray-400 mb-6">We couldn't find the order you're looking for.</p>
            <Link href="/profile">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300 transition"
              >
                Return to Profile
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
