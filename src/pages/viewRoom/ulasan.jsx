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
const API_BASE_REVIEW = 'http://localhost:5116/api/review'

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
            {/* Booking Card */}
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

              {/* Features */}
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

function ReviewLayout({
  reviews,
  newReview,
  handleChange,
  handleFileChange,
  handleSubmitReview,
  rating,
  setRating,
  comment,
  setComment,
  userName,
  setUserName,
  averageRating,
  ratingDistribution
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Submit Review Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="text-yellow-500" size={24} />
            Tulis Ulasan Anda
          </h2>

          <div className="space-y-4">
            {/* User Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Masukkan nama Anda..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="customerEmail"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Masukkan email Anda..."
                value={newReview.customerEmail}
                onChange={handleChange}
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Star
                    key={num}
                    size={28}
                    className={`cursor-pointer transition-colors ${num <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-200"
                      }`}
                    onClick={() => setRating(num)}
                  />
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-sm text-gray-600">
                    {rating} dari 5 bintang
                  </span>
                )}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ulasan</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                rows="4"
                placeholder="Ceritakan pengalaman Anda menginap di kamar ini..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={500}
              />
              <div className="text-xs text-gray-500 mt-1">
                {comment.length}/500 karakter
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Foto (Opsional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitReview}
              disabled={rating === 0 || !comment.trim() || !userName.trim() || !newReview.customerEmail.trim()}
              className="w-full bg-rose-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-rose-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Kirim Ulasan
            </button>
          </div>
        </div>

        {/* Rating Summary Card */}
        {reviews && reviews.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ringkasan Rating</h3>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{averageRating.toFixed(1)}</div>
                <div className="flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star
                      key={num}
                      size={16}
                      className={num <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">{reviews.length} ulasan</div>
              </div>

              <div className="flex-1">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-2 mb-1">
                    <span className="text-sm w-3">{rating}</span>
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-6">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Ulasan Tamu</h3>

          {reviews && reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-600 font-semibold">
                        {review.customerName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-800">{review.customerName}</h4>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <Star
                              key={num}
                              size={14}
                              className={num <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                      {review.imageUrl && (
                        <img
                          src={`http://localhost:5116${review.imageUrl}`}
                          alt="Review"
                          className="w-32 h-24 object-cover rounded-lg"
                        />
                      )}
                      <p className="text-xs text-gray-400">
                        {new Date(review.dateCreated).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Belum ada ulasan untuk kamar ini</p>
              <p className="text-sm text-gray-400">Jadilah yang pertama memberikan ulasan!</p>
            </div>
          )}
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
  const [reviews, setReviews] = useState([]);

  // Review form states
  const [newReview, setNewReview] = useState({
    roomId: parseInt(roomId),
    customerName: "",
    customerEmail: "",
    rating: 0,
    comment: "",
    image: null,
  });

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState([]);

  // Ambil data kamar
  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_ROOM}/${roomId}`);
        if (!res.ok) throw new Error("Gagal memuat data kamar");
        const data = await res.json();
        setRoom(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRoomTypes = async () => {
      try {
        const res = await fetch(API_BASE_ROOM_TYPE);
        if (!res.ok) throw new Error("Gagal memuat data tipe kamar");
        const data = await res.json();
        setRoomTypes(data.$values || []);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_BASE_REVIEW}/room/${roomId}`);
        if (!res.ok) throw new Error("Gagal memuat ulasan");
        const data = await res.json();
        setReviews(data.$values || []);

        if (data.$values?.length > 0) {
          const avg =
            data.$values.reduce((sum, r) => sum + r.rating, 0) /
            data.$values.length;
          setAverageRating(avg);

          const dist = [5, 4, 3, 2, 1].map((r) => {
            const count = data.$values.filter((rev) => rev.rating === r).length;
            const percentage = (count / data.$values.length) * 100;
            return { rating: r, count, percentage };
          });
          setRatingDistribution(dist);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoomDetail();
    fetchRoomTypes();
    fetchReviews();
  }, [roomId]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);

  const getRoomTypeIcon = (roomTypeId) => {
    const type = roomTypes.find((t) => t.id === roomTypeId);
    if (!type) return <Home className="w-5 h-5" />;
    switch (type.name?.toLowerCase()) {
      case "deluxe":
        return <BedDouble className="w-5 h-5" />;
      case "standard":
        return <Bed className="w-5 h-5" />;
      default:
        return <Home className="w-5 h-5" />;
    }
  };

  const getAmenityIcon = (amenityName) => {
    const name = amenityName?.toLowerCase();
    if (name.includes("wifi")) return <Wifi className="w-5 h-5" />;
    if (name.includes("ac")) return <Snowflake className="w-5 h-5" />;
    if (name.includes("tv")) return <Tv className="w-5 h-5" />;
    if (name.includes("meja")) return <Table className="w-5 h-5" />;
    if (name.includes("lemari")) return <Shirt className="w-5 h-5" />;
    if (name.includes("parkir")) return <Car className="w-5 h-5" />;
    return <Check className="w-5 h-5" />;
  };

  const handleBookingClick = (roomId) => {
    navigate(`/booking/${roomId}`);
  };

  const handleChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setNewReview({
      ...newReview,
      image: e.target.files[0],
    });
  };

  const handleSubmitReview = async () => {
    try {
      const formData = new FormData();
      formData.append("roomId", roomId);
      formData.append("customerName", userName);
      formData.append("customerEmail", newReview.customerEmail);
      formData.append("rating", rating);
      formData.append("comment", comment);
      if (newReview.image) {
        formData.append("image", newReview.image);
      }

      const res = await fetch(API_BASE_REVIEW, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal mengirim ulasan");

      // Refresh ulasan
      const updatedReviews = await fetch(`${API_BASE_REVIEW}/room/${roomId}`);
      const data = await updatedReviews.json();
      setReviews(data.$values || []);

      // Reset form
      setUserName("");
      setNewReview({
        ...newReview,
        customerEmail: "",
        image: null,
      });
      setRating(0);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <AlertCircle className="w-6 h-6 mr-2" /> {error}
      </div>
    );
  }

  return (
    <div>
      <DetailKamarLayout
        room={room}
        getRoomTypeIcon={getRoomTypeIcon}
        formatPrice={formatPrice}
        getAmenityIcon={getAmenityIcon}
        handleBookingClick={handleBookingClick}
      />
      <ReviewLayout
        reviews={reviews}
        newReview={newReview}
        setNewReview={setNewReview}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSubmitReview={handleSubmitReview}
        rating={rating}
        setRating={setRating}
        comment={comment}
        setComment={setComment}
        userName={userName}
        setUserName={setUserName}
        averageRating={averageRating}
        ratingDistribution={ratingDistribution}
      />
    </div>
  );
};

export default DetailKamar;
