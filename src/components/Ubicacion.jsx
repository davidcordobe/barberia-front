import './estilos/Ubicacion.css'

const Ubicacion = () => {
    return (
        <div className="map-container">
            <h2>Ubicación de EntreNosotrosBarber</h2>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.1930344012767!2d-64.170320625396!3d-31.436352297214967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a2c3c59de5ef%3A0xf8389dc7ba74fb6f!2sMonserrat%202354%2C%20X5014%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1722988887964!5m2!1ses-419!2sar"
                width="500"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};

export default Ubicacion;