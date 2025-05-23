'use client'

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { FaSearch, FaShoppingCart, FaFilter, FaSort } from "react-icons/fa";

// Extended product data with categories and supermarket information
const products = [
  // Groceries
  { id: 1, name: "Rice 5kg", price: 1200, category: "Groceries", supermarket: "Cargills", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", featured: true },
  { id: 2, name: "Sugar 1kg", price: 220, category: "Groceries", supermarket: "Keells", image: "https://images.unsplash.com/photo-1634612831148-03a8550e1d52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VnYXJ8ZW58MHx8MHx8fDA%3D", featured: false },
  { id: 3, name: "Flour 1kg", price: 185, category: "Groceries", supermarket: "Arpico", image: "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmxvdXJ8ZW58MHx8MHx8fDA%3D", featured: false },
  { id: 4, name: "Red Lentils 500g", price: 320, category: "Groceries", supermarket: "Cargills", image: "https://images.unsplash.com/photo-1614373532201-c40b993f0013?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmVkJTIwTGVudGlsc3xlbnwwfHwwfHx8MA%3D%3D", featured: false },
  { id: 5, name: "Coconut Oil 500ml", price: 450, category: "Groceries", supermarket: "Keells", image: "https://images.unsplash.com/photo-1599451897608-ad6eb8676edf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvY29udXQlMjBvaWx8ZW58MHx8MHx8fDA%3D", featured: true },
  { id: 6, name: "Cinnamon Sticks 100g", price: 280, category: "Groceries", supermarket: "Arpico", image: "https://images.unsplash.com/photo-1601379760622-0d2e7ad24c11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2lubmFtb24lMjBTdGlja3N8ZW58MHx8MHx8fDA%3D", featured: false },
  
  // Dairy
  { id: 7, name: "Milk Powder 400g", price: 850, category: "Dairy", supermarket: "Cargills", image: "https://images.unsplash.com/photo-1722518252679-3a77ae458836?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", featured: true },
  { id: 8, name: "Yogurt 500ml", price: 360, category: "Dairy", supermarket: "Keells", image: "https://images.unsplash.com/photo-1641196936589-7df4db18de66?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFlvZ3VydHxlbnwwfHwwfHx8MA%3D%3D", featured: false },
  { id: 9, name: "Cheese 250g", price: 750, category: "Dairy", supermarket: "Arpico", image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?auto=format&fit=crop&q=80&w=500", featured: true },
  { id: 10, name: "Butter 100g", price: 395, category: "Dairy", supermarket: "Cargills", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnV0dGVyfGVufDB8fDB8fHww", featured: false },
  { id: 11, name: "Ice Cream 1L", price: 680, category: "Dairy", supermarket: "Keells", image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEljZSUyMENyZWFtfGVufDB8fDB8fHww", featured: true },
  
  // Fresh Produce
  { id: 12, name: "Carrots 1kg", price: 300, category: "Fresh Produce", supermarket: "Cargills", image: "https://images.unsplash.com/photo-1655558132738-8a4f5124186f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENhcnJvdHN8ZW58MHx8MHx8fDA%3D", featured: false },
  { id: 13, name: "Tomatoes 500g", price: 180, category: "Fresh Produce", supermarket: "Keells", image: "https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&q=80&w=500", featured: true },
  { id: 14, name: "Bananas 1kg", price: 230, category: "Fresh Produce", supermarket: "Arpico", image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&q=80&w=500", featured: false },
  { id: 15, name: "Mangoes 1kg", price: 390, category: "Fresh Produce", supermarket: "Cargills", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=500", featured: true },
  { id: 16, name: "Avocado 1kg", price: 550, category: "Fresh Produce", supermarket: "Keells", image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?auto=format&fit=crop&q=80&w=500", featured: false },
  { id: 17, name: "Green Beans 500g", price: 200, category: "Fresh Produce", supermarket: "Arpico", image: "https://images.unsplash.com/uploads/141143339879512fe9b0d/f72e2c85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R3JlZW4lMjBCZWFufGVufDB8fDB8fHww", featured: false },
  
  // Beverages
  { id: 18, name: "Ceylon Tea 100g", price: 410, category: "Beverages", supermarket: "Cargills", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=500", featured: true },
  { id: 19, name: "Coffee 200g", price: 950, category: "Beverages", supermarket: "Keells", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=500", featured: false },
  { id: 20, name: "Fruit Juice 1L", price: 320, category: "Beverages", supermarket: "Arpico", image: "https://images.unsplash.com/photo-1734773557735-8fc50f94b473?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", featured: false },
  { id: 21, name: "Coconut Water 500ml", price: 180, category: "Beverages", supermarket: "Cargills", image: "https://images.unsplash.com/photo-1628692945318-f44a3c346afb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", featured: true },
  { id: 22, name: "Mineral Water 1.5L", price: 120, category: "Beverages", supermarket: "Keells", image: "https://images.unsplash.com/photo-1638688569176-5b6db19f9d2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE1pbmVyYWwlMjBXYXRlcnxlbnwwfHwwfHx8MA%3D%3D", featured: false },
  
  // Household
  { id: 23, name: "Laundry Detergent 1kg", price: 780, category: "Household", supermarket: "Cargills", image: "https://images.unsplash.com/photo-1624372635282-b324bcdd4907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TGF1bmRyeSUyMERldGVyZ2VudHxlbnwwfHwwfHx8MA%3D%3D", featured: false },
  { id: 24, name: "Dish Wash 500ml", price: 320, category: "Household", supermarket: "Keells", image: "https://images.unsplash.com/photo-1550963295-019d8a8a61c5?auto=format&fit=crop&q=80&w=500", featured: true },
  { id: 25, name: "Toilet Paper 4 Rolls", price: 490, category: "Household", supermarket: "Arpico", image: "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=500", featured: false },
  { id: 26, name: "Air Freshener", price: 350, category: "Household", supermarket: "Cargills", image: "https://images.unsplash.com/photo-1572635196243-4dd75fbdbd7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEFpciUyMEZyZXNoZW5lcnxlbnwwfHwwfHx8MA%3D%3D", featured: false },

  // Personal Care
  { id: 27, name: "Shampoo 300ml", price: 580, category: "Personal Care", supermarket: "Keells", image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hhbXBvb3xlbnwwfHwwfHx8MA%3D%3D", featured: true },
  { id: 28, name: "Soap Bar 75g", price: 150, category: "Personal Care", supermarket: "Arpico", image: "data:image/jpeg;base64,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", featured: false },
  { id: 29, name: "Toothpaste 100g", price: 290, category: "Personal Care", supermarket: "Cargills", image: "https://images.unsplash.com/photo-1602797844551-a8657700eaac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFRvb3RocGFzdGV8ZW58MHx8MHx8fDA%3D", featured: false },
  { id: 30, name: "Shower Gel 250ml", price: 420, category: "Personal Care", supermarket: "Keells", image: "https://images.unsplash.com/photo-1673847401550-fd92f05614b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob3dlciUyMGdlbHxlbnwwfHwwfHx8MA%3D%3D", featured: true },
];

export default function ProductsPage() {
  // State management
  const [cart, setCart] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSupermarket, setSelectedSupermarket] = useState("All");
  const [sortOption, setSortOption] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Extract unique categories and supermarkets for filters
  const categories = useMemo(() => ["All", ...new Set(products.map(p => p.category))], []);
  const supermarkets = useMemo(() => ["All", ...new Set(products.map(p => p.supermarket))], []);
  
  // Filter products based on search, category and supermarket
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSupermarket = selectedSupermarket === "All" || product.supermarket === selectedSupermarket;
      
      return matchesSearch && matchesCategory && matchesSupermarket;
    });
  }, [searchQuery, selectedCategory, selectedSupermarket]);
  
  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortOption) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "featured":
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [filteredProducts, sortOption]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );
  
  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSupermarket, searchQuery]);

  // Add to cart function
  const addToCart = (id: number) => {
    setCart(prev => [...prev, id]);
    // Show feedback
    showNotification(`Item added to cart!`);
  };
  
  // Simple notification system
  const [notification, setNotification] = useState("");
  
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <section className="px-4 md:px-16 py-16 bg-black">
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-white text-black p-4 rounded-lg shadow-lg z-50 animate-fade-in-out">
          {notification}
        </div>
      )}
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-0">Shop Products</h1>
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute right-4 top-3 text-gray-400" />
          </div>
        </div>

        {/* Cart summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button 
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white text-black' : 'bg-gray-800 text-gray-300'}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button 
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white text-black' : 'bg-gray-800 text-gray-300'}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
          <button className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition">
            <FaShoppingCart className="mr-2" />
            <span>Cart ({cart.length} items)</span>
          </button>
        </div>
        
        {/* Filter toggle for mobile */}
        <div className="md:hidden mb-4">
          <button 
            className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter className="mr-2" />
            <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          </button>
        </div>
        
        {/* Main content with filters and products */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar - always visible on desktop, toggleable on mobile */}
          <div className={`md:w-1/4 bg-gray-900 p-4 rounded-lg ${showFilters ? 'block' : 'hidden md:block'}`}>
            <h2 className="text-xl font-semibold text-white mb-4">Filters</h2>
            
            <div className="mb-6">
              <h3 className="text-lg text-white mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input 
                      type="radio" 
                      id={category} 
                      name="category" 
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="mr-2"
                    />
                    <label htmlFor={category} className="text-gray-300 cursor-pointer">{category}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg text-white mb-2">Supermarkets</h3>
              <div className="space-y-2">
                {supermarkets.map((supermarket) => (
                  <div key={supermarket} className="flex items-center">
                    <input 
                      type="radio" 
                      id={supermarket} 
                      name="supermarket" 
                      checked={selectedSupermarket === supermarket}
                      onChange={() => setSelectedSupermarket(supermarket)}
                      className="mr-2"
                    />
                    <label htmlFor={supermarket} className="text-gray-300 cursor-pointer">{supermarket}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg text-white mb-2">Sort By</h3>
              <select 
                className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
            
            <button 
              className="w-full bg-white text-black py-2 rounded hover:bg-gray-300 mt-4 transition"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedSupermarket("All");
                setSearchQuery("");
                setSortOption("featured");
              }}
            >
              Reset Filters
            </button>
          </div>
          
          {/* Products grid */}
          <div className="md:w-3/4">
            {/* Results summary */}
            <div className="mb-4 text-gray-300 flex justify-between items-center">
              <div>
                Showing {paginatedProducts.length} of {sortedProducts.length} results
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
                {selectedSupermarket !== "All" && ` from ${selectedSupermarket}`}
                {searchQuery && ` for "${searchQuery}"`}
              </div>
              <div className="flex items-center">
                <label htmlFor="itemsPerPage" className="text-sm mr-2">Items per page:</label>
                <select 
                  id="itemsPerPage" 
                  className="bg-gray-800 text-white p-1 rounded"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value="9">9</option>
                  <option value="12">12</option>
                  <option value="24">24</option>
                </select>
              </div>
            </div>
            
            {sortedProducts.length === 0 ? (
              <div className="bg-gray-900 p-6 rounded text-center">
                <p className="text-gray-400">No products match your current filters.</p>
                <button 
                  className="mt-4 bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedSupermarket("All");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="bg-gray-900 p-4 rounded shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative h-48 bg-gray-800 rounded mb-4 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                      
                      {product.featured && (
                        <div className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-white text-xl font-medium">{product.name}</h2>
                      <span className="text-white font-bold">Rs. {product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mb-4">
                      <span className="text-gray-400">{product.category}</span>
                      <span className="text-gray-400">{product.supermarket}</span>
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-full bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition flex items-center justify-center"
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              // List view
              <div className="space-y-4">
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="bg-gray-900 p-4 rounded shadow-lg hover:shadow-xl transition-all duration-300 flex">
                    <div className="relative w-40 h-40 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                      
                      {product.featured && (
                        <div className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-white text-xl font-medium">{product.name}</h2>
                        <span className="text-white font-bold">Rs. {product.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-gray-400">{product.category}</span>
                        <span className="text-gray-400">{product.supermarket}</span>
                      </div>
                      <div className="flex-grow"></div>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition flex items-center justify-center self-end mt-2"
                      >
                        <FaShoppingCart className="mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  <button 
                    className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages).keys()].map(num => (
                    <button 
                      key={num}
                      className={`px-3 py-1 rounded ${currentPage === num + 1 ? 'bg-white text-black' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                      onClick={() => setCurrentPage(num + 1)}
                    >
                      {num + 1}
                    </button>
                  ))}
                  
                  <button 
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}