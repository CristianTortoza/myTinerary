const itinirariosReducers = (state = {
	itinerarios: [],
	todosItineraios: [],
}, 
action) =>{
	switch(action.type){
		case "OBTENER_TODOS_LOS_ITINERARIOS":
			return{	
				...state,
				todosItineraios: action.payload
			}
		case "OBTENER_LOS_ITINERARIOS_DE_LA_CIUDAD":
			return{
				...state,
				itinerarios: action.payload
			}		
		default:
			return state	
	}
	
}

export default itinirariosReducers