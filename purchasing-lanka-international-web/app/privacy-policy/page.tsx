'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserLock, FaLock, FaExchangeAlt, FaCookie, FaFingerprint } from 'react-icons/fa';

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isVisible, setIsVisible] = useState(false);

  // Detect scroll for animations
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Privacy policy sections
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: <FaShieldAlt className="text-gray-400 mr-3" />,
      content: `
        <p>Last updated: May 15, 2025</p>
        <p>Purchasing Lanka International ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our grocery delivery service.</p>
        <p>Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.</p>
        <p>We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.</p>
      `
    },
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      icon: <FaUserLock className="text-gray-400 mr-3" />,
      content: `
        <p>We may collect information about you in a variety of ways. The information we may collect via the website includes:</p>
        <h4>Personal Data</h4>
        <p>Personally identifiable information, such as your name, shipping address, email address, telephone number, and demographic information that you voluntarily give to us when you register with the website or when you choose to participate in various activities related to the website. You are under no obligation to provide us with personal information of any kind, however, your refusal to do so may prevent you from using certain features of the website.</p>
        <h4>Order Information</h4>
        <p>When you place an order, we collect information about the transaction, such as product details, purchase price, and the date and location of the purchase.</p>
        <h4>Delivery Information</h4>
        <p>We collect your address, phone number, delivery preferences, and special instructions to facilitate smooth delivery of your groceries.</p>
        <h4>Financial Data</h4>
        <p>We do not store your complete credit card details on our servers. Payment processing is handled through secure third-party payment processors who adhere to PCI DSS standards.</p>
        <h4>Device Information</h4>
        <p>Information about your browsing device, IP address, browser type, referring/exit pages, operating system, date/time stamps, and related data.</p>
      `
    },
    {
      id: 'how-we-use-information',
      title: 'How We Use Your Information',
      icon: <FaExchangeAlt className="text-gray-400 mr-3" />,
      content: `
        <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:</p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Process and fulfill your orders and send related transaction information.</li>
          <li>Deliver products and services to you.</li>
          <li>Send you order confirmations and updates.</li>
          <li>Email you regarding your account or order.</li>
          <li>Enable user-to-user communications (such as delivery instructions to our drivers).</li>
          <li>Request feedback and contact you about your use of the website.</li>
          <li>Resolve disputes and troubleshoot problems.</li>
          <li>Respond to product and customer service inquiries.</li>
          <li>Send you promotional emails about products, services, offers, and promotions offered by us or our partners.</li>
          <li>Personalize your experience and deliver content and product offerings relevant to your interests.</li>
          <li>Maintain and improve the efficiency and operation of our website and services.</li>
          <li>Analyze user behavior and activity to improve our website, products, and services.</li>
          <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
          <li>Process payments and refunds.</li>
        </ul>
      `
    },
    {
      id: 'disclosure-of-information',
      title: 'Disclosure of Your Information',
      icon: <FaLock className="text-gray-400 mr-3" />,
      content: `
        <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
        <h4>By Law or to Protect Rights</h4>
        <p>If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</p>
        <h4>Third-Party Service Providers</h4>
        <p>We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</p>
        <h4>Marketing Communications</h4>
        <p>With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.</p>
        <h4>Delivery Partners</h4>
        <p>We share necessary information with our delivery partners to facilitate the delivery of orders to your location.</p>
        <h4>Supermarket Partners</h4>
        <p>We may share order information with our supermarket partners to fulfill your orders accurately.</p>
        <h4>Business Transfers</h4>
        <p>If we or our subsidiaries are involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.</p>
      `
    },
    {
      id: 'cookies-and-tracking',
      title: 'Cookies and Tracking',
      icon: <FaCookie className="text-gray-400 mr-3" />,
      content: `
        <p>We may use cookies, web beacons, tracking pixels, and other tracking technologies on the website to help customize the website and improve your experience.</p>
        <h4>Cookies</h4>
        <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our website, and we refer to these as "performance" or "functionality" cookies.</p>
        <h4>Types of Cookies We Use:</h4>
        <ul>
          <li><strong>Essential cookies:</strong> Necessary for the website to function properly.</li>
          <li><strong>Preference cookies:</strong> Enable the website to remember information that changes the way the website behaves or looks.</li>
          <li><strong>Statistics cookies:</strong> Help us understand how visitors interact with the website by collecting and reporting information anonymously.</li>
          <li><strong>Marketing cookies:</strong> Used to track visitors across websites to display relevant advertisements.</li>
        </ul>
        <p>Most web browsers are set to accept cookies by default. You can set your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of the website may not function properly if cookies are disabled.</p>
      `
    },
    {
      id: 'third-party-websites',
      title: 'Third-Party Websites',
      icon: <FaFingerprint className="text-gray-400 mr-3" />,
      content: `
        <p>The website may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us.</p>
        <p>Once you have used these links to leave our website, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. Before visiting and providing any information to any third-party websites, you should inform yourself of the privacy policies and practices of the third party responsible for that website, and should take those steps necessary to, in your discretion, protect the privacy of your information.</p>
        <p>We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services or applications that may be linked to or from the website.</p>
      `
    },
    {
      id: 'security',
      title: 'Security of Your Information',
      icon: <FaShieldAlt className="text-gray-400 mr-3" />,
      content: `
        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
        <p>Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.</p>
        <h4>Security Measures We Implement:</h4>
        <ul>
          <li>SSL encryption for all data transmission</li>
          <li>Regular security assessments and penetration testing</li>
          <li>PCI DSS compliance for payment processing</li>
          <li>Access controls and authentication for all systems</li>
          <li>Regular data backups and disaster recovery planning</li>
          <li>Employee training on data security and privacy practices</li>
        </ul>
        <p>We regularly review and update our security practices to enhance the protection of your information.</p>
      `
    },
    {
      id: 'your-rights',
      title: 'Your Privacy Rights',
      icon: <FaUserLock className="text-gray-400 mr-3" />,
      content: `
        <p>You have certain rights regarding your personal information. These include:</p>
        <h4>Right to Access</h4>
        <p>You have the right to request details of the personal information we hold about you.</p>
        <h4>Right to Rectification</h4>
        <p>You have the right to have inaccurate personal information corrected and incomplete information completed.</p>
        <h4>Right to Erasure (Right to be Forgotten)</h4>
        <p>You have the right to request the deletion of your personal information in certain circumstances.</p>
        <h4>Right to Restrict Processing</h4>
        <p>You have the right to request that we restrict the processing of your information in certain circumstances.</p>
        <h4>Right to Data Portability</h4>
        <p>You have the right to receive your personal information in a structured, commonly used, and machine-readable format.</p>
        <h4>Right to Object</h4>
        <p>You have the right to object to certain types of processing, including processing for direct marketing.</p>
        <p>To exercise any of these rights, please contact us at privacy@purchasinglanka.com.</p>
      `
    },
    {
      id: 'contact-us',
      title: 'Contact Us',
      icon: <FaUserLock className="text-gray-400 mr-3" />,
      content: `
        <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
        <p><strong>Purchasing Lanka International</strong><br>
        MACPAC Building, Dolekanatta Junction<br>
        Pilyandala, Sri Lanka<br>
        Email: privacy@purchasinglanka.com<br>
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
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            At Purchasing Lanka International, we are committed to protecting your privacy and ensuring 
            the security of your personal information.
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
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.icon}
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </nav>
              
              {/* Contact Card */}
              <div className="mt-8 bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h3 className="text-white font-medium mb-2">Need more information?</h3>
                <p className="text-gray-400 text-sm mb-4">Contact our privacy team for any concerns you may have.</p>
                <Link href="/contact?subject=Privacy">
                  <button className="w-full bg-white text-black py-2 rounded hover:bg-gray-300 transition text-sm">
                    Contact Privacy Team
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
                onChange={(e) => setActiveSection(e.target.value)}
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
                className={`mb-12 ${activeSection === section.id || activeSection === 'all' ? 'block' : 'hidden md:block'}`}
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
                    className="text-gray-300 space-y-4 policy-content"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                  
                  {/* Divider */}
                  {activeSection === 'all' && section.id !== sections[sections.length - 1].id && (
                    <div className="border-t border-gray-800 my-12"></div>
                  )}
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
              <p>This Privacy Policy was last updated on May 15, 2025.</p>
              <p className="mt-2">If you have any questions about our Privacy Policy, please <Link href="/contact" className="text-white hover:underline">contact us</Link>.</p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Policy Acceptance */}
        <motion.div 
          className="mt-16 bg-gray-900 rounded-lg p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Your Privacy Matters to Us</h2>
          <p className="text-gray-300 mb-6">
            By using our services, you consent to the terms of this Privacy Policy. We are committed to maintaining the
            confidentiality and security of your personal information.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/terms-of-service">
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition">
                Terms of Service
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-white hover:bg-gray-300 text-black px-6 py-3 rounded-lg transition">
                Contact Support
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Custom styles for content formatting */}
      <style jsx global>{`
        .policy-content h4 {
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
          margin: 1.5rem 0 0.75rem;
        }

        .policy-content p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .policy-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .policy-content li {
          margin-bottom: 0.5rem;
        }

        .policy-content strong {
          color: white;
        }
      `}</style>
    </section>
  );
}