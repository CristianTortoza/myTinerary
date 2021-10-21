import Main from "../components/Main"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Home = () =>{
	window.scrollTo(0, 0)
	return(
		<>	
			<Header/>
			<div className="fondo">
				<Main/>	
				<Footer/>
			</div>	
		</>	
	)
}

export default Home