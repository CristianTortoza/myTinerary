import { Link } from "react-router-dom"

const ErrorPage = () =>{
	return(
		<div className="contenedorErrorPage">
			<div className="errorPage" style={{backgroundImage: 'url("/assets/errorPage.png")'}}>
				<h2>There was an unexpected error.We are doing our best to solve it</h2>
				<Link to="/"><button>Back to home</button></Link>
			</div>	
		</div>
	)
}
export default ErrorPage