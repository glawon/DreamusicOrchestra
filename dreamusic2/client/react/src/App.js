import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import { useState, useEffect } from 'react';
import {Route, Routes, useNavigate } from 'react-router-dom';
import {fetchConcerts, fetchSingle} from './components/services/concerts';
/*import * as Components from './components';
import {NavigationBar, Home, EventProgram, Cart, BottomBar, Gallery, Dashboard, Login} from 'Components';*/
import NavigationBar from './components/NavigationBar';
import Home from './components/Home'
import EventProgram from './components/EventProgram';
import Cart from './components/Cart';
import BottomBar from './components/bottomBar';
import Gallery from './components/gallery';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

import logo from "./externals/logo2.png";
import dreamLogo from "./externals/logo_dreamusic.png";
import UserArea from './components/UserArea';

function App(){
  //CODICE COMMENTATO: POSSIBILE ELIMINARE
  //const navigate = useNavigate();
  //gestione eventi
    // const [eventi, setEventi] = useState([]);
    // useEffect(() => {
    //   async function getConcerts() {
    //     try {
    //         const concerts = await fetchConcerts();
    //         setEventi(concerts);
    //     } catch (error) {
    //         alert("Errore nel caricare i concerti: ", error);
    //     }
    //   }
    //   getConcerts();
    // }, []);

    // const[eventId, setEventId] = useState(-1);
    // const[event, setEvent] = useState();
    // const[cambia, setCambia] = useState(false);
    
    /*if(cambia)
    {
      setCambia(false);
      async function getSingle(eventId) {
        try {
          const concerto = await fetchSingle(eventId);
          console.log(concerto);
          setEvent(concerto);
          navigate("/event");
        } catch(error) {
          alert("Errore nel trovare il concerto: ", error);
        }
      }
      getSingle(eventId);
    }*/

    //gestione utenti
    const [user, setUser] = useState({id:"", nome:"", cognome:"", email:"", password:""});
    const [logged, setLogged] = useState(false);

    return (
    <>
      <div className="page">
        <NavigationBar
        login={logged} setLogin={setLogged}/>
        <div className="bigContainer">
          <Routes>
            <Route path="/" element={<Home logo={dreamLogo}/>}/>  
            <Route path="/cart" element={<Cart user={user}/>}/>
            <Route path="/login" element={<div className="container-fluid"><Login setUser={setUser} setLogged={setLogged}/></div>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/user" element={<UserArea setLogin={setLogged}/>}/>
            <Route path="/event" element={<EventProgram/>}/>
          </Routes>
        </div>
        <div className="container-fluid">
          <BottomBar logo={dreamLogo}/>
        </div>
      </div>      
    </>
  );
}

export default App;
