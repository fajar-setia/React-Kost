import React, { useState, useEffect } from 'react';
import {
  Home,
  Bed,
  BookOpen,
  Star,
  Camera,
  Plus,
  Edit3,
  Trash2,
  Search,
  Filter,
  Users,
  Calendar,
  DollarSign,
  Settings,
  Bell,
  Menu,
  X,
  Eye,
  ChevronDown,
  Type
} from 'lucide-react';

const API_BASE_ROOM = 'http://localhost:5116/api/Room';
const API_BASE_GALLERY = "http://localhost:5116/api/gallery/upload";
const API_BASE_REVIEW = "http://localhost:5116/api/Review";
const API_BASE_BOOKING = "http://localhost:5116/api/booking";
const API_BASE_ROOMTYPE = "http://localhost:5116/api/roomType";
const API_BASE_ALLGALLERY = "http://localhost:5116/api/gallery";


function RoomLayout({
  rooms,
  loading,
  newRoom,
  setNewRoom,
  showForm,
  setShowForm,
  handleAddRoom,
  formatCurrency,
  handleAddRoomType,
  setNewRoomType,
  newRoomType,
  setShowFormType,
  showFormType,
  roomTypes,
  availableAmenities
}) {
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manajemen Kamar</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-4 w-4" />
          Tambah Kamar
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          onClick={() => setShowFormType(!showFormType)}
        >
          <Plus className="h-4 w-4" />
          Tambah kategori
        </button>
      </div>

      {showForm && (
        <div className="p-4 bg-gray-100 rounded-lg space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="room-name" className="block text-sm mb-1">
                Nama Kamar
              </label>
              <input
                id="room-name"
                type="text"
                value={newRoom.name}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, name: e.target.value })
                }
                className="border px-3 py-2 rounded-lg w-full"
              />
            </div>

            <div>
              <label htmlFor="room-capacity" className="block text-sm mb-1">
                Kapasitas
              </label>
              <input
                id="room-capacity"
                type="number"
                value={newRoom.capacity}
                onChange={(e) =>
                  setNewRoom({
                    ...newRoom,
                    capacity: parseInt(e.target.value),
                  })
                }
                className="border px-3 py-2 rounded-lg w-full"
              />
            </div>

            <div>
              <label htmlFor="room-price" className="block text-sm mb-1">
                Harga per Malam
              </label>
              <input
                id="room-price"
                type="number"
                value={newRoom.pricePerNight}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, pricePerNight: e.target.value })
                }
                className="border px-3 py-2 rounded-lg w-full"
              />
            </div>

            <div>
              <label htmlFor="room-image" className="block text-sm mb-1">
                Gambar Utama
              </label>
              <input
                id="room-image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewRoom({ ...newRoom, mainImage: e.target.files[0] })
                }
                className="border px-3 py-2 rounded-lg w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="room-description" className="block text-sm mb-1">
              Deskripsi
            </label>
            <textarea
              id="room-description"
              value={newRoom.description}
              onChange={(e) =>
                setNewRoom({ ...newRoom, description: e.target.value })
              }
              className="border px-3 py-2 rounded-lg w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="room-available"
              type="checkbox"
              checked={newRoom.isAvailable}
              onChange={(e) =>
                setNewRoom({ ...newRoom, isAvailable: e.target.checked })
              }
            />
            <label htmlFor="room-available" className="text-sm text-gray-700">
              Tersedia
            </label>
          </div>

          <div>
            <select
              value={newRoom.roomTypeId}
              onChange={(e) =>
                setNewRoom({ ...newRoom, roomTypeId: parseInt(e.target.value) })
              }
            >
              <option value="">Pilih Tipe Kamar</option>
              {roomTypes.map((type) => (
                <option key={type.roomTypeId} value={type.roomTypeId}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-4">
            {availableAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={amenity}
                  checked={newRoom.amenities.includes(amenity)}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewRoom((prev) => ({
                      ...prev,
                      amenities: prev.amenities.includes(value)
                        ? prev.amenities.filter((a) => a !== value)
                        : [...prev.amenities, value],
                    }));
                  }}
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleAddRoom}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Tambah Kamar
          </button>
        </div>
      )}

      {showFormType && (
        <div className='p-4 bg-gray-100 rounded-b-lg space-y-4'>
          <div className='grid md:grid-cols-2 gap-4'>
            <div>
              <input
                type="text"
                value={newRoomType.name || ""}
                onChange={(e) =>
                  setNewRoomType({ ...newRoomType, name: e.target.value })
                }
                placeholder="Nama Tipe Kamar"
                className="border px-3 py-2 rounded-lg mr-2"
              />
              <button
                onClick={handleAddRoomType}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Tambah Tipe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kartu kamar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Memuat data kamar...</p>
        ) : (
          (Array.isArray(rooms) ? rooms : []).map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
            >
              <div className="aspect-video bg-gray-200 relative">
                {room.mainImageUrl ? (
                  <img
                    src={`http://localhost:5116${room.mainImageUrl}`}
                    alt="Gambar Kamar"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <span
                  className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${room.isAvailable
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {room.isAvailable ? "Tersedia" : "Tidak Tersedia"}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{room.name}</h3>
                <p className="text-gray-600 text-sm">{room.roomTypeId}</p>
                <p className="text-gray-600 text-sm">{room.description}</p>
                <p className="text-sm mt-1">Kapasitas: {room.capacity} orang</p>
                <p className="text-blue-600 font-bold mt-1">
                  {formatCurrency(room.pricePerNight)}
                </p>
                {room.amenities && room.amenities.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    {room.amenities.map((a, idx) => (
                      <span key={idx} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                        {a.name}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700">
                    <Edit3 className="inline h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button className="border border-red-300 text-red-600 py-2 px-3 rounded-lg text-sm hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function GalleryLayout({
  loading,
  gallery,
  galleryForm,
  setGalleryForm,
  handleUploadGallery,
  rooms,
}) {
  return (
    <div className="space-y-6 p-4">
      {/* Header & Form Upload */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Galeri Foto</h2>
        <form
          onSubmit={handleUploadGallery}
          className="flex flex-col md:flex-row gap-2 items-start md:items-center w-full md:w-auto"
        >
          {/* title */}
          <input
            type="text"
            placeholder="Title"
            value={galleryForm.title}
            onChange={(e) =>
              setGalleryForm({ ...galleryForm, title: e.target.value })
            }
            className="border rounded-lg px-3 py-2 text-sm w-full md:w-auto"
            required
          />
          {/* Deskripsi */}
          <input
            type="text"
            placeholder="Deskripsi"
            value={galleryForm.description}
            onChange={(e) =>
              setGalleryForm({ ...galleryForm, description: e.target.value })
            }
            className="border rounded-lg px-3 py-2 text-sm w-full md:w-auto"
            required
          />

          {/* Gambar */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setGalleryForm({ ...galleryForm, imageFile: e.target.files[0] })
            }
            className="border rounded-lg px-3 py-2 text-sm w-full md:w-auto"
            required
          />

          {/* Kategori */}
          <select
            value={galleryForm.category}
            onChange={(e) =>
              setGalleryForm({ ...galleryForm, category: e.target.value, roomId: "" }) // reset roomId saat kategori berubah
            }
            className="border rounded-lg px-3 py-2 text-sm w-full md:w-auto"
            required
          >
            <option value="">Pilih Kategori</option>
            <option value="rooms">Kamar</option>
            <option value="facilities">Fasilitas</option>
            <option value="exterior">Eksterior</option>
            <option value="common">Area Umum</option>
          </select>

          {/* Pilih Kamar hanya jika kategori rooms */}
          {galleryForm.category === "rooms" && (
            <select
              value={galleryForm.roomId}
              onChange={(e) =>
                setGalleryForm({ ...galleryForm, roomId: e.target.value })
              }
              className="border rounded-lg px-3 py-2 text-sm w-full md:w-auto"
              required
            >
              <option value="">Pilih Kamar</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          )}

          {/* Tombol Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
          >
            <Plus className="h-4 w-4" />
            Upload
          </button>
        </form>
      </div>

      {/* Gallery Section */}
      {loading ? (
        <div className="flex justify-center items-center py-12 text-gray-500">
          Memuat galeri...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.length > 0 ? (
            gallery.map((photo, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group shadow-sm"
              >
                {photo.imageUrl ? (
                  <img
                    src={`http://localhost:5116${photo.imageUrl}`}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                )}

                {/* Overlay saat hover */}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-2">
                    <button className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 shadow">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 shadow">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white rounded-full text-red-600 hover:bg-red-100 shadow">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {/* Deskripsi Foto */}
                <div className="px-3 py-2 bg-white border-t text-sm text-gray-700">
                  {photo.description || "Tidak ada deskripsi"}
                </div>
                <div className="px-3 py-2 bg-white border-t text-sm text-gray-700">
                  {photo.title || "Tidak ada title"}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">Belum ada galeri yang diunggah.</p>
          )}
        </div>
      )}
    </div>
  );
}

function BookingLayout({
  bookings,
  formatCurrency,
  getStatusColor
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manajemen Booking</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Booking Baru
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari booking..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kamar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((b, booking) => (
                <tr key={booking} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{b.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{b.roomId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{new Date(b.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{new Date(b.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(b.status)}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                    {formatCurrency(b.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ReviewLayout({
  reviews
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manajemen Review</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari review..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Semua Rating</option>
              <option>5 Bintang</option>
              <option>4 Bintang</option>
              <option>3 Bintang</option>
              <option>2 Bintang</option>
              <option>1 Bintang</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {reviews.map(review => (
            <div key={review.id} className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{review.guestName}</h4>
                  <p className="text-sm text-gray-500">Kamar {review.roomId} • {review.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{review.rating}/5</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{review.comment}</p>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Balas Review
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function KosAdminDashboard() {

  const availableAmenities = ["Wifi", "AC", "Parking", "Coffee", "Restaurant"];
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormType, setShowFormType] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [newRoomType, setNewRoomType] = useState({
    name: "",
  });
  const [newRoom, setNewRoom] = useState({
    name: "",
    description: "",
    capacity: 0,
    isAvailable: true,
    pricePerNight: "",
    mainImage: null,
    roomTypeId: "",
    amenities: [],
  });
  const [gallery, setGallery] = useState([]);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    description: '',
    imageFile: null,
    roomId: '',
    category: '',
  });
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    totalBookings: 0,
    monthlyRevenue: 0,
    pendingReviews: 0
  });

  //untuk roomtype
  useEffect(() => {
    fetch(API_BASE_ROOMTYPE)
      .then(res => res.json())
      .then(data => {
        const types = data.$values || [];
        setRoomTypes(types);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddRoomType = async (e) => {
    e.preventDefault();
    const res = await fetch(API_BASE_ROOMTYPE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoomType),
    });

    if (res.ok) {
      const added = await res.json();
      setRoomTypes((prev) => [...prev, added]);
      setNewRoomType({ name: "" });
      setShowFormType(false);
    } else {
      alert("Gagal menambahkan tipe kamar");
    }
  };

  //untuk format uang
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  //untuk format warna status
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'checked-in': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  //untuk roomview
  useEffect(() => {
    fetch(API_BASE_ROOM)
      .then(res => res.json())
      .then(data => {

        if (Array.isArray(data)) {
          setRooms(data);
        } else if (Array.isArray(data.$values)) {
          setRooms(data.$values);
        } else {

          setRooms([]); // fallback
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  //untuk handle add room
  const handleAddRoom = async () => {
    const formData = new FormData();
    formData.append("Name", newRoom.name);
    formData.append("Description", newRoom.description);
    formData.append("Capacity", newRoom.capacity);
    formData.append("IsAvailable", newRoom.isAvailable);
    formData.append("PricePerNight", parseFloat(newRoom.pricePerNight));
    if (newRoom.mainImage) {
      formData.append("MainImage", newRoom.mainImage);
    }
    formData.append("RoomTypeId", newRoom.roomTypeId);
    newRoom.amenities.forEach((amenity) => {
      formData.append("Amenities", amenity);
    });

    try {
      const res = await fetch(API_BASE_ROOM, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const created = await res.json();
        setRooms((prev) => [...prev, created]);
        setNewRoom({
          name: "",
          description: "",
          capacity: 0,
          isAvailable: true,
          pricePerNight: "",
          mainImage: null,
          roomType: "",
          amenities: []
        });
        setShowForm(false);
      } else {
        alert("Gagal menambahkan kamar");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //untuk gallery
  useEffect(() => {
    fetch(API_BASE_ALLGALLERY)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setGallery(data);
        } else if (Array.isArray(data.$values)) {
          setGallery(data.$values);
        } else {
          setGallery([]);
        }
      })
      .catch(err => console.error("Gagal fetch gallery:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleUploadGallery = async (e) => {
    e.preventDefault();

    // Validasi kategori "rooms" wajib pilih kamar
    if (galleryForm.category === "rooms" && (!galleryForm.roomId || galleryForm.roomId === "")) {
      alert("Pilih kamar terlebih dahulu untuk kategori 'rooms'");
      return;
    }

    const formData = new FormData();
    formData.append("title", galleryForm.title);
    formData.append("Description", galleryForm.description);
    formData.append("ImageFile", galleryForm.imageFile);
    formData.append("Category", galleryForm.category);

    // Hanya kirim RoomId jika kategori "rooms"
    if (galleryForm.category === "rooms") {
      formData.append("RoomId", galleryForm.roomId);
    }

    console.log("galleryForm", galleryForm);


    try {
      const res = await fetch(API_BASE_GALLERY, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const newImage = await res.json();
        setGallery((prev) => [...prev, newImage]);
        setGalleryForm({
          title: "",
          description: "",
          imageFile: null,
          roomId: "",
          category: ""
        });
      } else {
        const errText = await res.text();
        console.error("Gagal upload gambar:", errText);
        alert("Gagal upload gambar");
      }
    } catch (err) {
      console.error("Upload gagal:", err);
    }
  };

  //untuk Booking
  useEffect(() => {
    fetch(API_BASE_BOOKING)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else if (Array.isArray(data.$values)) {
          setBookings(data.$values);
        } else {
          setBookings([]);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  //Reviews
  useEffect(() => {
    fetch(API_BASE_REVIEW)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else if (Array.isArray(data.$values)) {
          setReviews(data.$values);
        } else {
          setReviews([]);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Update dashboard data when other data changes
  useEffect(() => {
    const validRooms = Array.isArray(rooms) ? rooms : [];
    const validBookings = Array.isArray(bookings) ? bookings : [];
    const validReviews = Array.isArray(reviews) ? reviews : [];

    const occupiedRooms = Array.isArray(rooms)
      ? rooms.filter(room => room.status === 'occupied').length
      : 0;
    const totalRevenue = validBookings.reduce((acc, booking) => {
      return acc + (booking.totalPrice || booking.price || 0);
    }, 0);
    const pendingReviews = validReviews.filter(review => !review.isApproved).length;

    setDashboardData({
      totalRooms: validRooms.length,
      occupiedRooms,
      totalBookings: validBookings.length,
      monthlyRevenue: totalRevenue,
      pendingReviews
    });
  }, [rooms, bookings, reviews]);

  const DashboardView = () => (
    <div className="space-y-6">
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Kamar</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardData.totalRooms}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Kamar Terisi</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardData.occupiedRooms}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Booking</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardData.totalBookings}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Booking Terbaru</h3>
          <div className="space-y-4">
            {bookings.slice(0, 5).map(booking => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{booking.guestName}</p>
                  <p className="text-sm text-gray-600">Kamar {booking.roomId}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Review Terbaru</h3>
          <div className="space-y-4">
            {reviews.slice(0, 5).map(review => (
              <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{review.guestName}</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">{review.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading && activeTab === 'dashboard') {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Memuat data...</div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'booking': return <BookingLayout{...{
        bookings,
        formatCurrency,
        getStatusColor
      }} />;
      case 'room': return <RoomLayout {...{
        rooms,
        loading,
        newRoom,
        setNewRoom,
        showForm,
        setShowForm,
        handleAddRoom,
        formatCurrency,
        handleAddRoomType,
        newRoomType,
        setNewRoomType,
        roomTypes,
        setShowFormType,
        showFormType,
        availableAmenities
      }} />;
      case 'review': return <ReviewLayout{...{
        reviews
      }} />;
      case 'gallery': return <GalleryLayout{...{
        loading,
        gallery,
        galleryForm,
        setGalleryForm,
        handleUploadGallery,
        rooms
      }} />;
      default: return <DashboardView />;
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'booking', label: 'Booking', icon: BookOpen },
    { id: 'room', label: 'Kamar', icon: Bed },
    { id: 'review', label: 'Review', icon: Star },
    { id: 'gallery', label: 'Galeri', icon: Camera },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            {sidebarOpen && <h1 className="text-xl font-bold text-gray-900">Admin Kos</h1>}
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.map(item => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <IconComponent className="h-5 w-5" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900">
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="text-sm">
                  <p className="font-medium">Admin</p>
                  <p className="text-gray-500">admin@kos.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}