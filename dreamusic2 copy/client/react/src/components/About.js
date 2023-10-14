import React,{useEffect, useState} from 'react';
import Musician from './musician';
import { fetchMusicians } from './services/admin';

function About(){
    const [musicians, setMusicians] = useState([]);
    
    useEffect(()=>{
        async function getMusicians() {
            try {
                const musicians = await fetchMusicians();
                console.log(musicians);
                setMusicians(musicians);
            } catch (error) {
                alert("Errore nel caricare i musicisti: ", error);
            }
          }
          getMusicians();
    }, []);

        return(
            <>
                <div className="container text-center">
                    <h1 className="header">Chi siamo</h1>
                    <div className="row row-cols-2 justify-content-md-center">
                        {musicians.map((musician=>
                                (<Musician
                            key={musician.id}
                                picture={musician.immagine}
                                noun={musician.nome}
                                instrument={musician.strumento}
                            />)
                        ))}
                    </div>
                    </div>
            </>
        );
}

export default About;