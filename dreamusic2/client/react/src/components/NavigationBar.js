import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-scroll/modules';
import { useLocation, useNavigate } from "react-router-dom";
import { getLogin } from './services/user';
import { useState } from 'react';


function NavigationBar({setUser, setLogged, user, login}){
    const navigate = useNavigate();
    
    function handleClick(){
        if(splitLocation[1] !== "")
        {
           navigate("/");
        }        
    }

    function setNavBar(){

    }

    const location = useLocation();
    const {pathname} = location;
    const splitLocation = pathname.split("/");
    
    let isLogged, userData;
    let response = getLogin();
    //console.log(response);
    /*if (response !== null)
    {
        response.then((data) =>{
            userData = data.user;
            isLogged = data.logged;
        })
    }

    const setter = async() => {
        await response;
        
        setUser(userData);
        setLogged(isLogged);
    }
    setter();*/
    return(
        <Navbar expand="lg" className="sticky-top bg-body-tertiary mb-0" data-bs-theme="dark">
            <div className="container-fluid">
                <Nav.Link href="/" className="navbar-brand active px-1" aria-current="page">Dreamusic Orchestra</Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav px-1">
                    <Nav className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" style={{cursor:"pointer"}} activeClassName='active' to="home" spy={true} smooth={true} offset={-10} duration={500} onClick={handleClick}>Home</Link>          
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={{cursor:"pointer"}} activeClassName='active' to="eventscroll" spy={true} smooth={true} offset={-10} duration={500} onClick={handleClick}>Eventi</Link>          
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={{cursor:"pointer"}} activeClassName='active' to="about" spy={true} smooth={true} offset={0} duration={500} onClick={handleClick}>Chi siamo</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={{cursor:"pointer"}} activeClassName='active' to="gallery" spy={true} smooth={true} offset={0} duration={500} onClick={handleClick}>Gallery</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" style={{cursor:"pointer"}} activeClassName='active' to="shop" spy={true} smooth={true} offset={0} duration={500} onClick={handleClick}>Shop</Link>
                        </li>
                    </Nav>
                    <Nav className="navbar-nav ms-auto">
                        {login && user.ruolo == "admin" &&
                            <li className="nav-item">
                                <Nav.Link href="/dashboard" className="nav-link">Dashboard</Nav.Link>
                            </li>
                        }
                        {login && user.ruolo == "user" &&
                            <li className="nav-item">
                                <Nav.Link className="nav-link" style={{cursor:"default"}}>{user.nome} {user.cognome}</Nav.Link>
                            </li>
                        }
                        {login && user.ruolo == "user" &&
                            <li className="nav-item">
                                <Nav.Link href="/cart" className="nav-link"><i className="bi bi-cart2"></i></Nav.Link>
                            </li>
                        }
                        
                        {login &&
                            <li className="nav-item">
                                <Nav.Link href="/" className="nav-link">Esci</Nav.Link>
                            </li>
                        }
                        {!login &&
                            <li className="nav-item">
                                <Nav.Link href="/login" className="nav-link">Accedi</Nav.Link>
                            </li>
                        }
                        
                    </Nav> 
                </Navbar.Collapse>  
            </div>
        </Navbar>
    );
}

export default NavigationBar;