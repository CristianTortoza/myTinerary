import axios from "axios";

const usuarioActions = {
	ingresarUsuario: (usuario)=>{
		return async (dispatch)=>{
			try{	
				let response = await axios.post('http://localhost:4000/api/login', usuario)
				let data = response.data.response
				if(response.data.success){
					dispatch({type: 'INGRESAR_CREAR_USUARIO', payload: data})
				}
				return response
			}catch(e){
				return {success: false, error: e.message}
			}
		}
	},
    crearUsuario: (usuarioNuevo)=> {
		return async (dispatch)=>{
			try{
				let response = await axios.post('http://localhost:4000/api/signup', usuarioNuevo)
				let data = response.data.response
				if(response.data.success){
					dispatch({type: 'INGRESAR_CREAR_USUARIO', payload: data})
				}
				return response
			}catch(e){
				return {success: false, error: e.message}
			}
		}
	},

	desconectarUsuario: () =>{
		return(dispatch) =>{
			dispatch({type:'SALIR'})
		}
	},

	verificar: (token) =>{
		return async(dispatch) =>{
			try{
				let respuesta = await axios.get('http://localhost:4000/api/verifyToken', {
					headers: {
						Authorization: 'Bearer ' + token
					}
				})
				dispatch({type: 'INGRESAR_CREAR_USUARIO', payload: {
					token,
					nombre: respuesta.data.nombre,
					imagen: respuesta.data.imagen,
					_id: respuesta.data._id
				}
				})
			}catch(error){
			 	return dispatch({type:'SALIR' })
			}	
		}
	}
}

export default usuarioActions