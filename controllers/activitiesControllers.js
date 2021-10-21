const Activities = require('../models/activities')

const activitiesControllers = {
	crearUnaActividad : (req, res) =>{
		const actividadCreada = new Activities({...req.body})
		actividadCreada
			.save()
			.then((actividad) => res.json({success: true, response: actividad}))
			.catch((error) => res.json({success: false, response: error}))
	},
	obtenerUnaActividad: (req, res) => {
		Activities.findOne({_id: req.params.id})
			.then((actividad) =>{
				if(actividad){
					res.json({success: true, response: actividad})
				}else{
					throw new Error('la actividad no existe')
				}
			})
			.catch((error) => res.json({success: false, resposne: error.mesagge}))
	},
	obtenerTodasLasActividades: (req, res) =>{
		Activities.find()
			.then((actividades) => res.json({success: true, response: actividades}))
			.catch((error) => res.json({success: false, response: error}))
	},
	obtenerUnaActividadPorIntinerario: (req, res ) =>{
		Activities.find({itineraryId : req.params.itinerary})
		.then((actividad) =>{
			res.json({success: true, response: actividad})
		})
		.catch((error) => res.json({success: false, response: error}))
	}
}

module.exports = activitiesControllers