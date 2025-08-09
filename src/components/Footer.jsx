import { Home, Phone, MapPin, Star } from 'lucide-react';
import LogoKost from '../assets/bg/logoKost.png'

function Footer() {

  return (
    <footer className="bg-stone-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-15 h-15 bg-gradient-to-br from-white to-white rounded-xl flex items-center justify-center">
                <img src={LogoKost} alt="logo kost" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
                Kos Ji?
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed max-w-md mb-6">
              Hunian premium yang mengutamakan kenyamanan, keamanan, dan kepuasan penghuni. Bergabunglah dengan keluarga besar Kos Mawar.
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
              ))}
              <span className="ml-2 text-stone-400">4.9/5 dari 200+ penghuni</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Kontak</h4>
            <div className="space-y-3 text-stone-400">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>Jl. Mawar No. 123, Jakarta</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Jam Operasional</h4>
            <div className="space-y-2 text-stone-400">
              <div>Senin - Jumat: 08:00 - 20:00</div>
              <div>Sabtu - Minggu: 09:00 - 18:00</div>
              <div className="text-emerald-400 font-medium">Online 24/7</div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-stone-400">
          <p>© 2025 Kos Mawar. Semua hak cipta dilindungi undang-undang.</p>
        </div>
      </div>
    </footer>
  );
}export default Footer