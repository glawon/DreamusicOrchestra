import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './Page.css'
import NavigationBar from './components/NavigationBar';
import Home from './components/Home'
import EventProgram from './components/EventProgram';
import Cart from './components/Cart';
import BottomBar from './components/bottomBar';
import Gallery from './components/gallery';
import logo from "./externals/logo.jpg";
import { useState } from 'react';
import {Route, Routes } from 'react-router-dom';
import Login from './components/Login';

function Page(login, setLogin){
    const [token, setToken] = useState();

    return (
    //controllo dal back-end: loading fin quando non è arrivato tutto OPPURE progression nelle immagini degli eventi finché non arriva il messaggio

    <>
      <div className="page">
        <NavigationBar
        login={login}/>
        <div className="bigContainer">
          <Routes>
            <Route path="/" element={<Home/>}/>  
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/gallery" element={<Gallery/>}/>
            <Route path="/login" element={<div className="row"><Login/></div>}/>
          </Routes>    
        </div>
        <BottomBar
          logo={logo}/>
      </div>
      
    </>
  );
}

export default Page;
