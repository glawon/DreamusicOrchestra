import React, {Component, useState, useEffect, useContext} from 'react';
import moment from 'moment';
import { fetchSingle } from './services/concerts';
import { useNavigate } from 'react-router-dom';
import EventContext from './services/EventHandler';
import "../App.css";

function Evento({evento, setEventId, setCambia}){
    const navigate = useNavigate();
    const { setEvent } = useContext(EventContext);
    //sistemare con un'altra funzione di App che cambia direttamente lì lo stato
    function handleClick(id){
        /*setEventId(id);
        setCambia(true);*/

        setEvent(id);
        sessionStorage.setItem('id', id);
        id && navigate("/event");
    }

    const ora = moment(evento.ora, 'HH:mm:ss').format('HH:mm');
    const data = moment(evento.data, 'yyyy/mm/DD').format('DD/mm/yyyy');
    return(
        <div className="col justify-content-center">
            <div className="card mx-auto my-3" style={{width: "20 rem"}}>
                <img src={evento.locandina} className="card-img-top" style={{width: "20 rem", height: "15rem"}} alt="Locandina"/>
                <div className="card-body">
                    <h5 className="card-title">{evento.nome}</h5>
                    <p className="card-text">{data}<br/>{ora}<br/><br/><strong><span className="text" style={{textTransform: "uppercase"}}>{evento.citta}</span></strong>
                    <br/><span className="text">{evento.teatro}</span>  </p>
                    <button className="btn btnCustom" onClick={() => handleClick(evento.id)}>Descrizione</button>
                </div>
            </div>
        </div>
    );
}

function Eventi({eventi, setEventId, setCambia}){

    return(
        <>
        <div className="container" >
            <h1 className="header align-text-center">Prossimi eventi</h1>
            <div className = "row align-text-center mt-20">
            {eventi.map(event => {
                return <Evento
                key={event.id}
                evento={event}
                setCambia={setCambia}
                setEventId={setEventId}/>
            })}
            </div>
        </div></>);
}

export default Eventi;