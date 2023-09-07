import { useState, useEffect } from "react";
import { deleteReservation, fetchOneUser } from "./services/user";
import Table from 'react-bootstrap/Table';
import "../App.css";
import { fetchTickets } from "./services/admin";

export default function UserArea(){
    const [user, setUser] = useState(null);
    const [tickets, setTickets] = useState([]);
    const id = sessionStorage.getItem('userID');
    const [modifica, setModifica] = useState(false);
    const [show, setShow] = useState(false);

    async function getUser()
        {
            fetchOneUser(id)
            .then(response => {
                //console.log("Dati dalla fetch: ", response);
                setUser(response)})
            .catch(err => alert("Errore nel caricamento dell'utente", err));
        }
        async function getTickets(){
            let userRes;
            fetchTickets()
            .then(data => {
                //console.log("Dati dalla fetch: ", data);
                userRes = data.filter(e => e.idUser === parseInt(id));
                console.log("Selezionati: ", userRes);
                setTickets(userRes);
            })
            .catch(err => alert("Errore nel caricamento dell'utente", err));
        }

    function deleteRes(id){
        deleteReservation(id)
        .then(()=>getTickets())
        .catch(err => console.error("Errore nella cancellazione della prenotazione", err));
    }

    function handlePasswordChange(){

    }

    useEffect(()=>{
        
        getUser();
        getTickets();
        console.log(user);
        console.log(tickets);
    }, [])

    return(
        user && tickets &&
        <><h1 className="header pt-5">Benvenuto, {user.nome} {user.cognome}</h1>
        <div className="col d-flex align-items-center justify-content-center py-3">
            
            <Table responsive>
                <thead>
                    <th colSpan={4}>I tuoi dati</th>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Nome</strong></td>
                        <td><strong>Cognome</strong></td>
                        <td><strong>E-mail</strong></td>
                        <td><strong>Password</strong></td>
                    </tr>
                    <tr className="align-middle">
                        <td>{user.nome}</td>
                        <td>{user.cognome}</td>
                        <td>{user.email}</td>
                        <td><button type="button" className="btn btn-link text-wrap" style={{color:"black"}} onClick={handlePasswordChange}>Modifica password</button></td>
                    </tr>
                    <tr>
                        <td colSpan={3}></td>
                        <td><button type="button" className="btn btnCustom" onClick={() => setModifica(!modifica)}>{modifica? "Salva" : "Modifica"}</button></td>
                    </tr>
                </tbody>
            </Table>
        </div>
        {tickets &&
        <div className="col d-flex align-items-center justify-content-center py-3">
            
            <Table responsive>
                <thead>
                    <th colSpan={4}>Le tue prenotazioni</th>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Evento</strong></td>
                        <td><strong>N. biglietti</strong></td>
                    </tr>
                    {tickets.map((t) =>
                        {t.ticket.concert &&
                            <tr className="align-middle">
                                <td>{tickets.ticket.concert.nome}</td>
                                <td>{tickets.quantita}</td>
                                <td><button type="button" className="btn btn-danger" onClick={() => deleteRes(tickets.idTicket)}>Rimuovi</button></td>
                            </tr>
                        })
                    }
                    <tr>
                        <td colSpan={3}></td>
                        <td><button type="button" className="btn btnCustom" onClick={() => setModifica(!modifica)}>{modifica? "Salva" : "Modifica"}</button></td>
                    </tr>
                </tbody>
            </Table>
        </div>
        }
        
        </>
    );
}