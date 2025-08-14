import {
  Car,
  Coffee,
  Utensils,
  Wifi,
  Star,
  Bed,
  Loader,
  AlertCircle,
  Flame,
  MapPin,
  Users,
  Calendar,
  Shield,
  Camera,
  Home,
  Bath,
  Phone,
  Clock,
  Check,
  Snowflake,
  BedDouble,
  Refrigerator,
  Tv,
  Table,
  Shirt,
  Wind,
  WashingMachine,
  CookingPot,
  KeyRound,

} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_ROOM = 'http://localhost:5116/api/Room'
const API_BASE_ROOM_TYPE = 'http://localhost:5116/api/roomtype'

function DetailKamarLayout({
  room,
  getRoomTypeIcon,
  formatPrice,
  getAmenityIcon,
  handleBookingClick,
}) {
  if (!room) {
    return (
      <div className="flex h-screen items-center justify-center p-8 text-stone-500 bg-gradient-to-br from-stone-50 to-stone-100">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-stone-200 flex items-center justify-center">
            <Bed className="w-12 h-12 text-stone-400" />
          </div>
          <p className="text-xl font-medium">Data kamar tidak ditemukan.</p>
          <p className="text-sm text-stone-400 mt-2">Silakan coba lagi atau pilih kamar lain</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-rose-50 pt-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Image Section dengan Parallax Effect */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-8 group">
          <img
            src={`http://localhost:5116${room.mainImageUrl}`}
            alt={`Gambar ${room.name}`}
            className="h-[32rem] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/1200x800.png?text=Gambar+Tidak+Tersedia';
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

          {/* Room Type Badge */}
          <div className="absolute top-6 left-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl text-white">
              {getRoomTypeIcon(room.roomTypeId)}
              <span className="font-medium">{room.roomType?.name || "Standard"}</span>
            </div>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-6 right-6">
            <div className="rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-4 text-white shadow-2xl backdrop-blur-sm">
              <div className="text-sm font-medium opacity-90">Mulai dari</div>
              <div className="text-2xl font-bold">{formatPrice(room.price)}</div>
              <div className="text-sm opacity-80">per malam</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="absolute bottom-6 left-6 flex space-x-4">
            <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-white">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">{room.capacity} orang</span>
              </div>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-white">
              {room.isAvailable ? (
                <span className="text-green-400 font-bold">Tersedia</span>
              ) : (
                <span className="text-red-400 font-bold">Tidak Tersedia</span>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Room Title & Rating */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-stone-800 mb-3 leading-tight">
                    {room.name}
                  </h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={`${i < (room.rating || 0)
                            ? 'text-yellow-400 fill-current'
                            : 'text-stone-300'
                            } transition-colors`}
                        />
                      ))}
                      <span className="text-sm font-medium text-stone-600 ml-2">
                        {room.rating || 0}/5
                      </span>
                    </div>
                    <div className="flex items-center text-stone-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">kos-kosan</span>
                      <span className="text-sm ml-2">{room.roomType?.name || "Standard"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-rose-500 pl-6 bg-gradient-to-r from-rose-50 to-pink-50 py-4 rounded-r-xl">
                <p className="text-lg text-stone-700 leading-relaxed">{room.description}</p>
              </div>
            </div>

            {/* Room Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Room Info Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-stone-100">
                <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center">
                  <Bed className="w-5 h-5 mr-2 text-rose-600" />
                  Info Kamar
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Kapasitas</span>
                    <span className="font-medium text-stone-800">{room.capacity} orang</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Ukuran</span>
                    <span className="font-medium text-stone-800">35 m²</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Tempat Tidur</span>
                    <span className="font-medium text-stone-800">King Size</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Pemandangan</span>
                    <span className="font-medium text-stone-800">Kota/Taman</span>
                  </div>
                </div>
              </div>

              {/* Policies Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-stone-100">
                <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-rose-600" />
                  Kebijakan Hotel
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Check-in</span>
                    <span className="font-medium text-stone-800">14:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Check-out</span>
                    <span className="font-medium text-stone-800">12:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Pembatalan</span>
                    <span className="font-medium text-green-600">Gratis</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Deposit</span>
                    <span className="font-medium text-stone-800">Tidak ada</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-100">
              <div className="flex items-center mb-6">
                <div className="text-rose-700 mr-3">
                  {getRoomTypeIcon(room.roomTypeId)}
                </div>
                <h2 className="text-2xl font-bold text-stone-800">
                  <span className="mr-2">Fasilitas</span>
                  <span>{room.roomType?.name || "Standard"}</span>
                </h2>
              </div>
              {Array.isArray(room.amenities?.$values) && room.amenities.$values.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {room.amenities.$values.map((amenity, index) => (
                    <div
                      key={index}
                      className="group flex items-center gap-4 p-4 rounded-xl border border-stone-200 bg-gradient-to-r from-stone-50 to-white hover:from-rose-50 hover:to-pink-50 hover:border-rose-300 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center group-hover:from-rose-200 group-hover:to-pink-200 transition-colors">
                        {getAmenityIcon(amenity.name)}
                      </div>
                      <span className="font-medium text-stone-700 group-hover:text-rose-700 transition-colors">
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center">
                    <Coffee className="w-10 h-10 text-stone-400" />
                  </div>
                  <p className="text-stone-500 text-lg">Fasilitas akan segera tersedia</p>
                  <p className="text-stone-400 text-sm mt-2">Tim kami sedang mempersiapkan informasi lengkap</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Booking Card - Removed sticky positioning */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-stone-100">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-stone-800 mb-2">
                  {formatPrice(room.price)}
                </div>
                <p className="text-stone-500">per malam</p>
              </div>

              {/* Quick Check */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">
                    {room.isAvailable ? 'Kamar Tersedia Hari Ini' : 'Kamar Tidak Tersedia'}
                  </span>
                </div>
              </div>

              {/* Features - Fixed version with better spacing */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-stone-50 to-stone-100 rounded-xl border border-stone-200 hover:shadow-sm transition-shadow">
                  <span className="text-stone-600 flex items-center">
                    <Shield className="h-4 w-4 mr-3 text-green-600" />
                    <span className="font-medium">Pembatalan Gratis</span>
                  </span>
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-stone-50 to-stone-100 rounded-xl border border-stone-200 hover:shadow-sm transition-shadow">
                  <span className="text-stone-600 flex items-center">
                    <Wifi className="h-4 w-4 mr-3 text-green-600" />
                    <span className="font-medium">WiFi Gratis</span>
                  </span>
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-stone-50 to-stone-100 rounded-xl border border-stone-200 hover:shadow-sm transition-shadow">
                  <span className="text-stone-600 flex items-center">
                    <Car className="h-4 w-4 mr-3 text-green-600" />
                    <span className="font-medium">Parkir Gratis</span>
                  </span>
                  <Check className="w-5 h-5 text-green-600" />
                </div>
              </div>

              {/* Booking Button */}
              <button
                onClick={() => handleBookingClick(room.id)}
                disabled={!room.isAvailable}
                className={`w-full font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform active:scale-95 relative overflow-hidden group ${room.isAvailable
                  ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-700 hover:via-pink-700 hover:to-rose-700 text-white hover:scale-105 hover:shadow-xl'
                  : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  }`}
              >
                {room.isAvailable && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                )}
                <span className="flex items-center justify-center relative z-10">
                  <Flame size={20} className="mr-3" />
                  {room.isAvailable ? 'Pesan Sekarang' : 'Tidak Tersedia'}
                </span>
              </button>

              <p className="text-center text-xs text-stone-500 mt-4">
                Reservasi aman & terpercaya
              </p>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-6 text-white">
              <div className="flex items-center mb-3">
                <Phone className="w-5 h-5 mr-2" />
                <h3 className="font-bold text-lg">Butuh Bantuan?</h3>
              </div>
              <p className="text-stone-300 text-sm mb-4">
                Tim customer service kami siap membantu Anda 24/7
              </p>
              <div className="space-y-3">
                <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl py-3 px-4 transition-colors duration-200 flex items-center justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="font-medium">Hubungi Kami</span>
                </button>
                <div className="text-center">
                  <p className="text-stone-400 text-xs">Atau WhatsApp:</p>
                  <p className="text-white font-medium">+62 812-3456-7890</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-stone-100">
              <h3 className="font-bold text-lg text-stone-800 mb-4">Mengapa Pilih Kami?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800">Harga Terbaik</h4>
                    <p className="text-sm text-stone-600">Jaminan harga terendah atau uang kembali</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800">Booking Aman</h4>
                    <p className="text-sm text-stone-600">Transaksi terjamin dengan enkripsi SSL</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800">Support 24/7</h4>
                    <p className="text-sm text-stone-600">Customer service tersedia sepanjang waktu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DetailKamar = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('all');

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
        setRoom(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (roomId) {
      fetchRoom();
    }
  }, [roomId]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await fetch(API_BASE_ROOM_TYPE);
        const data = await response.json();
        const values = data?.$values ?? [];

        // Get all rooms to count by type
        const roomsResponse = await fetch(API_BASE_ROOM);
        const roomsData = await roomsResponse.json();
        let allRooms = [];

        if (Array.isArray(roomsData)) {
          allRooms = roomsData;
        } else if (roomsData && Array.isArray(roomsData.$values)) {
          allRooms = roomsData.$values;
        }

        const countsByType = {};
        allRooms.forEach(room => {
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

        const total = allRooms.length;

        parsed.unshift({
          id: 'all',
          name: 'Semua Kamar',
          count: total,
        });

        setRoomTypes(parsed);
      } catch (error) {
        console.error('Error fetching room types:', error);
        setError(error.message);
      }
    };

    fetchRoomTypes();
  }, []);

  const getRoomTypeIcon = (typeId) => {
    if (typeId === 'all') return <Camera className="w-5 h-5" />;

    switch (typeId) {
      case 1: return <Home className="w-5 h-5" />;
      case 2: return <Bed className="w-5 h-5" />;
      case 3: return <Bath className="w-5 h-5" />;
      default: return <Camera className="w-5 h-5" />;
    }
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
    return price || 'Hubungi Kami';
  };

  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity?.toLowerCase();

    if (amenityLower.includes("wifi")) return <Wifi size={16} />;
    if (amenityLower.includes("ac")) return <Snowflake size={16} />;
    if (amenityLower.includes("kamar mandi")) return <Bath size={16} />;
    if (amenityLower.includes("tempat tidur")) return <BedDouble size={16} />;
    if (amenityLower.includes("lemari")) return <Refrigerator size={16} />;
    if (amenityLower.includes("tv")) return <Tv size={16} />;
    if (amenityLower.includes("laundry")) return <WashingMachine size={16} />;
    if (amenityLower.includes("dapur")) return <CookingPot size={16} />;
    if (amenityLower.includes("parkir")) return <Car size={16} />;
    if (amenityLower.includes("akses 24 jam")) return <KeyRound size={16} />;

    return <Star size={16} />;
  };

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

  return (
    <DetailKamarLayout
      room={room}
      formatPrice={formatPrice}
      getRoomTypeIcon={getRoomTypeIcon}
      getAmenityIcon={getAmenityIcon}
      handleBookingClick={handleBookingClick}
      roomTypes={roomTypes}
      selectedRoomType={selectedRoomType}
      setSelectedRoomType={setSelectedRoomType}
    />
  );
};

export default DetailKamar;