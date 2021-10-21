import { Link } from "react-router-dom"

const Cmpt404 = () => {
	return (
	   <>
			<div className="paginaNotFound">
				<img src="/assets/notFound.png" alt="fotoNotFound"/>
				<Link to="/"><button>Back to home</button></Link>
			</div>	   
	   </>
	)
 }
 
 export default Cmpt404