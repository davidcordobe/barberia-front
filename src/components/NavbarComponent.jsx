import './estilos/Navbar.css';
import BotonComponent from './BotonComponent';

function NavbarComponent() {
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <BotonComponent ruta={'/'} nombre={'Reservar Turno'} />
                            </li>
                            <li className="nav-item">
                                <BotonComponent ruta={'/Trabajos'} nombre={'Trabajos'} />
                            </li>
                            <li className="nav-item">
                                <BotonComponent ruta={'/Ubicacion'} nombre={'Ubicación'} />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavbarComponent;

