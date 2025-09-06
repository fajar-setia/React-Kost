import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

// Perbaikan penting: Mengatur ulang URL ikon penanda agar terlihat
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Data lokasi Anda (Anda bisa tambahkan lebih banyak lokasi di sini)
const locationsData = [
  {
    id: 1,
    name: 'Lokasi Utama',
    latitude: -7.845339,
    longitude: 110.393340,
    address: 'Grojogan Wirokerten Kec. Banguntapan Kabupaten Bantul Daerah Istimewa Yogyakarta',
    description: 'Pusat operasional kami dengan fasilitas lengkap.',
  },
];

const LocationPage = () => {
  // Koordinat pusat peta (diambil dari data lokasi pertama)
  const center = [locationsData[0].latitude, locationsData[0].longitude];

  useEffect(() => {
    Aos.init({ duration: 2000, once:true });
  },[])

  return (
    <div className="min-h-screen bg-stone-50 py-16">
      <div data-aos='fade-down' className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h1 className="text-4xl font-bold text-stone-800 mb-4">
          Temukan <span className="text-rose-600">Lokasi Kami</span>
        </h1>
        <p className="text-lg text-stone-600">
          Lihat di mana Anda dapat menemukan kami di peta interaktif di bawah ini.
        </p>
      </div>

      <div className=' p-12 grid grid-cols-2 max-h-screen gap-4'>
        {/* Peta Interaktif - Container telah diperbaiki */}
        <div data-aos='fade-right' className="max-w-7xl rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <MapContainer
            center={center}
            zoom={16} // Zoom disetel lebih dekat untuk satu lokasi
            scrollWheelZoom="ctrl"
            style={{ height: '450px', width: '100%' }}
          >
            {/* TileLayer dengan gaya CartoDB yang modern */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            {/* Loop untuk menampilkan marker dari data lokasi */}
            {locationsData.map(loc => (
              <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
                <Popup>
                  <div className="font-sans">
                    <h3 className="text-lg font-bold text-rose-600">{loc.name}</h3>
                    <p className="text-sm text-stone-700">{loc.address}</p>
                    <p className="mt-2 text-xs italic text-stone-500">{loc.description}</p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${loc.latitude},${loc.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 bg-rose-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors hover:bg-rose-600"
                    >
                      <MapPin size={16} /> Dapatkan Petunjuk Arah
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Bagian Daftar Lokasi */}
        <div data-aos='fade-left' className='w-screen'> 
          <div className="w-full flex items-stretch">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locationsData.map(loc => (
                <div key={loc.id} className="bg-amber-200 p-8 rounded-2xl shadow-lg border border-stone-200 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold text-stone-800 mb-2">{loc.name}</h3>
                  <p className="text-stone-600 mb-4">{loc.address}</p>
                  <div className="text-sm text-stone-500 italic">
                    <span className="font-semibold text-black/90">Koordinat:</span> {loc.latitude}, {loc.longitude}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LocationPage;