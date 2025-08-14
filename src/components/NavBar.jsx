import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Image, MessageCircle, BedSingle } from 'lucide-react';
import LogoKost from '../assets/bg/logoKost.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { href: '/', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { href: '/Gallery', label: 'Gallery', icon: <Image className="w-5 h-5" /> },
    { href: '/Kamar', label: 'Kamar', icon: <BedSingle className="w-5 h-5" /> },
    { href: '#contact', label: 'Kontak', icon: <MessageCircle className="w-5 h-5" /> }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
      ? 'bg-white backdrop-blur-2xl'
      : 'bg-white backdrop-blur-2xl'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo - Enhanced with subtle animation */}
          <a href="/" className="relative group cursor-pointer">
            <div className="flex items-center gap-3">
              <img
                src={LogoKost}
                alt="logo kost"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-500 group-hover:rotate-6"
              />
              <div className="overflow-hidden">
                <div className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-stone-800 to-stone-700 bg-clip-text text-transparent group-hover:from-rose-600 group-hover:to-pink-600 transition-all duration-500">
                  Kos Adipati
                </div>
                <div className="text-xs text-stone-500 font-medium tracking-wider transition-all duration-500 group-hover:translate-x-1">
                  PREMIUM LIVING
                </div>
              </div>
            </div>
          </a>

          {/* Desktop Menu - More elegant */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="relative text-black hover:text-rose-700 font-medium transition-all duration-300 group py-3 px-5 rounded-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <div className="text-black group-hover:text-rose-700 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-rose-700 after:transition-all after:duration-300 group-hover:after:w-full">
                    {item.label}
                  </span>
                </span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - More refined */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-10 h-10 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 flex items-center justify-center transition-all duration-300 group"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-stone-600 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-stone-600 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-0.5 bg-stone-600 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - More sophisticated */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        {/* Backdrop with gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/30 backdrop-blur-sm"
          onClick={toggleMenu}
        ></div>

        {/* Mobile Menu Panel - Sleek design */}
        <div className={`absolute top-0 right-0 w-80 h-full bg-white/95 backdrop-blur-xl shadow-xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex justify-between items-center p-6">
              <a href="/" className="flex items-center gap-3" onClick={toggleMenu}>
                <img
                  src={LogoKost}
                  alt="logo kost"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <div className="font-bold text-lg bg-gradient-to-r from-stone-800 to-stone-700 bg-clip-text text-transparent">
                    Kos Adipati
                  </div>
                  <div className="text-xs text-stone-500">PREMIUM LIVING</div>
                </div>
              </a>
              <button
                onClick={toggleMenu}
                className="w-10 h-10 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-5 h-5 text-stone-700" />
              </button>
            </div>

            {/* Mobile Menu Items - Elegant spacing */}
            <div className="flex-1 px-6 py-8 overflow-y-auto">
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={toggleMenu}
                    className="flex items-center gap-4 p-4 text-stone-700 hover:text-stone-900 font-medium rounded-xl hover:bg-stone-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-stone-100 group-hover:bg-rose-100 text-stone-500 group-hover:text-rose-600 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <span className="text-lg">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}