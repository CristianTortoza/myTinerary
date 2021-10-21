import NavBar from "../components/Header/NavBar"
import { useState } from "react"
import Swal from 'sweetalert2'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import usuarioActions from "../redux/actions/usuarioActions"
import GoogleLogin from 'react-google-login';

const FormItineraries = (props) =>{
	const [usuario, setUsuario] = useState({
		email: '',
		contrasena: '',
	})

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
	 
	  



	const responseGoogle = async (res) =>{

		let ingresarUsuario = {
			email: res.profileObj.email,
			contrasena: res.profileObj.googleId,
		}

		try{
			let respuesta = await props.ingresarUsuario(ingresarUsuario)
			if(respuesta.data && respuesta.data.success){
				Toast.fire({
					icon: 'success',
					title: 'welcome to MYtinerary!'
				})
			}else if(respuesta.data && !respuesta.data.success){
				Toast.fire({
					icon: 'error',
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
	const capturarInput = (e) =>{
		setUsuario({ ...usuario, [e.target.name]: e.target.value.trim()})
	}
	const ingresarUsuario = async () =>{
		let verificacion = Object.values(usuario).some((propiedades) => propiedades === '')	
		if(!verificacion){
			try{
				let respuesta = await props.ingresarUsuario(usuario)
				if(respuesta.data && respuesta.data.success){
					Toast.fire({
						icon: 'success',
						title: 'welcome to MYtinerary!'
					})
				}else if(respuesta.data && !respuesta.data.success){
					Toast.fire({
						icon: 'error',
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
			
		}else{
			Toast.fire({
				icon: 'warning',
				title: 'All the fields are required!'
			})
		}
	}

	return(
		<div className="">  
			<div className="NavBar">
				<NavBar/>
			</div>
			<div className="contenedorSignUp"  style={{backgroundImage: 'url("/assets/ciudad1.png")'}}>
				<form className="signUp">
					<h1>Welcome back!</h1>
					<div className="cajaInputs">
						<input type="text" placeholder="Email" onChange={capturarInput} name="email"/>
					</div>	
					<div className="cajaInputs">
						<input type="password" placeholder="Password" onChange={capturarInput} name="contrasena"/>
					</div>
				</form>
				<div className="botonesFormulario">
					<button className="botonFormulario" onClick={ingresarUsuario}>Log In</button>
					<h4>Or</h4>
					<GoogleLogin
						clientId='1071301116924-mdio4fi6p26vfu4i393775i3qehvs34j.apps.googleusercontent.com'
						buttonText="Log In with Google"
						onSuccess={responseGoogle}
						className="botonGoogle"
						cookiePolicy={'single_host_origin'}
						/>
				</div>	
				<div className="linkFormulario">
					<p>Don't have an account?</p>
					<Link to="/signup">Sign up here!</Link>				
				</div>		
			</div>
		</div>
	)
}
const mapDispatchToprops = {
	ingresarUsuario: usuarioActions.ingresarUsuario
}

export default connect(null, mapDispatchToprops)(FormItineraries)