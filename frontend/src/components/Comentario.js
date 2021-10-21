import { useEffect, useRef, useState } from "react"
import {connect} from 'react-redux'
import Swal from 'sweetalert2'

const Comentario = (props) => {
	const [modificarComentario, setModificarComentario] = useState(false)
	const usuario = props.comentario.userId._id === props._id
	const capturarInput = useRef()

	useEffect(() =>{
		setModificarComentario(false)
	},[props.renderizado])

	const confirmarBorrado = () => {
	Swal.fire({
		title: 'Are you sure?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'
	  }).then((result) => {
		if (result.isConfirmed) {
			props.borrar(props.itinerarioId, props.comentario._id, props.token)
		  Swal.fire(
			'Deleted!',
			'Your comment has been deleted.',
			'success'
		  )
		}
	  })
	}

	const comentario = 	<div> 
								
							{!modificarComentario ? <div className="comentariosTexto">
														<div className="cajaDeFotoDeComentarios">
															<div className="fotoComentarios" style={{backgroundImage: `url('${props.comentario.userId.imagen}')`}}></div>
															<p >{props.comentario.userId.nombre} {props.comentario.userId.apellido}</p>
														</div>
														<p className="comentarioDeUsuario comentarioDeUsuarioLogeado">{props.comentario.comment}</p>														
													</div>
							:<div className="inputParaModificar">
								<div className="cajaDeFotoDeComentarios">
									<div className="fotoComentarios" style={{backgroundImage: `url('${props.comentario.userId.imagen}')`}}></div>
									<p>{props.comentario.userId.nombre} {props.comentario.userId.apellido}</p>
								</div>
								<div className="cajaDeModificarInput">
									<input className="inputDeUsuario" type="text" ref={capturarInput} defaultValue={props.comentario.comment}/>
									<button  className="botonesDeComentarios" onClick={() => props.editar(props.comentario._id, capturarInput.current.value,props.token)}>✔</button>
								</div>		
							</div>	
							}
							<div className="fotoParaEditarYBorrar">
								<button className="botonesDeComentarios" onClick={()=>setModificarComentario(!modificarComentario)}>✏️</button>
								<button className="botonesDeComentarios" onClick={confirmarBorrado }>❌</button>	
							</div>		
						</div>
								
	const comentarioARenderizar = usuario ? comentario : <div className="comentariosTexto">
															<div className="cajaDeFotoDeComentarios">
																<div className="fotoComentarios" style={{backgroundImage: `url('${props.comentario.userId.imagen}')`}}></div>
																<p>{props.comentario.userId.nombre} {props.comentario.userId.apellido}</p>
															</div>
															<p className="comentarioDeUsuario">{props.comentario.comment}</p>
														</div>

	return(
		<div>
			{comentarioARenderizar}
		</div>
	)
}

const mapStateToProps = (state) =>{
	return{
		token: state.usuario.token,
		_id: state.usuario._id
	}
}

export default connect(mapStateToProps)(Comentario)
