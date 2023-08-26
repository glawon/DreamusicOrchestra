//import { NavLink} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-scroll/modules';
import { useLocation, useNavigate } from "react-router-dom";


function NavigationBar(login){

    function handleCartClick(){
        
    }
    const navigate = useNavigate();
    function handleClick(){
        console.log(splitLocation);
        if(splitLocation[1] !== "")
        {
           console.log("mi sposto nella home...");
           navigate("/");
        }        
    }

    /*function showLogin(){
        if(login == false)
            return(
                <a className="btn btn-primary" href="#login" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick={handleClick} style={{backgroundColor:"#e3841f", border: "#e3841f", borderRadius: '5px', color:"black" }}>Log-in</a>);
        else
            return(
                <a className="btn btn-primary" href="#login" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick={handleClick} style={{backgroundColor:"#e3841f", border: "#e3841f", borderRadius: '5px', color:"black" }}>Log-out</a>
            );
    }*/

    const location = useLocation();
    const {pathname} = location;
    const splitLocation = pathname.split("/");

    return(
        <Navbar expand="lg" className="sticky-top bg-body-tertiary mb-0" data-bs-theme="dark">
            <div className="container-fluid">
                <Nav.Link href="/" className="navbar-brand active px-1" aria-current="page">Dreamusic Orchestra</Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav px-1">
                    <Nav className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavDropdown title="Home" id="basic-nav-dropdown" onClick={handleClick}>
                                    <NavDropdown.Item href="/">
                                        <Link className="nav-link" style={{cursor:"pointer"}} activeClassName='active' to="eventscroll" spy={true} smooth={true} offset={-10} duration={500}> Eventi </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/">
                                        <Link className="nav-link" style={{cursor:"pointer"}} activeClassName='active' to="about" spy={true} smooth={true} offset={0} duration={500}>Chi siamo</Link>
                                    </NavDropdown.Item>
                            </NavDropdown>              
                        </li>
                        <li className="nav-item">
                            <Nav.Link href="/gallery" className="nav-link">Gallery</Nav.Link>
                        </li>
                        <li className="nav-item">
                            <Nav.Link href="/shop" className="nav-link">Shop</Nav.Link>
                        </li>
                    </Nav>
                    <Nav className="navbar-nav ms-auto">
                            <Nav.Link href="/cart" className="nav-link"><i className="bi bi-cart2" onClick={handleCartClick}></i></Nav.Link>
                        <li className="nav-item">
                            <Nav.Link href="/login" className="nav-link">Log-in</Nav.Link>
                        </li>
                    </Nav> 
                </Navbar.Collapse>  
            </div>
        </Navbar>
    );
}

export default NavigationBar;