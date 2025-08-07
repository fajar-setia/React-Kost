import React, { useState, useEffect } from 'react';
import { MapPin, Wifi, Bath, Phone, Eye, DollarSign, CheckCircle, Star, Shield, Clock, Users, Heart, Award, Home } from 'lucide-react';

export default function KosanHomepage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [activeFeature, setActiveFeature] = useState(0);
  
  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    
    // const featureInterval = setInterval(() => {
    //   setActiveFeature((prev) => (prev + 1) % 3);
    // }, 3000);
    
    return () => {
      clearInterval(interval);
      // clearInterval(featureInterval);
    };
  }, []);

  const features = [
    {
      icon: <MapPin className="w-7 h-7" />,
      title: "Lokasi Strategis",
      description: "Hanya 5 menit ke kampus utama dan berbagai fasilitas kota",
      color: "rose",
      bgPattern: "dots"
    },
    {
      icon: <Bath className="w-7 h-7" />,
      title: "Kamar Mandi Dalam",
      description: "Private bathroom dengan shower air hangat 24/7",
      color: "blue",
      bgPattern: "grid"
    },
    {
      icon: <Wifi className="w-7 h-7" />,
      title: "WiFi & AC Premium",
      description: "Internet fiber 100Mbps dan AC inverter terbaru",
      color: "emerald",
      bgPattern: "waves"
    }
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, number: "200+", label: "Penghuni Puas", color: "text-rose-600" },
    { icon: <Shield className="w-6 h-6" />, number: "24/7", label: "Keamanan", color: "text-blue-600" },
    { icon: <Award className="w-6 h-6" />, number: "5 Tahun", label: "Pengalaman", color: "text-emerald-600" },
    { icon: <Star className="w-6 h-6 fill-current" />, number: "4.9/5", label: "Rating", color: "text-amber-600" }
  ];

  const testimonials = [
    { 
      name: "Sarah Melati", 
      role: "Mahasiswa UI",
      text: "Kos terbaik yang pernah saya tinggali! Fasilitasnya lengkap dan pemiliknya sangat perhatian.",
      avatar: "SM"
    },
    { 
      name: "Ahmad Rizki", 
      role: "Software Engineer",
      text: "Lokasi strategis, internet cepat, perfect untuk WFH. Highly recommended!",
      avatar: "AR"
    },
    { 
      name: "Dewi Lestari", 
      role: "Mahasiswa ITB",
      text: "Sudah 2 tahun disini, seperti rumah kedua. Keamanan terjamin dan lingkungan nyaman.",
      avatar: "DL"
    }
  ];

  const roomTypes = [
    {
      type: "Standard",
      price: "1.2jt",
      features: ["AC", "WiFi", "Kamar Mandi Dalam", "Lemari", "Meja Belajar"],
      popular: false
    },
    {
      type: "Deluxe",
      price: "1.5jt",
      features: ["AC Inverter", "WiFi Premium", "Kamar Mandi Premium", "Walk-in Closet", "Meja Kerja + Kursi Ergonomis", "Mini Kulkas"],
      popular: true
    },
    {
      type: "Executive",
      price: "1.8jt",
      features: ["AC Dual Zone", "WiFi Dedicated", "Kamar Mandi Luxury", "Dressing Room", "Work Station", "Mini Kulkas", "TV 32\"", "Balkon Pribadi"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
      {/* Hero Section */}
      <section id="home" className="relative pt-24 pb-20 overflow-hidden">
        {/* Artistic Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-rose-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-rose-200">
                <Star className="w-4 h-4 fill-current" />
                Premium Living Experience
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-slate-800 via-stone-800 to-slate-700 bg-clip-text text-transparent">
                  Kos Adipati
                </span>
              </h1>
              
              <p className="text-2xl text-stone-700 mb-4 font-medium">
                Hunian Premium untuk Generasi Modern
              </p>
              
              <p className="text-lg text-stone-600 mb-10 leading-relaxed max-w-lg">
                Rasakan pengalaman tinggal yang berbeda. Kombinasi sempurna antara kemewahan, kenyamanan, dan lokasi strategis di jantung kota.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-stone-200">
                      <div className={stat.color}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="font-bold text-2xl text-stone-800">{stat.number}</div>
                    <div className="text-sm text-stone-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-700 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <Eye className="w-5 h-5" />
                    Lihat Kamar
                  </div>
                </button>
                
                <button className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-stone-800 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-stone-200 hover:border-rose-300">
                  <div className="flex items-center justify-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    Konsultasi Gratis
                  </div>
                </button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-stone-100 to-stone-200">
                  <div className="h-full bg-[url('https://images.unsplash.com/photo-1555854877-bab0e563b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Floating Price Card */}
                    <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                      <div className="text-sm text-stone-600 font-medium">Mulai dari</div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                        Rp 1.2jt
                      </div>
                      <div className="text-sm text-stone-600">per bulan</div>
                    </div>
                    
                    {/* Floating Availability */}
                    <div className="absolute top-8 right-8 bg-emerald-500 text-white rounded-full px-4 py-2 shadow-lg">
                      <div className="flex items-center gap-2 font-semibold text-sm">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Tersedia
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -z-10 -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-rose-300 to-pink-300 rounded-3xl opacity-60 blur-xl"></div>
                <div className="absolute -z-10 -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-3xl opacity-50 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-stone-800 mb-6">
              Mengapa Memilih
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent"> Kos Adipati</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Pengalaman tinggal yang tak terlupakan dengan fasilitas premium dan pelayanan terbaik
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-stone-100 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${
                    feature.color === 'rose' ? 'from-rose-500 to-pink-600' :
                    feature.color === 'blue' ? 'from-blue-500 to-indigo-600' :
                    'from-emerald-500 to-teal-600'
                  } flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-stone-800 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-stone-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    Tersedia
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Types Section */}
      <section id="rooms" className="py-20 bg-gradient-to-br from-stone-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-stone-800 mb-6">
              Pilihan Kamar <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Premium</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Setiap tipe kamar dirancang untuk memberikan kenyamanan maksimal sesuai kebutuhan Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roomTypes.map((room, index) => (
              <div key={index} className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border ${
                room.popular ? 'border-rose-300 ring-2 ring-rose-100' : 'border-stone-200'
              }`}>
                {room.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-stone-800 mb-2">{room.type}</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    Rp {room.price}
                  </div>
                  <div className="text-stone-600">per bulan</div>
                </div>
                
                <div className="space-y-4 mb-8">
                  {room.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-stone-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  room.popular 
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-lg hover:scale-105' 
                    : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                }`}>
                  Pilih Kamar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-stone-800 mb-6">
              Cerita <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Penghuni</span>
            </h2>
            <p className="text-xl text-stone-600">Testimoni dari mereka yang sudah merasakan pengalaman tinggal di Kos Mawar</p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-stone-100">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {testimonials[currentSlide].avatar}
              </div>
              
              <blockquote className="text-2xl text-stone-700 italic mb-6 leading-relaxed">
                "{testimonials[currentSlide].text}"
              </blockquote>
              
              <div className="text-lg font-semibold text-stone-800">
                {testimonials[currentSlide].name}
              </div>
              <div className="text-rose-600 font-medium">
                {testimonials[currentSlide].role}
              </div>
              
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, idx) => (
                  <button 
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'bg-rose-500' : 'bg-stone-300'
                    }`}
                    onClick={() => setCurrentSlide(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-slate-900"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Mulai Hidup Nyaman di <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">Kos Mawar</span>
          </h2>
          <p className="text-xl text-stone-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Jangan sampai kehabisan! Dapatkan kamar impian Anda dengan penawaran terbaik bulan ini.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-6 h-6" />
                Hubungi via WhatsApp
              </div>
            </button>
            
            <button className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center gap-3">
                <Eye className="w-6 h-6" />
                Virtual Tour
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}