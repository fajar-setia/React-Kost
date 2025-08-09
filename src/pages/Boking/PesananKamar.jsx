import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Flame, Star, Wifi, Car, Coffee, Utensils, Camera, X, ChevronLeft,
  Calendar, Clock, Users, CreditCard, Check, MapPin, Phone, Mail,
  Bed, Bath, Home, User, ArrowRight, Loader, AlertCircle, Wallet
} from 'lucide-react';

const API_BASE_ROOM = 'http://localhost:5116/api/Room';

function DetailKamar({
  room,
  formatPrice,
  getRoomType,
  getAmenityIcon,
}) {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-stone-800 mb-6">Detail Kamar</h2>

      <div className="relative overflow-hidden rounded-2xl mb-6">
        <img
          src={`http://localhost:5116${room.mainImageUrl}`}
          alt={room.name}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y3ZjhmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2YjczODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5HYW1iYXIgVGlkYWsgRGl0ZW11a2FuPC90ZXh0Pjwvc3ZnPg==';
          }}
        />
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-sm">
            {formatPrice(room.price)}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-stone-800">{room.name}</h3>
          <div className="flex items-center">
            {[...Array(Math.min(room.rating || 0, 5))].map((_, i) => (
              <Star key={i} size={16} className="text-yellow-500 fill-current" />
            ))}
          </div>
        </div>

        <p className="text-stone-600">{room.description}</p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
              <Bed className="w-4 h-4" />
            </div>
            <span className="font-semibold text-stone-700">{getRoomType(room.name)}</span>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h4 className="font-semibold text-stone-800 mb-3">Fasilitas Kamar</h4>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(room.amenities?.$values) && room.amenities.$values.length > 0 ? (
              room.amenities.$values.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-stone-100 text-stone-700 px-3 py-2 rounded-full text-sm border border-stone-200"
                >
                  {getAmenityIcon(amenity.name)}
                  <span>{amenity.name}</span>
                </div>
              ))
            ) : (
              <div className="text-stone-500 text-sm italic">
                Fasilitas akan segera tersedia
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}

