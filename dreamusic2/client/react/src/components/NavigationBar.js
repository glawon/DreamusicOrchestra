import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import { Link } from 'react-scroll/modules';
import { useLocation, useNavigate } from "react-router-dom";
import { fetchOneUser, getLogin } from './services/user';
import { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';

function NavigationBar({login, setLogin}){
    //const navigate = useNavigate();
    //const [login, setLogin] = useState(false);
    const [user, setUser] = useState()
    
    function handleClick(sectionId){
        if(splitLocation[1] !== "")
        {
            console.log("/#"+sectionId);
            window.location.href = "/#" + sectionId;  
        }     
    }

    function handleLogout(){
        sessionStorage.removeItem("userID");
        setUser(null);
        setLogin(false);
    }

    const location = useLocation();
    const {pathname} = location;
    const splitLocation = pathname.split("/");

    useEffect(()=>{
            const id = sessionStorage.getItem('userID');
            if(id)
                setLogin(true);
            if(login === true)
            {
                fetchOneUser(id)
                .then(data=>{setUser(data)});
            }   
        //setLogin(true);
    }, [login, setUser])

    return(
        <Navbar expand="lg" className="sticky-top bg-body-tertiary mb-0" data-bs-theme="dark">
            <div className="container-fluid">
                <Nav.Link href="/" className="navbar-brand active me-auto px-1" aria-current="page">Dreamusic Orchestra</Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav px-1">
                    <Nav className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" style={{cursor:"pointer"}} activeClassName='active' to="#home" spy={true}
                            smooth={true} offset={-10} duration={500} onClick={()=>handleClick("home")}>Home</Link>          
                        </li>
                        <li>
                            <a className="nav-link" href="#eventscroll" onClick={()=>handleClick("eventscroll")}>Eventi</a>          
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about" onClick={()=>handleClick("about")}>Chi siamo</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#gallery" onClick={()=>handleClick("gallery")}>Gallery</a>
                        </li>
                        {/* <li className="nav-item">
                        <Link className="nav-link" style={{cursor:"pointer"}} activeClassName='active' to="shop" spy={true} smooth={true} offset={0} duration={500} onClick={handleClick}>Shop</Link>
                        </li> */}
                    </Nav>
                    <Nav className="navbar-nav ms-auto">
                        {login===true && user && user.ruolo == "admin" &&
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            </li>
                        }
                        {login===true && user &&
                            <li className="nav-item">
                                <Link to="/user" className="nav-link">{user.nome} {user.cognome}</Link>
                            </li>
                        }
                        {/* {login && user.ruolo == "user" &&
                            <li className="nav-item">
                                <Nav.Link href="/cart" className="nav-link"><i className="bi bi-cart2"></i></Nav.Link>
                            </li>
                        } */}
                        
                        {login===true && user &&
                            <li className="nav-item">
                                <Nav.Link href="/" className="nav-link" onClick={handleLogout}>Esci</Nav.Link>
                            </li>
                        }
                        {!login&&
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Accedi</Link>
                            </li>
                        }
                    </Nav> 
                </Navbar.Collapse>  
            </div>
        </Navbar>
    );
}

export default NavigationBar;