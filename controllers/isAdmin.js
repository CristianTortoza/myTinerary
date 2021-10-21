const isAdmin = (req, res, next) =>{
	if (req.user.admin){
		next()
	}else{
		return res.json({response: 'no hay permisos para ti'})
	}
}

module.exports = isAdmin

//se pónee entre el passport y el controlador esto, en el router. 
// y en controlador solo pasamos la informacion!!! 