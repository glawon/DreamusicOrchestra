import React, {Component, useState, useEffect, useContext} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import background from '../externals/score.jpg';
import "../App.css";
import { sendReservation } from "./services/concerts";
import SuccessNotify from "./login-page/Success";
import EventContext from "./services/EventHandler";
import { fetchSingle } from "./services/concerts";

function Prenotazione({id, prezzo}){
    const [success, setSuccess] = useState(false);
    const [header, setHeader] = useState("Biglietti prenotati");
    const [body, setBody] = useState("");
    const data = {prezzo: prezzo, quantità: 0};
    const [prenotazione, setPrenotazione] = useState(data);
    const [user, setUser] = useState({nome:"", cognome:"", email:""});
    const [totale, setTotale] = useState(0);

    function handleNumberChange(e){
        setPrenotazione({...prenotazione, quantità:e.target.value});
        setTotale(prenotazione.prezzo*e.target.value);
    }

    function handleNameChange(e)
    {
        setUser({...user, nome:e.target.value});
    }

    function handleSurnameChange(e)
    {
        setUser({...user, cognome:e.target.value});
    }

    function handleEmailChange(e)
    {
        setUser({...user, email:e.target.value});
    }

    function handleSubmit()
    {
        sendReservation(prenotazione.quantità, user, id)
        .then(()=>{
            setSuccess(true);
        })
        .catch((err)=>{
            alert("Errore durante la prenotazione:", err)
        });
    }

    return(
        <form className="container-fluid justify-content-center py-auto">
            <h1 className="title">Prenota biglietto</h1>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <label htmlFor="firstName" className="form-label text-white">Nome</label>
                    <input className="form-control" id="firstName" type="text" value={user.nome} onChange={(e) => handleNameChange(e)}/>
                </div>
                <div className="col-auto">
                    <label htmlFor="lastName" className="form-label text-white">Cognome</label>
                    <input className="form-control" id="lastName" type="text" value={user.cognome} onChange={(e) => handleSurnameChange(e)}/>
                </div>
            </div>
            <div className="row justify-content-center py-3">
                <div className="col-auto">
                    <label htmlFor="email" className="form-label text-white">E-mail</label>
                    <input className="form-control" id="email" type="email" value={user.email} onChange={(e) => handleEmailChange(e)}/>
                </div>
                <div className="col-auto">
                    <label htmlFor="numero" className="form-label text-white">Quantità</label>
                    <input className="form-control" id="numero" type="number" onChange={(e)=>handleNumberChange(e)}/>
                </div>
            </div>
            <div className="row justify-content-center pb-3">
                <span className="text-white">Totale: {totale} €</span>
            </div>
            <button type="button" className="btn btnCustom" onClick={handleSubmit}>Invia</button>
            <div className="row justify-content-center pt-3">
                <SuccessNotify show={success} setShow={setSuccess} header={header} body={body}/>
            </div>
        </form>
    );
}
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
            <Program evento={evento} />
            ) : (
            <p className="text-white">Caricamento in corso...</p>
        )}
            <section className="bg-image m-0 px-0 py-5"
            style={{backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(${background}`,
            backgroundPosition:"center", backgroundSize:"cover", height:"450px"}}>
                {evento.dettagli ? (
            <Prenotazione id={event} prezzo={evento.prezzo}/>
            ) : (
            <p className="text-white">Caricamento in corso...</p>
        )}
                
            </section>
        </div>    
    );
}

export default EventProgram;