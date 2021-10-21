const City = require('../models/ciudad')

const citiesControllers = {
	obtenerTodasCiudades:(req, res) =>{
		City.find() 
			.then((ciudades) => res.json({success: true, response: ciudades}))
			.catch((error) => res.json({success: false, response: error})) 
	},
	
	obtenerUnaCiudad: (req, res)=>{
		City.findOne({_id: req.params.id}) 
			.then((ciudad)=> {
				if(ciudad){
					res.json({ success:true, response: ciudad})
				}else{
					throw new Error()
				}
			})
			.catch((error) => res.json({ success:false, response: 'error'}))			
	},

	crearUnaCiudad: (req, res)=>{
		const ciudadCreada = new City({...req.body})
		ciudadCreada
			.save()
			.then(() => res.json({ success: true}))
			.catch((err) => res.json({success: false, error: err}))
	},

	borrarUnaCiudad: (req, res)=>{
		City.findOneAndDelete({ _id: req.params.id})
			.then((ciudad) => {
				if(ciudad){
					res.json({ success: true})
				}else{
					throw new Error()
				}
			})
			.catch(() => res.json({ success: false, response: 'No existe esta ciudad. id mal'}))
	},

	modificarUnaCiudad: ((req, res)=>{
		City.findByIdAndUpdate({ _id: req.params.id}, {...req.body})
			.then((ciudad)=> {
				if(ciudad){
					res.json({success: true})
				}else{
					throw new Error()
				}
			})
			.catch(() => res.json({success: false, response: 'No existe esta ciudad, datos erroneos'}))
	})

}

module.exports = citiesControllers
