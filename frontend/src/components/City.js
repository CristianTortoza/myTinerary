import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Footer from "./Footer"
import CardCity from "./CardCity"
import NavBar from "./Header/NavBar"
import Preloader from "./Preloader"
import Swal from 'sweetalert2'
import Itinerary from "./Itinerary"
import { connect } from "react-redux"
import ciudadesActions from "../redux/actions/ciudadesActions"
import itinerarioActions from "../redux/actions/itinerariosActions"
import NotItinerary from "./NotItinerary"


const City = (props) =>{
	const[cargando, setCargando] = useState(true)
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
		  toast.addEventListener('mouseenter', Swal.stopTimer)
		  toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	  })
	
	useEffect(() =>{
		window.scrollTo(0, 0)
		if(props.ciudades.length === 0){
			Toast.fire({
				icon: 'error',
				title: 'Oops... Something went wrong!!'
			  })
			props.history.push('/cities')
			return false
		}
			props.obtenerUnaCiudad(props.match.params.id)
			props.obtenerItinerarios(props.match.params.id)
			setCargando(false)			
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	if (cargando){
		return <Preloader />
	}
	

	return(
		<div>
			<div className="NavBar">
				<NavBar/>
			</div>
			<div className="fondoCiudad" style={{backgroundImage: `url('${props.ciudad.fotoHeader}')`}}>
				<div className="tarjetaDeCiudad">	
					<div className="tituloCiudad">
						<h1>Welcome to {props.ciudad.nombre}</h1>
					</div>
					<div className="carouselContenedorTarjeta">	
						<div className="carouselTarjeta">
							<CardCity ciudad={props.ciudad}/>
						</div>	
					</div>		
				</div>
			</div>
			<div className="itinerario">
				{props.itinerarios.length > 0 ?( props.itinerarios.map((itinerario) => <Itinerary  key={itinerario._id} itinerario={itinerario} id={props.match.params.id}/>))
				: <NotItinerary/>} 
			</div>	
			<div className="contenidoBoton">
				<Link to="/cities"><button className="botonCiudad" >Back to Cities</button></Link>
			</div>
			<Footer/>
		</div>	
	)
}

const mapStateToProps =(state)=> {
	return{
		ciudad: state.ciudades.unaCiudad,
		ciudades: state.ciudades.listaCiudades,
		itinerarios: state.itinerarios.itinerarios
	}
}
 
const mapDispatchToProps = { 
	obtenerUnaCiudad: ciudadesActions.obtenerUnaCiudad,  
	obtenerItinerarios: itinerarioActions.obtenerLosItinerariosDeLaCiudad
}

export default connect(mapStateToProps, mapDispatchToProps)(City)
