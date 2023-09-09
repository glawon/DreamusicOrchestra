import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteReservation, deleteUser, fetchOneUser } from "./services/user";
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import SuccessNotify from "./login-page/Success";
import "../App.css";
import { fetchTickets } from "./services/admin";
import { updateUser } from "./services/user";

function Control({show, setShow, handleDelete, text}){
    return(
        <Alert className="container-fluid d-block m-0" show={show} style={{backgroundColor:"black", border:"rgb(1,1,1)"}}>
            <Alert.Heading className="title">{text}</Alert.Heading>
            <button className="btn btnCustom me-3" onClick={handleDelete}>Conferma</button>
            <button className="btn btn-danger ms-3" onClick={()=>setShow(false)}>Annulla</button>
        </Alert>
    );
}

export default function UserArea({setLogin}){
    const [user, setUser] = useState(null);
    const [tickets, setTickets] = useState([]);
    const id = sessionStorage.getItem('userID');
    const [modifica, setModifica] = useState(false);
    // const [show, setShow] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showRes, setShowRes] = useState(false);
    const [toastShow, setToastShow] = useState(false);

    const navigate = useNavigate();

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

    function handleDeleteRes(id){
        setShowRes(true);
        deleteReservation(id)
        .then(()=>getTickets())
        .catch(err => console.error("Errore nella cancellazione della prenotazione", err));
    }

    function handlePasswordChange(e){
        setUser({...user, password: e.target.value});
    }

    function handleEmailChange(e){
        setUser({...user, email: e.target.value});
    }

    function handleModifica(){
        setModifica(!modifica);
        if(modifica)
        {    
            updateUser(user)
            .then(()=>setToastShow(true));
        }
    }

    function handleDelete(){
        setShowUser(false);
        deleteUser(user.id);
        // sessionStorage.removeItem('user');
        sessionStorage.removeItem("userID");
        setUser(null); 
        setLogin(false);
        navigate("/");
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
        <div className="row">
            {/* <div className="col-4 d-flex align-items-center justify-content-center py-3">
                <SuccessNotify show={toastShow} setShow={setToastShow} header={"Profilo aggiornato"} body={""}/>
            </div> */}
            <div className="col d-flex align-items-center justify-content-center py-3">
                <Table responsive bordered>
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
                            {modifica ?
                                <><td><input type="email" value={user.email} onChange={e => handleEmailChange(e)}/></td>
                                <td><input type="password" placeholder="Nuova password"/></td></>
                                
                            :    
                                <><td>{user.email}</td>
                                <td><button type="button" className="btn btn-link text-wrap" style={{color:"black"}} onClick={e => handlePasswordChange(e)}>Modifica password</button></td></> 
                            }
                            
                        </tr>
                        <tr>
                            {showUser===true ?
                            <td colSpan={4}>
                                <Control show={showUser} setShow={setShowUser} handleDelete={handleDelete} text="Stai eliminando l'account!"/>
                            </td>
                            :
                                <><td colSpan={2}></td>
                                <td><button type="button" className="btn btnCustom" onClick={handleModifica}>{modifica? "Salva" : "Modifica"}</button></td>
                                <td><button type="button" className="btn btn-danger" onClick={()=>setShowUser(true)}>Cancella</button></td></>
                            }                               
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
        
        {tickets &&
        <div className="col d-flex align-items-center justify-content-center py-3">
            
            <Table responsive bordered>
                <thead>
                    <th colSpan={5}>Le tue prenotazioni</th>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={3}><strong>Evento</strong></td>
                        <td><strong>N.biglietti</strong></td>
                        <td></td>
                    </tr>
                    { tickets.map((t) =>
                        t.ticket.concert &&
                        <><tr className="align-middle">
                            <td>{t.ticket.concert.nome}</td>
                            <td>{t.ticket.concert.citta}</td>
                            <td>{moment(t.ticket.concert.data, 'yyyy/mm/DD').format('DD/mm/yyyy')}</td>
                            <td>{t.quantita}</td>
                        {showRes===true ?
                            <td colSpan={4}>
                                <Control show={showRes} setShow={setShowRes} handleDelete={()=>handleDeleteRes(t.id)} text="Stai eliminando la prenotazione"/>
                            </td>
                        :
                            <td><button type="button" className="btn btn-danger" onClick={()=>setShowRes(true)}>Rimuovi</button></td>
                        }                               
                        </tr></>
                        )
                    }
                    
                </tbody>
            </Table>
        </div>
        }
        </>
    );
}