import './estilos/Footer.css';
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2025 ENTRENOSOTROS BARBER | Todos los derechos reservados</p>
                <a href="https://www.instagram.com/entrenosotrosbarber" target="_blank" rel="noopener noreferrer" className='instagram'>
                    <FaInstagram />
                </a>
                <a href="https://wa.me/+543512715524" target="_blank" rel="noopener noreferrer" className='whatsapp'>
                    <FaWhatsapp />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
