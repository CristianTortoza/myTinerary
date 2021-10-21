import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import 'animate.css/animate.min.css'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './redux/reducers/rootReducer'
import thunk from 'redux-thunk'


const globalStore = createStore(rootReducer, applyMiddleware(thunk))
ReactDOM.render(
  <Provider store={globalStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)
