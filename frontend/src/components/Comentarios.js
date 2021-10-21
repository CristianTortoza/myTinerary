import { useRef, useState } from 'react'
import {connect} from 'react-redux'
import itinerarioActions from "../redux/actions/itinerariosActions"
import Comentario from './Comentario'
import Swal from 'sweetalert2'


const Comentarios = (props) => {
	const [comentariosTotales, setComentariosTotales] = useState(props.comentarios)
	const [renderizar, setRenderizar]  = useState(false)
	const capturarInput = useRef()

	const postearComentario = () => {
		let comentario = capturarInput.current.value
		props.agregarComentarios(props.idItinerario,comentario, props.token)
		.then((res) =>{
			setComentariosTotales(res.response)
			capturarInput.current.value = ''})
		.catch((error) => console.log(error))
	}

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

	const alerta = () => {
		Toast.fire({
			icon: 'info',
			title: "You must be logged in to comment a post"
		  }) 
	}



	const renderizadoDeComentarios = (ItinerarioId, comentarioId, token) => {
		props.borrarComentario(ItinerarioId, comentarioId, token)
		.then((res) =>{
			if(res.success){
				setComentariosTotales(comentariosTotales.filter(comentario => comentario._id!==comentarioId))
			}
			else throw new Error()
		})
		.catch((error) => console.log(error))
	}

	const comentarioAEditar= (commentId, comment, token) =>{
		props.editarComentario(commentId, comment, token)
		.then((res) => {
			if(res.success){
				comentariosTotales.forEach((comentario) =>{
					if(comentario._id === commentId){
						comentario.comment=comment
					}
				})
				setComentariosTotales(comentariosTotales)
				setRenderizar(!renderizar)
			}
		})
		.catch((error) => console.log(error))

	} 

	return(
		<div className="comentariosCaja">
			<div className="tituloComentarios">
				<h3>Comments</h3>
			</div>
			<div className="comentariosComponente">
				{comentariosTotales.map((comentario) => <Comentario 
				renderizado={renderizar}
				key={comentario._id} comentario={comentario} 
				editar={comentarioAEditar}
				borrar={renderizadoDeComentarios}
				itinerarioId={props.idItinerario}/>)}
			</div>
			<div className="inputComentarios">
				<input placeholder={!props.token ? "You have to login to comment" : ''} ref={capturarInput} type="text"/> {/* hace disable*/ }
				<div  className="imagenInputComentarios" 
					onClick={!props.token ? alerta :postearComentario}
					style={{backgroundImage: 'url("/assets/enviar.png")'}}>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) =>{
	return{
		token: state.usuario.token
	}
}

const mapDispatchToProps = {
	agregarComentarios: itinerarioActions.agregarComentarios,
	borrarComentario: itinerarioActions.borrarComentario,
	editarComentario: itinerarioActions.editarComentario,
}	


export default connect(mapStateToProps, mapDispatchToProps)(Comentarios)