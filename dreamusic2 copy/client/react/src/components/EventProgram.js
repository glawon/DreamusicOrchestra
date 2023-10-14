import React, {Component, useState, useEffect, useContext} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import background from '../externals/score.jpg';
import "../App.css";
import { sendReservation, fetchSingle } from "./services/concerts";
import EventContext from "./services/EventHandler";
import Caricamento from "./Loader";
import Prenotazione from "./event-page/Prenotazione";

function Program({evento}){
    const ora = moment(evento.dettagli.ora, 'HH:mm:ss').format('HH:mm');
    const data = moment(evento.dettagli.data, 'yyyy/mm/DD').format('DD/mm/yyyy');

    console.log(evento);

    return(
        <div className="row container-fluid justify-content-center py-5">
            {<div className="col-6">
                <h1 className="title text-center">{evento.dettagli.nome}</h1>
                <p className="text-center textProgram"><strong>Data:</strong> <span className="text">{data}</span>
                <br/><strong>Ora:</strong> <span className="text">{ora}</span>
                <br/><strong>Location:</strong> <span className="text">{evento.dettagli.citta} - {evento.dettagli.teatro}</span>
                <br/><strong>Prezzo:</strong><span className="text"> {evento.prezzo}€</span></p>
                <hr className="divider"/>
                <p className="textProgram">Programma</p>
                <p className="text text-start">{evento.dettagli.programma}</p>
            </div>}
        </div>
    );
}

function EventProgram(){
    function useScrollToTop(){
        const location = useLocation();
        useEffect(() => {
          window.scrollTo({ top: 0 });
        }, [location]);
      };
    
      useScrollToTop();

      const [evento, setEvento] = useState({}); //oggetto {dettagli, prezzo}
      const {event} = useContext(EventContext); //id dell'evento

      useEffect(() =>{
        const id = sessionStorage.getItem('id');
        fetchSingle(id)
        .then(response => {console.log("Dati dalla fetch: ", response); setEvento(response)})
        .catch(err => alert("Errore nel caricamento del concerto", err));
      }, []);
      
    return(
        <div className="container-fluid">
        {evento.dettagli ? (
            <><Program evento={evento} />
            <section className="bg-image m-0 px-0 py-5"
            style={{backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(${background}`,
            backgroundPosition:"center", backgroundSize:"cover", height:"450px"}}>
                <Prenotazione id={event} prezzo={evento.prezzo}/>
            </section></>
            ) : (
            <div className = "container-fluid align-content-center">
                <Caricamento />
            </div>
        )}  
        </div>    
    );
}

export default EventProgram;