const PesananKamar = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // States
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',

    // Booking Details
    checkIn: '',
    checkOut: '',
    rooms: 1,  // Fix: ubah dari JumlahKamar ke rooms
    guests: 1, // Fix: ubah dari JumlahTamu ke guests

    // Special Requests
    specialRequests: '',

    // Payment
    paymentMethod: 'transfer'
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_ROOM}/${roomId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Room Data:', data);

        setRoom(data);
      } catch (err) {
        console.error("Failed to fetch room:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchRoom();
    }
  }, [roomId]);

  // Helper Functions
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price);
    }
    return price || 'Hubungi kami';
  };

  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity?.toLowerCase();
    if (amenityLower?.includes('wifi') || amenityLower?.includes('internet')) return <Wifi size={16} />;
    if (amenityLower?.includes('parking') || amenityLower?.includes('parkir')) return <Car size={16} />;
    if (amenityLower?.includes('restaurant') || amenityLower?.includes('restoran')) return <Utensils size={16} />;
    if (amenityLower?.includes('coffee') || amenityLower?.includes('kopi')) return <Coffee size={16} />;
    return <Star size={16} />;
  };

  const getRoomType = (roomName) => {
    if (!roomName) return 'Standard';
    const name = roomName.toLowerCase();
    if (name.includes('premium')) return 'Premium';
    if (name.includes('deluxe')) return 'Deluxe';
    return 'Standard';
  };

  const calculateTotal = () => {
    const hargaPerMalam = Number(room?.pricePerNight) || 0;
    const jumlahKamar = Number(formData.rooms) || 0;
    const lamaInap =
      (new Date(formData.checkOut) - new Date(formData.checkIn)) /
      (1000 * 60 * 60 * 24);

    return hargaPerMalam * jumlahKamar * (lamaInap || 0);
  };


  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    console.log(`Updated ${field}:`, value); // Debug: untuk melihat perubahan data
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleNextStepForm = async () => {
    // 1️⃣ Validasi form
    const requiredFields = {
      fullName: 'Nama Lengkap',
      email: 'Email',
      phone: 'Nomor Telepon',
      checkIn: 'Tanggal Check-in',
      checkOut: 'Tanggal Check-out'
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([field]) => !formData[field] || formData[field].trim() === '')
      .map(([, label]) => label);

    if (missingFields.length > 0) {
      alert(`Mohon lengkapi field berikut: ${missingFields.join(', ')}`);
      return;
    }

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      alert("Tanggal check-in tidak boleh kurang dari hari ini");
      return;
    }

    if (checkOutDate <= checkInDate) {
      alert("Tanggal check-out harus setelah tanggal check-in");
      return;
    }

    try {
      console.log('Form data before booking:', formData);

      // 3️⃣ Cek ketersediaan
      const checkResponse = await fetch(
        `http://localhost:5116/api/Booking/available?roomId=${roomId}&startDate=${formData.checkIn}&endDate=${formData.checkOut}`
      );

      if (!checkResponse.ok) {
        throw new Error('Gagal mengecek ketersediaan kamar');
      }

      const availabilityData = await checkResponse.json();
      console.log("Availability data:", availabilityData);

      // Pastikan sesuai format dari backend
      if (!availabilityData.available) {
        alert("Maaf, kamar tidak tersedia untuk tanggal yang dipilih.");
        return;
      }

      // 4️⃣ Siapkan data booking
      const BookingData = {
        roomId: roomId,
        startDate: new Date(formData.checkIn).toISOString(),
        endDate: new Date(formData.checkOut).toISOString(),
        customerName: formData.fullName.trim(),
        customerEmail: formData.email.trim(),
        customerPhone: formData.phone.trim(),
        jumlahTamu: formData.guests,   // ubah key
        jumlahKamar: formData.rooms,   // ubah key
        specialRequests: formData.specialRequests?.trim() || null
      };

      console.log('Booking data to send:', BookingData);

      // 5️⃣ Kirim booking
      const response = await fetch("http://localhost:5116/api/Booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(BookingData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Booking berhasil", result);
        setCurrentStep(currentStep + 1);
      } else {
        const errorText = await response.text();
        console.error("Gagal booking", errorText);
        alert("Gagal melakukan booking. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan", error);
      alert("Terjadi kesalahan saat melakukan booking. Silakan coba lagi.");
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitBooking = () => {
    // Here you would typically send the booking data to your API
    console.log('Final Booking Data:', { ...formData, roomId, total: calculateTotal() });
    alert('Pesanan berhasil dikirim! Kami akan menghubungi Anda segera.');
    navigate('/');
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Memuat Data Kamar</h2>
          <p className="text-stone-600">Sedang mengambil informasi kamar...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Kamar Tidak Ditemukan</h2>
          <p className="text-stone-600 mb-4">{error || 'Data kamar tidak dapat ditemukan'}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-rose-500 text-white px-6 py-3 rounded-xl hover:bg-rose-600 transition-colors"
            >
              Kembali ke Beranda
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-white border-2 border-stone-300 text-stone-700 px-6 py-3 rounded-xl hover:bg-stone-50 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, title: 'Detail Kamar', description: 'Konfirmasi pilihan kamar' },
    { id: 2, title: 'Informasi Tamu', description: 'Data diri dan tanggal menginap' },
    { id: 3, title: 'Konfirmasi', description: 'Review dan pembayaran' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-stone-600 hover:text-rose-600 transition-colors mb-6"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali ke Kamar
            </button>

            {/* Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 border border-rose-200">
                <Flame className="w-4 h-4" />
                Reservasi Kamar
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-slate-800 to-stone-800 bg-clip-text text-transparent">
                  Pesan
                </span>
                <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {' '}Kamar Impian
                </span>
              </h1>

              <p className="text-xl text-stone-600 max-w-2xl mx-auto">
                Lengkapi informasi di bawah untuk menyelesaikan reservasi Anda
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4 bg-white rounded-2xl p-2 shadow-lg border border-stone-200">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${currentStep === step.id
                      ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
                      : currentStep > step.id
                        ? 'bg-green-100 text-green-700'
                        : 'bg-stone-100 text-stone-600'
                      }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === step.id
                        ? 'bg-white/20'
                        : currentStep > step.id
                          ? 'bg-green-500 text-white'
                          : 'bg-stone-300 text-stone-600'
                        }`}>
                        {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                      </div>
                      <div className="hidden sm:block">
                        <div className="font-semibold text-sm">{step.title}</div>
                        <div className={`text-xs ${currentStep === step.id ? 'text-white/80' : 'text-stone-500'
                          }`}>
                          {step.description}
                        </div>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-stone-400" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-lg border border-stone-100 overflow-hidden">
                {/* Step 1: Room Details */}
                {currentStep === 1 && (
                  <div>
                    <DetailKamar
                      room={room}
                      formatPrice={formatPrice}
                      getRoomType={getRoomType}
                      getAmenityIcon={getAmenityIcon}
                    />

                    <div className="flex justify-end mt-8">
                      <button
                        onClick={handleNextStep}
                        className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <span className="flex items-center">
                          Lanjutkan
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </span>
                      </button>
                    </div>
                  </div>

                )}

                {/* Step 2: Guest Information */}
                {currentStep === 2 && (
                  <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-6">
                    <h2 className="text-2xl font-bold text-stone-800 mb-6">Informasi Tamu & Reservasi</h2>

                    <div className="space-y-6">
                      {/* Guest Information */}
                      <div>
                        <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center">
                          <User className="w-5 h-5 mr-2 text-rose-600" />
                          Data Tamu
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">
                              Nama Lengkap *
                            </label>
                            <input
                              type="text"
                              value={formData.fullName}
                              onChange={(e) => handleInputChange('fullName', e.target.value)}
                              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                              placeholder="Masukkan nama lengkap"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                              placeholder="email@example.com"
                              required
                            />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-sm font-semibold text-stone-700 mb-2">
                              Nomor Telepon *
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                              placeholder="+62 812-3456-7890"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Booking Details */}
                      <div>
                        <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-rose-600" />
                          Detail Reservasi
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">
                              Check-in *
                            </label>
                            <input
                              type="date"
                              value={formData.checkIn}
                              onChange={(e) => handleInputChange('checkIn', e.target.value)}
                              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                              min={new Date().toISOString().split('T')[0]}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">
                              Check-out *
                            </label>
                            <input
                              type="date"
                              value={formData.checkOut}
                              onChange={(e) => handleInputChange('checkOut', e.target.value)}
                              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                              min={formData.checkIn || new Date().toISOString().split('T')[0]}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">
                              Jumlah Tamu
                            </label>
                            <select
                              value={formData.guests}
                              onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                            >
                              {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num}>{num} Orang</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">
                              Jumlah Kamar
                            </label>
                            <select
                              value={formData.rooms}
                              onChange={(e) => handleInputChange('rooms', parseInt(e.target.value))}
                              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                            >
                              {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num} Kamar</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Special Requests */}
                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">
                          Permintaan Khusus
                        </label>
                        <textarea
                          value={formData.specialRequests}
                          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                          placeholder="Tuliskan permintaan khusus Anda (opsional)..."
                        />
                      </div>
                      <div className='lg:col-span-2'>
                        <DetailKamar
                          room={room}
                          formatPrice={formatPrice}
                          getRoomType={getRoomType}
                          getAmenityIcon={getAmenityIcon}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        onClick={handlePrevStep}
                        className="bg-white border-2 border-stone-300 text-stone-700 font-semibold py-3 px-8 rounded-xl hover:bg-stone-50 transition-all duration-300"
                      >
                        <span className="flex items-center">
                          <ChevronLeft className="w-5 h-5 mr-2" />
                          Kembali
                        </span>
                      </button>
                      <button
                        onClick={handleNextStepForm}
                        className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <span className="flex items-center">
                          Lanjutkan
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-stone-800 mb-6">Konfirmasi Reservasi</h2>

                    <div className="space-y-6">
                      {/* Booking Summary */}
                      <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-200">
                        <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center">
                          <Check className="w-5 h-5 mr-2 text-green-600" />
                          Ringkasan Pemesanan
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-stone-600">Nama Tamu:</span>
                              <span className="font-semibold">{formData.fullName || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-stone-600">Email:</span>
                              <span className="font-semibold">{formData.email || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-stone-600">Telepon:</span>
                              <span className="font-semibold">{formData.phone || '-'}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-stone-600">Check-in:</span>
                              <span className="font-semibold">{formData.checkIn || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-stone-600">Check-out:</span>
                              <span className="font-semibold">{formData.checkOut || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-stone-600">Tamu & Kamar:</span>
                              <span className="font-semibold">{formData.guests} Tamu, {formData.rooms} Kamar</span>
                            </div>
                          </div>
                        </div>

                        {formData.specialRequests && (
                          <div className="mt-4 pt-4 border-t border-rose-300">
                            <div className="text-stone-600 text-sm">Permintaan Khusus:</div>
                            <div className="font-semibold text-sm mt-1">{formData.specialRequests}</div>
                          </div>
                        )}
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center">
                          <CreditCard className="w-5 h-5 mr-2 text-rose-600" />
                          Metode Pembayaran
                        </h3>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name="payment"
                              value="transfer"
                              checked={formData.paymentMethod === 'transfer'}
                              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                              className="text-rose-600 focus:ring-rose-500"
                            />
                            <div className="flex items-center space-x-2">
                              <CreditCard className="w-5 h-5 text-stone-600" />
                              <span className="font-semibold">Transfer Bank</span>
                            </div>
                          </label>
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name="payment"
                              value="cash"
                              checked={formData.paymentMethod === 'cash'}
                              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                              className="text-rose-600 focus:ring-rose-500"
                            />
                            <div className="flex items-center space-x-2">
                              <Wallet className="w-5 h-5 text-stone-600" />
                              <span className="font-semibold">Bayar di Tempat</span>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Total Harga */}
                      <div className="flex items-center justify-between border-t border-stone-300 pt-6 mt-6">
                        <span className="text-lg font-semibold text-stone-700">Total Pembayaran:</span>
                        <span className="text-2xl font-bold text-rose-600">{formatPrice(calculateTotal())}</span>
                      </div>
                    </div>

                    {/* Tombol Navigasi */}
                    <div className="flex justify-between mt-8">
                      <button
                        onClick={handlePrevStep}
                        className="bg-white border-2 border-stone-300 text-stone-700 font-semibold py-3 px-8 rounded-xl hover:bg-stone-50 transition-all duration-300"
                      >
                        <span className="flex items-center">
                          <ChevronLeft className="w-5 h-5 mr-2" />
                          Kembali
                        </span>
                      </button>
                      <button
                        onClick={handleSubmitBooking}
                        className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <span className="flex items-center">
                          Konfirmasi Pesanan
                          <Check className="w-5 h-5 ml-2" />
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Optional Sidebar (Summary atau Tips) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg border border-stone-100 p-6">
                <h3 className="text-lg font-bold text-stone-800 mb-4">Tips Reservasi</h3>
                <ul className="list-disc list-inside text-sm text-stone-600 space-y-2">
                  <li>Pastikan data diri Anda sudah benar sebelum melanjutkan.</li>
                  <li>Tanggal check-in dan check-out mempengaruhi total biaya.</li>
                  <li>Anda akan menerima konfirmasi melalui email dan telepon.</li>
                  <li>Untuk permintaan khusus, kami akan menghubungi Anda lebih lanjut.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PesananKamar;
