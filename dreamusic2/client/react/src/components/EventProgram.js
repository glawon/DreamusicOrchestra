import React, {Component, useState} from "react";

function Prenotazione({evento}){
    console.log(evento);
    const data = {prezzo: evento.prezzo, quantità: 0};
    const [prenotazione, setPrenotazione] = useState(data);
    const [totale, setTotale] = useState(0);

    function handleNumberChange(e){
        setPrenotazione({...prenotazione, quantità:e.target.value});
        setTotale(prenotazione.prezzo*e.target.value);
    }

    function handleChange(e)
    {
        console.log(e.target.value);
    }

    return(
        <form className="container-fluid justify-content-center">
            <h1 className="title">Prenota biglietto</h1>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <label htmlFor="firstName" className="form-label text-white">Nome</label>
                    <input className="form-control" id="firstName" type="text" onChange={(e) => handleChange(e)}/>
                </div>
                <div className="col-auto">
                    <label htmlFor="lastName" className="form-label text-white">Cognome</label>
                    <input className="form-control" id="lastName" type="text"/>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <label htmlFor="email" className="form-label text-white">E-mail</label>
                    <input className="form-control" id="email" type="email"/>
                </div>
                <div className="col-auto">
                    <label htmlFor="numero" className="form-label text-white">Quantità</label>
                    <input className="form-control" id="numero" type="number" onChange={(e)=>handleNumberChange(e)}/>
                </div>
            </div>
            <div className="row justify-content-center">
                    <span className="text-white">Totale: {totale} €</span>
                </div>
        </form>
    );
}
function Program({evento}){
    return(
        <div className="row container-fluid justify-content-center">
            <div className="col-6">
                <h1 className="title text-center">{evento.concerto}</h1>
                <p className="text-white text-start"><strong>Data:</strong> <span className="text">{evento.data}</span>
                <br/><strong>Ora:</strong> <span className="text">{evento.ora}</span>
                <br/><strong>Location:</strong> <span className="text">{evento.città} - {evento.teatro}</span>
                <br/><strong>Prezzo:</strong><span className="text"> {evento.prezzo}€</span></p>
                <hr className="divider"/>
                <p className="title">Programma</p>
                <p className="text text-start"> {evento.programma}</p>
            </div>
        </div>
    );
}

function EventProgram({id}){
    console.log(id);

    return(
        <div className="container-fluid">
            <Program />
            <hr className="divider"/>
            <Prenotazione />
        </div>
        
    );
}

export default EventProgram;