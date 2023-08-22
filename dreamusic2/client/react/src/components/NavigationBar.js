//import { NavLink} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-scroll/modules';

function NavigationBar(login){

    function handleCartClick(){
        alert("You have to log-in first!");
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

    return(
        <Navbar expand="lg" className="sticky-top bg-body-tertiary mb-0" data-bs-theme="dark">
            <div className="container-fluid">
                <Nav.Link href="/" className="navbar-brand active px-1" aria-current="page">Dreamusic Orchestra</Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav px-1">
                    <Nav className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" style={{cursor:"pointer"}} activeClass='active' to="eventscroll" spy={true} smooth={true} offset={-10} duration={500}> Eventi </Link>
                        </li>
                        <li>
                            <Link className="nav-link" style={{cursor:"pointer"}} activeClass='active' to="about" spy={true} smooth={true} offset={0} duration={500}>Chi siamo</Link>
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