const CardCity = (props) => {
  const {banderaPais, idioma, moneda, pais} = props.ciudad
  return (
      <div className="tarjetaCiudad">
        <div className="headerTarjeta">
          <h3>{pais}</h3>
          <img src={banderaPais} className="banderaLogo" alt="logoBandera"/>
        </div>
        <div className="bodyTarjeta" > 
          <div className="informacionTarjetas">    
            <img src="/assets/lenguaje.png" alt="logomoneda "/>
            <p>{idioma}</p>
          </div>
          <div className="informacionTarjetas">    
            <img src="/assets/monedas.png" alt="logomoneda "/>
            <p>{moneda}</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default CardCity;