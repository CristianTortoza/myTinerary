import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,Dropdown, DropdownToggle, DropdownMenu,
} from 'reactstrap';
import {  NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import usuarioActions from '../../redux/actions/usuarioActions';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle2 = () => setDropdownOpen(prevState => !prevState);
 
  return (
    <>
    <div className="NavBarHeader">
      <Navbar color="" light expand="md">
      <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink exact to='/'>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/cities'>Cities</NavLink>
            </NavItem>
            {!props.token  && 
            <NavItem>
             <NavLink to='/signup'>Sign Up</NavLink>  
            </NavItem>
            }
            {!props.token && 
            <NavItem>
              <NavLink to='/login'>Log In</NavLink>
            </NavItem>
            }
            {props.token &&  <NavItem> <NavLink to='/' onClick={ () => props.desconectar()} >Log Out</NavLink></NavItem>}
          </Nav>
        </Collapse> 
      </Navbar> 
      
    </div>
    
    <div className="logosNavBar d-flex align-items-center">
    {props.token && <h4 className="tituloPersona">Welcome {props.nombre}</h4>}    
    <Dropdown isOpen={dropdownOpen} toggle={toggle2}>
     <DropdownToggle caret> 
     {props.token ? <div className="logoUsuarioOn" style={{backgroundImage: `url('${props.imagen}')`}}></div> :<img src='/assets/logo_usuario.png' alt= "logo user" />}
     </DropdownToggle>
    <DropdownMenu>
      {!props.token  && 
              <NavItem>
              <NavLink to='/signup'>Sign Up</NavLink>  
              </NavItem>
              }
              {!props.token && 
              <NavItem>
                <NavLink to='/login'>Log In</NavLink>
              </NavItem>
              }
              {props.token &&  <NavItem> <NavLink to='/' onClick={ () => props.desconectar()} >Log Out</NavLink></NavItem>}        
    </DropdownMenu>
    </Dropdown>
    </div>
    
   
    </>
  );
}
const mapStateToProps = (state) =>{
  return{
    token: state.usuario.token,
    nombre: state.usuario.nombre,
    imagen: state.usuario.imagen
  }
}
const mapDispatchToProps = {
  desconectar: usuarioActions.desconectarUsuario,
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)