import './estilos/Trabajos.css'
import enConstruccion from '../logo/SITIO-EN-CONSTRUCCION.jpg'; // Importa la imagen directamente

const Trabajos = () => {
    return (
        <div>
            <h2>¡Estamos trabajando en ello!</h2>
            <p>Pronto podrás ver nuestros increíbles trabajos aquí.</p>
            <p>Mientras tanto, disfruta de esta página en construcción.</p>
            <img src={enConstruccion} alt="Página en construcción" className="img-construccion"/>
        </div>
    );
}

export default Trabajos;
