import cardImage from "../externals/locandina.png";
import React, {Component} from "react";


class EventProgram extends Component{
    render()
    {return(
        <div className="row container-fluid">
            <div className="col-2">
                <p className="title text-center">{this.props.nomeConcerto}{console.log(this.props.nomeConcerto)}</p>
                <p className="text text-start">Data: {this.props.data}<br/>Ora: {this.props.ora}<br/>Location: {this.props.location}<br/>Prezzo: {this.props.prezzo}€</p>
                <p className="title">Programma</p>
                <p className="text text-start"> {this.props.programma}</p>
            </div>
        </div>
    );}
}

/*function EventProgram(nomeConcerto, data, ora, location, prezzo, programma)
{
    return(
        <span>Ciao</span>
    );
}*/

export default EventProgram;