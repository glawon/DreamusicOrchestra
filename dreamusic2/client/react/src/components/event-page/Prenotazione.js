import SuccessNotify from "../login-page/Success";
import { useState } from "react";
import { sendReservation } from "../services/concerts";

function Prenotazione({id, prezzo}){
    const [success, setSuccess] = useState(false);
    const [header, setHeader] = useState("Biglietti prenotati");
    const [body, setBody] = useState("");
    const data = {prezzo: prezzo, quantità: 0};
    const [prenotazione, setPrenotazione] = useState(data);
    const [user, setUser] = useState({nome:"", cognome:"", email:""});
    const [totale, setTotale] = useState(0);

    function handleNumberChange(e){
        setPrenotazione({...prenotazione, quantità:e.target.value});
        setTotale(prenotazione.prezzo*e.target.value);
    }

    function handleNameChange(e)
    {
        setUser({...user, nome:e.target.value});
    }

    function handleSurnameChange(e)
    {
        setUser({...user, cognome:e.target.value});
    }

    function handleEmailChange(e)
    {
        setUser({...user, email:e.target.value});
    }

    function handleSubmit()
    {
        sendReservation(prenotazione.quantità, user, id)
        .then(()=>{
            setSuccess(true);
        })
        .catch((err)=>{
            alert("Errore durante la prenotazione:", err)
        });
    }

    return(
        <form className="container-fluid justify-content-center py-auto">
            <h1 className="title">Prenota biglietto</h1>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <label htmlFor="firstName" className="form-label text-white">Nome</label>
                    <input className="form-control" id="firstName" type="text" value={user.nome} onChange={(e) => handleNameChange(e)}/>
                </div>
                <div className="col-auto">
                    <label htmlFor="lastName" className="form-label text-white">Cognome</label>
                    <input className="form-control" id="lastName" type="text" value={user.cognome} onChange={(e) => handleSurnameChange(e)}/>
                </div>
            </div>
            <div className="row justify-content-center py-3">
                <div className="col-auto">
                    <label htmlFor="email" className="form-label text-white">E-mail</label>
                    <input className="form-control" id="email" type="email" value={user.email} onChange={(e) => handleEmailChange(e)}/>
                </div>
                <div className="col-auto">
                    <label htmlFor="numero" className="form-label text-white">Quantità</label>
                    <input className="form-control" id="numero" type="number" onChange={(e)=>handleNumberChange(e)}/>
                </div>
            </div>
            <div className="row justify-content-center pb-3">
                <span className="text-white">Totale: {totale} €</span>
            </div>
            <button type="button" className="btn btnCustom" onClick={handleSubmit}>Invia</button>
            <div className="row justify-content-center pt-3">
                <SuccessNotify show={success} setShow={setSuccess} header={header} body={body}/>
            </div>
        </form>
    );
}

export default Prenotazione;