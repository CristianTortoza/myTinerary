const express = require('express')
const citiesControllers = require('../controllers/citiesControllers')
const itineraryControllers = require('../controllers/itineraryControllers')
const userControllers = require('../controllers/userControllers')
const imageUserControllers = require('../controllers/imageUserControllers')
const activitiesControllers = require('../controllers/activitiesControllers')
const router = express.Router()
const passport = require('passport')
// const isAdmin = require('../controllers/isAdmin')
const validator = require('../controllers/validator')


router
	.route('/cities')
	.get(citiesControllers.obtenerTodasCiudades) 
	.post(citiesControllers.crearUnaCiudad)

router
	.route('/city/:id')
	.get(citiesControllers.obtenerUnaCiudad)
	.delete(citiesControllers.borrarUnaCiudad)
	.put(citiesControllers.modificarUnaCiudad)

router
	.route('/itineraries')
	.get(itineraryControllers.obtenerItinerarios)
	.post(itineraryControllers.crearUnItinerario)
	
router
	.route('/itinerary/:id')	
	.put(itineraryControllers.modificarUnItinerario)
	.delete(itineraryControllers.borrarUnItinerario)
	.get(itineraryControllers.obtenerUnItinerario)
router
	.route('/itineraries/:city')
	.get(itineraryControllers.obtenerUnItinerarioPorCiudad)	

router
	.route('/itinerary/like/:id')
	.put(passport.authenticate('jwt', {session: false}), itineraryControllers.darMegustaAUnItinerario)


router
	.route('/itinerary/comments/:id')
	.put(passport.authenticate('jwt', {session: false}), itineraryControllers.editarComentarios)

router
	.route('/signup')
	.post(validator, userControllers.crearUnUsuario)

router
	.route('/login')
	.post(userControllers.ingresarUsuario)


router
	.route('/imageUser')
	.post(imageUserControllers.CrearImagenUsuario)
	.get(imageUserControllers.obtenerImagenesUsuario)


router
	.route('/activities')
	.get(activitiesControllers.obtenerTodasLasActividades)
	.post(activitiesControllers.crearUnaActividad)

router
	.route('/activities/:itinerary')
	.get(activitiesControllers.obtenerUnaActividadPorIntinerario)	

router
	.route('/activity/:id')
	.get(activitiesControllers.obtenerUnaActividad)

router
	.route('/verifyToken')
	.get(passport.authenticate('jwt', {session: false}),userControllers.verifyToken) // passport <--- hacer ruta. 

module.exports = router

// para protener un endpoint. le decimos que antes de llegar al controlador ejecute passport.authenticate('jwt, {session: false}') // <- con este metodo !!!
//es un midlware que lo ejecute antes que el y le decimos que no estamos usando sessiones. 
//