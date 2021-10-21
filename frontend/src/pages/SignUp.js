import { useEffect, useState } from "react"
import NavBar from "../components/Header/NavBar"
import axios from "axios"
import Swal from 'sweetalert2'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import usuarioActions from "../redux/actions/usuarioActions"
import GoogleLogin from 'react-google-login'

const SignUp = (props) =>{
	const[paises, setPaises] = useState([])
	const[imagenes, setImagenes] = useState([])
	const[seleccionarImage, setSeleccionarImagen] = useState('url')
	const[errores, setErrores] = useState({
		nombre: '',
		pais: '',
		imagen: '',
		contrasena: '',
		email: '',
		apellido: '',
	})
	const[usuarioNuevo, setUsuarioNuevo] = useState({
		nombre: '',
		pais: '',
		imagen: '',
		contrasena: '',
		email: '',
		apellido: '',
	})
	useEffect(()=>{
		axios.get('https://restcountries.eu/rest/v2/all?fields=name')
			.then((res)=>setPaises(res.data))
			.catch((error) => console.log(error))

		axios.get('http://localhost:4000/api/imageUser')
			.then((res) => setImagenes(res.data.response))
			.catch((error) => console.log(error))
		//eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	const responseGoogle = async (res) =>{
		let nuevoUsuario = {
			nombre: res.profileObj.givenName,
			apellido: res.profileObj.familyName,
			email: res.profileObj.email,
			contrasena: res.profileObj.googleId,
			imagen: res.profileObj.imageUrl,
			pais: 'Cepita',
			google: true
		}		
		try{
			let respuesta =  await props.crearUsuario(nuevoUsuario)	
			if(respuesta.data && respuesta.data.success){
				Toast.fire({
					icon: 'success',
					title: 'Account created!'
				})
			}else if(respuesta.data && !respuesta.data.success){ 
				Toast.fire({
					icon: 'warning',
					title: respuesta.data.response
				})
			}else{
				throw new Error()
			}
		}catch(e){
			Toast.fire({
				icon: 'error',
				title: 'Oops... Something went wrong!!'
			})
		}
	}
	
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

	const cambiarSelectorImagen = () =>{
		setErrores({
			...errores,
			imagen: ''
		})
		setUsuarioNuevo({
			...usuarioNuevo,
			imagen: ''
		})
		let cambio = seleccionarImage === 'url'? 'url2' : 'url' 
		setSeleccionarImagen(cambio)
	}


	const capturarInput = (e) =>{
		setUsuarioNuevo({ ...usuarioNuevo, [e.target.name]: e.target.value.trim() })	
		setErrores({
			...errores,
			[e.target.name] : ""})
	}
	
	const CrearCuenta = async () => {
		let verificacion = Object.values(usuarioNuevo).some((user) => user === '')
		if(!verificacion){
			try{
				let respuesta =  await props.crearUsuario(usuarioNuevo)	
				if(respuesta.data && respuesta.data.success){
					Toast.fire({
						icon: 'success',
						title: 'Account created!'
					})
				}else if(respuesta.data && !respuesta.data.success){	
					if(respuesta.data.errors){
						setErrores({})
						// eslint-disable-next-line
					{respuesta.data.errors.map((error) =>setErrores(propError =>{
						return{
							...propError,
							[error.path]: error.message,
						}
					}) 
					)			
					}
					}else{
						throw new Error(respuesta.data.response)
					}				
				}else{
					throw new Error(respuesta.data.response)
				}
			}catch(e){
				Toast.fire({
					icon: 'error',
					title: e.message
				})
			}
		}else{
			Toast.fire({
				icon: 'warning',
				title: 'All the fields are required!'
			})
		}	
	}
	const inputImagen = seleccionarImage === 'url' 
	?	<input type="url" placeholder="URL of your picture" onChange={capturarInput} name="imagen" value={usuarioNuevo.imagen} autoComplete="nope"/>
	:	<div className="FotoAelegirContenedor">
		<div className="fotosAelegir" style={{backgroundImage: `url('${usuarioNuevo.imagen}')`}}></div>
		<select name="imagen" onChange={capturarInput}>
			<option >Choose a photo</option>
			{imagenes.map((imagen, index) =><option value={imagen.imagen} className="seleccionFoto" key={index}  style={{backgroundImage: `url('${imagen.imagen}')`}}>{imagen.titulo}</option>)}
		</select>
		
		</div>
	
	return(
		<div className="">  
			<div className="NavBar">
				<NavBar/>
			</div>
			<div className="contenedorSignUp"  style={{backgroundImage: 'url("/assets/ciudad1.png")'}}>
				<form className="signUp">
					<h1>Create Account!</h1>
					<div className="cajaInputs">	
						{ errores  && errores.nombre === "" ? <span className="inputEscondido">-</span> : <span>{errores.nombre}</span>}
						<input type="text" placeholder="First name" onChange={capturarInput} name="nombre" value={usuarioNuevo.nombre} autoComplete="nope"/>		
					</div>
					<div className="cajaInputs">
						{ errores  && errores.apellido === "" ? <span className="inputEscondido">-</span> : <span>{errores.apellido}</span>}
						<input type="text" placeholder="Last name" onChange={capturarInput} name="apellido" value={usuarioNuevo.apellido} autoComplete="nope"/>				
					</div>
					<div className="cajaInputs">
						{ errores  && errores.email === "" ? <span className="inputEscondido">-</span> : <span>{errores.email}</span>}
						<input type="email" placeholder="Email" onChange={capturarInput} name="email" value={usuarioNuevo.email} autoComplete="nope"/>						
					</div>
					<div className="cajaInputs">	
						{ errores  && errores.contrasena === "" ? <span className="inputEscondido">-</span> : <span>{errores.contrasena}</span>}
						<input type="password" placeholder="Password" onChange={capturarInput} name="contrasena" value={usuarioNuevo.contrasena} autoComplete="nope"/>						
					</div>
					<div className="cajaInputs">			
						{ errores  && errores.imagen === "" ? <span className="inputEscondido">-</span> : <span>{errores.imagen}</span>}	
						<div className="cajaInputs2">
							{inputImagen}
							<div style={{backgroundImage: 'url("./assets/change2.png")'}} className="imagenDelInput" onClick={cambiarSelectorImagen}>
							</div>
						</div>
					</div>	
					<span className="inputEscondido">-</span>
					<select name="pais" onChange={capturarInput}>
						<option >Choose your country</option>
						{paises.map((pais, index) =><option value={pais.name} className="seleccionPais" key={index}>{pais.name}</option>)}
					</select>
				</form>
				<div className="botonesFormulario">
					<button className="botonFormulario" onClick={CrearCuenta}>Sign Up</button>
					<h4>Or</h4>
					<GoogleLogin
						clientId='1071301116924-mdio4fi6p26vfu4i393775i3qehvs34j.apps.googleusercontent.com'
						buttonText="Sign Up with Google"
						onSuccess={responseGoogle}
						className="botonGoogle"
						cookiePolicy={'single_host_origin'}
						/>
				</div>	
				<div className="linkFormulario">
					<p>Already have an account?</p>
					<Link to="/login">Log In here!</Link>				
				</div>	
			</div>
		</div>
	)
}

const mapDispatchToprops = {
	crearUsuario: usuarioActions.crearUsuario,

}

export default connect(null, mapDispatchToprops)(SignUp)

