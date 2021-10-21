import Fondo from "./Header/Fondo"
import NavBar  from "./Header/NavBar"

const Header = () =>{
	return(
		<>	
			<div className="NavBar">
				<NavBar/>
			</div>
			<Fondo/>
		</>	
	)
}

export default Header