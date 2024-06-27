import ReservaTurno from './components/ReservarTurno';
import Footer from './components/Footer';
import './app.css'; // Importa estilos generales de la aplicación

const App = () => {
    return (
        <div className="app-container">
            <img src="./logo/MASCHEBARBER.jpg" alt="Masche Barber" />
            <h1>Reserva tu Turno!</h1>
            <div className="content">
                <ReservaTurno />
            </div>
            <Footer />
        </div>
    );
};

export default App;
