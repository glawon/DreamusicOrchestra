import React, {Component, useState, useEffect} from 'react';
import moment from 'moment';
import { fetchSingle } from './services/concerts';
import "../App.css";

function Evento({evento, setEventId}){
    /*const [event, setEvento] = useState();
    useEffect(() => {
        fetch('http://localhost:8000/api/concert/${eventId}/show', {method:"GET"})
            .then((response) => response.json())
        }, []);
    console.log(event);*/
    function handleClick(id){
        setEventId(id);
        //fetchSingle(id);
    }

    const ora = moment(evento.ora, 'HH:mm:ss').format('HH:mm');
    return(
        <div className="col justify-content-center">
            <div className="card mx-auto my-3" style={{width: "20 rem"}}>
                <img src={evento.locandina} className="card-img-top" style={{width: "20 rem", height: "15rem"}} alt="Locandina"/>
                <div className="card-body">
                    <h5 className="card-title">{evento.nome}</h5>
                    <p className="card-text">{evento.data}<br/>{ora}<br/><br/><strong><span className="text" style={{textTransform: "uppercase"}}>{evento.citta}</span></strong>
                    <br/><span className="text">{evento.teatro}</span>  </p>
                    <a href="/event" className="btn btnCustom" onClick={() => handleClick(evento.id)}>Descrizione</a>
                </div>
            </div>
        </div>
    );
}

function Eventi({eventi, setEventId}){

    return(
        <>
        <div className="container" >
            <h1 className="title align-text-center">Prossimi eventi</h1>
            <div className = "row align-text-center mt-20">
            {eventi.map(event => {
                return <Evento
                key={event.id}
                evento={event}
                setEventId={setEventId}/>
            })}
            </div>
        </div></>);
}

export default Eventi;