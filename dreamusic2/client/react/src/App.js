import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import { useState, useEffect } from 'react';
import {Route, Routes } from 'react-router-dom';
import {fetchConcerts} from './components/services/concerts';
import { createStore } from 'react-stores';
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

import logo from "./externals/logo.jpg";

import musician1 from "./externals/violin.png";
import musician2 from "./externals/double-bass.png";
import musician3 from "./externals/trumpet.png";
import musician4 from "./externals/trombone.png";
import musician5 from "./externals/piano.png";
import musician6 from "./externals/drums.png";

const persone= [
    {id: 0, foto: musician1, nome: "Musician 1", strumento: "Violino"},
    {id: 1, foto: musician2, nome:"Musician 2", strumento: "Contrabbasso"},
    {id: 2, foto: musician3, nome: "Musician 3", strumento: "Tromba"},
    {id: 3, foto: musician4, nome: "Musician 4", strumento: "Trombone"}, 
    {id: 4, foto: musician5, nome: "Musician 5", strumento: "Pianoforte"},
    {id: 5, foto: musician6, nome: "Musician 6", strumento: "Batteria"}
  ]


function App(){
  
  //da backend:
    const [eventi, setEventi] = useState([]);
    useEffect(() => {
      async function getConcerts() {
        try {
            const concerts = await fetchConcerts();
            setEventi(concerts);
        } catch (error) {
            alert("Errore nel caricare i concerti: ", error);
        }
      }
      getConcerts();
    }, []);

    const[eventId, setEventId] = useState(-1);


    const [user, setUser] = useState({id:"", nome:"", cognome:"", email:"", password:""});
    const [logged, setLogged] = useState(false);
    
    const [musicians, setMusicians]=useState(persone);

    /*function handleLogin()
    {
      console.log("Primo ingresso nella handleLogin");
      setUser(newUser);
      setLogged(true);
      console.log(user);
      console.log(logged);
    }*/

    return (
    //controllo dal back-end: loading fin quando non è arrivato tutto OPPURE progression nelle immagini degli eventi finché non arriva il messaggio

    <>
      <div className="page">
        <NavigationBar
        user={user} login={logged} setUser={setUser} setLogged={setLogged}/>
        <div className="bigContainer">
          <Routes>
            <Route path="/" element={<Home eventi={eventi} musicians={musicians} setEventId={setEventId}/>}/>  
            <Route path="/cart" element={<Cart user={user}/>}/>
            <Route path="/gallery" element={<Gallery/>}/>
            <Route path="/login" element={<div className="row"><Login setUser={setUser} setLogged={setLogged}/></div>}/>
            <Route path="/dashboard" element={<Dashboard musicians={musicians} setMusicians={setMusicians}/>}/>
            <Route path="/event" element={<EventProgram eventi={eventi}/>}/>
          </Routes>    
        </div>
        <BottomBar
          logo={logo}/>
      </div>
      
    </>
  );
}

export default App;
