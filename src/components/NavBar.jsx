import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Image, BedSingle, Map } from 'lucide-react';
import LogoKost from '../assets/bg/logoKost.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Mengelola efek scroll untuk mengubah tampilan navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mengelola overflow pada body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    // Fungsi cleanup
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { href: '/', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { href: '/Gallery', label: 'Gallery', icon: <Image className="w-5 h-5" /> },
    { href: '/Kamar', label: 'Kamar', icon: <BedSingle className="w-5 h-5" /> },
    { href: '/Lokasi', label: 'Lokasi', icon: <Map className="w-5 h-5" /> }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/80 backdrop-blur-2xl shadow-sm'
        : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo - Tetap sama */}
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

          {/* Desktop Menu - Tetap sama */}
          <div className="hidden md:flex items-center space-x-2">
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

          {/* Mobile Menu Button - Tetap sama */}
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

      {/* Mobile Menu Overlay - **BAGIAN YANG DIPERBAIKI** */}
      <div className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop dengan gradien */}
        <div
          className="absolute inset-0 bg-stone-900/70 backdrop-blur-sm"
          onClick={toggleMenu}
        ></div>

        {/* Mobile Menu Panel - Ramping dan elegan */}
        <div className={`absolute top-0 left-0 w-3/4 max-w-xs h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <a href="/" className="flex items-center gap-3" onClick={toggleMenu}>
                <img
                  src={LogoKost}
                  alt="logo kost"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <div className="font-bold text-lg text-stone-800">Kos Adipati</div>
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

            {/* Mobile Menu Items */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={toggleMenu}
                    className="flex items-center gap-3 p-3 text-stone-700 hover:text-stone-900 font-medium rounded-md hover:bg-stone-50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-100 group-hover:bg-rose-100 text-stone-500 group-hover:text-rose-600 transition-colors duration-200">
                      {item.icon}
                    </div>
                    <span className="text-base">{item.label}</span>
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