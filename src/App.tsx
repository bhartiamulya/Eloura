import { useState, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiHeart, FiX, FiShoppingBag, FiSettings, FiStar } from 'react-icons/fi';
import type { Outfit } from './types';
import { analyzeClothingWithGemini, getAIRecommendedOutfits } from './services/geminiAI';
import { getDynamicRecommendations } from './services/ecommerceAPI';
import backgroundVideo from './assets/background.mp4';

const itemCategories = [
  { value: 'top', label: 'Top/Shirt/Blouse' },
  { value: 'pants', label: 'Pants/Jeans' },
  { value: 'skirt', label: 'Skirt' },
  { value: 'dress', label: 'Dress' },
  { value: 'jacket', label: 'Jacket' },
  { value: 'coat', label: 'Coat/Blazer' },
  { value: 'shoes', label: 'Shoes/Sneakers' },
  { value: 'heels', label: 'Heels/Boots' },
  { value: 'bag', label: 'Bag/Purse' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'watch', label: 'Watch' },
  { value: 'scarf', label: 'Scarf/Shawl' },
  { value: 'belt', label: 'Belt' },
  { value: 'hat', label: 'Hat/Cap' },
  { value: 'sunglasses', label: 'Sunglasses' },
];


const getPairingOptions = (category: string) => {
  const pairingMap: Record<string, Array<{value: string, label: string}>> = {
    'top': [
      { value: 'pants', label: 'Pants/Jeans' },
      { value: 'skirt', label: 'Skirts' },
      { value: 'shoes', label: 'Shoes' },
      { value: 'heels', label: 'Heels/Boots' },
      { value: 'bag', label: 'Bags' },
      { value: 'jewelry', label: 'Jewelry' },
      { value: 'scarf', label: 'Scarves' },
      { value: 'belt', label: 'Belts' },
      { value: 'jacket', label: 'Jackets' },
    ],
    'pants': [
      { value: 'top', label: 'Tops/Shirts' },
      { value: 'shoes', label: 'Shoes' },
      { value: 'heels', label: 'Heels/Boots' },
      { value: 'bag', label: 'Bags' },
      { value: 'jewelry', label: 'Jewelry' },
      { value: 'belt', label: 'Belts' },
      { value: 'jacket', label: 'Jackets' },
    ],
    'skirt': [
      { value: 'top', label: 'Tops/Shirts' },
      { value: 'shoes', label: 'Shoes' },
      { value: 'heels', label: 'Heels/Boots' },
      { value: 'bag', label: 'Bags' },
      { value: 'jewelry', label: 'Jewelry' },
      { value: 'jacket', label: 'Jackets' },
    ],
    'dress': [
      { value: 'shoes', label: 'Shoes' },
      { value: 'heels', label: 'Heels/Boots' },
      { value: 'bag', label: 'Bags' },
      { value: 'jewelry', label: 'Jewelry' },
      { value: 'jacket', label: 'Jackets' },
      { value: 'coat', label: 'Coats' },
      { value: 'scarf', label: 'Scarves' },
    ],
    'jacket': [
      { value: 'top', label: 'Tops' },
      { value: 'pants', label: 'Pants' },
      { value: 'skirt', label: 'Skirts' },
      { value: 'dress', label: 'Dresses' },
      { value: 'shoes', label: 'Shoes' },
    ],
    'coat': [
      { value: 'top', label: 'Tops' },
      { value: 'pants', label: 'Pants' },
      { value: 'dress', label: 'Dresses' },
      { value: 'shoes', label: 'Shoes' },
      { value: 'scarf', label: 'Scarves' },
    ],
    'shoes': [
      { value: 'top', label: 'Tops' },
      { value: 'pants', label: 'Pants' },
      { value: 'skirt', label: 'Skirts' },
      { value: 'dress', label: 'Dresses' },
      { value: 'bag', label: 'Bags' },
    ],
    'heels': [
      { value: 'top', label: 'Tops' },
      { value: 'pants', label: 'Pants' },
      { value: 'skirt', label: 'Skirts' },
      { value: 'dress', label: 'Dresses' },
      { value: 'bag', label: 'Bags' },
    ],
    'bag': [
      { value: 'top', label: 'Tops' },
      { value: 'pants', label: 'Pants' },
      { value: 'dress', label: 'Dresses' },
      { value: 'shoes', label: 'Shoes' },
    ],
    'jewelry': [
      { value: 'top', label: 'Tops' },
      { value: 'dress', label: 'Dresses' },
    ],
    'watch': [
      { value: 'top', label: 'Tops' },
      { value: 'dress', label: 'Dresses' },
      { value: 'jacket', label: 'Jackets' },
    ],
    'scarf': [
      { value: 'top', label: 'Tops' },
      { value: 'coat', label: 'Coats' },
      { value: 'dress', label: 'Dresses' },
    ],
    'belt': [
      { value: 'top', label: 'Tops' },
      { value: 'pants', label: 'Pants' },
      { value: 'dress', label: 'Dresses' },
    ],
    'hat': [
      { value: 'top', label: 'Tops' },
      { value: 'dress', label: 'Dresses' },
      { value: 'coat', label: 'Coats' },
    ],
    'sunglasses': [
      { value: 'top', label: 'Tops' },
      { value: 'dress', label: 'Dresses' },
    ],
  };
  return pairingMap[category] || [];
};

