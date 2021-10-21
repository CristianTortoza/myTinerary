const ImageUser =  require('../models/imageUser')

const imageUserControllers = {
	CrearImagenUsuario: (req, res) => {
		const imagenCreada = new ImageUser({...req.body})
		imagenCreada
			.save()
			.then((imagen) => res.json({success: true, response: imagen}))
			.catch((error) => res.json({success: false, resposne: error}))
	},

	obtenerImagenesUsuario: (req, res) =>{
		ImageUser.find()
			.then((imagenes) => res.json({success: true, response: imagenes}))
			.catch((error) => res.json({success: false, response: error}))
	}
}

module.exports = imageUserControllers