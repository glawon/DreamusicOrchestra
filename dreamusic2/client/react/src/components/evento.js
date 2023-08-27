import React, {Component, useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import "../Page.css";
import EventProgram from './EventProgram';
import cardImage from "../externals/locandina.png";

//inserire qui dati da DB
class Evento extends Component{
    render()
    {return(
        <div className="col justify-content-center">
            <div className="card mx-auto my-3" style={{width: 20+'rem'}}>
                <img src={this.props.locandina} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.nomeConcerto}</h5>
                    <p className="card-text">Data: {this.props.data}<br/>Ora: {this.props.ora}<br/>{this.props.location}</p>
                    {<a href="/event" className="btn btnCustom" onClick={()=>{this.props.onClick(this.props.id)}}>Descrizione</a>}
                </div>
            </div>
        </div>
    );}
}

/*function Evento(locandina, nomeConcerto, data, ora, location, programma, prezzo){
    function handleClick(){
        return(
            {/*<EventProgram
            locandina={locandina}
            nomeConcerto={nomeConcerto}
            data={data}
            ora={ora}
            location={location}
            programma={programma}
        />}
        );
    }
    
    return(
        <div className="col justify-content-center">
            <div className="card mx-auto my-3" style={{width: 20+'rem'}}>
                <img src={locandina} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{nomeConcerto}</h5>
                    <p className="card-text">Data: {data}<br/>Ora: {ora}<br/>{location}</p>
                    <a href="/event" className="btn btnCustom" onClick={()=>{
                        return(
                            <EventProgram
                            locandina={locandina}
                            nomeConcerto={nomeConcerto}
                            data={data}
                            ora={ora}
                            location={location}
                            prezzo={prezzo}
                            programma={programma}
                        />)}}>Descrizione</a>
                </div>
            </div>
        </div>
    );
}*/

function Eventi(){
    //const [eventi, setEventi] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/concert/index', {method:"GET"})
            .then((response) => response.json())
            .then((actualData) => console.log(actualData))
            .then((actualData) => setEventi(actualData));
        }, []);

    const events = [
    {id : 0, locandina : cardImage, location: "luogo", programma: "programma", data : "gg/mm/aaaa", ora : "00:00", nomeConcerto : "concerto 1", prezzo: "5€"},
    {id : 1, locandina : cardImage, location: "luogo", programma: "programma", data : "gg/mm/aaaa", ora : "00:00", nomeConcerto : "concerto 2", prezzo: "10€"},
    {id : 2, locandina : cardImage, location: "luogo", programma: "programma", data : "gg/mm/aaaa", ora : "00:00", nomeConcerto : "concerto 3", prezzo: "ingresso libero"}
    ];
    const [eventi, setEventi] = useState(events);
    
    // function handleClick(eId){
    //     eventi.map((evento) =>{
    //         if(evento.id == eId){
    //             return <>
    //             <Route path="/event" element={<EventProgram
    //             key={evento.id}
    //             locandina={evento.locandina}
    //             data={evento.data}
    //             ora={evento.ora}
    //             location={evento.location}
    //             programma={evento.programma}
    //             prezzo={evento.prezzo}
    //             nomeConcerto={evento.nomeConcerto}
    //             />}/>
    //             <span>Ciao, sei nel programma</span>
    //             </>;
    //         }
    //     })
    // }
    // return(
    //     <>
    //     <div className="container" id="eventscroll">
    //         <h1 className="title align-text-center">Prossimi eventi</h1>
    //         <div className = "row align-text-center mt-20">
    //         {eventi.map(event => (
    //             <Evento
    //             key={event.id}
    //             locandina={event.locandina}
    //             data={event.data}
    //             ora={event.ora}
    //             location={event.location}
    //             programma={event.programma}
    //             prezzo={event.prezzo}
    //             nomeConcerto={event.nomeConcerto}
    //             onClick={handleClick}/>
    //         ))}
    //         </div> 
    //     </div></>);
}

export default Eventi;