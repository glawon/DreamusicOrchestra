import React, {Component, useState} from "react";
import background from '../externals/score.jpg';
import { sendReservation } from "./services/concerts";

function Prenotazione({evento}){
    console.log(evento);
    const data = {prezzo: evento.prezzo, quantità: 0};
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
        sendReservation(prenotazione.quantità, user);
    }

    return(
        <form className="container-fluid justify-content-center py-auto">
            <h1 className="title">Prenota biglietto</h1>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <label htmlFor="firstName" className="form-label text-white">Nome</label>
                    <input className="form-control" id="firstName" type="text" onChange={(e) => handleNameChange(e)}/>
                </div>
                <div className="col-auto">
                    <label htmlFor="lastName" className="form-label text-white" onChange={(e) => handleSurnameChange(e)}>Cognome</label>
                    <input className="form-control" id="lastName" type="text"/>
                </div>
            </div>
            <div className="row justify-content-center py-3">
                <div className="col-auto">
                    <label htmlFor="email" className="form-label text-white" onChange={(e) => handleEmailChange(e)}>E-mail</label>
                    <input className="form-control" id="email" type="email"/>
                </div>
                <div className="col-auto">
                    <label htmlFor="numero" className="form-label text-white">Quantità</label>
                    <input className="form-control" id="numero" type="number" onChange={(e)=>handleNumberChange(e)}/>
                </div>
            </div>
            <div className="row justify-content-center pb-3">
                <span className="text-white">Totale: {totale} €</span>
            </div>
            <input type="submit" className="btn btnCustom"/>
        </form>
    );
}
function Program({evento}){
    return(
        <div className="row container-fluid justify-content-center py-5">
            <div className="col-6">
                <h1 className="title text-center">{evento.nome}</h1>
                <p className="text-white text-start"><strong>Data:</strong> {evento.data}<span className="text"></span>
                <br/><strong>Ora:</strong> {evento.ora}<span className="text"></span>
                <br/><strong>Location:</strong> {evento.citta}<span className="text"> - {evento.teatro}</span>
                <br/><strong>Prezzo:</strong><span className="text">€</span></p>
                <hr className="divider"/>
                <p className="title">Programma</p>
                <p className="text text-start">{evento.programma}</p>
            </div>
        </div>
    );
}

function EventProgram({eventi, evento}){
    return(
        <div className="container-fluid">
            <Program evento={evento}/>
            <section className="bg-image m-0 px-0 py-5" style={{backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(${background}`, backgroundPosition:"center",
            backgroundSize:"cover", height:"400px"}}>
                <Prenotazione evento={evento}/>
            </section>
        </div>
        
    );
}

export default EventProgram;