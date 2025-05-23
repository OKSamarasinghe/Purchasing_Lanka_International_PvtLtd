'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGavel, FaHandshake, FaCreditCard, FaTruck, FaBox, FaShieldAlt, FaLock, FaUserShield } from 'react-icons/fa';

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isVisible, setIsVisible] = useState(false);
  
  // Create refs for each section
  const sectionRefs = useRef<{[key: string]: React.RefObject<HTMLDivElement | null>}>({});
  
  // Initialize refs for each section
  useEffect(() => {
    sections.forEach(section => {
      sectionRefs.current[section.id] = React.createRef();
    });
  }, []);

  // Detect scroll for animations
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      }
      
      // Update active section based on scroll position
      const currentPosition = window.scrollY + 100; // Adding offset
      
      for (const sectionId in sectionRefs.current) {
        const section = sectionRefs.current[sectionId];
        if (section.current) {
          const sectionTop = section.current.offsetTop;
          const sectionBottom = sectionTop + section.current.offsetHeight;
          
          if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
            if (activeSection !== sectionId) {
              setActiveSection(sectionId);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    const sectionRef = sectionRefs.current[sectionId];
    if (sectionRef && sectionRef.current) {
      // Calculate header offset (adjust value based on your header height)
      const offset = 80; 
      const sectionTop = sectionRef.current.offsetTop - offset;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Terms of service sections
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: <FaGavel className="text-gray-400 mr-3" />,
      content: `
        <p>Last updated: May 15, 2025</p>
        <p>Welcome to Purchasing Lanka International. These Terms of Service govern your use of our website and services. By accessing or using our website and services, you agree to be bound by these Terms.</p>
        <p>Please read these Terms carefully before using our platform. If you do not agree with any part of these Terms, you must not use our website or services.</p>
        <p>We may modify these Terms at any time. Any changes will be effective immediately upon posting the updated Terms on our website. Your continued use of our website and services after any such changes constitutes your acceptance of the new Terms.</p>
      `
    },
    {
      id: 'account-registration',
      title: 'Account Registration',
      icon: <FaUserShield className="text-gray-400 mr-3" />,
      content: `
        <p>To use certain features of our services, you may need to create an account. When you create an account with us, you agree to provide accurate, current, and complete information.</p>
        <h4>Account Requirements</h4>
        <p>You must be at least 18 years old to create an account and use our services. By creating an account, you represent and warrant that you are at least 18 years of age.</p>
        <h4>Account Security</h4>
        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access or use of your account.</p>
        <p>We reserve the right to disable your account if we have reason to believe that you have violated any of these Terms or if we determine, in our sole discretion, that your account activity poses a risk to our platform or other users.</p>
      `
    },
    {
      id: 'ordering-process',
      title: 'Ordering Process',
      icon: <FaBox className="text-gray-400 mr-3" />,
      content: `
        <p>Our platform allows you to place orders for grocery and other household items from various supermarkets and retailers. By placing an order through our platform, you are making an offer to purchase the selected items.</p>
        <h4>Order Confirmation</h4>
        <p>Your order is confirmed only when you receive an order confirmation email or notification from us. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or issues with payment processing.</p>
        <h4>Product Information</h4>
        <p>We make every effort to display as accurately as possible the colors, images, and details of the products available for purchase. However, we cannot guarantee that your device's display of any product will be accurate or complete. The products delivered may vary slightly from the images displayed on our website.</p>
        <h4>Product Availability</h4>
        <p>All products are subject to availability. If a product is unavailable after you place your order, we will contact you to suggest a suitable alternative or provide a refund for the unavailable item.</p>
      `
    },
    {
      id: 'pricing-payment',
      title: 'Pricing & Payment',
      icon: <FaCreditCard className="text-gray-400 mr-3" />,
      content: `
        <p>Prices for products are as listed on our website at the time of placing your order. All prices are in Sri Lankan Rupees (LKR) and include applicable taxes.</p>
        <h4>Price Changes</h4>
        <p>Prices for products may change from time to time. We do not provide price protection or refunds in the event of a price drop or promotional offering after you place your order.</p>
        <h4>Service Fees</h4>
        <p>We charge a standard delivery fee of Rs. 350 for orders under Rs. 5,000. Orders above Rs. 5,000 qualify for free delivery. Express delivery (1-2 hours) incurs an additional fee of Rs. 200. These fees are clearly displayed at checkout before you complete your order.</p>
        <h4>Payment Methods</h4>
        <p>We accept various payment methods, including:</p>
        <ul>
          <li>Cash on delivery</li>
          <li>Credit/debit cards (Visa, MasterCard)</li>
          <li>Online bank transfers</li>
          <li>Mobile payment apps (FriMi, HNB SOLO)</li>
        </ul>
        <p>By providing payment information, you represent and warrant that you are authorized to use the designated payment method and authorize us to charge your payment method for the total amount of your order, including taxes, delivery fees, and any other applicable charges.</p>
      `
    },
    {
      id: 'delivery',
      title: 'Delivery',
      icon: <FaTruck className="text-gray-400 mr-3" />,
      content: `
        <p>We offer delivery services to addresses within our service areas. Delivery times and availability may vary based on your location and the time of your order.</p>
        <h4>Delivery Timeframes</h4>
        <p>Standard delivery typically takes 2-4 hours from when you place your order. Express delivery (1-2 hours) is available for an additional fee. For orders placed after 6:00 PM, delivery may be scheduled for the next morning.</p>
        <h4>Delivery Instructions</h4>
        <p>You may provide specific delivery instructions when placing your order. Our delivery personnel will make reasonable efforts to follow your instructions, but we cannot guarantee compliance with all special requests.</p>
        <h4>Failed Deliveries</h4>
        <p>If we are unable to deliver your order because no one is available at the delivery address to receive the order, or for any other reason outside our control, you may be charged a re-delivery fee or the cost of perishable items that cannot be re-delivered.</p>
        <p>If you're not home during the delivery window, our delivery personnel will contact you. With your authorization, we may leave the order with a neighbor or in a safe place at your address.</p>
      `
    },
    {
      id: 'returns-refunds',
      title: 'Returns & Refunds',
      icon: <FaHandshake className="text-gray-400 mr-3" />,
      content: `
        <p>We want you to be completely satisfied with your purchase. If you're not satisfied with the quality of any item, have received damaged or incorrect items, or have any other issues with your order, please contact our customer service team within 24 hours of delivery.</p>
        <h4>Quality Issues</h4>
        <p>If you receive items that are damaged, defective, or of unsatisfactory quality, please contact us immediately with photos of the items. We will arrange for a replacement or refund as per your preference.</p>
        <h4>Wrong Items</h4>
        <p>If you receive items that you did not order, please contact our customer service team. We will arrange for the collection of the incorrect items and delivery of the correct items as soon as possible.</p>
        <h4>Refund Process</h4>
        <p>Refunds are processed within 3-5 business days after a return is approved. The amount will be credited back to your original payment method. For cash on delivery orders, we can process refunds via bank transfer or store credit.</p>
        <h4>Non-Returnable Items</h4>
        <p>For hygiene and safety reasons, certain items cannot be returned, including:</p>
        <ul>
          <li>Personal care products that have been opened or used</li>
          <li>Perishable food items (unless there are quality issues)</li>
          <li>Intimate apparel</li>
          <li>Products with broken seals</li>
        </ul>
      `
    },
    {
      id: 'user-conduct',
      title: 'User Conduct',
      icon: <FaShieldAlt className="text-gray-400 mr-3" />,
      content: `
        <p>When using our website and services, you agree not to:</p>
        <ul>
          <li>Use our services for any illegal or unauthorized purpose</li>
          <li>Violate any laws in your jurisdiction</li>
          <li>Attempt to gain unauthorized access to any part of our website or services</li>
          <li>Interfere with or disrupt the integrity or performance of our services</li>
          <li>Harass, abuse, or harm another person</li>
          <li>Submit false or misleading information</li>
          <li>Use our services in any manner that could disable, overburden, damage, or impair our website</li>
          <li>Engage in any automated use of the system, such as using scripts to send comments or messages</li>
        </ul>
        <p>We reserve the right to terminate or suspend your access to our services immediately, without prior notice or liability, for any breach of these Terms.</p>
      `
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      icon: <FaLock className="text-gray-400 mr-3" />,
      content: `
        <p>All content on our website, including text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of Purchasing Lanka International or its content suppliers and is protected by Sri Lankan and international copyright laws.</p>
        <h4>Limited License</h4>
        <p>We grant you a limited, non-exclusive, non-transferable license to access and use our website and services for personal, non-commercial purposes.</p>
        <p>You may not:</p>
        <ul>
          <li>Modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information obtained from our website</li>
          <li>Use any automated methods or bots to access or scrape data from our website</li>
          <li>Remove any copyright, trademark, or other proprietary notices from any content on our website</li>
        </ul>
        <h4>Trademarks</h4>
        <p>The Purchasing Lanka International name, logos, and all related names, logos, product and service names, designs, and slogans are trademarks of Purchasing Lanka International or its affiliates. You may not use these marks without the prior written permission of Purchasing Lanka International.</p>
      `
    },
    {
      id: 'limitation-liability',
      title: 'Limitation of Liability',
      icon: <FaGavel className="text-gray-400 mr-3" />,
      content: `
        <p>To the maximum extent permitted by applicable law, Purchasing Lanka International, its affiliates, officers, directors, employees, agents, suppliers, or licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
        <ul>
          <li>Your access to or use of or inability to access or use our services</li>
          <li>Any conduct or content of any third party on our services</li>
          <li>Any content obtained from our services</li>
          <li>Unauthorized access, use, or alteration of your transmissions or content</li>
        </ul>
        <p>Our liability is limited to the maximum extent permitted by law. In no event shall our total liability to you for all damages, losses, and causes of action exceed the amount paid by you, if any, for accessing our website or using our services during the 12 months prior to bringing the claim.</p>
      `
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      icon: <FaGavel className="text-gray-400 mr-3" />,
      content: `
        <p>These Terms shall be governed by and construed in accordance with the laws of Sri Lanka, without regard to its conflict of law provisions.</p>
        <p>Any dispute arising from or relating to these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.</p>
      `
    },
    {
      id: 'contact-us',
      title: 'Contact Us',
      icon: <FaHandshake className="text-gray-400 mr-3" />,
      content: `
        <p>If you have any questions or concerns about these Terms of Service, please contact us at:</p>
        <p><strong>Purchasing Lanka International</strong><br>
        MACPAC Building, Dolekanatta Junction<br>
        Pilyandala, Sri Lanka<br>
        Email: legal@purchasinglanka.com<br>
        Phone: +94 2012354842</p>
      `
    }
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
            Terms of Service
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Please read these terms carefully before using our platform. By using our services, 
            you agree to be bound by these terms and conditions.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-gray-900 rounded-lg p-5 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-4">Contents</h2>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    className={`w-full flex items-center text-left px-4 py-3 rounded-md transition-all ${
                      activeSection === section.id
                        ? 'bg-white text-black font-medium'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.icon}
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </nav>
              
              {/* Need Help Card */}
              <div className="mt-8 bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h3 className="text-white font-medium mb-2">Have questions?</h3>
                <p className="text-gray-400 text-sm mb-4">If you have any questions about our terms, feel free to contact our support team.</p>
                <Link href="/contact?subject=Terms">
                  <button className="w-full bg-white text-black py-2 rounded hover:bg-gray-300 transition text-sm">
                    Contact Support
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Mobile Navigation */}
          <motion.div 
            className="md:hidden mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-gray-900 rounded-lg p-4">
              <select 
                className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700"
                value={activeSection}
                onChange={(e) => scrollToSection(e.target.value)}
              >
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>{section.title}</option>
                ))}
              </select>
            </div>
          </motion.div>
          
          {/* Content Area */}
          <motion.div 
            className="md:col-span-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sections.map((section) => (
              <motion.div
                key={section.id}
                ref={el => {
                  if (sectionRefs.current) {
                    // TypeScript workaround for refs
                    const refs = sectionRefs.current as any;
                    refs[section.id] = { current: el };
                  }
                }}
                className="mb-12 scroll-mt-24" // Added scroll margin for better positioning
                variants={itemVariants}
                id={section.id}
              >
                <div className="bg-gray-900 rounded-lg p-6 md:p-8 border border-gray-800">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-gray-800 rounded-full mr-4">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  </div>
                  
                  <div 
                    className="text-gray-300 space-y-4 terms-content"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              </motion.div>
            ))}
            
            {/* Last Updated */}
            <motion.div 
              className="text-gray-400 text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p>These Terms of Service were last updated on May 15, 2025.</p>
              <p className="mt-2">If you have any questions about our Terms of Service, please <Link href="/contact" className="text-white hover:underline">contact us</Link>.</p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Terms Acceptance */}
        <motion.div 
          className="mt-16 bg-gray-900 rounded-lg p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Using Our Service</h2>
          <p className="text-gray-300 mb-6">
            By using our website and services, you acknowledge that you have read and understood these Terms of Service
            and agree to be bound by them. If you do not agree to these terms, please do not use our services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy-policy">
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition">
                Privacy Policy
              </button>
            </Link>
            <Link href="/faq">
              <button className="bg-white hover:bg-gray-300 text-black px-6 py-3 rounded-lg transition">
                View FAQ
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Custom styles for content formatting */}
      <style jsx global>{`
        .terms-content h4 {
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
          margin: 1.5rem 0 0.75rem;
        }

        .terms-content p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .terms-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .terms-content li {
          margin-bottom: 0.5rem;
        }

        .terms-content strong {
          color: white;
        }
      `}</style>
    </section>
  );
}