import { Route, Routes } from 'react-router-dom'
import './App.css'
import KosanHomepage from './pages/User/Home'
import Navbar from './components/NavBar'
import KosAdminDashboard from './pages/Admin/Dashboard'
import Kamar from './pages/User/Kamar'
import Footer from './components/Footer'
import Gallery from './pages/User/Gallery'
import PesananKamar from './pages/Boking/PesananKamar'
import DetailKamar from './pages/viewRoom/detailRoom'
import EnhancedKosanHomepage from './pages/User/Home'
import CardBooking from './pages/User/coba'
import Ulasan from './pages/viewRoom/ulasan'

function App() {

  return (
    <>
      <Navbar />
      <Routes>

        {/* <Route path='/' element={<CardBooking />} /> */}
        {/* <Route path='/' element={<EnhancedKosanHomepage />} /> */}
        <Route path='/' element={<KosAdminDashboard/>} />
        
        <Route path='/Kamar' element={<Kamar />} />
        <Route path='/Gallery' element={<Gallery />} />
        <Route path="/PesananKamar/:roomId" element={<PesananKamar />} />
        <Route path="/detailRoom/:roomId" element={<DetailKamar />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
