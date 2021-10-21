import Carousel from 'react-bootstrap/Carousel'

const Activities = (props) =>{
	return(
		<div>
			<Carousel className="carouselActividades">
				{props.actividades[0].actividades.map((actividad, index) => {
					return(
						<Carousel.Item key={index}>
						<div className="fotoActividad" style={{backgroundImage: `url('${actividad.imagen}')`}}>	
						</div>
						<Carousel.Caption>
						<h4 className="tituloDeActividades">{actividad.titulo}</h4>
						</Carousel.Caption>
						</Carousel.Item>
					)
				})
				}
			</Carousel>
		</div>	
	)
}

export default Activities