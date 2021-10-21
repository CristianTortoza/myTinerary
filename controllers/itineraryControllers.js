const Itinerary = require('../models/itinerary')

const itineraryControllers = {
	obtenerItinerarios: (req, res) =>{
		Itinerary.find()
				 .then((itinerarios) => res.json({success: true, response: itinerarios}))
				 .catch((error) => res.json({success: false, response: error}))			 
	},

	crearUnItinerario: (req, res) =>{
		const itinerarioCreado = new Itinerary({...req.body})
		itinerarioCreado
		.save()
		.then((itinerario) => res.json({succes:true, response: itinerario}))
		.catch((error) => res.json({success:false, response: error}))
	},

	modificarUnItinerario: (req, res) =>{
		Itinerary.findByIdAndUpdate( {_id: req.params.id}, {...req.body} )
		.then((itinerario) => {
			if(itinerario){
				res.json({success:true})
			}else{
				throw new Error
			}
		})
		.catch((error) => res.json({success: false, response: error}))
	},

	borrarUnItinerario: (req, res) =>{
		Itinerary.findByIdAndDelete({_id: req.params.id})
		.then((itinerario) =>{
			if(itinerario){
				res.json({success: true})
			}else{
				throw new Error
			}
		})
		.catch((error) => res.json({success: false, response: error}))
	},

	obtenerUnItinerarioPorCiudad: (req, res ) =>{
		Itinerary.find({cityId : req.params.city}).populate('comments.userId', {nombre: 1, apellido: 1, imagen: 1})
		.then((itinerario) =>{
			res.json({success: true, response: itinerario})
		})
		.catch((error) => res.json({success: false, response: error}))
	},
	
	obtenerUnItinerario:(req, res) =>{
		Itinerary.find({_id: req.params.id})
		.then((itinerario) =>{
			res.json({success: true, response: itinerario})
		})
		.catch((error) => res.json({success: false, response: error}))
	},

	darMegustaAUnItinerario: (req, res) =>{
		Itinerary.findOne({_id: req.params.id})
		.then((itinerario) => {
			if(itinerario.corazones.includes(req.user._id)){
				Itinerary.findOneAndUpdate({_id: req.params.id},{$pull:{corazones: req.user._id}}, {new: true})
				.then((itinerario2) => res.json({success: true, response: itinerario2}))	
			}else{
				Itinerary.findOneAndUpdate({_id: req.params.id},{$push:{corazones: req.user._id}}, {new: true}) 
				.then((itinerario2) =>res.json({success: true, response: itinerario2}))		
			}
		})
		.catch((error) => res.json({success: false, response: error}))	
	},

	editarComentarios: async (req, res) => {
		switch(req.body.type){
			 
			case "crearComentario":
				try {
                    const nuevoComentario = await Itinerary.findOneAndUpdate({_id: req.params.id}, {$push: {comments: {comment: req.body.comment, userId: req.user._id}}}, {new: true}).populate('comments.userId', {nombre: 1, apellido: 1, imagen: 1})
                    if (nuevoComentario) {
                        res.json({success: true, response: nuevoComentario.comments})
                    } else {
                        throw new Error()
                    }
					}catch(error) {
						res.json({success: false, response: error.message})
					}
					break;

			case "editarComentario":
				try {
                    let editarComentario = await Itinerary.findOneAndUpdate({"comments._id": req.params.id}, {$set: {"comments.$.comment": req.body.comment}}, {new: true})
                    if (editarComentario) {
                        res.json({success: true, response: editarComentario.comments})
                    } else {
                        throw new Error()
                    }
                } catch (error) {
                    res.json({success: false, response: error.message})
 
				}
				break;	
				case "borrarComentario":
					try {
						let borrarComentario = await Itinerary.findOneAndUpdate({"comments._id": req.body.commentId}, {$pull: {comments: {_id: req.body.commentId}}})
						if (borrarComentario) {
							res.json({success: true})
						} else {
							throw new Error()
						}
					} catch (error) {
						res.json({success: false, response: error.message})
	 
					}
					break;
							
		}

	}
}

module.exports = itineraryControllers