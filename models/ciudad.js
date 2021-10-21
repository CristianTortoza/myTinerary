const mongoose = require('mongoose')

const ciudadSchema = new mongoose.Schema({
	nombre: {type: String,},
	foto: {type: String},
	pais: {type: String},
	moneda: {type: String},
	idioma: {type: String},
	fotoHeader: {type: String},
	banderaPais: {type: String}
})

const City = mongoose.model('city', ciudadSchema)


module.exports = City
