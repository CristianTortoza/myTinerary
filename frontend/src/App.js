import Home from './pages/Home'
import Cities from './pages/Cities'
import City from './components/City'
import Cmpt404 from './pages/404'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import usuarioActions from './redux/actions/usuarioActions'
import { connect } from 'react-redux'
import { useEffect } from 'react'


const App = (props)=>{

	useEffect(() =>{
		if(localStorage.getItem('token')){
			props.verificarIngreso(
				localStorage.getItem('token'),
			)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return(
		<BrowserRouter>
			<Switch>
				<Route exact to path="/" component={Home}/>
				<Route exact to path="/cities" component={Cities}/>
				<Route path='/city/:id' component={City}/>
				<Route path="/notFound" component={Cmpt404}/>
				{!props.token && <Route path='/signup' component={SignUp} />}
				{!props.token && <Route path='/login' component={LogIn}/>}
				{!props.token ? <Redirect to="/notFound"/> : <Redirect to="/"/>}		
			</Switch>		
		</BrowserRouter>	
	)	
}

const mapStateToProps = (state) =>{
	return{
		token: state.usuario.token,
	}
}
const mapDispatchToProps = {
	verificarIngreso: usuarioActions.verificar
}

export default connect(mapStateToProps, mapDispatchToProps)(App)