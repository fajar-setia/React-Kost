import { Route, Routes } from 'react-router-dom'
import './App.css'
import KosanHomepage from './pages/User/Home'
import Navbar from './components/NavBar'
import KosAdminDashboard from './pages/Admin/Dashboard'
import Kamar from './pages/User/Kamar'
import Footer from './components/Footer'
import Gallery from './pages/User/Gallery'
import PesananKamar from './pages/Boking/PesananKamar'

function App() {

  return (
    <>
      <Navbar/>
        <Routes>
          {/* <Route path='/' element={<KosanHomepage/>} /> */}
          <Route path='/' element={<KosAdminDashboard/>} />
          <Route path='/Kamar' element={<Kamar/>}/>
          <Route path='/Gallery' element={<Gallery/>}/>
         <Route path="/PesananKamar/:roomId" element={<PesananKamar />} />
        </Routes>
      <Footer/>
    </>
  )
}

export default App
