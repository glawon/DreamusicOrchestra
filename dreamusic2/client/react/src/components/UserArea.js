import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteReservation, deleteUser, fetchOneUser } from "./services/user";
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import SuccessNotify from "./login-page/Success";
import "../App.css";
import { fetchTickets } from "./services/admin";
import { updateUser, purchase } from "./services/user";
import background from "../externals/AreaPersonale.jpg";

function Control({show, setShow, handleDelete, text, reservation}){
    console.log(reservation);
    return(
    reservation ? (
        <Alert className="container-fluid d-block m-0" show={show} style={{backgroundColor:"black", border:"rgb(1,1,1)"}}>
            <Alert.Heading className="title">{text}{reservation.ticket.concert.nome}</Alert.Heading>
            <button className="btn btnCustom me-3" onClick={handleDelete}>Conferma</button>
            <button className="btn btnDanger ms-3" onClick={()=>setShow(false)}>Annulla</button>
        </Alert>
    ) : (
        <Alert className="container-fluid d-block m-0" show={show} style={{backgroundColor:"black", border:"rgb(1,1,1)"}}>
            <Alert.Heading className="title">{text}</Alert.Heading>
            <button className="btn btnCustom me-3" onClick={handleDelete}>Conferma</button>
            <button className="btn btnDanger ms-3" onClick={()=>setShow(false)}>Annulla</button>
        </Alert>
    )
    );
}

export default function UserArea({setLogin}){
    const [user, setUser] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [ticketStates, setTicketStates] = useState();
    const id = sessionStorage.getItem('userID');
    const [modifica, setModifica] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [showRes, setShowRes] = useState(false); //gestisce la visibilità della conferma eliminazione per l'evento
    const [toastShow, setToastShow] = useState(false); //gestisce la visibilità della conferma eliminazione per lo user
    const [success, setSuccess] = useState(false);
    const [text, setText] = useState({header:"", body:""});
    const [reservation, setReservation] = useState();

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
            setTicketStates(userRes.map((res) =>
            ({ id: res.id, showRes: false})
            ));
        })
        .catch(err => alert("Errore nel caricamento dell'utente", err));
        
    }

    function purchaseTicket(ticket){
        purchase(ticket)
        .then(data => {
            console.log(data.message);
            if(data.message != null){
                let updated = tickets.find(t => t.id === ticket.id);
                setTickets([...tickets,updated]);
            }
        });
        // .catch(err => alert("Errore nell'acquisto", err));
    }

    function confirmDeleteRes(ticket){
        setReservation(ticket);
        setTicketStates((prevStates) =>
            prevStates.map((state) =>
            state.id === ticket.id ? { ...state, showRes: !state.showRes } : state
        ));
        
        setShowRes(true);
        if(showRes===false)
            setTicketStates((prevStates) =>
            prevStates.map((state) =>
            state.id === ticket.id ? { ...state, showRes: !state.showRes } : state
    ));
    } 

    function handleDeleteRes(ticket){
        setTicketStates(ticketStates.filter(t=>t.id !== ticket.id));
        setShowRes(false);
        deleteReservation(ticket.id)
        .then(()=>getTickets())
        .catch(err => console.error("Errore nella cancellazione della prenotazione", err));
    }

    function oldPasswordCheck(e){
        setUser({...user, old_password: e.target.value});
    }
    function handlePasswordChange(e){
        setUser({...user, new_password: e.target.value});
    }

    function checkPasswordChange(e){
        setUser({...user, confirm_password: e.target.value});
    }

    function handleModifica(){
        setModifica(!modifica);
        if(modifica)
        {    
            updateUser(user)
            .then(()=>{
                setSuccess(true);
                setText({header: "Utente aggiornato"});
                setToastShow(true)
            })
            .catch((error) => {
                setToastShow(true)
                setText({header: "Errore"});
            })
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
        console.log("TicketStates:", ticketStates);
    }, []);

    return(
        user && ticketStates &&
        <><section className="section bg-image" style={{backgroundImage: `url(${background}`, backgroundColor:"rgba(0,0,0,0.8)",
        backgroundSize:"cover", backgroundRepeat:"no-repeat", height:"80vh"}}>
        <h1 className="header text-black pt-5">Benvenuto, {user.nome} {user.cognome}</h1>
        <div className="container">
                <div className="container-fluid align-items-center justify-content-center py-3">
                    <SuccessNotify show={toastShow} setShow={setToastShow} success={success} header={text.header} body={text.body}/>
                    {showUser===true &&
                        <Control show={showUser} setShow={setShowUser} handleDelete={handleDelete} text="Stai eliminando l'account!"/>
                    }
                    <Table responsive bordered variant="dark">
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
                                {modifica ?
                                    <><td><input type="password" className="px-2" placeholder="Vecchia password" onChange={e => oldPasswordCheck(e)}/>
                                        <input type="password" className="px-2" placeholder="Nuova password" onChange={e => handlePasswordChange(e)}/>
                                    <input type="password" className="px-2" placeholder="Conferma password" onChange={e => checkPasswordChange(e)}/>
                                    </td>
                                    </>
                                :    
                                    <td>********</td>
                                }
                                
                            </tr>
                            <tr>  
                                <td colSpan={3}><button type="button" className="btn btnDanger" onClick={()=>setShowUser(true)}>Elimina account</button></td>
                                <td colSpan={2}><button type="button" className="btn btnCustom" onClick={handleModifica}>{modifica? "Salva" : "Modifica password"}</button></td>                           
                            </tr>
                        </tbody>
                    </Table>
                </div>
        </div>
        
        {ticketStates &&
        <div className="container-fluid d-block align-items-center justify-content-center py-3">
            {showRes===true &&
                <Control show={showRes} setShow={setShowRes} handleDelete={()=>handleDeleteRes(reservation)} reservation={reservation} text="Stai eliminando la prenotazione: "/>
            } 
            <Table responsive bordered variant="dark">
                <thead>
                    <th colSpan={7}>Le tue prenotazioni</th>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={3}><strong>Evento</strong></td>
                        <td><strong>N.biglietti</strong></td>
                        <td><strong>Data prenotazione</strong></td>
                        <td><strong>Data acquisto</strong></td>
                        <td></td>
                    </tr>
                    { ticketStates.map((ticketState) => {
                        const t = tickets.find((ticket) => ticket.id === ticketState.id);
                        console.log(t);
                        return(
                            <tr className="align-middle">
                                <td>{t.ticket.concert.nome}</td>
                                <td>{t.ticket.concert.citta}</td>
                                <td>{moment(t.ticket.concert.data, 'yyyy/mm/DD').format('DD/mm/yyyy')}</td>
                                <td>{t.quantita}</td>
                                {t.created_at ?
                                (
                                    <td>{moment(t.created_at, 'YYYY/MM/DDTHH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}</td>
                                ) : (
                                    <td>10/08/2023</td>
                                )}
                                {t.stato === "prenotato" ? 
                                (
                                    <>
                                    <td><button type="button" className="btn btnCustom" onClick={()=>purchaseTicket(t.id)}>Acquista</button></td>
                                    <td><button type="button" className="btn btnDanger" onClick={()=>confirmDeleteRes(t)}>Cancella prenotazione</button></td>                              
                                </>) : (
                                    <>
                                    <td>{moment(t.updated_at, 'YYYY/MM/DDTHH:mm:ss').format('DD/MM/YYYY HH:mm:ss')}</td>
                                    <td></td>
                                    </>
                                )}
                            </tr>
                        );})
                    }
                    
                </tbody>
            </Table>
        </div>
        }
        </section></>
    );
}