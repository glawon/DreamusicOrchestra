import React,{useState} from 'react';
import Musician from './musician';


function About({musicians}){

    function renderEvenMusician(musician){
        if(musician.id % 2 == 0)
        {
          return(
            <Musician
            key={musician.id}
              picture={musician.foto}
              noun={musician.nome}
              instrument={musician.strumento}
            />
          );
        }
      }
    
    function renderOddMusician(musician){
        if(musician.id % 2 == 1)
        {
            return(
            <Musician
                key={musician.id}
                picture={musician.foto}
                noun={musician.nome}
                instrument={musician.strumento}
            />
            );
        }
    }

        return(
            <>
                <div className="container text-center">
                    <h1 className="header">Chi siamo</h1>
                    <div className="row justify-content-md-center">
                        <div className="col offset-md-1">
                            {musicians.map(musician=>(
                            renderEvenMusician(musician)
                            ))}
                        </div>
                        <div className="col offset-md-1">
                            {musicians.map(musician=>(
                                renderOddMusician(musician)
                            ))}
                        </div>
                    </div>
                    </div>
            </>
        );
}

export default About;