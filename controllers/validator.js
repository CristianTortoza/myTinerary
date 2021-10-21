const joi = require('joi')

const validator = (req, res, next) =>{
	const schema = joi.object({
		nombre: joi.string().pattern(new RegExp("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$")).min(2).max(15).required().messages({
			'string.pattern.base': 'Only letters can be entered in the first name',
			'string.min': 'Your first name must have at least 2 letters',
			'string.max': 'Your first name must have at max 15 letters'		
		}),
		apellido: joi.string().pattern(new RegExp("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$")).min(4).max(15).messages({
			'string.min': 'Your last name must have at least 4 letters',
			'string.pattern.base':'Only letters can be entered in the last name',
			'string.max': 'Your last name must have at max 15 letters'
		}),
		email: joi.string().email().min(3).messages({
			'string.min': 'Your email must have at least 3 characters',
			'string.email': 'Please write a valid email address',
		}),
		contrasena: joi.string().min(6).max(50).messages({
			'string.min': 'Your password must have at least 6 characters',
			'string.max': 'Your password must have at max 50 characters',
		}),		
		imagen: joi.string().min(8).messages({
			'string.min': 'Your image must have at least 8 characters',
		}),
		pais: joi.string().messages({}),
		google: joi.boolean()
	})
	
	const validation = schema.validate(req.body, { abortEarly: false}) 
		if(!validation.error){
			next()
		}else{
			res.json({ success: false, errors: validation.error.details})
		}	
}

module.exports = validator
