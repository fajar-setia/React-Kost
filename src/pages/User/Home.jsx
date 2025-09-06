import React, { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { MapPin, Wifi, Bath, Phone, Eye, DollarSign, CheckCircle, Star, Shield, Clock, Users, Heart, Award, Home, Camera, Calendar, ArrowRight, Play, ChevronLeft, ChevronRight, Sparkles, Zap, Coffee, Car } from 'lucide-react';
import gambarr from '../../assets/bg/heroSection.png'
import 'animate.css';
import { useNavigate } from 'react-router-dom';


const API_BASE_BOOKING = "http://localhost:5116/api/booking";
const API_BASE_ROOM = 'http://localhost:5116/api/Room';


export default function EnhancedKosanHomepage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalPengguna, setTotalPengguna] = useState(0);
  const navigate = useNavigate();


  // Ini fungsi yang akan dipanggil saat tombol filter ditekan
  // Tambahkan onClick ke setiap tombol filter Anda
  

  const handleNavigateToRooms = (roomType) => {
    // Navigasi langsung dengan tipe kamar yang diinginkan
    navigate(`/kamar?type=${roomType}`);
  };

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 6000);

    return () => {
      clearInterval(interval);

    };
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 800, // durasi animasi
      once: true, // animasi hanya sekali
    });
  }, []);

  useEffect(() => {
    fetch(API_BASE_BOOKING)
      .then(res => res.json())
      .then(data => {
        let bookingList = [];

        if (Array.isArray(data)) {
          bookingList = data;
        } else if (Array.isArray(data.$values)) {
          bookingList = data.$values;
        }

        // hitung booking yang sudah ditempati
        const penggunaCount = bookingList.filter(
          booking => booking.status?.toLowerCase() === "pending"
        ).length;

        setTotalPengguna(penggunaCount);
      })
      .catch(err => console.error(err));
  }, []);

  const features = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Lokasi Strategis",
      description: "5 menit ke kampus, 10 menit ke mall, akses transportasi 24/7",
      color: "rose",
      bgGradient: "from-rose-500/20 to-pink-500/20",
      iconGradient: "from-rose-500 to-pink-600",
      details: ["Dekat UI, ITB, UGM", "Akses angkot & ojol", "Mall & resto terdekat"]
    },
    {
      icon: <Bath className="w-8 h-8" />,
      title: "Kamar Mandi Premium",
      description: "Private bathroom dengan water heater dan ventilasi optimal",
      color: "blue",
      bgGradient: "from-blue-500/20 to-indigo-500/20",
      iconGradient: "from-blue-500 to-indigo-600",
      details: ["Water heater 24/7", "Exhaust fan", "Premium fixtures"]
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Internet & AC Terbaik",
      description: "Fiber optic 100Mbps + AC inverter hemat listrik",
      color: "emerald",
      bgGradient: "from-emerald-500/20 to-teal-500/20",
      iconGradient: "from-emerald-500 to-teal-600",
      details: ["Fiber optic 100Mbps", "AC inverter", "Backup power"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Keamanan Terjamin",
      description: "CCTV 24/7, akses card, security profesional",
      color: "purple",
      bgGradient: "from-purple-500/20 to-violet-500/20",
      iconGradient: "from-purple-500 to-violet-600",
      details: ["CCTV HD 24/7", "Access card", "Security guard"]
    }
  ];

  const stats = [
    { icon: <Users className="w-7 h-7" />, number: `${totalPengguna}`, label: "Penghuni", color: "text-rose-600", bgColor: "bg-rose-100" },
    { icon: <Clock className="w-7 h-7" />, number: "24/7", label: "Layanan", color: "text-blue-600", bgColor: "bg-blue-100" },
    { icon: <Award className="w-7 h-7" />, number: "7 Tahun", label: "Pengalaman", color: "text-emerald-600", bgColor: "bg-emerald-100" },
    { icon: <Star className="w-7 h-7 fill-current" />, number: "4.9/5", label: "Rating Google", color: "text-amber-600", bgColor: "bg-amber-100" }
  ];

  const testimonials = [
    {
      name: "Sarah Melati",
      role: "Mahasiswa UI - Semester 6",
      text: "Kos terbaik yang pernah saya tinggali! WiFi kencang banget, AC dingin, dan yang paling penting lokasi deket banget ke kampus. Pemiliknya juga baik dan responsif.",
      avatar: "SM",
      rating: 5,
      duration: "2 tahun"
    },
    {
      name: "Ahmad Rizki",
      role: "Software Engineer - Remote",
      text: "Perfect untuk WFH! Internet stabil, kamar nyaman buat meeting online, dan lingkungan tenang. Fasilitas laundry dan dapur bersama juga lengkap.",
      avatar: "AR",
      rating: 5,
      duration: "1.5 tahun"
    },
    {
      name: "Dewi Lestari",
      role: "Mahasiswa ITB - Pascasarjana",
      text: "Sudah 2 tahun disini dan nggak pernah nyesel. Keamanan oke, kebersihan terjaga, dan seperti keluarga besar. Highly recommended!",
      avatar: "DL",
      rating: 5,
      duration: "2 tahun"
    }
  ];

  const roomTypes = [
    {
      type: "Standard",
      subtitle: "Nyaman & Terjangkau",
      price: "1.2",
      originalPrice: "1.4",
      features: ["AC Split", "WiFi 50Mbps", "Kamar Mandi Dalam", "Lemari 2 Pintu", "Meja Belajar", "Kasur Single"],
      popular: false,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      size: "3x4 m"
    },
    {
      type: "Deluxe",
      subtitle: "Pilihan Terpopuler",
      price: "1.5",
      originalPrice: "1.7",
      features: ["AC Inverter", "WiFi 75Mbps", "Kamar Mandi Premium", "Walk-in Closet", "Meja Kerja Ergonomis", "Mini Kulkas", "Kasur Queen"],
      popular: true,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      size: "4x5 m"
    },
    {
      type: "Executive",
      subtitle: "Kemewahan Maksimal",
      price: "1.8",
      originalPrice: "2.1",
      features: ["AC Dual Zone", "WiFi Dedicated 100Mbps", "Kamar Mandi Luxury", "Dressing Room", "Work Station Premium", "Mini Kulkas", "Smart TV 43\"", "Balkon Pribadi"],
      popular: false,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      size: "5x6 m"
    }
  ];

  const facilities = [
    { icon: <Coffee className="w-6 h-6" />, name: "Dapur Bersama", desc: "Kompor, kulkas, microwave" },
    { icon: <Car className="w-6 h-6" />, name: "Parkir Luas", desc: "Motor & mobil tersedia" },
    { icon: <Wifi className="w-6 h-6" />, name: "WiFi Lounge", desc: "Area kerja & belajar" },
    { icon: <Sparkles className="w-6 h-6" />, name: "Laundry", desc: "Self-service 24/7" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
      {/* Enhanced Hero Section */}
      <section id="home" className="relative pt-32 pb-24 overflow-hidden min-h-screen flex items-center shadow-4xl bg-gradient-to-br from-white via-white to-rose-700">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Enhanced Left Content */}
            <div data-aos="fade-right">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-rose-200 shadow-sm">
                <Sparkles className="w-4 h-4" />
                Premium Living Experience 2025
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
              </div>

              <h1 className="text-6xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-slate-800 via-stone-800 to-slate-700 bg-clip-text text-transparent">
                  Kos
                </span>
                <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Adipati
                </span>
              </h1>

              <p className="text-2xl text-stone-700 mb-4 font-semibold">
                Hunian Premium untuk Generasi Modern
              </p>

              <p className="text-lg text-stone-600 mb-8 leading-relaxed max-w-lg">
                Rasakan pengalaman tinggal yang berbeda. Kombinasi sempurna antara kemewahan, kenyamanan, dan lokasi strategis di jantung kota dengan fasilitas kelas dunia.
              </p>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className={`w-18 h-18 mx-auto mb-3 ${stat.bgColor} rounded-3xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-white`}>
                      <div className={stat.color}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-2xl text-stone-800">{stat.number}</div>
                      <div className="text-sm text-stone-600 font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="group relative px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-700 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <Eye className="w-5 h-5" />
                    Virtual Tour 360°
                  </div>
                </button>

                <button className="group px-10 py-5 bg-white/90 backdrop-blur-sm text-stone-800 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-stone-200 hover:border-rose-300">
                  <div className="flex items-center justify-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    WhatsApp Langsung
                  </div>
                </button>
              </div>

              {/* Quick Info */}
              <div className="flex items-center gap-6 text-sm text-stone-600 z-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>5 kamar tersedia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Bisa pindah hari ini</span>
                </div>
              </div>
            </div>

            {/* Bagian Kanan - Single Image */}
            <div data-aos="fade-left">
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <img
                  src={gambarr}
                  alt="Interior Kos Adipati"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-stone-50 to-slate-50 relative ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-down" className='text-center mb-20'>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              Fasilitas Premium
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-stone-800 mb-6">
              Mengapa Memilih
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent"> Kos Adipati</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Pengalaman tinggal yang tak terlupakan dengan fasilitas premium dan pelayanan terbaik di kelasnya
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 mb-16 ">
            {features.map((feature, index) => (
              <div
                key={index}
                data-aos="fade-left" // <-- Terapkan animasi yang diinginkan
                data-aos-delay={index * 500} // <-- Tambahkan delay yang bertambah
                className={`group relative bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-stone-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-8">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.iconGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}>
                    <div className="text-white text-3xl">
                      {feature.icon}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-stone-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-stone-700 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <span className="text-stone-700 font-medium">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Efek hover overlay yang lebih halus */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20"></div>
              </div>
            ))}
          </div>

          {/* Fasilitas Tambahan dengan desain baru */}
          <div data-aos="fade-up" className="bg-white rounded-3xl p-10 border border-stone-200 shadow-xl">
            <h3 className="text-3xl font-bold text-center mb-10 text-stone-800">Fasilitas Tambahan</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {facilities.map((facility, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="w-20 h-20 mx-auto mb-4 bg-stone-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                    <div className="text-stone-700 text-3xl">
                      {facility.icon}
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg text-stone-800 mb-1">{facility.name}</h4>
                  <p className="text-sm text-stone-600">{facility.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Room Types Section */}
      <section id="rooms" className="py-8 bg-gradient-to-br from-stone-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Home className="w-4 h-4" />
              Pilihan Kamar
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-stone-800 mb-6">
              Kamar <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Premium</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Setiap tipe kamar dirancang khusus untuk memberikan kenyamanan maksimal sesuai kebutuhan dan gaya hidup Anda
            </p>
          </div>

          {/* Menggunakan grid 3 kolom pada layar besar */}
          <div className="grid lg:grid-cols-3 gap-10">
            {roomTypes.map((room, index) => (
              <div
                key={index}
                data-aos="fade-right" // <-- Terapkan animasi yang diinginkan
                data-aos-delay={index * 500}
                className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border flex flex-col group ${room.popular ? 'border-rose-300 ring-4 ring-rose-100' : 'border-stone-200'
                  }`}>
                {/* Menghapus overflow-hidden agar tag tidak terpotong */}
                {room.popular && (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-16 py-1 rounded-full text-sm font-bold shadow-lg">
                      ⭐ MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Room Image */}
                <div className="aspect-video rounded-t-3xl overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.type}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-semibold text-stone-800">
                    {room.size}
                  </div>
                </div>

                {/* Wrapper untuk konten agar tingginya konsisten */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold text-stone-800 mb-2">{room.type}</h3>
                    <p className="text-stone-600 font-medium mb-4">{room.subtitle}</p>
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-lg text-stone-500 line-through">Rp {room.originalPrice}jt</span>
                      <div className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                        Rp {room.price}jt
                      </div>
                    </div>
                    <div className="text-stone-600 mb-2">per bulan</div>
                    <div className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <Sparkles className="w-3 h-3" />
                      Hemat Rp {((parseFloat(room.originalPrice) - parseFloat(room.price)) * 100).toFixed(0)}k
                    </div>
                  </div>

                  {/* Bagian fitur dibuat 2 kolom */}
                  <div className="border-t border-stone-200 pt-6 mt-6 flex-grow">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                      {room.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          <span className="text-stone-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                    {/* Tombol "Pilih Kamar" */}
                    <div className="mt-8">
                      <div className="p-4">
                        <button
                          onClick={() => handleNavigateToRooms(room.type)} // Ini yang akan menjalankan navigasi
                          className="w-full relative py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          Pilih Kamar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>      
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section data-aos="fade-up" id="testimonials" className="py-12 relative overflow-hidden shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" />
              Apa Kata Mereka?
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-stone-800 mb-6">
              Cerita{" "}
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Bahagia
              </span>
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Ribuan penghuni telah merasakan nyamannya tinggal di Kos Adipati.
              Sekarang giliran Anda!
            </p>
          </div>

          {/* Slider */}
          <div className="relative">
            <div className="w-full flex justify-center items-center">
              <div className="relative w-full max-w-4xl h-auto min-h-[400px]">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 bg-white rounded-3xl shadow-xl border border-white/50 p-10 lg:p-16 transition-all duration-700 transform ${index === currentSlide
                      ? "opacity-100 z-10 scale-100"
                      : "opacity-0 z-0 scale-95 pointer-events-none"
                      }`}
                  >
                    {/* Avatar + Name */}
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-stone-800">
                          {testimonial.name}
                        </h3>
                        <p className="text-stone-600 font-medium">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 text-amber-400 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-current" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-xl text-stone-700 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>

                    {/* Duration */}
                    <div className="mt-8 pt-6 border-t border-stone-200 text-sm text-stone-500 font-medium">
                      Penghuni selama {testimonial.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              <ChevronLeft className="w-7 h-7 text-stone-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              <ChevronRight className="w-7 h-7 text-stone-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section data-aos="fade-up" className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-3xl shadow-2xl p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-white/10 rounded-3xl z-0"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Siap Pindah ke Kos Impian Anda?
              </h2>
              <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto">
                Jangan tunda lagi, segera hubungi kami untuk informasi ketersediaan kamar dan promo spesial!
              </p>
              <button
                onClick={() => window.location.href = 'https://wa.me/6281234567890'} // sesuaikan nomor WA
                className="group relative px-10 py-5 bg-white text-rose-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center gap-3">
                  <Phone className="w-5 h-5" />
                  Hubungi Kami Sekarang!
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

