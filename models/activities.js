const mongoose = require('mongoose')

const activitiesSchema = new mongoose.Schema({
	actividades: [{
		imagen: {type: String},
		titulo: {type: String},
	},{
		imagen: {type: String},
		titulo: {type: String},
	},{
		imagen: {type: String},
		titulo: {type: String},
	}],
	itineraryId: {type: mongoose.Types.ObjectId, ref: 'itinerary'}
})

const Activities = mongoose.model('activity', activitiesSchema)

module.exports = Activities