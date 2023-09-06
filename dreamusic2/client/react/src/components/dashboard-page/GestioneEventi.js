import Table from 'react-bootstrap/esm/Table';
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';
import { fetchConcerts } from '../services/concerts';
import { updateEvent, deleteEvents } from '../services/admin';
import InsertDataModal from './DataModal';
import "../../App.css";

export default function GestioneEventi(){
    const [events, setEvents] = useState([]);
    const [eventStates, setEventStates] = useState([]);
    const [eventData, setEventData] = useState({id: -1, nome:"", data:"", ora:"", immagine: null});
    const [show, setShow] = useState(true);
    const [showModal, setShowModal] = useState(false);

    async function getEvents() {
        try {
            const events = await fetchConcerts();
            console.log(events);
            setEvents(events);
            setEventStates(events.map((event) =>
            ({ id: event.id, modifica: false, alertShow: false })
            ));
        } catch (error) {
            alert("Errore nel caricare i musicisti: ", error);
        }
      }

      
    function handleModificaToggle(event, stato) {
        setEventStates((prevStates) =>
            prevStates.map((state) =>
            state.id === event.id ? { ...state, modifica: !state.modifica } : state
        ));
        if(stato === "salva")
        {
            console.log("Sto aggiornando: ", eventData);
            updateEvent(eventData);
        }
            
    }
      
    function handleNameChange(event, id)
    {
        let updated = events.find((m) => m.id === id);
        updated.nome = event.target.value;
        setEventData({id: updated.id, nome: updated.nome, data: updated.data, ora: updated.ora,
            citta: updated.citta, teatro: updated.teatro, immagine: updated.immagine});
        setEvents([...events, updated]);
    }

    function handleDateChange(event, id)
    {
        let updated = events.find((m) => m.id === id);
        updated.data = event.target.value;
        setEventData({id: updated.id, nome: updated.nome, data: updated.data, ora: updated.ora,
            citta: updated.citta, teatro: updated.teatro, immagine: updated.immagine});
        setEvents([...events, updated]);
    }
    
    function handleTimeChange(event, id)
    {
        let updated = events.find((m) => m.id === id);
        updated.ora = event.target.value;
        setEventData({id: updated.id, nome: updated.nome, data: updated.data, ora: updated.ora,
            citta: updated.citta, teatro: updated.teatro, immagine: updated.immagine});
        setEvents([...events, updated]);
    }

    function handlePicChange(event, id)
    {
        const file = event.target.files[0];
        let updated = events.find((m) => m.id === id);
        if(file)
        {
            updated.immagine = URL.createObjectURL(file);
            console.log(updated);
            setEvents([...events, updated]);
            setEventData({id: updated.id, nome: updated.nome, data: updated.data, ora: updated.ora,
                citta: updated.citta, teatro: updated.teatro, immagine: file});
        }
    }

    function handleCityChange(event, id)
    {
        let updated = events.find((m) => m.id === id);
        updated.citta = event.target.value;
        setEventData({id: updated.id, nome: updated.nome, data: updated.data, ora: updated.ora,
            citta: updated.citta, teatro: updated.teatro, immagine: updated.immagine});
        setEvents([...events, updated]);
    }

    function handleTheaterChange(event, id)
    {
        let updated = events.find((m) => m.id === id);
        updated.teatro = event.target.value;
        setEventData({id: updated.id, nome: updated.nome, data: updated.data, ora: updated.ora,
            citta: updated.citta, teatro: updated.teatro, immagine: updated.immagine});
        setEvents([...events, updated]);
    }

    function handleAlertShow(id)
    {
        setShow(!show);
        setEventStates((prevStates) =>
            prevStates.map((state) =>
            state.id === id ? { ...state, alertShow: !state.alertShow } : state
        ));
    }
    
    function confirmDelete(event)
    {       
        setEventStates(eventStates.filter(m => m.id !== event.id));
        setEvents(events.filter(m => m.id !== event.id));
        deleteEvents(event);
    }

    useEffect(()=>{ 
        getEvents();
    }, []);

    return(
        <div className = "container-fluid py-4 px-0 mt-5" id="#about">
            <h3 className = "title text">Musicisti <i className="bi bi-music-note-beamed"></i></h3>
            <button className ="btn btnCustom mb-3" onClick={()=>{setShowModal(true); console.log("Modal:"+showModal)}}>Aggiungi</button>
            <InsertDataModal show={showModal} setShow={setShowModal} getter={getEvents}/>
            <Table responsive striped bordered variant="dark">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data</th>
                        <th>Ora</th>
                        <th colspan="2">Luogo</th> {/*città-teatro*/}
                        <th>Locandina</th>
                        <th colSpan={3}></th>
                    </tr>
                </thead>
                <tbody>
                    {eventStates.map((eventState) => {
                    const event = events.find((m) => m.id === eventState.id);
                    return (
                        <tr className="rowCustom mb-0 pb-0" key={event.id}>
                            <td>
                                {eventState.modifica ? (
                                    <textarea style={{resize: "none", border: "none", backgroundColor: "rgba(255,255,255,0.1)", color: "white"}}
                                    onChange={(e) => {handleNameChange(e, event.id)}}
                                    value={event.nome}/>
                                    ) : (
                                    <span className='names'>{event.nome}</span>
                                )}
                            </td>
                            <td>
                                {eventState.modifica ? (
                                    <textarea style={{resize: "none", border: "none", backgroundColor: "rgba(255,255,255,0.1)", color: "white"}}
                                    onChange={(e) => {handleDateChange(e, event.id)}}
                                    value={event.data}/>
                                    ) : (
                                    <span className='names'>{event.data}</span>
                                )}
                            </td>
                            <td>
                                {eventState.modifica ? (
                                    <textarea style={{resize: "none", border: "none", backgroundColor: "rgba(255,255,255,0.1)", color: "white"}}
                                    onChange={(e) => {handleTimeChange(e, event)}}
                                    value={event.ora}/>
                                    ) : (
                                    <span className='names'>{event.ora}</span>
                                )}
                            </td>
                            <td>
                                {eventState.modifica ? (
                                    <textarea style={{resize: "none", border: "none", backgroundColor: "rgba(255,255,255,0.1)", color: "white"}}
                                    onChange={(e) => {handleCityChange(e, event)}}
                                    value={event.citta}/>
                                    ) : (
                                    <span className='names'>{event.citta}</span>
                                )}
                            </td>
                            <td>
                                {eventState.modifica ? (
                                    <textarea style={{resize: "none", border: "none", backgroundColor: "rgba(255,255,255,0.1)", color: "white"}}
                                    onChange={(e) => {handleTheaterChange(e, event)}}
                                    value={event.teatro}/>
                                    ) : (
                                    <span className='names'>{event.teatro}</span>
                                )}
                            </td>
                            <td>
                                {eventState.modifica ? (
                                    <><img src={event.immagine} style={{ width: "8em", height: "5em" }} alt="foto"/><br/>
                                    <input type="file" name="foto" accept="image/png, image/jpeg" onChange={(e)=>handlePicChange(e, event.id)}/></>
                                    ) : (
                                    <img src={event.immagine} alt="foto" style={{ width: "8em", height: "5em" }}/>
                                )}
                                
                            </td>
                            <td>
                                <button className="btn btnCustom" onClick={
                                    eventState.modifica ? () => handleModificaToggle(event, "salva") : () => handleModificaToggle(event, "modifica")}>
                                    {eventState.modifica ? "Salva" : "Modifica"}
                                </button>
                            </td>
                            <td>
                                {show &&
                                    <button className="btn btn-danger" onClick={() => handleAlertShow(event.id)}>Rimuovi</button>
                                }
                                <Alert className="container-fluid d-block mb-0" show={eventState.alertShow} style={{backgroundColor:"rgba(0,0,0,0.9)", border:"rgba(0,0,0,0.9)"}}>
                                    <Alert.Heading className="title">Stai eliminando:<br/>{event.nome}, {event.ora}</Alert.Heading>
                                    <button className="btn btnCustom me-3" onClick={()=> {confirmDelete(event); setShow(!show)}}>Conferma</button>
                                    <button className="btn btn-danger ms-3" onClick={()=> handleAlertShow(event.id)}>Annulla</button>
                                </Alert>
                            </td>
                        </tr>        
                    );
                })}
                </tbody>
            </Table>   
        </div>
    );
}