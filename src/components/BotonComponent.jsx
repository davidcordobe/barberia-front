
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function BotonComponent({ ruta, nombre }) {
    return (
        <Link to={ruta}>
            <button className="btn btn-secondary">
                {nombre}
            </button>
        </Link>
    );
}

BotonComponent.propTypes = {
    ruta: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
};

export default BotonComponent;
