const tarjetas = [
	{
		imagen: './assets/tarjeta1.gif',
		titulo: 'The best company',
		descripcion: 'We won the award for the best travel company'
	},
	{
		imagen:	'./assets/tarjeta3.gif',
		titulo: 'Unbeatable prices',
		descripcion: 'Deals that suit your needs'
	},
	{
		imagen: './assets/tarjeta2.gif',
		titulo: 'The best locations',
		descripcion: 'Trips to the most popular places in the world'
	}
]
const Tarjeta = () => {
	return(
		tarjetas.map((tarjeta, index)=>
				<div  key={index}  className="col-md-4  col-sm-12 ">
					<div className="card tarjetaMain" style={{backgroundImage: `url('${tarjeta.imagen}')`}}>
						<div className="card-body tarjeta d-flex flex-column align-items-center">
							<div className="text-center tamanioTexto">
								<h3 className="card-title">{tarjeta.titulo}</h3>
								<p className="card-text textoDeTarjeta">{tarjeta.descripcion}</p>
							</div>	
						</div>
					</div>
				</div>	
		)
	)
}
export default Tarjeta

