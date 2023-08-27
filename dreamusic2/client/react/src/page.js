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
import { useState, useEffect } from 'react';
import {Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import cardImage from "./externals/locandina.png";

const events = [
  {id : 0, locandina : cardImage, location: "luogo", programma: "programma", data : "gg/mm/aaaa", ora : "00:00", nomeConcerto : "concerto 1", prezzo: 5},
  {id : 1, locandina : cardImage, location: "luogo", programma: "programma", data : "gg/mm/aaaa", ora : "00:00", nomeConcerto : "concerto 2", prezzo: 10},
  {id : 2, locandina : cardImage, location: "luogo", programma: "programma", data : "gg/mm/aaaa", ora : "00:00", nomeConcerto : "concerto 3", prezzo: 0}
  ];

function Page(login, setLogin){
    
    // const [eventi, setEventi] = useState(events);
    //da backend:
    const [eventi, setEventi] = useState([]);
    useEffect(() => {
      fetch('http://localhost:8000/api/concert/index', {method:"GET"})
        .then((response) => response.json())
        .then((actualData) => setEventi(actualData.concerto));
    }, []);
    console.log(eventi);

    const [user, setUser] = useState();
    
    const [logged, setLogged] = useState(true);
    console.log("Logged? "+ logged);
    const [eId, seteId] = useState(0);
    const getId = () =>
    {
      console.log("Valore nello state:"+eId);
      //seteId(eId);
    }
    
    return (
    //controllo dal back-end: loading fin quando non è arrivato tutto OPPURE progression nelle immagini degli eventi finché non arriva il messaggio

    <>
      <div className="page">
        <NavigationBar
        login={logged}/>
        <div className="bigContainer">
          <Routes>
            <Route path="/" element={<Home eventi={eventi} getId={getId} setId={seteId}/>}/>  
            <Route path="/cart" element={<Cart login={logged}/>}/>
            <Route path="/gallery" element={<Gallery/>}/>
            <Route path="/login" element={<div className="row"><Login/></div>}/>
            <Route path="/event" element={<EventProgram key={eId} eventi={eventi}/>}/>
          </Routes>    
        </div>
        <BottomBar
          logo={logo}/>
      </div>
      
    </>
  );
}



export default Page;
