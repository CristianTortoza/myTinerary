import Footer from "../components/Footer"
import NavBar from "../components/Header/NavBar"
import { Link } from "react-router-dom"
import React, { useState, useEffect } from "react"
import Preloader from "../components/Preloader"
import CityNotFound from "../components/CityNotFound"
import ErrorPage from "../components/ErrorPage"
import { connect } from 'react-redux'
import ciudadesActions from '../redux/actions/ciudadesActions'
import Swal from 'sweetalert2'

const Cities =(props) =>{
	const [claseNombre, setCambioClase] = useState('item')
	const [cargando, setCargando] = useState(true)
	
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
		  toast.addEventListener('mouseenter', Swal.stopTimer)
		  toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	})

	useEffect(() =>{	
		async function obtenerCiudades(){
			window.scrollTo(0, 0)
			let respuesta = await props.obtenerCiudades()
			if(respuesta && respuesta.error){
				Toast.fire({
					icon: 'error',
					title: 'Oops... Something went wrong!!'
				})
			}
			setCargando(false)	
		}
		obtenerCiudades()
		
		//eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
	
	const cambioDeClase = ()=> {
		const selecionDeclase = claseNombre === 'item' ? 'segundaClase' : 'item';   
		setCambioClase(selecionDeclase);
	}

	const resultadoDelFiltro = props.ciudadesFiltradas.length > 0 
	?props.ciudadesFiltradas.map((ciudad)=>{
		return(
		<Link to={`city/${ciudad._id}`} key={ciudad._id} className={claseNombre}>	
			<div style={{backgroundImage: `url('${ciudad.foto}')`}}>
				<h2>{ciudad.nombre}</h2>
			</div>
		</Link>
	)	
	})
	:	<CityNotFound/>		
		
	const filtrar = (e) =>props.filtrarCiudad(e.target.value)
		
	const renderizado = props.ciudades.length > 0?(
		<div className="contenedorMayor">
			<div className="grid-container">
				{resultadoDelFiltro}
			</div>
		</div>
		): <ErrorPage/>
	
	if (cargando){
		return <Preloader/>
	}	

	return(		
		<>	
			<div className="NavBar">
				<NavBar/>
			</div>
			<div className="fondoCities" style={{backgroundImage: 'url("./assets/fondo1.png")'}}>
			</div>
			<div className="cajainputCities">
				<input type='text'placeholder='search your destination' onChange={filtrar} className="inputCities"></input>
				<img className="imagenesLogo logoCambio" onClick={cambioDeClase} src='./assets/logoImagenes2.png' alt= "logoCambio"/>
			</div>
			{renderizado}
			<Footer/>
		</>	
	)
}

const mapStateToProps = (state) =>{
	return{ 
		ciudades: state.ciudades.listaCiudades, 
		ciudadesFiltradas: state.ciudades.filtrarCiudades,
	}
}

const mapDispatchToProps = { 
	obtenerCiudades: ciudadesActions.obtenerTodasLasCiudades,
	filtrarCiudad: ciudadesActions.filtrarCiudades,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)

