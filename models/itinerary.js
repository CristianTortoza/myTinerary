const mongoose = require('mongoose')

const itinerarySchema = mongoose.Schema({
	autor: {type: Object},
	titulo: {type: Object},
	precio:	{type: Number},
	duracion: {type: Number},
	hashtags: {type: Array},
	comments: 
	[{
		userId: {type: mongoose.Types.ObjectId, ref: 'user'}, 
		comment: {type: String}
	}], 
	imagen: {type: String},
	corazones:{type: Array},
	idiomaAOfrecer: {type: Array},
	cityId: {type: mongoose.Types.ObjectId, ref: 'city'}
})

const Itinerary = mongoose.model('itinerary', itinerarySchema)

module.exports = Itinerary