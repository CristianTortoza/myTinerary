const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken') 

const userControllers = {
	crearUnUsuario: (req, res) =>{
		const {nombre, apellido, email, contrasena, imagen, pais, administrador, google} = req.body
		let hashedPass = bcryptjs.hashSync(contrasena, 10)
		const usuarioCreado = new User({
			nombre,
			apellido,
			email,
			contrasena : hashedPass,
			imagen,
			pais,
			administrador,
			google	
		})
		User.findOne({email: email})
		.then((usuario) => {
			if(usuario){
				throw new Error('Email already in use !') 	
			}else{
				usuarioCreado.save()
				.then((usuarioCreado) => {
					const token = jwt.sign({...usuarioCreado}, process.env.CLAVESECRETA)
					res.json({success: true, response: {nombre: usuarioCreado.nombre, imagen: usuarioCreado.imagen, _id: usuarioCreado._id, token}})
				})
				.catch((error) => res.json({success:false, response: error.message}))
			}
		})
		.catch((e) => res.json({success:false, response: e.message}))
	},
	
	ingresarUsuario: (req, res) =>{
		const {email, contrasena} = req.body
		User.findOne({email: email})
			.then((usuario) =>{
				if(usuario){
					let contrasenaCorrecta = bcryptjs.compareSync(contrasena, usuario.contrasena)
					if(contrasenaCorrecta){
						let token = jwt.sign({...usuario}, process.env.CLAVESECRETA)
						res.json({success: true, response: {nombre: usuario.nombre, imagen: usuario.imagen, _id: usuario._id ,token}})
					}else{
						throw new Error('Username and/or password incorrect')
					}
				}else{
					throw new Error('Username and/or password incorrect')
				}
			})
			.catch((error)=> res.json({success:false, response: error.message}))
	},

	verifyToken: (req, res) =>{
		res.json({nombre: req.user.nombre, imagen: req.user.imagen, _id: req.user._id}) 
	}
	
}

module.exports	= userControllers
