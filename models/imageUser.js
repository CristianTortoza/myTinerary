const mongoose = require('mongoose')

const imageUserSchema = mongoose.Schema({
	imagen: {type: String},
	titulo: {type: String}
})

const ImageUser = mongoose.model('image', imageUserSchema)

module.exports = ImageUser