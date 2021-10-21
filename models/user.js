const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	nombre:	{type: String},
	apellido: {type: String},
	email: {type: String},
	contrasena: {type: String},
	imagen: {type: String},
	pais: {type: String},
	administrador: {type: Boolean, default: false},
	google: {type: Boolean, default: false}
})

const User = mongoose.model('user', userSchema)

module.exports = User