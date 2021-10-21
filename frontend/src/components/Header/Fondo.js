const Fondo = () =>{
	return(
		<div className="d-flex flex-column align-items-center justify-content-center divContenedor">
			<video autoPlay loop muted id="video" >
				<source src='./assets/video.mp4' type='video/mp4' />
			</video>
			<div className="d-flex flex-column align-items-center justify-content-center alturaYHeader">
				<div className="">
					<img className='logoEmpresa animate__animated animate__backInDown animate__delay-1s' src='./assets/logo_empresa.png' alt='logo empresa' />
					<h2 className="animate__animated animate__backInDown animate__delay-1s"><span>My</span>Tinerary</h2>
				</div>	
				<div>	
					<h3 className="tituloPrincipal animate__animated animate__backInUp">Find your perfect trip, 
					designed by insiders who know and love their cities!</h3>
				</div>				
			</div>	
		</div>	  
	)
}
export default Fondo
