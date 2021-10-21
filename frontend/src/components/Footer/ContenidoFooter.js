import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import usuarioActions from '../../redux/actions/usuarioActions';

const ContenidoFooter = (props) =>{
	return(
		<div className="fondoFooter" style={{backgroundImage: 'url("/assets/fotoFooter2.png")'}}>
			<div className="container d-flex justify-content-between footerContenedor">
				<div className="logosFooter d-flex">
					<img className="imagenesLogo" src='/assets/Facebook.png' alt=" "/>
					<img className="imagenesLogo" src='/assets/Instagram.png' alt=" "/>
					<img className="imagenesLogo" src='/assets/Twitter.png' alt= ""/>
				</div>
				<div className="d-flex flex-column linksContenedor">
					<NavLink exact to="/"><p>Home</p></NavLink>
					<NavLink to="/cities"><p>Cities</p></NavLink>
					{!props.token && <NavLink to='/signup'><p>Sign Up</p></NavLink>} 
					{!props.token &&<NavLink to="/login"><p>Log In</p></NavLink >}
					{props.token && <NavLink to="/" onClick={() => props.desconectar()}><p>Log Out</p></NavLink >}
				</div>
			</div>	
			<span className="spanFooter d-flex justify-content-center">MYtinerary Project 2021 - All rights reserved</span>	
		</div>
	)
}

const mapStateToProps = (state) =>{
	return{
		token: state.usuario.token,
	}
}
const mapDispatchToProps = {
	desconectar: usuarioActions.desconectarUsuario,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContenidoFooter)