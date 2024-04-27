
import logoImg from './assets/fondo/Logo.png'; // Importa la imagen con require
import './Logo.css'; // Importa los estilos CSS

const Logo = ({ alt, logo }) => {
    return <img src={logoImg} alt={alt} className="logo" />;
};

export default Logo;
