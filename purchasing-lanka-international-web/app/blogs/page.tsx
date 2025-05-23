'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaTag, FaSearch, FaArrowRight, FaClock, FaBookOpen, FaShare, FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "චිත්ත ප්‍රවේග මානසික ශක්ති සගරාව අසාර්ථක ජීවිතය සාර්ථක කරගන්න",
    titleEnglish: "Mental Power Magazine: Transform Your Unsuccessful Life into a Successful One",
    slug: "mental-power-magazine",
    excerpt: "Discover how our new publication is helping Sri Lankans transform their mindset and achieve success through practical mental techniques and inspirational stories.",
    content: `
      <p>We are excited to introduce our new magazine, <strong>"චිත්ත ප්‍රවේග මානසික ශක්ති සගරාව"</strong> (Mental Power Magazine), a groundbreaking publication dedicated to personal development and mental transformation.</p>
      
      <h3>Why We Created This Magazine</h3>
      
      <p>In today's fast-paced world, many people struggle with stress, negative thinking, and feelings of being stuck in life. At Purchasing Lanka International, we believe that true success begins with the right mindset. This magazine is our contribution to the mental wellbeing and personal growth of our community.</p>
      
      <p>Each monthly issue focuses on practical techniques for developing positive thinking patterns, overcoming mental barriers, and creating lasting success in all areas of life. Whether you're looking to advance your career, improve relationships, or simply find more joy in everyday life, our magazine offers actionable advice grounded in both modern psychology and traditional wisdom.</p>
      
      <h3>What You'll Find Inside</h3>
      
      <ul>
        <li><strong>Success Stories:</strong> Inspiring narratives from ordinary Sri Lankans who transformed their lives through mental discipline and positive thinking</li>
        <li><strong>Mental Techniques:</strong> Step-by-step guides to powerful mental practices like visualization, affirmations, and mindfulness</li>
        <li><strong>Expert Interviews:</strong> Conversations with psychologists, business leaders, and spiritual teachers about achieving success</li>
        <li><strong>Practical Exercises:</strong> Monthly challenges and worksheets to help you apply what you learn</li>
        <li><strong>Community Forum:</strong> A section dedicated to reader questions, experiences, and breakthroughs</li>
      </ul>
      
      <h3>Our Philosophy</h3>
      
      <p>We believe that success isn't just about external achievements but about internal transformation. By changing how you think, you can change how you live. Our approach combines contemporary psychological research with timeless wisdom to create a holistic path to personal development.</p>
      
      <p>"When you change your mindset, you change your life. This magazine is designed to be your companion on that journey," says Jehan Fernando, CEO of Purchasing Lanka International.</p>
      
      <h3>How to Get Your Copy</h3>
      
      <p>The magazine is available for purchase online through our website and will be delivered alongside your grocery orders at no extra delivery charge. You can also find it at selected bookstores across Colombo.</p>
      
      <p>For our regular customers, we offer special subscription rates with exclusive access to online bonus content, including guided audio meditations and video workshops.</p>
      
      <h3>Join Our Community</h3>
      
      <p>Beyond the magazine itself, we're building a community of like-minded individuals committed to personal growth. Join our monthly reader meetups (both virtual and in-person) to connect with others on the same journey.</p>
      
      <p>Transform your thinking, transform your life with "චිත්ත ප්‍රවේග මානසික ශක්ති සගරාව"!</p>
    `,
    author: "Jehan Fernando",
    date: "May 15, 2023",
    category: "Personal Development",
    readTime: 7,
    image: "/magazine.png",
    featured: true,
    tags: ["personal development", "mindset", "success", "magazine", "mental health"]
  },
  {
    id: 2,
    title: "ශ්‍රී ලංකාවේ තිරසාර පොෂණය සඳහා දේශීය ආහාර වැදගත්කම",
    titleEnglish: "The Importance of Local Food for Sustainable Nutrition in Sri Lanka",
    slug: "sustainable-local-food",
    excerpt: "Learn how choosing locally-grown food can improve your health, support the local economy, and reduce environmental impact in Sri Lanka.",
    content: `
      <p>Sri Lanka has a rich agricultural heritage dating back thousands of years, with traditional farming practices that have sustained generations. Today, as we face challenges like rising food prices, climate change, and health concerns, returning to locally-grown food options has never been more important.</p>
      
      <h3>Health Benefits of Local Produce</h3>
      
      <p>Food that travels shorter distances from farm to table retains more nutrients. Most imported produce is harvested before peak ripeness to withstand long shipping times, which affects both nutritional value and taste. Local fruits and vegetables, on the other hand, can be picked at optimal ripeness and consumed when their nutrient content is highest.</p>
      
      <p>Traditional Sri Lankan fruits and vegetables are also naturally adapted to our climate and growing conditions, often containing exactly the vitamins and minerals our bodies need for our local environment. Ancient wisdom about food combinations in our traditional cuisine often reveals incredible nutritional balance.</p>
      
      <h3>Economic Impact</h3>
      
      <ul>
        <li><strong>Supporting Local Farmers:</strong> When you purchase locally-grown produce, more of your money goes directly to the farmers and stays within the Sri Lankan economy</li>
        <li><strong>Job Creation:</strong> A strong local food system creates jobs across multiple sectors, from farming to distribution</li>
        <li><strong>Reducing Import Dependence:</strong> Sri Lanka spends billions of rupees annually on food imports that could be grown locally</li>
        <li><strong>Price Stability:</strong> Local food systems are less susceptible to international price fluctuations and foreign exchange issues</li>
      </ul>
      
      <h3>Environmental Benefits</h3>
      
      <p>The environmental case for local food is compelling. Food in Sri Lanka travels an average of just 50 kilometers when sourced locally, compared to thousands of kilometers for imported items. This dramatic reduction in "food miles" means less fuel consumption, fewer emissions, and a smaller carbon footprint.</p>
      
      <p>Traditional farming practices often use fewer pesticides and chemical fertilizers than industrial agriculture, leading to healthier soil and cleaner waterways. Many local farmers practice crop rotation and other sustainable techniques that have been passed down through generations.</p>
      
      <h3>Accessing Local Food</h3>
      
      <p>At Purchasing Lanka International, we're committed to supporting local farmers and making their produce accessible to you. Here's how you can incorporate more local food into your diet:</p>
      
      <ul>
        <li><strong>Shop the "Local Farmers" section</strong> on our website, featuring produce harvested within 100km of Colombo</li>
        <li><strong>Join our weekly subscription box</strong> of seasonal local produce, delivered with your regular grocery order</li>
        <li><strong>Look for the "Sri Lankan Grown" label</strong> on our products to easily identify local options</li>
        <li><strong>Try our "Local Recipe of the Week"</strong> featuring seasonal ingredients and traditional preparation methods</li>
      </ul>
      
      <h3>Preserving Cultural Heritage</h3>
      
      <p>Food is an essential part of our cultural identity. By supporting local food systems, we help preserve traditional knowledge about native plant varieties, farming practices, and cooking methods that might otherwise be lost to future generations.</p>
      
      <p>Every time we choose local produce, we vote for the kind of food system we want to see in Sri Lanka—one that nourishes our people, our economy, and our land.</p>
    `,
    author: "Priyantha Mahaulpathagama",
    date: "April 28, 2023",
    category: "Health & Wellness",
    readTime: 6,
    image: "/local-food.png",
    featured: false,
    tags: ["nutrition", "local food", "sustainability", "health", "agriculture"]
  },
  {
    id: 3,
    title: "ඔබේ සාප්පු සවාරිය කාර්යක්‍ෂම කරන ආකාරය",
    titleEnglish: "How to Make Your Grocery Shopping More Efficient",
    slug: "efficient-grocery-shopping",
    excerpt: "Simple tips and strategies to save time and money on your weekly grocery shopping trips while ensuring you get everything you need.",
    content: `
      <p>Grocery shopping can sometimes feel like a time-consuming chore, but with a little planning and the right strategies, you can streamline the process and make it much more efficient. Here are our top tips for smarter grocery shopping in Sri Lanka.</p>
      
      <h3>Create a Meal Plan</h3>
      
      <p>The foundation of efficient grocery shopping is knowing exactly what you need. Take some time each week to plan your meals, considering:</p>
      
      <ul>
        <li>What ingredients you already have at home</li>
        <li>Which items are currently in season and affordable</li>
        <li>How you can repurpose leftovers to minimize waste</li>
        <li>Batch cooking opportunities to save time during busy weekdays</li>
      </ul>
      
      <p>Once you have your meal plan, create a detailed shopping list organized by store sections (produce, dairy, grains, etc.). This simple step can reduce your shopping time by up to 40% and helps prevent impulse purchases.</p>
      
      <h3>Shop at Off-Peak Hours</h3>
      
      <p>Crowded supermarkets can significantly slow down your shopping experience. In most Sri Lankan cities, early mornings (right when stores open) or late evenings (an hour before closing) tend to be less crowded. Mid-week shopping (Tuesday to Thursday) is typically less busy than weekends.</p>
      
      <p>Using our online delivery service is, of course, the ultimate time-saver, allowing you to skip the crowds entirely while getting exactly what you need delivered straight to your door.</p>
      
      <h3>Master Your Supermarket's Layout</h3>
      
      <p>Each supermarket has a specific layout designed to maximize your time inside. Take some time to understand how your regular store is organized:</p>
      
      <ul>
        <li>Fresh produce is usually placed at the entrance to create a positive first impression</li>
        <li>Essential staples like milk and bread are typically at the back, forcing you to walk through other aisles</li>
        <li>End caps (the ends of aisles) often feature seasonal or promotional items, not necessarily the best deals</li>
      </ul>
      
      <p>By understanding these patterns, you can navigate more efficiently, focusing on the sections you need while avoiding marketing traps.</p>
      
      <h3>Be Strategic About Sales and Promotions</h3>
      
      <p>While discounts can save money, they can also lead to purchasing items you don't really need. Before adding a sale item to your cart, ask yourself:</p>
      
      <ul>
        <li>Would I buy this at full price?</li>
        <li>Do I have a specific plan for using this item?</li>
        <li>Do I have proper storage space for bulk purchases?</li>
        <li>Is the per-unit cost actually lower than alternatives?</li>
      </ul>
      
      <p>For non-perishable staples that you regularly use, stocking up during genuine sales makes good financial sense.</p>
      
      <h3>Use Technology to Your Advantage</h3>
      
      <p>The Purchasing Lanka International app offers several features designed to make your shopping more efficient:</p>
      
      <ul>
        <li>Save your favorite items for quick reordering</li>
        <li>Create and save multiple shopping lists for different needs</li>
        <li>Set up automatic recurring orders for staple items</li>
        <li>Use the barcode scanner to quickly add items while checking your pantry</li>
        <li>Access your purchase history to remember what you bought last time</li>
      </ul>
      
      <h3>Conclusion</h3>
      
      <p>Efficient grocery shopping is about thoughtful planning rather than rushing through the process. By implementing these strategies, you can transform your grocery shopping from a stressful chore into a streamlined part of your weekly routine.</p>
      
      <p>Remember that our online grocery delivery service is designed to be the most efficient option of all—allowing you to shop from anywhere, at any time, with delivery straight to your doorstep!</p>
    `,
    author: "Samantha Perera",
    date: "March 10, 2023",
    category: "Grocery Shopping",
    readTime: 5,
    image: "/grocery-shopping.png",
    featured: false,
    tags: ["shopping", "efficiency", "meal planning", "budgeting", "time-saving"]
  }
];

