import React, { useState, useEffect } from 'react';
import { Flame, Star, Wifi, Car, Coffee, Utensils, Camera, X, ChevronLeft, ChevronRight, Grid, List, Home, Bed, Bath, MapPin, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const API_BASE_ROOM = 'http://localhost:5116/api/Room';
const API_BASE_ROOM_TYPE = "http://localhost:5116/api/roomtype";

const Kamar = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState('all');

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_BASE_ROOM);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json()

        // Handle different response structures
        let roomsData = [];
        if (Array.isArray(data)) {
          roomsData = data;
        } else if (data && Array.isArray(data.$values)) {
          roomsData = data.$values;
        } else if (data && Array.isArray(data.data)) {
          roomsData = data.data;
        } else {
          console.warn('Unexpected API response structure:', data);
          roomsData = [];
        }

        setRooms(roomsData);
      } catch (err) {
        setError(err.message);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await fetch(API_BASE_ROOM_TYPE);
        const data = await response.json();
        const values = data?.$values ?? [];
        const countsByType = {};

        rooms.forEach(room => {
          const typeId = room.roomTypeId;
          if (typeId) {
            countsByType[typeId] = (countsByType[typeId] || 0) + 1;
          }
        });

        const parsed = values.map(item => ({
          id: item.roomTypeId,
          name: item.name,
          count: countsByType[item.roomTypeId] || 0
        }));

        const total = rooms.length;

        parsed.unshift({
          id: 'all',
          name: 'Semua Kamar',
          count: total,
        });

        setRoomTypes(parsed);
      } catch (error) {
        console.error('Error fetching room types:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomTypes();
  }, [rooms]); // jangan lupa dependensinya rooms

  // Filter rooms sesuai tipe yang dipilih
  const filteredRooms = rooms.filter(room => {
    if (selectedRoomType === 'all') return true;
    return room.roomTypeId === selectedRoomType;
  });

  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity?.toLowerCase();
    if (amenityLower?.includes('wifi') || amenityLower?.includes('internet')) return <Wifi size={16} />;
    if (amenityLower?.includes('parking') || amenityLower?.includes('parkir')) return <Car size={16} />;
    if (amenityLower?.includes('restaurant') || amenityLower?.includes('restoran')) return <Utensils size={16} />;
    if (amenityLower?.includes('coffee') || amenityLower?.includes('kopi')) return <Coffee size={16} />;
    return <Star size={16} />;
  };

  const getRoomTypeIcon = (typeId) => {
    if (typeId === 'all') return <Camera className="w-5 h-5" />;

    switch (typeId) {
      case 1: return <Home className="w-5 h-5" />;
      case 2: return <Bed className="w-5 h-5" />;
      case 3: return <Bath className="w-5 h-5" />;
      default: return <Camera className="w-5 h-5" />;
    }
  };

  const openLightbox = (room) => {
    setSelectedImage({
      image: `http://localhost:5116${room.mainImageUrl}`,
      title: room.name,
      description: room.description,
      price: room.price,
      rating: room.rating,
      amenities: room.amenities
    });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handleBookingClick = (roomId) => {
    navigate(`/PesananKamar/${roomId}`);
  };

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

  // const getRoomType = (roomName) => {
  //   if (!roomName) return 'Standard';
  //   const name = roomName.toLowerCase();
  //   if (name.includes('premium')) return 'Premium';
  //   if (name.includes('deluxe')) return 'Deluxe';
  //   return 'Standard';
  // };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Memuat Data Kamar</h2>
          <p className="text-stone-600">Sedang mengambil informasi kamar terbaru...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Gagal Memuat Data Kamar</h2>
          <p className="text-stone-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-rose-500 text-white px-6 py-3 rounded-xl hover:bg-rose-600 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-rose-200">
              <Flame className="w-4 h-4" />
              Premium Room Collection
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-800 to-stone-800 bg-clip-text text-transparent">
                Pilih
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Kamar Impian
              </span>
            </h1>

            <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed mb-12">
              Rasakan kehangatan kemewahan dalam koleksi kamar terbaik kami. Setiap kamar dirancang khusus untuk kenyamanan dan kepuasan Anda.
            </p>

            {/* Stats - Dynamic from actual data */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {rooms.length}+
                </div>
                <div className="text-stone-600 font-medium">Kamar Tersedia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {roomTypes.filter(type => type.count > 0 && type.id !== 'all').length}
                </div>
                <div className="text-stone-600 font-medium">Tipe Kamar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-stone-600 font-medium">Layanan</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">5★</div>
                <div className="text-stone-600 font-medium">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & View Toggle */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Room Type Filter */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {roomTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedRoomType(type.id)}
                  disabled={type.count === 0 && type.id !== 'all'}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${selectedRoomType === type.id
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg'
                    : type.count === 0 && type.id !== 'all'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                    }`}
                >
                  {getRoomTypeIcon(type.id)}
                  <span>{type.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${selectedRoomType === type.id
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-200 text-stone-600'
                    }`}>
                    {type.count}
                  </span>
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-2xl p-1 border border-stone-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${viewMode === 'grid'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-stone-600 hover:bg-stone-100'
                  }`}
              >
                <Grid className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${viewMode === 'masonry'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-stone-600 hover:bg-stone-100'
                  }`}
              >
                <List className="w-4 h-4" />
                Masonry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredRooms.length === 0 ? (
            <div className="text-center py-20">
              <Bed className="w-16 h-16 text-stone-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-stone-600 mb-2">
                Tidak ada kamar di kategori ini
              </h3>
              <p className="text-stone-500">
                Silakan pilih kategori lain untuk melihat kamar yang tersedia
              </p>
            </div>
          ) : (
            <div className={`${viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8'
              }`}>
              {filteredRooms.map((room, index) => (
                <div
                  key={room.id}
                  className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    } ${viewMode === 'masonry' ? 'break-inside-avoid mb-8' : ''}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onMouseEnter={() => setSelectedRoom(room.id)}
                  onMouseLeave={() => setSelectedRoom(null)}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl border border-stone-100">
                    {/* Featured Badge */}
                    {room.rating >= 5 && (
                      <div className="absolute top-4 left-4 z-10">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Featured
                        </div>
                      </div>
                    )}

                    {/* Price Tag */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                        {formatPrice(room.price)}
                      </div>
                    </div>

                    {/* Room Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={`http://localhost:5116${room.mainImageUrl}`}
                        alt={room.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y3ZjhmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2YjczODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5HYW1iYXIgVGlkYWsgRGl0ZW11a2FuPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Overlay Content */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white text-center">
                          <Camera className="w-8 h-8 mx-auto mb-2" />
                          <div className="font-semibold">Lihat Detail</div>
                        </div>
                      </div>

                      {/* Fire effect overlay on hover */}
                      {selectedRoom === room.id && (
                        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 via-orange-900/20 to-transparent animate-pulse"></div>
                      )}
                    </div>

                    {/* Room Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                            <Bed className="w-4 h-4" />
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">
                            {room.roomType?.name ?? "Standard"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(Math.min(room.rating || 0, 5))].map((_, i) => (
                            <Star key={i} size={16} className="text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-rose-600 transition-colors">
                        {room.name}
                      </h3>

                      <p className="text-stone-600 mb-4 leading-relaxed">
                        {room.description}
                      </p>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {Array.isArray(room.amenities) && room.amenities.length > 0 ? (
                          room.amenities.map((amenity, amenityIndex) => (
                            <div
                              key={amenityIndex}
                              className="flex items-center gap-1 bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm border border-stone-200 hover:border-rose-300 transition-colors"
                            >
                              {getAmenityIcon(amenity)}
                              <span>{amenity}</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-stone-500 text-sm italic">Fasilitas akan segera tersedia</div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => openLightbox(room)}
                          className="flex-1 bg-white border-2 border-rose-200 text-rose-600 font-semibold py-3 px-4 rounded-xl hover:bg-rose-50 transition-all duration-300"
                        >
                          <span className="flex items-center justify-center">
                            <Camera size={18} className="mr-2" />
                            Lihat Detail
                          </span>
                        </button>
                        <button
                          onClick={() => handleBookingClick(room.id)}
                          className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                          <span className="flex items-center justify-center">
                            <Flame size={18} className="mr-2" />
                            Pesan
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Glow effect on hover */}
                    {selectedRoom === room.id && (
                      <div className="absolute inset-0 rounded-3xl border-2 border-rose-300/60 shadow-[0_0_30px_rgba(244,63,94,0.3)] pointer-events-none"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl p-8 border border-rose-100 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Flame className="w-4 h-4" />
              Penawaran Terbatas
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">
              Siap Merasakan Kehangatan Kemewahan?
            </h2>

            <p className="text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Jangan sampai kehabisan! Pesan kamar impian Anda sekarang dan nikmati pengalaman menginap yang tak terlupakan dengan fasilitas terbaik.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => alert('Fitur hubungi kami - implementasi sesuai kebutuhan')}
                className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg"
              >
                <span className="flex items-center justify-center">
                  <Flame size={24} className="mr-3" />
                  Hubungi Kami Sekarang
                </span>
              </button>
              <button
                onClick={() => alert('Fitur lihat lokasi - implementasi sesuai kebutuhan')}
                className="bg-white border-2 border-rose-200 text-rose-600 font-bold py-4 px-8 rounded-2xl hover:bg-rose-50 transition-all duration-300 text-lg"
              >
                <span className="flex items-center justify-center">
                  <MapPin size={24} className="mr-3" />
                  Lihat Lokasi
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center px-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-rose-400 transition-all z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="max-w-4xl w-full relative">
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full rounded-xl shadow-2xl max-h-[80vh] object-contain"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzM3NDE0OSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5HYW1iYXIgVGlkYWsgRGl0ZW11a2FuPC90ZXh0Pjwvc3ZnPg==';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl text-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                  <p className="text-white/80 mb-3">{selectedImage.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-rose-400 mb-2">
                    {formatPrice(selectedImage.price)}
                  </div>
                  <div className="flex items-center">
                    {[...Array(Math.min(selectedImage.rating || 0, 5))].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Amenities in lightbox */}
              <div className="flex flex-wrap gap-2">
                {Array.isArray(selectedImage.amenities) && selectedImage.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-white/20 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kamar;