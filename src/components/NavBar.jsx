import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Eye, Home, Image, MessageCircle, BedSingle } from 'lucide-react';
import LogoKost from '../assets/bg/logoKost.png'

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
    { href: '/', label: 'Beranda', icon: <Home className="w-4 h-4" /> },
    { href: '/Gallery', label: 'Gallery', icon: <Image className="w-4 h-4" /> },
    { href: '/Kamar', label: 'Kamar', icon: <BedSingle className="w-4 h-4" /> },
    { href: '#contact', label: 'Kontak', icon: <MessageCircle className="w-4 h-4" /> }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
      ? 'bg-white/95 backdrop-blur-xl border-b border-stone-200/50 shadow-lg shadow-stone-900/5'
      : 'bg-white/80 backdrop-blur-xl border-b border-white/20'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src={LogoKost}
                alt="logo kost"
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
              <div>
                <div className="font-bold text-lg sm:text-2xl bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 bg-clip-text text-transparent group-hover:from-rose-600 group-hover:via-pink-600 group-hover:to-rose-600 transition-all duration-300">
                  Kos Ji?
                </div>
                <div className="text-[10px] sm:text-xs text-stone-500 font-medium">
                  Premium Living
                </div>
              </div>
            </div>

            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-600 group-hover:w-full transition-all duration-500"></div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="relative text-stone-700 hover:text-stone-900 font-medium transition-all duration-300 group py-3 px-4 rounded-xl hover:bg-stone-50"
              >
                <div className="flex items-center gap-2">
                  <div className="text-stone-500 group-hover:text-rose-500 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <span className="relative z-10">{item.label}</span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                <div className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-rose-500 to-pink-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </a>
            ))}

            {/* CTA Button */}
            <div className="ml-4 pl-4 border-l border-stone-200">
              <button className="group px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-700 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Hubungi Kami
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-12 h-12 rounded-xl bg-stone-50 hover:bg-stone-100 backdrop-blur-sm border border-stone-200 flex items-center justify-center transition-all duration-300 hover:scale-105 group"
            aria-label="Toggle menu"
          >
            <div className="relative">
              {isOpen ? (
                <X className="w-5 h-5 text-stone-700 group-hover:text-rose-600 transition-colors duration-200" />
              ) : (
                <Menu className="w-5 h-5 text-stone-700 group-hover:text-rose-600 transition-colors duration-200" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          onClick={toggleMenu}
        ></div>

        {/* Mobile Menu Panel */}
        <div className={`absolute top-0 right-0 w-80 h-full bg-white/95 backdrop-blur-xl border-l border-stone-200 shadow-2xl transform transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex justify-between items-center p-6 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-sm"></div>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-lg bg-gradient-to-r from-stone-800 to-stone-700 bg-clip-text text-transparent">
                    Kos Adipati
                  </div>
                  <div className="text-xs text-stone-500">Premium Living</div>
                </div>
              </div>
              <button
                onClick={toggleMenu}
                className="w-10 h-10 rounded-xl bg-stone-50 hover:bg-stone-100 flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-5 h-5 text-stone-700" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 px-6 py-8">
              <div className="space-y-3">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={toggleMenu}
                    className="block relative text-stone-700 hover:text-stone-900 font-medium text-lg py-4 px-4 rounded-xl hover:bg-stone-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-stone-500 group-hover:text-rose-500 transition-colors duration-300">
                        {item.icon}
                      </div>
                      <span className="relative z-10">{item.label}</span>
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="mt-8 space-y-4">
                <button className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Hubungi via WhatsApp
                  </div>
                </button>

                <button className="w-full py-4 bg-stone-100 text-stone-800 font-semibold rounded-xl hover:bg-stone-200 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2">
                    <Eye className="w-5 h-5" />
                    Virtual Tour
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="p-6 border-t border-stone-100 bg-gradient-to-r from-stone-50 to-slate-50">
              <div className="text-center">
                <div className="text-stone-600 text-sm mb-2">
                  Premium Living Experience
                </div>
                <div className="text-stone-500 text-xs">
                  © 2025 Kos Adipati. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}