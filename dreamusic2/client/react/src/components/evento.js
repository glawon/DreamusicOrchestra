import React, {Component, useState, useEffect} from 'react';
import "../Page.css";
import EventProgram from './EventProgram';

function Evento({evento, getId, setId}){
    return(
        <div className="col justify-content-center">
            <div className="card mx-auto my-3" style={{width: 20+'rem'}}>
                <img src={evento.locandina} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{evento.nomeConcerto}</h5>
                    <p className="card-text">Data: {evento.data}<br/>Ora: {evento.ora}<br/>{evento.location}</p>
                    <a href="/event" className="btn btnCustom" onClick={()=>{
                        console.log("Id dell'evento:"+evento.id);
                        setId(evento.id);
                        getId();}
                        }>Descrizione</a>
                </div>
            </div>
        </div>
    );
}

function Eventi({eventi, getId, setId}){
    //const [eventi, setEventi] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/concert/index', {method:"GET"})
            .then((response) => response.json())
            .then((actualData) => console.log(actualData))
            .then((actualData) => setEventi(actualData));
        }, []);

    /*const events = [
    {id : 0, locandina : cardImage, location: "luogo", programma: "programma", data : "gg/mm/aaaa", ora : "00:00", nomeConcerto : "concerto 1", prezzo: "5€"},
    {id : 1, locandina : cardImage, location: "luogo", programma: "programma", data : "gg/mm/aaaa", ora : "00:00", nomeConcerto : "concerto 2", prezzo: "10€"},
    {id : 2, locandina : cardImage, location: "luogo", programma: "programma", data : "gg/mm/aaaa", ora : "00:00", nomeConcerto : "concerto 3", prezzo: "ingresso libero"}
    ];
    const [eventi, setEventi] = useState(events);*/

    return(
        <>
        <div className="container" id="eventscroll">
            <h1 className="title align-text-center">Prossimi eventi</h1>
            <div className = "row align-text-center mt-20">
            {eventi.map(event => {
                return <Evento
                key={event.id}
                evento={event}
                getId={getId}
                setId={setId}/>
            })}
            </div> 
        </div></>);
}

export default Eventi;