const occasions = ['Casual', 'Office', 'Party', 'Date Night'];
const itemColors = [
  { value: 'black', label: 'Black', hex: '#000000' },
  { value: 'white', label: 'White', hex: '#FFFFFF' },
  { value: 'red', label: 'Red', hex: '#DC2626' },
  { value: 'blue', label: 'Blue', hex: '#2563EB' },
  { value: 'green', label: 'Green', hex: '#16A34A' },
  { value: 'pink', label: 'Pink', hex: '#EC4899' },
  { value: 'multi', label: 'Multi-color', hex: 'linear-gradient(45deg, #DC2626, #2563EB, #16A34A)' },
];

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadedCategory, setUploadedCategory] = useState<string>('');
  const [uploadedColor, setUploadedColor] = useState<string>('');
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [selectedPairings, setSelectedPairings] = useState<string[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showSavedPage, setShowSavedPage] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default');
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    occasion: '',
    color: '',
  });
  const [showSparkle, setShowSparkle] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setShowCategorySelector(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategorySelection = async () => {
    if (!uploadedCategory || !uploadedColor || selectedPairings.length === 0 || !selectedImage) return;
    
    setShowCategorySelector(false);
    setIsLoading(true);
    
    try {
      
      console.log('🤖 Analyzing image with Gemini AI...');
      const aiAnalysis = await analyzeClothingWithGemini(selectedImage);
      console.log('✅ AI Analysis:', aiAnalysis);
      
      
      console.log('🛍️ Fetching real products from APIs...');
      const dynamicProducts = await getDynamicRecommendations(
        uploadedCategory,
        uploadedColor,
        selectedPairings
      );
      console.log('✅ Fetched products:', dynamicProducts.length);
      
      
      const filteredProducts = dynamicProducts.filter((outfit: Outfit) => 
        selectedPairings.includes(outfit.category)
      );
      
      
      const aiRanked = getAIRecommendedOutfits(
        aiAnalysis,
        filteredProducts,
        uploadedCategory,
        selectedPairings
      );
      
      console.log('✅ AI-ranked matches:', aiRanked.length);
      setOutfits(aiRanked);
      setCurrentCardIndex(0); 
      
    } catch (error) {
      console.error('❌ AI/API Error:', error);
      setOutfits([]);
      setCurrentCardIndex(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwipe = (id: number, direction: 'left' | 'right') => {
    if (direction === 'right') {
      
      const outfit = displayedOutfits[currentCardIndex];
      if (outfit) {
        setSavedOutfits(prev => [...prev, outfit]);
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 1000);
      }
    }
    
    
    if (currentCardIndex < displayedOutfits.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < outfits.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const getSortedOutfits = () => {
    const sorted = [...outfits];
    if (sortBy === 'price-low') {
      return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-high') {
      return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    return sorted;
  };

  const displayedOutfits = getSortedOutfits();

  const applyFilters = () => {
    
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        style={{ filter: 'contrast(1.1) brightness(0.9)' }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      
      {/* Overlay for better text readability with vignette effect */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 -z-5" 
           style={{ 
             boxShadow: 'inset 0 0 200px 100px rgba(0,0,0,0.5)',
             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.15\'/%3E%3C/svg%3E")',
             backgroundRepeat: 'repeat'
           }}
      ></div>
      
      {/* Header */}
      <header className="p-4 flex justify-between items-center relative z-10">
        <h1 className="text-4xl font-playfair font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
          Éloura
        </h1>
        <button 
          onClick={() => setShowSavedPage(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md hover:bg-white/60 transition-all shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.7)]"
        >
          <FiHeart className="text-dark" style={{ strokeWidth: 3 }} />
          <span className="text-dark font-extrabold">Saved ({savedOutfits.length})</span>
        </button>
      </header>

      <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        {!selectedImage ? (
          <div className="max-w-lg text-center">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-[0_0_40px_rgba(255,255,255,0.4)] border border-white/30 hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] transition-shadow">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
                <FiUpload className="text-4xl text-dark" style={{ strokeWidth: 2.5 }} />
              </div>
              <h2 className="text-2xl font-playfair font-extrabold mb-4 text-dark">Upload Your Outfit</h2>
              <p className="text-dark/80 mb-6 font-medium">Snap or upload a photo of your clothing item and we'll find the perfect matches for you!</p>
              <label className="inline-block px-6 py-3 bg-accent text-white rounded-full cursor-pointer hover:bg-accent/90 transition-colors font-semibold">
                Choose an Image
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Side-by-Side Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Uploaded Image */}
              <div className="relative">
                <div className="bg-white p-4 rounded-2xl shadow-lg sticky top-4">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-playfair font-bold text-dark">Your Item</h2>
                    <button 
                      onClick={() => {
                        setSelectedImage(null);
                        setUploadedCategory('');
                        setUploadedColor('');
                        setSelectedPairings([]);
                        setOutfits([]);
                      }}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <FiX className="text-dark" />
                    </button>
                  </div>
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded item" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {uploadedCategory && uploadedColor && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-dark/70">Type:</span>
                        <span className="px-3 py-1 bg-light rounded-full text-dark capitalize">
                          {uploadedCategory}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-dark/70">Color:</span>
                        <span className="px-3 py-1 bg-light rounded-full text-dark capitalize">
                          {uploadedColor}
                        </span>
                      </div>
                      {selectedPairings.length > 0 && (
                        <div className="text-sm">
                          <span className="font-medium text-dark/70">Looking for:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedPairings.map(p => (
                              <span key={p} className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs capitalize">
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Matches Section */}
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-4">
                  <h2 className="text-xl font-playfair font-bold text-dark">
                    Perfect Matches ({outfits.length})
                  </h2>
                </div>
                
                {showSparkle && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <FiStar className="text-yellow-400 text-6xl animate-sparkle" />
                  </div>
                )}

                {isLoading ? (
                  <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                      <h3 className="text-xl font-bold text-dark">Styling Matches...</h3>
                      <p className="text-dark/70">AI is analyzing your item and finding perfect matches</p>
                    </div>
                  </div>
                ) : displayedOutfits.length > 0 && currentCardIndex < displayedOutfits.length ? (
                  <div className="relative">
                    {/* Card Counter */}
                    <div className="text-center mb-4 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                      <div className="text-dark font-bold">
                        {currentCardIndex + 1} / {displayedOutfits.length}
                      </div>
                    </div>

                    {/* Swipeable Card */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={displayedOutfits[currentCardIndex].id}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, info) => {
                          if (info.offset.x > 100) {
                            handleSwipe(displayedOutfits[currentCardIndex].id, 'right');
                          } else if (info.offset.x < -100) {
                            handleNext();
                          }
                        }}
                        className="bg-white rounded-2xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing max-h-[600px] flex flex-col"
                      >
                        {/* Large Product Image */}
                        <div className="relative w-full h-[400px] flex-shrink-0">
                          <img 
                            src={displayedOutfits[currentCardIndex].image} 
                            alt={displayedOutfits[currentCardIndex].name} 
                            className="w-full h-full object-cover"
                          />
                          {displayedOutfits[currentCardIndex].price && (
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                              <span className="text-accent font-bold text-lg">₹{displayedOutfits[currentCardIndex].price}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Product Details */}
                        <div className="p-4 flex-1 overflow-y-auto">
                          <h3 className="font-bold text-xl text-dark mb-2">{displayedOutfits[currentCardIndex].name}</h3>
                          <p className="text-dark/70 text-sm mb-3 line-clamp-3">{displayedOutfits[currentCardIndex].description}</p>
                          <div className="flex items-center justify-between">
                            <span className="inline-block text-xs bg-light px-3 py-1 rounded-full text-dark/70 capitalize">
                              {displayedOutfits[currentCardIndex].category}
                            </span>
                            {displayedOutfits[currentCardIndex].price && (
                              <span className="text-accent font-bold text-lg">₹{displayedOutfits[currentCardIndex].price}</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-6">
                      <button
                        onClick={handlePrevious}
                        disabled={currentCardIndex === 0}
                        className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Previous"
                      >
                        <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => handleSwipe(displayedOutfits[currentCardIndex].id, 'left')}
                        className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                        title="Skip"
                      >
                        <FiX className="text-3xl text-red-500" />
                      </button>
                      
                      <button
                        onClick={() => handleSwipe(displayedOutfits[currentCardIndex].id, 'right')}
                        className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-green-50 transition-colors"
                        title="Save"
                      >
                        <FiHeart className="text-3xl text-green-500" />
                      </button>
                      
                      <a 
                        href={displayedOutfits[currentCardIndex].buyLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-16 h-16 rounded-full bg-accent shadow-lg flex items-center justify-center hover:bg-accent/90 transition-colors"
                        title="Buy Now"
                      >
                        <FiShoppingBag className="text-2xl text-white" />
                      </a>
                      
                      <button
                        onClick={handleNext}
                        disabled={currentCardIndex === displayedOutfits.length - 1}
                        className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Next"
                      >
                        <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white/30 rounded-2xl">
                    <p className="text-dark/70 mb-4">No matches found. Try selecting different pairing options.</p>
                    <button 
                      onClick={() => handleCategorySelection()} 
                      className="text-accent hover:underline font-medium"
                    >
                      Retry with AI
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Saved Outfits Page */}
      {showSavedPage && (
        <div className="fixed inset-0 bg-gradient-to-br from-primary to-secondary z-50 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-playfair font-bold text-dark">My Saved Outfits</h2>
              <button 
                onClick={() => setShowSavedPage(false)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <FiX className="text-2xl text-dark" />
              </button>
            </div>

            {savedOutfits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedOutfits.map((outfit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative aspect-square">
                      <img 
                        src={outfit.image} 
                        alt={outfit.name} 
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setSavedOutfits(prev => prev.filter((_, i) => i !== index))}
                        className="absolute top-3 right-3 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
                        title="Remove from saved"
                      >
                        <FiX className="text-red-500" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-dark mb-2">{outfit.name}</h3>
                      <p className="text-dark/70 text-sm mb-4">{outfit.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-light px-3 py-1 rounded-full text-dark/70 capitalize">
                          {outfit.category}
                        </span>
                        <a 
                          href={outfit.buyLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors"
                        >
                          <FiShoppingBag />
                          <span>Buy Now</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <FiHeart className="text-6xl text-dark/30 mx-auto mb-4" />
                <h3 className="text-2xl font-playfair font-bold text-dark mb-2">No saved outfits yet</h3>
                <p className="text-dark/70 mb-6">Start browsing and save items you love!</p>
                <button 
                  onClick={() => setShowSavedPage(false)}
                  className="px-6 py-3 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            )}

            {savedOutfits.length > 0 && (
              <div className="mt-8 text-center">
                <button 
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all saved outfits?')) {
                      setSavedOutfits([]);
                    }
                  }}
                  className="text-dark/60 hover:text-red-500 transition-colors font-medium"
                >
                  Clear All Saved Items
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Category Selector Modal */}
      {showCategorySelector && selectedImage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto p-4">
          <motion.div 
            className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-auto my-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-playfair font-bold text-dark mb-4">What did you upload?</h2>
            <p className="text-dark/70 text-sm mb-6">Help us find the perfect matches by telling us about your item</p>
            
            {/* Category Selection */}
            <div className="mb-6">
              <h3 className="font-medium text-dark/80 mb-3">Item Type</h3>
              <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                {itemCategories.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setUploadedCategory(cat.value);
                    }}
                    className={`p-3 rounded-lg text-left text-sm transition-colors ${
                      uploadedCategory === cat.value 
                        ? 'bg-accent text-white' 
                        : 'bg-gray-100 text-dark/80 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            {uploadedCategory && (
              <div className="mb-6">
                <h3 className="font-bold text-dark mb-3">Primary Color</h3>
                <div className="grid grid-cols-4 gap-2">
                  {itemColors.map(colorItem => (
                    <button
                      key={colorItem.value}
                      onClick={() => {
                        setUploadedColor(colorItem.value);
                      }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        uploadedColor === colorItem.value 
                          ? 'border-accent scale-105' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ background: colorItem.hex }}
                      title={colorItem.label}
                    >
                      <div className="w-full h-8 rounded" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pairing Preferences */}
            {uploadedCategory && uploadedColor && (
              <div className="mb-6">
                <h3 className="font-bold text-dark mb-3">What would you like to pair it with?</h3>
                <p className="text-sm text-dark/60 mb-3">Select one or more items (you can choose multiple)</p>
                <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {getPairingOptions(uploadedCategory).map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedPairings(prev => 
                          prev.includes(option.value)
                            ? prev.filter(p => p !== option.value)
                            : [...prev, option.value]
                        );
                      }}
                      className={`p-2 rounded-lg text-left text-sm transition-all border-2 ${
                        selectedPairings.includes(option.value)
                          ? 'bg-accent text-white border-accent' 
                          : 'bg-gray-50 text-dark/80 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {selectedPairings.length > 0 && (
                  <p className="text-sm text-accent mt-2">
                    ✓ {selectedPairings.length} item type{selectedPairings.length > 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setShowCategorySelector(false);
                  setSelectedImage(null);
                  setUploadedCategory('');
                  setUploadedColor('');
                  setSelectedPairings([]);
                }}
                className="flex-1 py-3 bg-gray-100 text-dark rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCategorySelection}
                disabled={!uploadedCategory || !uploadedColor || selectedPairings.length === 0}
                className={`flex-1 py-3 rounded-full font-medium transition-colors ${
                  uploadedCategory && uploadedColor && selectedPairings.length > 0
                    ? 'bg-accent text-white hover:bg-accent/90'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Find Matches
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div 
            className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-playfair font-bold text-dark">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <FiX className="text-dark text-xl" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-dark/80 mb-2">Occasion</h3>
                <div className="flex flex-wrap gap-2">
                  {occasions.map(occasion => (
                    <button
                      key={occasion}
                      onClick={() => setFilters(prev => ({ ...prev, occasion }))}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        filters.occasion === occasion 
                          ? 'bg-accent text-white' 
                          : 'bg-gray-100 text-dark/80 hover:bg-gray-200'
                      }`}
                    >
                      {occasion}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-dark/80 mb-2">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {itemColors.map(colorItem => (
                    <button
                      key={colorItem.value}
                      onClick={() => setFilters(prev => ({ ...prev, color: colorItem.value }))}
                      className={`w-8 h-8 rounded-full border-2 ${
                        filters.color === colorItem.value ? 'border-accent' : 'border-gray-300'
                      }`}
                      style={{ background: colorItem.hex }}
                      title={colorItem.label}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button 
                  onClick={applyFilters}
                  className="w-full py-3 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;