// Categories for sidebar
const categories = [
  { name: "Personal Development", count: 1 },
  { name: "Health & Wellness", count: 1 },
  { name: "Grocery Shopping", count: 1 },
  { name: "Cooking Tips", count: 0 },
  { name: "Company News", count: 0 }
];

// Recent posts for sidebar
const recentPosts = [
  {
    title: "චිත්ත ප්‍රවේග මානසික ශක්ති සගරාව",
    slug: "mental-power-magazine",
    date: "May 15, 2023"
  },
  {
    title: "ශ්‍රී ලංකාවේ තිරසාර පොෂණය සඳහා දේශීය ආහාර වැදගත්කම",
    slug: "sustainable-local-food",
    date: "April 28, 2023"
  },
  {
    title: "ඔබේ සාප්පු සවාරිය කාර්යක්‍ෂම කරන ආකාරය",
    slug: "efficient-grocery-shopping",
    date: "March 10, 2023"
  }
];

type BlogPost = {
  id: number;
  title: string;
  titleEnglish: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  image: string;
  featured: boolean;
  tags: string[];
};

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDetailView, setIsDetailView] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<BlogPost | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement | null>(null);
  
  // For scroll tracking
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // For newsletter subscription
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Track scroll progress for reading progress indicator
  useEffect(() => {
    if (!isDetailView) return;
    
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDetailView]);

  // Filter blog posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Open blog post details
  const openBlogDetail = (slug: string) => {
    const blog = blogPosts.find(post => post.slug === slug);
    if (blog) {
      setCurrentBlog(blog);
      setIsDetailView(true);
      window.scrollTo(0, 0);
    }
  };

  // Back to list view
  const backToList = () => {
    setIsDetailView(false);
    setCurrentBlog(null);
  };

  // Copy blog URL to clipboard
  const copyToClipboard = () => {
    if (!currentBlog) return;
    const url = `${window.location.origin}/blogs/${currentBlog.slug}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
    setIsShareOpen(false);
  };

  // Share on social media
  const shareOnSocial = (platform: string) => {
    if (!currentBlog) return;
    
    const url = `${window.location.origin}/blogs/${currentBlog.slug}`;
    const text = `Check out this article: ${currentBlog.titleEnglish}`;
    
    let shareUrl = '';
    
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setIsShareOpen(false);
  };

  // Handle newsletter subscription
  interface SubscribeEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubscribe = (e: SubscribeEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setSubscribing(true);
    // Simulate API call
    setTimeout(() => {
      setSubscribing(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset subscription success message after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1500);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
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

  return (
    <section className="px-4 md:px-16 py-16 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {isDetailView ? 'Blog Post' : 'Blog & Publications'}
          </motion.h1>
          {!isDetailView && (
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Discover insights, news, and stories from Purchasing Lanka International. 
              From grocery shopping tips to personal development, we cover topics that matter to Sri Lankans.
            </motion.p>
          )}
        </div>

        {/* List View */}
        {!isDetailView && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Blog Listings */}
            <div className="lg:col-span-2">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full bg-gray-900 text-white px-5 py-4 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 border border-gray-800"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>
              
              {/* Blog Listings */}
              {filteredPosts.length > 0 ? (
                <motion.div 
                  className="space-y-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredPosts.map(post => (
                    <motion.div 
                      key={post.id} 
                      className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col"
                      variants={itemVariants}
                    >
                      <div className="relative h-56 md:h-64">
                        <Image 
                          src={post.image} 
                          alt={post.title}
                          fill
                          quality={90}
                          className="object-contain bg-gray-800"
                        />
                        {post.featured && (
                          <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold px-3 py-1 rounded-full">
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex-grow">
                        <div className="flex items-center text-gray-400 text-sm mb-3 space-x-4">
                          <span className="flex items-center">
                            <FaCalendarAlt className="mr-2" /> {formatDate(post.date)}
                          </span>
                          <span className="flex items-center">
                            <FaUser className="mr-2" /> {post.author}
                          </span>
                          <span className="flex items-center">
                            <FaClock className="mr-2" /> {post.readTime} min read
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2 line-clamp-2">{post.titleEnglish}</h2>
                        <h3 className="text-xl text-gray-300 mb-4 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="inline-block bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs mr-2">
                              {post.category}
                            </span>
                          </div>
                          <button 
                            onClick={() => openBlogDetail(post.slug)}
                            className="text-white flex items-center hover:underline"
                          >
                            Read More <FaArrowRight className="ml-2" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="bg-gray-900 p-8 rounded-lg text-center">
                  <p className="text-xl text-gray-300">No blog posts found matching your search.</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setSelectedCategory('');}}
                    className="mt-4 text-white underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <motion.div 
                className="bg-gray-900 rounded-lg p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-gray-800">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setSelectedCategory('')}
                      className={`w-full text-left px-2 py-1 rounded hover:bg-gray-800 transition ${selectedCategory === '' ? 'text-white font-medium' : 'text-gray-400'}`}
                    >
                      All Categories
                    </button>
                  </li>
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button 
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full text-left px-2 py-1 rounded hover:bg-gray-800 transition flex justify-between items-center ${selectedCategory === category.name ? 'text-white font-medium' : 'text-gray-400'}`}
                        disabled={category.count === 0}
                      >
                        <span>{category.name}</span>
                        <span className="bg-gray-800 text-xs px-2 py-1 rounded-full">{category.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Recent Posts */}
              <motion.div 
                className="bg-gray-900 rounded-lg p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-gray-800">Recent Posts</h3>
                <ul className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <li key={index} className="pb-4 border-b border-gray-800 last:border-0 last:pb-0">
                      <a 
                        href="#" 
                        onClick={(e) => {e.preventDefault(); openBlogDetail(post.slug);}}
                        className="text-gray-300 hover:text-white"
                      >
                        {post.title}
                      </a>
                      <p className="text-gray-500 text-sm mt-1">{formatDate(post.date)}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Subscribe */}
              <motion.div 
                className="bg-gray-900 rounded-lg p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Subscribe to Our Newsletter</h3>
                <p className="text-gray-400 mb-4">Stay updated with our latest blog posts and publications.</p>
                
                {isSubscribed ? (
                  <div className="bg-green-900 bg-opacity-30 text-green-400 p-4 rounded border border-green-700 text-center">
                    Thank you for subscribing! You'll receive our next newsletter soon.
                  </div>
                ) : (
                  <form className="space-y-3" onSubmit={handleSubscribe}>
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-600"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-300 transition flex items-center justify-center"
                      disabled={subscribing}
                    >
                      {subscribing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Subscribing...
                        </>
                      ) : (
                        'Subscribe'
                      )}
                    </motion.button>
                  </form>
                )}
              </motion.div>
              
              {/* Magazine Promotion */}
              <motion.div 
                className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg p-6 text-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-white mb-3">Buy Our New Magazine!</h3>
                <div className="mb-4">
                  <FaBookOpen className="text-white text-4xl mx-auto" />
                </div>
                <p className="text-gray-200 mb-4">Transform your life with our mental power magazine "චිත්ත ප්‍රවේග මානසික ශක්ති සගරාව"</p>
                <Link href="/products?category=magazine">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-purple-900 px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition"
                  >
                    Purchase Now
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        )}

        {/* Detail View */}
        {isDetailView && currentBlog && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Reading progress indicator */}
            <div className="fixed top-0 left-0 w-full h-1 z-50">
              <div 
                className="h-full bg-white" 
                style={{ width: `${scrollProgress}%` }}
              ></div>
            </div>

            {/* Back to blogs button */}
            <div className="lg:col-span-4">
              <button 
                onClick={backToList}
                className="mb-6 flex items-center text-gray-400 hover:text-white transition"
              >
                <FaArrowRight className="transform rotate-180 mr-2" /> Back to Blogs
              </button>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div 
                className="bg-gray-900 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Blog Header */}
                <div className="relative h-80">
                  <Image 
                    src={currentBlog.image} 
                    alt={currentBlog.title}
                    fill
                    quality={90}
                    className="object-contain bg-gray-800"
                    priority
                  />
                  {currentBlog.featured && (
                    <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                
                {/* Blog Content */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center text-gray-400 text-sm mb-4 space-x-4">
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-2" /> {formatDate(currentBlog.date)}
                    </span>
                    <span className="flex items-center">
                      <FaUser className="mr-2" /> {currentBlog.author}
                    </span>
                    <span className="flex items-center">
                      <FaClock className="mr-2" /> {currentBlog.readTime} min read
                    </span>
                    <span className="flex items-center">
                      <FaTag className="mr-2" /> {currentBlog.category}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{currentBlog.titleEnglish}</h1>
                  <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">{currentBlog.title}</h2>
                  
                  {/* Blog content */}
                  <div 
                    className="prose prose-invert max-w-none mt-8"
                    dangerouslySetInnerHTML={{ __html: currentBlog.content }}
                  />
                  
                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <h3 className="text-white font-medium mb-2">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentBlog.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Share buttons */}
                  <div className="mt-8 flex items-center justify-between">
                    <div className="relative" ref={shareMenuRef}>
                      <button 
                        onClick={() => setIsShareOpen(!isShareOpen)}
                        className="flex items-center text-white bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition"
                      >
                        <FaShare className="mr-2" /> Share Article
                      </button>
                      
                      {isShareOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute left-0 bottom-12 bg-gray-800 rounded-lg shadow-xl w-56 p-3 z-10"
                        >
                          <ul>
                            <li>
                              <button 
                                onClick={() => shareOnSocial('facebook')}
                                className="w-full flex items-center px-3 py-2 hover:bg-gray-700 rounded text-left text-gray-300"
                              >
                                <FaFacebookF className="mr-3 text-blue-500" /> Facebook
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => shareOnSocial('twitter')}
                                className="w-full flex items-center px-3 py-2 hover:bg-gray-700 rounded text-left text-gray-300"
                              >
                                <FaTwitter className="mr-3 text-blue-400" /> Twitter
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => shareOnSocial('linkedin')}
                                className="w-full flex items-center px-3 py-2 hover:bg-gray-700 rounded text-left text-gray-300"
                              >
                                <FaLinkedinIn className="mr-3 text-blue-600" /> LinkedIn
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => shareOnSocial('whatsapp')}
                                className="w-full flex items-center px-3 py-2 hover:bg-gray-700 rounded text-left text-gray-300"
                              >
                                <FaWhatsapp className="mr-3 text-green-500" /> WhatsApp
                              </button>
                            </li>
                            <li className="border-t border-gray-700 mt-2 pt-2">
                              <button 
                                onClick={copyToClipboard}
                                className="w-full flex items-center px-3 py-2 hover:bg-gray-700 rounded text-left text-gray-300"
                              >
                                Copy Link
                              </button>
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </div>
                    
                    <Link href="/products?category=magazine">
                      <button className="text-white bg-purple-900 px-4 py-2 rounded hover:bg-purple-800 transition flex items-center">
                        <FaBookOpen className="mr-2" /> Buy Magazine
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
              
              {/* Related Articles */}
              {currentBlog.category !== "Personal Development" && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogPosts
                      .filter(post => post.id !== currentBlog.id && post.category === currentBlog.category)
                      .slice(0, 2)
                      .map(post => (
                        <motion.div
                          key={post.id}
                          className="bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                          whileHover={{ y: -5 }}
                        >
                          <div className="relative h-40">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-contain bg-gray-800"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="text-white font-bold text-lg mb-2 line-clamp-1">{post.titleEnglish}</h4>
                            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                            <button
                              onClick={() => openBlogDetail(post.slug)}
                              className="text-white text-sm flex items-center"
                            >
                              Read Article <FaArrowRight className="ml-2" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Author */}
              <motion.div 
                className="bg-gray-900 rounded-lg p-6 text-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="w-20 h-20 rounded-full bg-gray-800 mx-auto mb-4 overflow-hidden">
                  <Image 
                    src={
                      currentBlog.author === "Jehan Fernando" ? "/jehanf2.png" : 
                      currentBlog.author === "Priyantha Mahaulpathagama" ? "/priyanthamu.webp" : 
                      currentBlog.author === "Samantha Perera" ? "/rowans.webp" : 
                      "/author-default.png"
                    }
                    alt={currentBlog.author}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{currentBlog.author}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {currentBlog.author === "Jehan Fernando" ? "CEO & Founder" : 
                   currentBlog.author === "Priyantha Mahaulpathagama" ? "Director of Operations" : 
                   "Content Writer"}
                </p>
                <p className="text-gray-300">
                  {currentBlog.author === "Jehan Fernando" 
                    ? "With over 15 years of experience in retail and logistics, Jehan founded Purchasing Lanka International with a vision to transform grocery shopping in Sri Lanka." 
                    : currentBlog.author === "Priyantha Mahaulpathagama"
                    ? "Priyantha oversees all operational aspects of our service, ensuring timely deliveries and maintaining strong relationships with our supermarket partners."
                    : "A passionate writer focused on creating practical content that helps our customers make better shopping and lifestyle choices."}
                </p>
              </motion.div>
              
              {/* Table of Contents */}
              <motion.div 
                className="bg-gray-900 rounded-lg p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-gray-800">Table of Contents</h3>
                <ul className="space-y-2">
                  {currentBlog.content.match(/<h3>(.*?)<\/h3>/g)?.map((heading, index) => {
                    const title = heading.replace(/<h3>|<\/h3>/g, '').trim();
                    return (
                      <li key={index}>
                        <a href={`#${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-300 hover:text-white flex">
                          <span className="mr-2">•</span> {title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
              
              {/* Subscribe form for sidebar in detail view */}
              <motion.div 
                className="bg-gray-900 rounded-lg p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-white mb-3">Get Articles In Your Inbox</h3>
                <p className="text-gray-300 mb-4 text-sm">Subscribe to receive new articles and updates directly to your email</p>
                
                {isSubscribed ? (
                  <div className="bg-green-900 bg-opacity-30 text-green-400 p-3 rounded border border-green-700 text-sm text-center">
                    Thanks for subscribing!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe}>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full mb-2 bg-gray-800 text-white px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-600"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-white text-black px-3 py-2 rounded text-sm font-medium hover:bg-gray-300 transition flex items-center justify-center"
                      disabled={subscribing}
                    >
                      {subscribing ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </form>
                )}
              </motion.div>
              
              {/* Magazine Promotion */}
              <motion.div 
                className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg p-6 text-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-white mb-3">Buy Our New Magazine!</h3>
                <div className="mb-4">
                  <FaBookOpen className="text-white text-4xl mx-auto" />
                </div>
                <p className="text-gray-200 mb-4">Transform your life with our mental power magazine "චිත්ත ප්‍රවේග මානසික ශක්ති සගරාව"</p>
                <Link href="/products?category=magazine">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-purple-900 px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition"
                  >
                    Purchase Now
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Style for Blog Content */}
      <style jsx global>{`
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin: 1.5rem 0 1rem;
        }
        
        .prose p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        
        .prose strong {
          color: white;
          font-weight: 600;
        }
        
        .prose ul {
          list-style-type: disc;
          margin-left: 1.2rem;
          margin-bottom: 1.5rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </section>
  );
}