import React, { useState, useEffect } from 'react';
import {
  Home,
  Camera,
  MapPin, Bath, Bed, Coffee, Car, Shield, X, ChevronLeft, ChevronRight, Filter, Grid, List, Loader
} from 'lucide-react';

const API_BASE_GALLERY = "http://localhost:5116/api/gallery";

export default function KosGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_BASE_GALLERY);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // For debugging

        // Handle different response structures
        let galleryData = [];
        if (Array.isArray(data)) {
          galleryData = data;
        } else if (data && Array.isArray(data.$values)) {
          galleryData = data.$values;
        } else if (data && Array.isArray(data.data)) {
          galleryData = data.data;
        } else {
          console.warn('Unexpected API response structure:', data);
          galleryData = [];
        }

        setGallery(galleryData);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
        setError(err.message);
        setGallery([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Calculate category counts dynamically from actual data
  const getCategoryCounts = () => {
    const counts = gallery.reduce((acc, img) => {
      acc[img.category] = (acc[img.category] || 0) + 1;
      return acc;
    }, {});

    return {
      all: gallery.length,
      exterior: counts.exterior || 0,
      rooms: counts.rooms || 0,
      facilities: counts.facilities || 0,
      common: counts.common || 0
    };
  };

  const categoryCounts = getCategoryCounts();

  const categories = [
    { id: 'all', name: 'Semua Foto', count: categoryCounts.all },
    { id: 'exterior', name: 'Eksterior', count: categoryCounts.exterior },
    { id: 'rooms', name: 'Kamar', count: categoryCounts.rooms },
    { id: 'facilities', name: 'Fasilitas', count: categoryCounts.facilities },
    { id: 'common', name: 'Area Bersama', count: categoryCounts.common }
  ];

  const filteredImages = selectedCategory === 'all'
    ? gallery
    : gallery.filter(img => img.category === selectedCategory);

  const openLightbox = (image) => {
    setSelectedImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (filteredImages.length === 0) return;
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    if (filteredImages.length === 0) return;
    const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case 'exterior': return <Home className="w-5 h-5" />;
      case 'rooms': return <Bed className="w-5 h-5" />;
      case 'facilities': return <Bath className="w-5 h-5" />;
      case 'common': return <Coffee className="w-5 h-5" />;
      default: return <Camera className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'exterior': return 'bg-blue-100 text-blue-600';
      case 'rooms': return 'bg-rose-100 text-rose-600';
      case 'facilities': return 'bg-emerald-100 text-emerald-600';
      case 'common': return 'bg-amber-100 text-amber-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case 'exterior': return 'bg-blue-100 text-blue-700';
      case 'rooms': return 'bg-rose-100 text-rose-700';
      case 'facilities': return 'bg-emerald-100 text-emerald-700';
      case 'common': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Memuat Gallery</h2>
          <p className="text-stone-600">Sedang mengambil foto-foto terbaru...</p>
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
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Gagal Memuat Gallery</h2>
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
              <Camera className="w-4 h-4" />
              Gallery Foto Premium
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-800 to-stone-800 bg-clip-text text-transparent">
                Jelajahi
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Kos Mawar
              </span>
            </h1>

            <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed mb-12">
              Lihat sendiri kenyamanan dan kemewahan yang kami tawarkan melalui koleksi foto eksklusif dari setiap sudut Kos Mawar
            </p>

            {/* Stats - Dynamic from actual data */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {gallery.length}
                </div>
                <div className="text-stone-600 font-medium">Foto HD</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {categories.filter(cat => cat.count > 0).length - 1}
                </div>
                <div className="text-stone-600 font-medium">Kategori</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  {categoryCounts.rooms}
                </div>
                <div className="text-stone-600 font-medium">Tipe Kamar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  360°
                </div>
                <div className="text-stone-600 font-medium">Virtual Tour</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & View Toggle */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Categories Filter */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  disabled={category.count === 0 && category.id !== 'all'}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${selectedCategory === category.id
                      ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg'
                      : category.count === 0 && category.id !== 'all'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                    }`}
                >
                  {getCategoryIcon(category.id)}
                  <span>{category.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-200 text-stone-600'
                    }`}>
                    {category.count}
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

      {/* Gallery Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-stone-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-stone-600 mb-2">
                Tidak ada foto di kategori ini
              </h3>
              <p className="text-stone-500">
                Silakan pilih kategori lain untuk melihat foto
              </p>
            </div>
          ) : (
            <div className={`${viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8'
              }`}>
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    } ${viewMode === 'masonry' ? 'break-inside-avoid mb-8' : ''}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onClick={() => openLightbox(image)}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl border border-stone-100">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={`http://localhost:5116${image.imageUrl}`}
                        alt={image.title}
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
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(image.category)}`}>
                          {getCategoryIcon(image.category)}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(image.category)}`}>
                          {categories.find(cat => cat.id === image.category)?.name || 'Lainnya'}
                        </span>
                        {image.dateAdded && (
                          <span className="text-xs text-stone-500 ml-auto">
                            {formatDate(image.dateAdded)}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-stone-800 mb-2">{image.title}</h3>
                      <p className="text-stone-600 leading-relaxed">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center px-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-red-400 transition-all z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {filteredImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 md:left-12 text-white hover:text-rose-400 transition-all z-10"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 md:right-12 text-white hover:text-rose-400 transition-all z-10"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          <div className="max-w-4xl w-full relative">
            <img
              src={`http://localhost:5116${selectedImage.imageUrl}`}
              alt={selectedImage.title}
              className="w-full rounded-xl shadow-2xl max-h-[80vh] object-contain"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzM3NDE0OSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5HYW1iYXIgVGlkYWsgRGl0ZW11a2FuPC90ZXh0Pjwvc3ZnPg==';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-white/90 mb-2">{selectedImage.description}</p>
              {selectedImage.dateAdded && (
                <p className="text-white/70 text-sm">
                  Ditambahkan: {formatDate(selectedImage.dateAdded)}
                </p>
              )}
              {filteredImages.length > 1 && (
                <div className="mt-3 text-sm text-white/80">
                  {currentImageIndex + 1} dari {filteredImages.length} foto
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}