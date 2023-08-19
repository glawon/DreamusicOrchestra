import React, {Component, useState} from 'react';
import "../Page.css";
import EventProgram from './EventProgram';
import cardImage from "../externals/locandina.png";

class Evento extends Component{
    handleClick(){
        return(
            {/*<EventProgram
            locandina={locandina}
            nomeConcerto={nomeConcerto}
            data={data}
            ora={ora}
            location={location}
            programma={programma}
        />*/}
        );
    }
    render()
    {return(
        <div className="col justify-content-center">
            <div className="card mx-auto my-3" style={{width: 20+'rem'}}>
                <img src={this.props.locandina} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.nomeConcerto}</h5>
                    <p className="card-text">Data: {this.props.data}<br/>Ora: {this.props.ora}<br/>Luogo</p>
                    <a href="/event" className="btn btnCustom" onClick={()=>{
                        return(
                            <EventProgram
                            locandina={this.props.locandina}
                            nomeConcerto={this.props.nomeConcerto}
                            data={this.props.data}
                            ora={this.props.ora}
                            location={this.props.location}
                            programma={this.props.programma}
                        />)}}>Descrizione</a>
                </div>
            </div>
        </div>
    );}
}
//inserire qui dati da DB
const events = [
    {id : 0, locandina : cardImage, location: "luogo", programma: "programma", data : "gg/mm/aaaa", ora : "00:00", nomeConcerto : "concerto 1"},
    {id : 1, locandina : cardImage, location: "luogo", programma: "programma", data : "gg/mm/aaaa", ora : "00:00", nomeConcerto : "concerto 2"},
    {id : 2, locandina : cardImage, location: "luogo", programma: "programma", data : "gg/mm/aaaa", ora : "00:00", nomeConcerto : "concerto 3"}
  ];

function Eventi(){
    const [eventi] = useState(events);
    return(
        <><h1 className="title" id="eventscroll">Prossimi eventi</h1>
        <div className="container">
            <div className = "row align-text-center mt-20">
            {eventi.map(event => (
                //creo automaticamente tanti componenti quanto quelli definiti in state
                <Evento
                key={event.id}
                locandina={event.locandina}
                data={event.data}
                ora={event.ora}
                location={event.location}
                programma={event.programma}
                nomeConcerto={event.nomeConcerto}/>
            ))}
            </div> 
        </div></>);
}

export default Eventi;