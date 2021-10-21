import { useEffect, useState } from "react"
import Activities from "./Activities"
import {connect} from 'react-redux'
import itinerarioActions from "../redux/actions/itinerariosActions"
import Swal from 'sweetalert2'
import Comentarios from "./Comentarios"
import actividadesActions from "../redux/actions/actividadesActions"

const Itinerary = (props) => {
	const [boton, setBoton] = useState('View More')
	const [cambioDeClase, setCambioDeClase] = useState('d-none')
	const [imagenConMegusta, setImagenConMegusta] = useState(false)
	const fotos = [] 
	const itinerario = props.itinerario
	const {autor, duracion, hashtags, idiomaAOfrecer, imagen, precio, titulo}= itinerario
	const [actividades, setActividades] = useState([])
	useEffect(() =>{	
		if(props.itinerario.corazones.includes(props._id)){
			setImagenConMegusta(!imagenConMegusta)
		}
		return() =>	setImagenConMegusta(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

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

	const cambiarBoton = ()=> {
		if(boton === 'View More' && actividades.length <= 0){
				props.obtenerActividadesPorItinerarios(props.itinerario._id)
				.then((response) => setActividades(response.data.response))
				.catch((error) => console.log(error))	
		}
		const cambio = boton === 'View More' ? 'View Less' : 'View More';   
		setBoton(cambio);
		const cambio2 = cambioDeClase === 'd-none' ? 'd-block' : 'd-none';
		setCambioDeClase(cambio2)
	}

	const cambiarCorazon = async () =>{
		if(props.token){
			let respuesta = await props.darMeGustaYSacarMeGusta(props.itinerario._id, props.token)
			if(respuesta.data.success){
				props.obtenerItinerarios(props.id)
				setImagenConMegusta(!imagenConMegusta)
			}
		}else{
			Toast.fire({
				icon: 'info',
				title:	"You must be logged in to like a post",		
		  })
		}
	}

	for(let i = 0; i < precio; i++){
		fotos.push('/assets/billete.png')
	}
	
	const imagenDeMegusta = imagenConMegusta ? "/assets/heart2.png" : "/assets/heart1.png"
	
	return(
		<div className="mainItinerario">	
			<div className="contenedorItinerario">
				<div className="headerContenedorItinerario">
					<div className="imagenItinerario">
						<div className="imagenItinerarioPresentacion" style={{backgroundImage: `url('${imagen}')`}}>
							<div className="hashtagsItinerario">{hashtags.map((tag, index) => <h6 key={index}>#{tag}</h6>)}</div>
						</div>
					</div>
					<div className="informacionItinerario">
						<div className="imagenYNombre">
							<div className="nombreYImagen">
								<div className="imagenAutor" style={{backgroundImage: `url('${autor.imagen}')`}}></div>
								<h4>{autor.nombre}</h4>
							</div>
							<div className="cajaCorazones">	
								<div className="imagenCorazon" onClick={cambiarCorazon} style={{backgroundImage: `url("${imagenDeMegusta}")`}}>
								</div>
								<div></div>
								<h4>{props.itinerario.corazones.length}</h4>
							</div>		
						</div>
						<div className="tituloItinerario">
							<h2>{titulo.titulo}</h2>
							<h4>{titulo.subtitulo}</h4>
						</div>
						<div className="PrecioHorarioItinerario">
							<div className="iconosItinerario">
								<div className="horario">
									<img src="/assets/clock.png" alt="logoReloj"/><h6>{duracion}</h6> <h6>hours</h6>
								</div>
								<div className="precio">		
									<h6>Price :</h6>
									{fotos.map((fotito, index) =><img src={fotito} alt="imagemoney" key={index}/>)}
								</div>
							</div>
							<div className="idiomaItinerario">
								<h6>Offered in:</h6>
								{idiomaAOfrecer.map((idioma, index) =><h6 key={index}>-{idioma}</h6>)}
							</div>
						</div>
					</div>	
				</div>
				<div className="botonItinerario">	
					<div className={cambioDeClase}>
						<div className="comentariosYActividades">
								<div className="contenedorDeComentarios">	
								<Comentarios idItinerario={props.itinerario._id} comentarios={props.itinerario.comments}/>	
								</div>
							<div className="actividadesCajaImagenes">
								{actividades.length <= 0 ? <div className="gifCargando" style={{backgroundImage: 'url("/assets/loading.gif")'}}></div> : <Activities actividades={actividades}/>}	
							</div>
						</div>		
					</div>
					<div className="cajaBoton">
						<button className="botonItinerario" onClick={cambiarBoton}>{boton}</button>
					</div>	
				</div>
			</div>	
		</div>
	)
}

const mapStateToProps = (state) =>{
	return{
		token: state.usuario.token,
		_id: state.usuario._id
	}
}

const mapDispatchToProps = {
	darMeGustaYSacarMeGusta: itinerarioActions.darMeGustaYSacarMeGusta,
	obtenerItinerarios: itinerarioActions.obtenerLosItinerariosDeLaCiudad,
	obtenerActividadesPorItinerarios: actividadesActions.obtenerActividadesPorItinerarios
}


export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)









		