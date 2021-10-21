const usuarioReducers = (state = {token: null, nombre: null, imagen: null, _id: null},
action) =>{
	switch(action.type){
		case 'INGRESAR_CREAR_USUARIO':
			localStorage.setItem('token', action.payload.token)
			localStorage.setItem('nombre', action.payload.nombre)
			localStorage.setItem('imagen', action.payload.imagen)
			localStorage.setItem('_id', action.payload._id)
			return{	
				token: action.payload.token,
				nombre: action.payload.nombre,
				imagen: action.payload.imagen,
				_id: action.payload._id
			}
		case "SALIR":
			localStorage.removeItem('token')
			localStorage.removeItem('nombre')
			localStorage.removeItem('imagen')
			localStorage.removeItem('_id')
			return{
				token: null,
				nombre:null,
				imagen:null,
				_id:null,
			}		
		default:
			return state	
	}
	
}

export default usuarioReducers
