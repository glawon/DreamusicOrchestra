import React,{Component} from 'react';
import Musician from './musician';
import musician1 from "../externals/violin.png";
import musician2 from "../externals/double-bass.png";
import musician3 from "../externals/trumpet.png";
import musician4 from "../externals/trombone.png";
import musician5 from "../externals/piano.png";
import musician6 from "../externals/drums.png";

class About extends Component{
    state={
        musicians: [
            {id: 0, foto: musician1, nome: "Musician 1", strumento: "Violino"},
            {id: 1, foto: musician2, nome:"Musician 2", strumento: "Contrabbasso"},
            {id: 2, foto: musician3, nome: "Musician 3", strumento: "Tromba"},
            {id: 3, foto: musician4, nome: "Musician 4", strumento: "Trombone"}, 
            {id: 4, foto: musician5, nome: "Musician 5", strumento: "Pianoforte"},
            {id: 5, foto: musician6, nome: "Musician 6", strumento: "Batteria"}
          ]
    }

    renderEvenMusician(musician){
        if(musician.id % 2 == 0)
        {
          return(
            <Musician
              picture={musician.foto}
              noun={musician.nome}
              instrument={musician.strumento}
            />
          );
        }
      }
    
    renderOddMusician(musician){
        if(musician.id % 2 == 1)
        {
            return(
            <Musician
                picture={musician.foto}
                noun={musician.nome}
                instrument={musician.strumento}
            />
            );
        }
    }

    render(){
        return(
            <>
                <h1 className="header">Chi siamo</h1>
                <div className="container text-center">
                    <div className="row justify-content-md-center">
                        <div className="col offset-md-1">
                            {this.state.musicians.map(musician=>(
                            this.renderEvenMusician(musician)
                            ))}
                        </div>
                        <div className="col offset-md-1">
                            {this.state.musicians.map(musician=>(
                                this.renderOddMusician(musician)
                            ))}
                        </div>
                    </div>
                    </div>
            </>
        );
    }
}

export default About;