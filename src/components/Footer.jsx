import './estilos/Footer.css';
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 MASCHE BARBER | Todos los derechos reservados</p>
                <p>Desarrollado por: Masche Barber</p>
                <a href="https://www.instagram.com/maschebarber.cba" target="_blank" rel="noopener noreferrer" className='instagram'>
                    <FaInstagram />
                </a>
                <a href="https://wa.me/+543517050225" target="_blank" rel="noopener noreferrer" className='whatsapp'>
                    <FaWhatsapp />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
