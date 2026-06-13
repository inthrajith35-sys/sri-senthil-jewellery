import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  RefreshCw,
  Phone,
  Clock,
  MapPin,
  CheckCircle,
  Menu,
  X,
  ChevronRight,
  Award,
  ShieldCheck,
  Search,
  Check,
  ArrowUpRight
} from "lucide-react";
import {
  GOLD_CATEGORIES,
  SILVER_CATEGORIES,
  COLLECTIONS,
  GOLD_PRODUCTS,
  SILVER_PRODUCTS,
  Product
} from "./data";

export default function App() {
  // Mobile menu control
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Selected categories for filtering
  const [selectedGoldCategory, setSelectedGoldCategory] = useState<string>("All");
  const [selectedSilverCategory, setSelectedSilverCategory] = useState<string>("All");

  // Search input
  const [searchQuery, setSearchQuery] = useState("");

  // Product modal for enquiry
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null);
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryPhone, setEnquiryPhone] = useState("");
  const [enquiryCustomText, setEnquiryCustomText] = useState("");
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Notification for copy/actions
  const [notification, setNotification] = useState<string | null>(null);

  const CONTACT_NUMBER = "+917418267460";
  const WHATSAPP_NUMBER = "919362267460";

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Filter products by category and search query
  const filteredGoldProducts = GOLD_PRODUCTS.filter((product) => {
    const matchesCategory = selectedGoldCategory === "All" || product.category === selectedGoldCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredSilverProducts = SILVER_PRODUCTS.filter((product) => {
    const matchesCategory = selectedSilverCategory === "All" || product.category === selectedSilverCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle direct WhatsApp messaging
  const triggerWhatsAppEnquiry = (product: Product, customMsg = "") => {
    const messageText = customMsg 
      ? customMsg 
      : `Hello Sri Senthil Jewellery, I am interested in seeking more details about "${product.title}" (${product.category}). Please guide me with showroom pricing and availability.`;
    
    const encodeText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeText}`;
    window.open(whatsappUrl, "_blank");
  };

  // Submit custom modal enquiry
  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryProduct) return;
    
    // Construct premium WhatsApp message
    const customMessage = `*SRI SENTHIL JEWELLERY WEBSITE ENQUIRY*\n\n` + 
      `*Customer:* ${enquiryName}\n` +
      `*Phone:* ${enquiryPhone}\n` +
      `*Product:* ${enquiryProduct.title}\n` +
      `*Category:* ${enquiryProduct.category}\n` +
      `*Note:* ${enquiryCustomText || "Interested in viewing and showroom pricing."}`;
      
    setEnquirySuccess(true);
    setTimeout(() => {
      triggerWhatsAppEnquiry(enquiryProduct, customMessage);
      setEnquiryProduct(null);
      setEnquirySuccess(false);
      setEnquiryName("");
      setEnquiryPhone("");
      setEnquiryCustomText("");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-c-ivory text-c-black font-sans antialiased selection:bg-gold-100 selection:text-c-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-c-black focus:px-4 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-wider focus:text-white"
      >
        Skip to main content
      </a>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-c-black text-c-ivory px-6 py-3 border border-c-gold-light rounded-none text-xs font-mono tracking-[2px] uppercase flex items-center space-x-2 shadow-xl"
          >
            <Check className="w-4 h-4 text-c-gold" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkly Fast Enquiry Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {/* Call button */}
        <a
          id="floating-call-btn"
          href={`tel:${CONTACT_NUMBER}`}
          className="flex items-center justify-center w-14 h-14 bg-white hover:bg-c-ivory text-c-gold rounded-full shadow-xl border border-c-gold-light/60 transition-all duration-300 hover:scale-105 active:scale-95 group"
          title="Call Showroom"
        >
          <Phone className="w-5 h-5 transition-transform group-hover:rotate-12" />
        </a>
        {/* WhatsApp button */}
        <a
          id="floating-whatsapp-btn"
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I'm%20visiting%20your%20website%20and%20would%20like%20to%20enquire%20about%20your%20exclusive%20jewellery%20catalog.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
          title="WhatsApp Enquiry"
          aria-label="Send a WhatsApp enquiry"
        >
          <svg className="w-7 h-7 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.261 2.266 3.504 5.279 3.504 8.486 0 6.657-5.337 11.997-11.951 11.997-2.005-.001-3.973-.5-5.733-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.865-9.83.003-2.623-1.017-5.09-2.871-6.945C16.634 1.99 14.162.97 11.543.97c-5.45 0-9.88 4.414-9.885 9.831-.001 1.778.475 3.51 1.378 5.061l-.975 3.565 3.65-.956zm12.119-7.226c-.322-.161-1.905-.94-2.201-1.047-.295-.108-.51-.161-.724.161-.215.323-.833 1.047-1.02 1.261-.188.215-.376.242-.698.08-.322-.161-1.36-.5-2.589-1.6-.957-.852-1.603-1.906-1.791-2.229-.188-.322-.02-.497.14-.658.145-.145.323-.376.484-.564.161-.188.215-.322.323-.538.107-.215.053-.404-.026-.565-.079-.161-.724-1.745-.992-2.39-.262-.63-.526-.543-.724-.553-.188-.009-.403-.01-.617-.01-.215 0-.564.08-.859.404-.296.323-1.129 1.102-1.129 2.689 0 1.587 1.155 3.12 1.316 3.335.161.215 2.27 3.466 5.5 4.86.768.331 1.368.528 1.835.677.772.245 1.474.21 2.029.128.619-.092 1.905-.779 2.174-1.493.269-.713.269-1.325.188-1.453-.08-.127-.295-.188-.617-.35z" />
          </svg>
        </a>
      </div>

      {/* Outer elegant border for desktop showroom layout */}
      <div className="hidden lg:block fixed inset-4 border border-c-gold-light/15 pointer-events-none z-30" />

      {/* Top Banner */}
      <div className="bg-c-black text-c-ivory px-4 py-2.5 text-center text-[10px] tracking-[3px] uppercase flex items-center justify-center space-x-4 border-b border-c-gold-light/10">
        <Sparkles className="w-3.5 h-3.5 text-gold-300 animate-pulse" />
        <span>Trusted Jewellery Collections Since 1989</span>
        <span className="hidden md:inline text-gold-300">•</span>
        <span className="hidden md:inline text-gold-300 font-semibold">Trusted Gold & Silver Collections</span>
        <span className="hidden md:inline text-gold-300">•</span>
        <span>Komarapalayam Showroom</span>
      </div>

      {/* Main Header / Navbar */}
      <header id="main-navigation" className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-c-gold-light/25 z-40 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
          
          {/* Logo Name & Subtitle */}
          <a href="#hero-showroom-section" className="flex flex-col select-none group focus:outline-none" aria-label="Sri Senthil Jewellery home">
            <span className="font-serif text-lg sm:text-2xl font-light tracking-[4px] text-c-black group-hover:text-c-gold transition-colors uppercase">
              SRI SENTHIL
            </span>
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[4px] text-c-gold font-semibold uppercase mt-0.5">
              JEWELLERY
            </span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8 font-sans text-[11px] tracking-[2px] uppercase font-normal">
            <a href="#hero-showroom-section" className="text-c-gold hover:text-c-gold transition-colors border-b border-c-gold pb-1 font-medium">
              Home
            </a>
            <a href="#gold-section" className="text-c-black hover:text-c-gold transition-colors pb-1">
              Gold
            </a>
            <a href="#silver-section" className="text-c-black hover:text-c-gold transition-colors pb-1">
              Silver
            </a>
            <a href="#collections-section" className="text-c-black hover:text-c-gold transition-colors pb-1">
              Collections
            </a>
            <a href="#about-section" className="text-c-black hover:text-c-gold transition-colors pb-1">
              About
            </a>
            <a href="#contact-section" className="text-c-black hover:text-c-gold transition-colors pb-1">
              Contact
            </a>
          </nav>

          {/* Contact Fast CTA buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              id="header-call-cta"
              href={`tel:${CONTACT_NUMBER}`}
              className="flex items-center space-x-2 text-[11px] uppercase tracking-[2px] font-normal border border-c-gold text-c-black px-4 py-2.5 rounded-none hover:bg-c-ivory transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-c-gold" />
              <span>Call Us</span>
            </a>
            <a
              id="header-whatsapp-cta"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[11px] uppercase tracking-[2px] font-normal bg-c-black hover:bg-c-gold text-white px-5 py-2.5 rounded-none transition-all border border-c-black"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.261 2.266 3.504 5.279 3.504 8.486 0 6.657-5.337 11.997-11.951 11.997-2.005-.001-3.973-.5-5.733-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.865-9.83.003-2.623-1.017-5.09-2.871-6.945C16.634 1.99 14.162.97 11.543.97c-5.45 0-9.88 4.414-9.885 9.831-.001 1.778.475 3.51 1.378 5.061l-.975 3.565 3.65-.956zm12.119-7.226c-.322-.161-1.905-.94-2.201-1.047-.295-.108-.51-.161-.724.161-.215.323-.833 1.047-1.02 1.261-.188.215-.376.242-.698.08-.322-.161-1.36-.5-2.589-1.6-.957-.852-1.603-1.906-1.791-2.229-.188-.322-.02-.497.14-.658.145-.145.323-.376.484-.564.161-.188.215-.322.323-.538.107-.215.053-.404-.026-.565-.079-.161-.724-1.745-.992-2.39-.262-.63-.526-.543-.724-.553-.188-.009-.403-.01-.617-.01-.215 0-.564.08-.859.404-.296.323-1.129 1.102-1.129 2.689 0 1.587 1.155 3.12 1.316 3.335.161.215 2.27 3.466 5.5 4.86.768.331 1.368.528 1.835.677.772.245 1.474.21 2.029.128.619-.092 1.905-.779 2.174-1.493.269-.713.269-1.325.188-1.453-.08-.127-.295-.188-.617-.35z" />
              </svg>
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-c-black hover:text-c-gold focus:outline-none focus:ring-1 focus:ring-c-gold"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                  <div className="flex flex-col">
                    <span className="font-serif text-lg font-light tracking-[4px] text-c-black uppercase">
                      SRI SENTHIL
                    </span>
                    <span className="font-sans text-[8px] tracking-[4px] text-c-gold font-semibold uppercase mt-0.5">
                      JEWELLERY
                    </span>
                  </div>
                  <button
                    id="close-mobile-nav"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-gray-500 hover:text-black rounded-none hover:bg-gray-100"
                    aria-label="Close mobile navigation menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex flex-col space-y-5 mt-8 font-sans text-xs uppercase tracking-[2px] font-medium p-2">
                  <a
                    href="#hero-showroom-section"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-c-gold flex items-center justify-between"
                  >
                    <span>Home</span>
                    <ChevronRight className="w-4 h-4 text-c-gold" />
                  </a>
                  <a
                    href="#gold-section"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-c-black hover:text-c-gold flex items-center justify-between"
                  >
                    <span>Exclusive Gold Section</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                  <a
                    href="#silver-section"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-c-black hover:text-c-gold flex items-center justify-between"
                  >
                    <span>Silver Collection</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                  <a
                     href="#collections-section"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-c-black hover:text-c-gold flex items-center justify-between"
                  >
                    <span>Exclusive Collections</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                  <a
                    href="#about-section"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-c-black hover:text-c-gold flex items-center justify-between"
                  >
                    <span>Our Legacy & Trust</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                  <a
                    href="#contact-section"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-c-black hover:text-c-gold flex items-center justify-between"
                  >
                    <span>Get in Touch</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                </nav>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <a
                  href={`tel:${CONTACT_NUMBER}`}
                  className="w-full flex items-center justify-center space-x-2 border border-c-gold py-3 rounded-none text-[11px] uppercase tracking-[2px] text-c-black"
                >
                  <Phone className="w-4 h-4 text-c-gold" />
                  <span>Call Showroom</span>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-c-black text-white py-3 rounded-none text-[11px] uppercase tracking-[2px] hover:bg-c-gold transition"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.261 2.266 3.504 5.279 3.504 8.486 0 6.657-5.337 11.997-11.951 11.997-2.005-.001-3.973-.5-5.733-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.865-9.83.003-2.623-1.017-5.09-2.871-6.945C16.634 1.99 14.162.97 11.543.97c-5.45 0-9.88 4.414-9.885 9.831-.001 1.778.475 3.51 1.378 5.061l-.975 3.565 3.65-.956zm12.119-7.226c-.322-.161-1.905-.94-2.201-1.047-.295-.108-.51-.161-.724.161-.215.323-.833 1.047-1.02 1.261-.188.215-.376.242-.698.08-.322-.161-1.36-.5-2.589-1.6-.957-.852-1.603-1.906-1.791-2.229-.188-.322-.02-.497.14-.658.145-.145.323-.376.484-.564.161-.188.215-.322.323-.538.107-.215.053-.404-.026-.565-.079-.161-.724-1.745-.992-2.39-.262-.63-.526-.543-.724-.553-.188-.009-.403-.01-.617-.01-.215 0-.564.08-.859.404-.296.323-1.129 1.102-1.129 2.689 0 1.587 1.155 3.12 1.316 3.335.161.215 2.27 3.466 5.5 4.86.768.331 1.368.528 1.835.677.772.245 1.474.21 2.029.128.619-.092 1.905-.779 2.174-1.493.269-.713.269-1.325.188-1.453-.08-.127-.295-.188-.617-.35z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content">
      {/* Hero Section */}
      <section id="hero-showroom-section" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-cover bg-center">
        {/* Landing background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/landing-background.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        {/* Soft overlay keeps hero copy readable while the video remains visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-c-ivory/95 via-c-ivory/82 to-c-black/20 lg:from-c-ivory/92 lg:via-c-ivory/68 lg:to-c-black/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24 z-10">
          <div className="max-w-2xl">
            {/* Design Spec Tagline */}
            <span className="font-sans text-[11px] sm:text-xs text-c-gold tracking-[4px] uppercase font-semibold mb-5 block">
              Since 2004 | Traditional Craftsmanship
            </span>

            {/* Main Headline */}
            <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-medium tracking-[0.08em] text-c-black leading-[1.05] mb-6 uppercase">
              Sri Senthil<br />
              <span className="text-c-gold">Jewellery</span>
            </h1>

            {/* Subtext */}
            <p className="font-sans text-sm sm:text-base text-gray-650 leading-relaxed mb-10 max-w-md">
              Experience the finest selection of premium gold and silver ornaments, where traditional artistry meets contemporary elegance.
            </p>

            {/* Navigation CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                id="hero-view-gold-btn"
                href="#gold-section"
                className="inline-block bg-c-black hover:bg-c-gold hover:text-white text-white text-[11px] uppercase tracking-[2px] font-normal px-8 py-4 border border-c-black transition-all rounded-none"
              >
                View Collections
              </a>
              <a
                id="hero-contact-btn"
                href="#contact-section"
                className="inline-block bg-transparent text-c-gold hover:bg-c-gold hover:text-white text-[11px] uppercase tracking-[2px] font-normal px-8 py-4 border border-c-gold transition-all rounded-none"
              >
                Visit Showroom
              </a>
            </div>

            {/* Trust badging */}
            <div className="mt-12 flex items-center space-x-4 border-t border-c-gold-light/20 pt-6">
              <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium font-sans uppercase tracking-[1px]">
                <Award className="w-5 h-5 text-c-gold" />
                <span>Handpicked Gold Collections</span>
              </div>
              <span className="text-c-gold-light">|</span>
              <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium font-sans uppercase tracking-[1px]">
                <ShieldCheck className="w-5 h-5 text-c-gold" />
                <span>Exchange Guarantee</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Collections Bar: Styled directly from Design HTML */}
      <div className="collections-bar border-t border-b border-c-gold-light/25 bg-white py-6 overflow-x-auto overflow-y-hidden scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-w-max gap-8 sm:gap-12">
          <div className="flex items-center space-x-12 mx-auto">
            <a href="#gold-section" onClick={() => setSelectedGoldCategory("Bridal Gold Jewellery")} className="collection-item flex items-center gap-4 group focus:outline-none shrink-0 pointer-events-auto">
              <div className="collection-dot w-[60px] h-[60px] bg-c-gold-light/40 group-hover:bg-c-gold-light/65 transition-colors flex items-center justify-center font-serif text-[10px] text-c-black tracking-wider uppercase font-semibold">
                GOLD
              </div>
              <div className="collection-name font-sans text-[11px] text-c-black tracking-[2px] uppercase font-semibold group-hover:text-c-gold transition-colors">
                Bridal Sets
              </div>
            </a>
            <a href="#silver-section" onClick={() => setSelectedSilverCategory("Silver Anklets")} className="collection-item flex items-center gap-4 group focus:outline-none shrink-0 pointer-events-auto">
              <div className="collection-dot w-[60px] h-[60px] bg-c-gold-light/40 group-hover:bg-c-gold-light/65 transition-colors flex items-center justify-center font-serif text-[10px] text-c-black tracking-wider uppercase font-semibold">
                SILVER
              </div>
              <div className="collection-name font-sans text-[11px] text-c-black tracking-[2px] uppercase font-semibold group-hover:text-c-gold transition-colors">
                Anklets
              </div>
            </a>
            <a href="#gold-section" onClick={() => setSelectedGoldCategory("All")} className="collection-item flex items-center gap-4 group focus:outline-none shrink-0 pointer-events-auto">
              <div className="collection-dot w-[60px] h-[60px] bg-c-gold-light/40 group-hover:bg-c-gold-light/65 transition-colors flex items-center justify-center font-serif text-[10px] text-c-black tracking-wider uppercase font-semibold">
                GOLD
              </div>
              <div className="collection-name font-sans text-[11px] text-c-black tracking-[2px] uppercase font-semibold group-hover:text-c-gold transition-colors">
                Daily Wear
              </div>
            </a>
            <a href="#silver-section" onClick={() => setSelectedSilverCategory("Silver Pooja Items")} className="collection-item flex items-center gap-4 group focus:outline-none shrink-0 pointer-events-auto">
              <div className="collection-dot w-[60px] h-[60px] bg-c-gold-light/40 group-hover:bg-c-gold-light/65 transition-colors flex items-center justify-center font-serif text-[10px] text-c-black tracking-wider uppercase font-semibold">
                SILVER
              </div>
              <div className="collection-name font-sans text-[11px] text-c-black tracking-[2px] uppercase font-semibold group-hover:text-c-gold transition-colors">
                Pooja Items
              </div>
            </a>
            <a href="#gold-section" onClick={() => setSelectedGoldCategory("Gold Bangles")} className="collection-item flex items-center gap-4 group focus:outline-none shrink-0 pointer-events-auto">
              <div className="collection-dot w-[60px] h-[60px] bg-c-gold-light/40 group-hover:bg-c-gold-light/65 transition-colors flex items-center justify-center font-serif text-[10px] text-c-black tracking-wider uppercase font-semibold">
                GOLD
              </div>
              <div className="collection-name font-sans text-[11px] text-c-black tracking-[2px] uppercase font-semibold group-hover:text-c-gold transition-colors">
                Bangles
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Gold Section */}
      <section id="gold-section" className="py-24 bg-white relative scroll-mt-10 border-b border-c-gold-light/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 pb-5 border-b border-c-gold-light/20">
            <div>
              <span className="text-[11px] tracking-[4px] text-c-gold font-semibold uppercase block mb-3">
                Uncompromising Lustre
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-c-black uppercase">
                Exclusive Gold Jewellery
              </h2>
              <p className="text-gray-550 font-sans text-xs sm:text-sm mt-2 max-w-xl">
                Exquisite gold creations. Handcrafted bridal, antique, traditional temple, and sleek lightweight ornaments.
              </p>
            </div>

            {/* Trust badge */}
            <div className="mt-4 md:mt-0 bg-c-ivory border border-c-gold-light/35 p-4 rounded-none flex items-center space-x-3.5">
              <Award className="w-8 h-8 text-c-gold shrink-0" />
              <div>
                <p className="text-[10px] text-c-gold font-bold uppercase tracking-wider">Gold Collection</p>
                <p className="font-serif text-base font-normal text-c-black">Handcrafted Ornaments</p>
              </div>
            </div>
          </div>

          {/* Filtering row */}
          <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
            <button
              id="gold-filter-all"
              onClick={() => setSelectedGoldCategory("All")}
              aria-pressed={selectedGoldCategory === "All"}
              className={`px-5 py-2.5 text-[10px] uppercase tracking-[1.5px] font-semibold rounded-none transition duration-200 ${
                selectedGoldCategory === "All"
                  ? "bg-c-black text-white"
                  : "bg-white hover:bg-c-ivory text-c-black border border-c-gold-light/20"
              }`}
            >
              All Categories
            </button>
            {GOLD_CATEGORIES.map((category, index) => (
              <button
                key={`gold-cat-${index}`}
                id={`gold-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedGoldCategory(category)}
                aria-pressed={selectedGoldCategory === category}
                className={`px-5 py-2.5 text-[10px] uppercase tracking-[1.5px] font-semibold rounded-none whitespace-nowrap transition duration-200 ${
                  selectedGoldCategory === category
                    ? "bg-c-black text-white"
                    : "bg-white hover:bg-c-ivory text-c-black border border-c-gold-light/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search trigger box */}
          <div className="relative max-w-sm mb-10 border border-c-gold-light/25 rounded-none h-11 flex items-center bg-[#FAF9F5]/40 px-3 focus-within:border-c-gold">
            <Search className="w-4 h-4 text-gray-400 mr-2.5" />
            <input
              id="gold-search-input"
              type="text"
              aria-label="Search gold and silver jewellery designs"
              placeholder="Search design pattern (e.g. jhumka, chain)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-c-black placeholder-gray-400 focus:outline-none w-full font-sans"
            />
            {searchQuery && (
              <button id="clear-gold-search" onClick={() => setSearchQuery("")} className="p-1 text-gray-400 hover:text-black" aria-label="Clear jewellery search">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Products Grid */}
          {filteredGoldProducts.length === 0 ? (
            <div className="text-center py-16 bg-c-ivory/30 border border-dashed border-c-gold-light/25 rounded-none">
              <Sparkles className="w-10 h-10 text-c-gold/40 mx-auto mb-3" />
              <p className="text-gray-500 text-sm font-sans uppercase tracking-[1px]">No matching designs found.</p>
              <button
                id="reset-gold-filters"
                onClick={() => { setSelectedGoldCategory("All"); setSearchQuery(""); }}
                className="mt-3 text-xs text-c-gold hover:underline font-bold uppercase tracking-widest"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredGoldProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={product.id}
                    className="bg-white border border-c-gold-light/15 hover:border-c-gold/60 p-5 rounded-none flex flex-col justify-between transition-all duration-300 group hover:shadow-lg"
                  >
                    <div>
                      {/* Product Image Frame */}
                      <div className="aspect-square bg-white overflow-hidden relative mb-4 rounded-none border border-gray-100 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.title}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Collection overlay tag */}
                        <div className="absolute top-2.5 left-2.5 bg-c-black/85 backdrop-blur-xs text-white py-1 px-2.5 text-[9px] font-bold uppercase tracking-[1.5px] rounded-none flex items-center space-x-1 shadow-sm">
                          <CheckCircle className="w-3.5 h-3.5 text-c-gold" />
                          <span>Gold</span>
                        </div>
                      </div>

                      {/* Info description block */}
                      <span className="text-[10px] tracking-[2px] text-c-gold font-semibold uppercase block mb-1">
                        {product.category}
                      </span>
                      <h3 className="font-serif text-base font-normal tracking-wide text-c-black group-hover:text-c-gold transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-gray-500 text-xs mt-2.5 leading-relaxed leading-relaxed font-sans">
                        {product.description}
                      </p>
                    </div>

                    {/* Enquiry Buttons */}
                    <div className="mt-5 pt-4 border-t border-gray-100/60 flex items-center space-x-2">
                      <button
                        id={`enquire-gold-${product.id}`}
                        onClick={() => {
                          setEnquiryProduct(product);
                          setEnquiryCustomText(`Hello, kindly share the showroom pricing and availability for ${product.title}.`);
                        }}
                        className="flex-1 bg-c-black hover:bg-c-gold text-white hover:text-white text-[10px] uppercase tracking-[1.5px] font-semibold py-3 text-center border border-c-black hover:border-c-gold transition duration-250 rounded-none focus:outline-none"
                      >
                        Enquire Item
                      </button>
                      <button
                        id={`whatsapp-gold-${product.id}`}
                        onClick={() => triggerWhatsAppEnquiry(product)}
                        className="bg-[#242424] hover:bg-[#25D366] text-white p-3 transition duration-250 rounded-none focus:outline-none flex items-center justify-center shrink-0"
                        title="Instant WhatsApp Enquiry"
                        aria-label={`Send WhatsApp enquiry for ${product.title}`}
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12.003 21.1c-1.62-.002-3.21-.424-4.606-1.22l-.33-.195-3.424.898.913-3.342-.214-.341c-.874-1.393-1.334-3.003-1.332-4.659C3.017 7.29 7.05 3.254 12.008 3.254c2.4.001 4.658.937 6.356 2.637a8.966 8.966 0 0 1 2.631 6.368c-.006 4.966-4.04 9.002-8.992 9.002M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 2.115.549 4.103 1.511 5.845L0 24l6.305-1.654C7.994 23.298 9.957 24 12 24c6.627 0 12-5.373 12-12" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

        </div>
      </section>

      {/* Silver Section */}
      <section id="silver-section" className="py-24 bg-c-ivory relative scroll-mt-10 border-b border-c-gold-light/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 pb-5 border-b border-c-gold-light/20">
            <div>
              <span className="text-[11px] tracking-[4px] text-c-gold font-semibold uppercase block mb-3">
                Sterling Glow
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-c-black uppercase">
                Premium Silver Articles
              </h2>
              <p className="text-gray-550 font-sans text-xs sm:text-sm mt-2 max-w-xl">
                Select premium silver collections. Exclusive bridal anklets, high-finish god lamps, pooja vessels, and majestic gift valuables.
              </p>
            </div>

            {/* Trust badge */}
            <div className="mt-4 md:mt-0 bg-white border border-c-gold-light/25 p-4 rounded-none flex items-center space-x-3.5">
              <ShieldCheck className="w-8 h-8 text-gray-400 shrink-0" />
              <div>
                <p className="text-[10px] text-c-gold font-bold uppercase tracking-wider">Silver Collection</p>
                <p className="font-serif text-base font-normal text-c-black">Pooja & Gift Articles</p>
              </div>
            </div>
          </div>

          {/* Filtering row */}
          <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
            <button
              id="silver-filter-all"
              onClick={() => setSelectedSilverCategory("All")}
              aria-pressed={selectedSilverCategory === "All"}
              className={`px-5 py-2.5 text-[10px] uppercase tracking-[1.5px] font-semibold rounded-none transition duration-200 ${
                selectedSilverCategory === "All"
                  ? "bg-c-black text-white"
                  : "bg-white hover:bg-c-ivory text-c-black border border-c-gold-light/20"
              }`}
            >
              All Categories
            </button>
            {SILVER_CATEGORIES.map((category, index) => (
              <button
                key={`silver-cat-${index}`}
                id={`silver-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedSilverCategory(category)}
                aria-pressed={selectedSilverCategory === category}
                className={`px-5 py-2.5 text-[10px] uppercase tracking-[1.5px] font-semibold rounded-none whitespace-nowrap transition duration-200 ${
                  selectedSilverCategory === category
                    ? "bg-c-black text-white"
                    : "bg-white hover:bg-c-ivory text-c-black border border-c-gold-light/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredSilverProducts.length === 0 ? (
            <div className="text-center py-16 bg-white border border-dashed border-c-gold-light/25 rounded-none">
              <Sparkles className="w-10 h-10 text-c-gold/45 mx-auto mb-3" />
              <p className="text-gray-500 text-sm font-sans uppercase tracking-[1px]">No matching silver items found.</p>
              <button
                id="reset-silver-filters"
                onClick={() => { setSelectedSilverCategory("All"); }}
                className="mt-3 text-xs text-c-gold hover:underline font-bold uppercase tracking-widest"
              >
                Clear Selection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredSilverProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={product.id}
                    className="bg-white border border-c-gold-light/15 hover:border-c-gold/60 p-5 rounded-none flex flex-col justify-between transition-all duration-300 group hover:shadow-lg"
                  >
                    <div>
                      {/* Product Image Frame */}
                      <div className="aspect-square bg-white overflow-hidden relative mb-4 rounded-none border border-gray-100 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.title}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Collection overlay tag */}
                        <div className="absolute top-2.5 left-2.5 bg-c-black/85 backdrop-blur-xs text-white py-1 px-2.5 text-[9px] font-bold uppercase tracking-[1.5px] rounded-none flex items-center space-x-1 shadow-sm">
                          <CheckCircle className="w-3.5 h-3.5 text-c-gold" />
                          <span>Silver</span>
                        </div>
                      </div>

                      {/* Info description block */}
                      <span className="text-[10px] tracking-[2px] text-c-gold font-semibold uppercase block mb-1">
                        {product.category}
                      </span>
                      <h3 className="font-serif text-base font-normal tracking-wide text-c-black group-hover:text-c-gold transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-gray-500 text-xs mt-2.5 leading-relaxed leading-relaxed font-sans">
                        {product.description}
                      </p>
                    </div>

                    {/* Enquiry Buttons */}
                    <div className="mt-5 pt-4 border-t border-gray-100/60 flex items-center space-x-2">
                      <button
                        id={`enquire-silver-${product.id}`}
                        onClick={() => {
                          setEnquiryProduct(product);
                          setEnquiryCustomText(`Hello, interested in ordering ${product.title} from your Silver Collection. Kindly share showroom pricing details.`);
                        }}
                        className="flex-1 bg-c-black hover:bg-c-gold text-white hover:text-white text-[10px] uppercase tracking-[1.5px] font-semibold py-3 text-center border border-c-black hover:border-c-gold transition duration-250 rounded-none focus:outline-none"
                      >
                        Enquire Price
                      </button>
                      <button
                        id={`whatsapp-silver-${product.id}`}
                        onClick={() => triggerWhatsAppEnquiry(product)}
                        className="bg-[#242424] hover:bg-[#25D366] text-white p-3 transition duration-250 rounded-none focus:outline-none flex items-center justify-center shrink-0"
                        title="Instant WhatsApp Enquiry"
                        aria-label={`Send WhatsApp enquiry for ${product.title}`}
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12.003 21.1c-1.62-.002-3.21-.424-4.606-1.22l-.33-.195-3.424.898.913-3.342-.214-.341c-.874-1.393-1.334-3.003-1.332-4.659C3.017 7.29 7.05 3.254 12.008 3.254c2.4.001 4.658.937 6.356 2.637a8.966 8.966 0 0 1 2.631 6.368c-.006 4.966-4.04 9.002-8.992 9.002M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 2.115.549 4.103 1.511 5.845L0 24l6.305-1.654C7.994 23.298 9.957 24 12 24c6.627 0 12-5.373 12-12" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

        </div>
      </section>

      {/* Collections Section */}
      <section id="collections-section" className="py-24 bg-white relative scroll-mt-10 border-t border-c-gold-light/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[11px] tracking-[4px] text-c-gold font-semibold uppercase block mb-3">
              Masterpieces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-c-black uppercase inline-block relative pb-4">
              Our Curated Showroom Themes
              <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-c-gold opacity-45" />
            </h2>
            <p className="text-gray-550 font-sans text-xs sm:text-sm mt-4">
              Explore bespoke groupings crafted to coordinate perfectly with life&apos;s special chapters, daily wear, or celebratory legacy.
            </p>
          </div>

          {/* Luxury Large Card Bento Row Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COLLECTIONS.map((col, index) => (
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                key={col.id}
                id={`collection-card-${col.id}`}
                className="group relative h-[420px] rounded-none overflow-hidden border border-c-gold-light/30 bg-white"
              >
                {/* Background Unsplash illustration */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-103"
                  style={{ backgroundImage: `url(${col.image})` }}
                />
                
                {/* Dark Elegant Glass Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                <div className="absolute inset-0 bg-c-black/10 mix-blend-overlay" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white text-left">
                  
                  {/* Tag label */}
                  <span className="bg-c-gold text-white text-[9px] uppercase tracking-[2px] font-semibold px-2.5 py-1 rounded-none w-fit mb-3">
                    {col.tag}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-light tracking-wide text-white mb-2 leading-tight uppercase">
                    {col.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs text-gray-200/90 leading-relaxed font-light mb-5 max-w-sm">
                    {col.description}
                  </p>

                  {/* Action Link trigger */}
                  <div className="flex items-center space-x-2 text-[10px] text-[#EAD0A8] font-semibold uppercase tracking-[1.5px] w-fit border-b border-transparent group-hover:border-[#EAD0A8] pb-0.5 transition-all">
                    <span>Enquire Catalog Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Invisible broad link wrapper for instant WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Sri%20Senthil%20Jewellery%2C%20I%20am%20enquiring%20about%20your%20exclusive%20%22${col.title}%22.%20Kindly%20share%20detailed%20catalogs%20and%20making%20chargers.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 z-10"
                  aria-label={`View catalog of ${col.title}`}
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="py-24 bg-white relative scroll-mt-10 border-t border-c-gold-light/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Collage for Generational Legacy */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative h-[320px] rounded-none overflow-hidden border border-c-gold-light/30 bg-[#FAF9F5]/30">
                <img
                  src="/gold-products/generational-legacy-necklace.png"
                  alt="Gold necklace at Sri Senthil Jewellery"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full"
                />
                
                {/* Visual badge overlay */}
                <div className="absolute inset-0 bg-c-black/10" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 border border-c-gold-light/20 p-4 rounded-none">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-none bg-c-ivory flex items-center justify-center font-serif text-c-gold border border-c-gold-light/35 font-bold text-xs shrink-0">
                      SSJ
                    </div>
                    <div>
                      <h4 className="font-sans text-xs font-semibold text-c-black tracking-wider uppercase">Trusted Craftsmanship</h4>
                      <p className="text-[10px] text-gray-500 font-sans">Every design is selected with care for lasting beauty.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smaller double visuals */}
              <div className="grid grid-cols-2 gap-4">
                <div className="h-[140px] rounded-none overflow-hidden border border-gray-150">
                  <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400"
                    alt="Close-up of detailed gold jewellery craftsmanship"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full animate-pulse-subtle"
                  />
                </div>
                <div className="h-[140px] rounded-none overflow-hidden border border-c-gold-light/25 bg-c-ivory/60 p-4 flex flex-col justify-center text-center">
                  <span className="font-serif text-2xl font-light tracking-widest text-c-gold block">35+</span>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-[#7E7E7E] font-semibold mt-1">Years of Trust</span>
                </div>
              </div>
            </div>

            {/* Premium Narration */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] tracking-[4px] text-c-gold font-semibold uppercase block">
                Generational Legacy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-c-black uppercase">
                Grandeur of Handcraft
              </h2>
              <p className="text-gray-550 text-xs sm:text-sm leading-relaxed font-sans">
                At Sri Senthil Jewellery, we do not merely trade metals; we carve cultural timelines and familial memory boxes of gold and silver. For more than three decades, our showroom has remained a destination for discerning families who value craft and trust.
              </p>
              
              <p className="text-gray-450 text-xs leading-relaxed">
                Whether you are decorating an elaborate bridal dowry, picking lightweight rings for corporate wear, or honoring heritage with silver pooja items, our team helps you choose pieces with precision and care.
              </p>

              {/* Grid of Seals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-dashed border-gray-150">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-c-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-c-black uppercase tracking-wider">Careful Selection</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5 font-sans">Tested through accurate computerized caratometers.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-c-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-c-black uppercase tracking-wider">No Hidden Wastages</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5 font-sans">Fair transparent pricing and minimal making charges.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-c-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-c-black uppercase tracking-wider">Custom Jewelry Designing</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5 font-sans">Bring your bespoke blueprints; we forge them.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-c-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-c-black uppercase tracking-wider">Lively Buyback Promise</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5 font-sans">100% value on gold exchange & melt conversions.</p>
                  </div>
                </div>
              </div>

              {/* Signature stamp */}
              <div className="pt-6 flex items-center space-x-4 border-t border-gray-100">
                <blockquote className="font-serif italic text-c-gold font-normal text-xs border-l-2 border-c-gold pl-3">
                  &ldquo;A relationship of trust forged in gold, maintained over generations.&rdquo;
                </blockquote>
                <div className="text-right">
                  <p className="font-serif text-[10px] tracking-wider uppercase font-semibold text-c-black">Sri Senthil S.</p>
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest font-normal">Founder Director</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-24 bg-c-ivory relative scroll-mt-10 border-t border-c-gold-light/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[11px] tracking-[4px] text-c-gold font-semibold uppercase block mb-3">
              Visit Showroom
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-c-black uppercase inline-block relative pb-4">
              Connect With Us
              <div className="absolute bottom-0 left-12 right-12 h-[1px] bg-c-gold opacity-45" />
            </h2>
            <p className="text-gray-500 text-sm mt-4">
              Have specific gold custom requests or want to schedule a virtual catalog tour? Connect with our expert advisors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
            
            {/* Showroom metadata and details */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-c-gold-light/25 p-6 sm:p-8 rounded-none shadow-none">
              <div className="space-y-8 text-left">
                <div>
                  <h3 className="font-serif text-base font-semibold tracking-wider text-c-black uppercase">SRI SENTHIL JEWELLERY</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans font-normal mt-1">Komarapalayam&apos;s Premium Gold and Silver Bullion Outlet.</p>
                </div>

                {/* Showroom address */}
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-c-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-c-black uppercase tracking-wider">Address</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1 font-sans">
                      197-A, Salem Main Rd,<br />
                      Nadaraja Nagar, Komarapalayam,<br />
                      Tamil Nadu - 638183, India
                    </p>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start space-x-3.5">
                  <Phone className="w-5 h-5 text-c-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-c-black uppercase tracking-wider">Contact Lines</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1 font-sans">
                      Showroom: <a href={`tel:${CONTACT_NUMBER}`} className="hover:text-c-gold transition">+91 74182 67460</a><br />
                      WhatsApp: <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-c-gold transition">+91 93622 67460</a>
                    </p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-c-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-xs font-semibold text-c-black uppercase tracking-wider">Opening Hours</h4>
                    <p className="text-xs text-gray-550 leading-relaxed mt-1 font-sans">
                      Monday to Saturday: 10:00 AM - 8:30 PM<br />
                      Sunday Hours: 11:30 AM - 6:30 PM (All Sundays Open)
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat action call */}
              <div className="mt-10 pt-6 border-t border-gray-100">
                <a
                  id="contact-whatsapp-direct"
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Sri%20Senthil%20Jewellery%2C%20I%20am%20exploring%20your%20website%20and%20would%20like%20to%2520connect%20with%20your%20designer%20advisors.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="w-full flex items-center justify-center space-x-2 bg-c-black hover:bg-[#25D366] text-white py-4 rounded-none text-xs uppercase tracking-[2px] font-semibold transition duration-250"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12.003 21.1c-1.62-.002-3.21-.424-4.606-1.22l-.33-.195-3.424.898.913-3.342-.214-.341c-.874-1.393-1.334-3.003-1.332-4.659C3.017 7.29 7.05 3.254 12.008 3.254c2.4.001 4.658.937 6.356 2.637a8.966 8.966 0 0 1 2.631 6.368c-.006 4.966-4.04 9.002-8.992 9.002M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 2.115.549 4.103 1.511 5.845L0 24l6.305-1.654C7.994 23.298 9.957 24 12 24c6.627 0 12-5.373 12-12" />
                  </svg>
                  <span>Chat With Gold Expert</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map block + Quick Consultation request */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              {/* Responsive Google Maps Iframe visual mockup */}
              <div className="w-full h-80 rounded-none overflow-hidden border border-c-gold-light/25 bg-gray-50 flex flex-col relative group shadow-none">
                {/* Standard placeholder with high visual elegance resembling live map with coordinates */}
                <div className="absolute inset-0 bg-[#F0ECE1] flex flex-col justify-center items-center text-center p-6 bg-[radial-gradient(#E5DFCF_2px,transparent_2px)] [background-size:24px_24px]">
                  <div className="w-12 h-12 rounded-none bg-[#FAF9F5] flex items-center justify-center border border-c-gold-light/35 shadow-sm mb-3">
                    <MapPin className="w-6 h-6 text-c-gold animate-bounce" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold tracking-wider text-c-black uppercase">SRI SENTHIL JEWELLERY</h4>
                  <p className="text-[11px] text-gray-550 font-sans mt-1 max-w-sm">
                    197-A, Salem Main Rd, Nadaraja Nagar, Komarapalayam, Tamil Nadu 638183
                  </p>
                  
                  <div className="mt-5 flex space-x-3">
                    <a
                      id="view-directions-map"
                      href="https://maps.google.com/?q=197-A+Salem+Main+Rd+Nadaraja+Nagar+Komarapalayam+Tamil+Nadu+638183"
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="bg-c-black hover:bg-c-gold text-[10px] text-white uppercase tracking-[1px] font-semibold py-2.5 px-5 border border-c-black hover:border-c-gold transition duration-200 rounded-none"
                    >
                      Open in Maps
                    </a>
                    {/* Mock route visual */}
                    <span className="text-[10px] text-c-gold font-mono self-center font-semibold tracking-wider">Komarapalayam, TN 638183</span>
                  </div>
                </div>

                {/* Simulated live layer visual */}
                <div className="absolute top-2.5 right-2.5 bg-white text-c-black text-[9px] font-mono px-2.5 py-1 tracking-wider border border-c-gold-light/25 shadow-none uppercase">
                  Showroom Location Map
                </div>
              </div>

              {/* Advisory disclaimer */}
              <div className="bg-white border border-c-gold-light/15 p-4 rounded-none text-left">
                <blockquote className="text-[10px] sm:text-xs text-gray-400 leading-relaxed uppercase tracking-[0.5px]">
                  *Located on Salem Main Road, Komarapalayam. Easy access from Nadaraja Nagar and nearby market streets. Valet parking on request.
                </blockquote>
              </div>

            </div>

          </div>
        </div>
      </section>

      </main>

      {/* Footer copyright block */}
      <footer className="bg-c-black text-gray-400 py-16 border-t border-c-gold-light/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Footer navigation and showroom details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            
            {/* Showroom Brand */}
            <div className="space-y-4">
              <div className="flex flex-col text-left">
                <span className="font-serif text-xl font-light tracking-[0.2em] text-[#FAF9F5]">
                  SRI SENTHIL
                </span>
                <span className="font-sans text-[9px] tracking-[0.38em] text-c-gold font-semibold uppercase">
                  JEWELLERY
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed text-left font-sans">
                Komarapalayam&apos;s trusted destination since 1989. Forging precious golden moments and elegant silver memories.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-left">
              <h3 className="font-sans text-xs uppercase tracking-widest font-semibold text-[#FAF9F5] mb-5">Navigation</h3>
              <ul className="space-y-2.5 text-xs font-sans">
                <li><a href="#hero-showroom-section" className="hover:text-c-gold transition">Home Showroom</a></li>
                <li><a href="#collections-section" className="hover:text-c-gold transition">Collections</a></li>
                <li><a href="#gold-section" className="hover:text-c-gold transition">Gold jewellery</a></li>
                <li><a href="#silver-section" className="hover:text-c-gold transition">Silver Valuable articles</a></li>
              </ul>
            </div>

            {/* Service Highlights */}
            <div className="text-left">
              <h3 className="font-sans text-xs uppercase tracking-widest font-semibold text-[#FAF9F5] mb-5">Service Highlights</h3>
              <ul className="space-y-2.5 text-xs text-gray-500 font-sans">
                <li className="flex items-center space-x-2">
                  <span className="w-1 h-1 rounded-none bg-c-gold" />
                  <span>Handpicked Gold Collections</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1 h-1 rounded-none bg-c-gold" />
                  <span>Premium Silver Articles</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1 h-1 rounded-none bg-c-gold" />
                  <span>Computerized Caratometer Verification</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1 h-1 rounded-none bg-c-gold" />
                  <span>Transparent Making Fees</span>
                </li>
              </ul>
            </div>

            {/* Contact details */}
            <div className="text-left">
              <h3 className="font-sans text-xs uppercase tracking-widest font-semibold text-[#FAF9F5] mb-5">Helpline Support</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                197-A, Salem Main Rd, Nadaraja Nagar,<br />
                Komarapalayam, Tamil Nadu, PIN - 638183.<br />
                Ph: +91 74182 67460<br />
                WhatsApp: +91 93622 67460<br />
                Email: <a href="mailto:info@srisenthiljewellers.com" className="hover:text-c-gold transition text-gray-400">info@srisenthiljewellers.com</a>
              </p>
            </div>

          </div>

          {/* Legal bottom bar */}
          <div className="pt-8 border-t border-white/5 text-center md:text-left md:flex md:items-center md:justify-between text-[11px] text-gray-650 font-sans">
            <p>© {new Date().getFullYear()} Sri Senthil Jewellery. All Rights Reserved.</p>
            <div className="mt-4 md:mt-0 flex justify-center space-x-5">
              <a href="mailto:info@srisenthiljewellers.com?subject=Privacy%20Policy%20Request" className="hover:text-c-gold transition hover:underline">Privacy Policy</a>
              <a href="mailto:info@srisenthiljewellers.com?subject=Terms%20of%20Purchase%20Request" className="hover:text-c-gold transition hover:underline">Terms of Purchase</a>
              <a href="#contact-section" className="hover:text-c-gold transition hover:underline">Showroom Contact</a>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/5 text-center font-sans text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-gray-600">
            Website designed &amp; developed by{" "}
            <a
              href="https://zytheron.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-c-gold transition-colors duration-300 hover:text-[#FAF9F5] hover:tracking-[0.16em]"
            >
              Zytheron
            </a>
          </div>

        </div>
      </footer>

      {/* Product Enquiry lightbox Modal / Dialog */}
      <AnimatePresence>
        {enquiryProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className="bg-white border border-c-gold-light/45 w-full max-w-lg rounded-none shadow-none relative overflow-hidden"
            >
              {/* Golden thin static line */}
              <div className="h-[1px] bg-c-gold w-full" />
              
              {/* Close button */}
              <button
                id="close-enquiry-modal"
                onClick={() => setEnquiryProduct(null)}
                className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-black rounded-none hover:bg-gray-50 focus:outline-none"
                aria-label="Close jewellery enquiry form"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 text-left">
                <span className="text-[10px] tracking-[2px] text-c-gold font-semibold uppercase block mb-1">
                  Premium Showroom Booking
                </span>
                <h3 className="font-serif text-lg font-light text-c-black mb-6 uppercase">
                  Jewellery Price & Customization Request
                </h3>

                {/* Showcase Item inside modal */}
                <div className="flex items-center space-x-4 bg-c-ivory/50 p-3 rounded-none border border-c-gold-light/25 mb-6">
                  <img
                    src={enquiryProduct.image}
                    alt={enquiryProduct.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover border border-gray-150 rounded-none shrink-0 bg-white"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-c-black">{enquiryProduct.title}</h4>
                    <p className="text-[10px] text-gray-500 font-sans mt-0.5 font-normal">Category: {enquiryProduct.category}</p>
                  </div>
                </div>

                {/* Form inputs */}
                <form id="showroom-enquiry-form" onSubmit={handleEnquirySubmit} className="space-y-4 font-sans">
                  <div>
                    <label htmlFor="modal-input-name" className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Your Full Name *
                    </label>
                    <input
                      id="modal-input-name"
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-none px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-c-gold"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-input-phone" className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      WhatsApp / Mobile Contact *
                    </label>
                    <input
                      id="modal-input-phone"
                      type="tel"
                      required
                      placeholder="e.g. +91 74182 67460"
                      value={enquiryPhone}
                      onChange={(e) => setEnquiryPhone(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-none px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-c-gold"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-input-text" className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Special requests or customization queries (Optional)
                    </label>
                    <textarea
                      id="modal-input-text"
                      rows={3}
                      placeholder="e.g. Is this design available in 18 Carat? Can you make it in 24 grams?"
                      value={enquiryCustomText}
                      onChange={(e) => setEnquiryCustomText(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-none px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-c-gold"
                    />
                  </div>

                  <p className="text-[10px] text-gray-400 font-sans leading-relaxed">
                    *Upon clicking Submit, we will securely generate a copyable premium enquiry voucher and connect you with our Komarapalayam showroom supervisor via WhatsApp.
                  </p>

                  <div className="pt-4 flex items-center justify-end space-x-2.5">
                    <button
                      id="close-enquiry-modal-cancel"
                      type="button"
                      onClick={() => setEnquiryProduct(null)}
                      className="border border-gray-200 hover:bg-gray-50 px-5 py-3 text-[10px] uppercase tracking-widest font-semibold text-[#555555] transition rounded-none focus:outline-none"
                    >
                      Cancel
                    </button>
                    <button
                      id="submit-enquiry-btn"
                      type="submit"
                      className="bg-c-black hover:bg-c-gold text-white font-semibold uppercase tracking-[1.5px] text-[10px] px-6 py-3 rounded-none transition flex items-center space-x-2"
                      disabled={enquirySuccess}
                    >
                      {enquirySuccess ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                          <span>Preparing...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.261 2.266 3.504 5.279 3.504 8.486 0 6.657-5.337 11.997-11.951 11.997-2.005-.001-3.973-.5-5.733-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.865-9.83.003-2.623-1.017-5.09-2.871-6.945C16.634 1.99 14.162.97 11.543.97c-5.45 0-9.88 4.414-9.885 9.831-.001 1.778.475 3.51 1.378 5.061l-.975 3.565 3.65-.956zm12.119-7.226c-.322-.161-1.905-.94-2.201-1.047-.295-.108-.51-.161-.724.161-.215.323-.833 1.047-1.02 1.261-.188.215-.376.242-.698.08-.322-.161-1.36-.5-2.589-1.6-.957-.852-1.603-1.906-1.791-2.229-.188-.322-.02-.497.14-.658.145-.145.323-.376.484-.564.161-.188.215-.322.323-.538.107-.215.053-.404-.026-.565-.079-.161-.724-1.745-.992-2.39-.262-.63-.526-.543-.724-.553-.188-.009-.403-.01-.617-.01-.215 0-.564.08-.859.404-.296.323-1.129 1.102-1.129 2.689 0 1.587 1.155 3.12 1.316 3.335.161.215 2.27 3.466 5.5 4.86.768.331 1.368.528 1.835.677.772.245 1.474.21 2.029.128.619-.092 1.905-.779 2.174-1.493.269-.713.269-1.325.188-1.453-.08-.127-.295-.188-.617-.35z" />
                          </svg>
                          <span>Connect on WhatsApp</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
