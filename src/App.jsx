
import ReservaTurno from './components/ReservarTurno';
import Footer from './components/Footer';
import './app.css'; 
import logo from './logo/MASCHEBARBER.png';

const App = () => {
    return (
        <div className="app-container">
            <img src={logo} alt="Masche Barber" /> 
            <h1>Reserva tu Turno!</h1>
            <div className="content">
                <ReservaTurno />
            </div>
            <Footer />
        </div>
    );
};

export default App;
