import axios from 'axios'

const actividadesActions = {
	obtenerActividadesPorItinerarios: (id) =>{
		return async (dispatch) =>{
			try{
				let response = await axios.get(`http://localhost:4000/api/activities/${id}`)

				return response
			}catch(e){
				return({success: false, response: e})
			}
		}
	}
}

export default actividadesActions