import CarouselMain from "./Main/Carousel"
import Tarjeta from "./Main/Tarjeta"
import { Link } from 'react-router-dom';

const Main = () =>{
	return(
		<div className="mainAltura">
			<div className="tituloYBotonHeader p-1">	
				<div className="d-flex flex-column p-2">	
					<h2>Choose your destination !</h2>
					<div>
						<Link to="/Cities"><button className="botonHeader animate__animated animate__pulse animate__infinite">CLICK HERE ! </button></Link>
					</div>	
				</div>	
			</div>	
			<div className="contenedorInformacion container-fluid">
				<div className="row col-12">
					<Tarjeta/>
				</div>	
			</div>
		
			<div className="tituloCarousel">
				<h3 className="tituloCarouselH3">Popular MYtineraries</h3>	
			</div>	
			<div className="carouselFotos">
				<CarouselMain/>
			</div>
		</div>		
	)
}

export default Main