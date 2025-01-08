
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import ReservaTurno from './components/ReservarTurno'; // Ajusta la importación según sea necesario
import Footer from './components/Footer';
import './app.css';
import logo from './logo/ENTRENOSOTROS.png';
import Trabajos from './components/Trabajos';
import   Ubicacion from './components/Ubicacion';




const App = () => {
    return (
        <div className="app-container">
            <img src={logo} alt="Masche Barber" />
            <Router>
                <NavbarComponent />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<ReservaTurno />} />
                        <Route path="/Trabajos" element={<Trabajos />} />
                        <Route path='/Ubicacion' element={<Ubicacion />} />
                    </Routes>
                </div>
            </Router>
            <Footer />
        </div>
    );
};

export default App;

