import React, { useEffect, useState } from "react";
import Page from "./page";

const datiUtente = {isLogged: false, nome: "", cognome: "", email: "", password: "", ruolo: "user"}

function App(){
    const [backendData, setBackendData] = useState(null)
    const [login, setLogin] = useState(datiUtente);

    useEffect(() => {
        fetch("/api")
        .then( (response) => response.json())
        .then( (data) => { setBackendData(data)})
    }, []);

    return(
        <Page
        login={login}/>
    );
}

export default App;