import { useState } from 'react';
import './estilos/Navbar.css';
import BotonComponent from './BotonComponent';

function NavbarComponent() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container-fluid">
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={toggleMenu}
                >
                    ☰
                </button>
                <div className={`navbar-collapse ${isOpen ? "show" : ""}`}>
                    <ul className="navbar-nav">
                        <li className="nav-item" onClick={closeMenu}>
                            <BotonComponent ruta={'/'} nombre={'Reservar Turno'} />
                        </li>
                        <li className="nav-item" onClick={closeMenu}>
                            <BotonComponent ruta={'/Trabajos'} nombre={'Trabajos'} />
                        </li>
                        <li className="nav-item" onClick={closeMenu}>
                            <BotonComponent ruta={'/Ubicacion'} nombre={'Ubicación'} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavbarComponent;
