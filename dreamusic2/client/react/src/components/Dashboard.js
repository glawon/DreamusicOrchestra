import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/esm/Table';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';

function Lista({state, setState}) {
    const [selected, setSelected] = useState()
    function handleShow(key){
        if(key === "about")
        {
            setState({aboutShow: true, eventShow: false, shopShow: false});
        }  
        else if(key === "event")
            setState({aboutShow: false, eventShow: true, shopShow: false});
        else if(key === "shop")
            setState({aboutShow: false, eventShow: false, shopShow: true});
        setSelected(key);    
    }
  return (
    <><h5 className="title">Pagine</h5>
    <ListGroup horizontal defaultActiveKey="#lista" className="d-flex">
      <ListGroup.Item key="about" action href="#about" style={{backgroundColor: selected === "about" ? "orange" : "", border: selected === "about" ? "orange" : ""}}
      onClick={()=>{handleShow("about")}}>
        About
      </ListGroup.Item>
      <ListGroup.Item key="event"action href="#link2" style={{backgroundColor: selected === "event" ? "orange" : "", border: selected === "event" ? "orange" : ""}}
      onClick={()=>{handleShow("event")}}>
        Eventi
      </ListGroup.Item>
      <ListGroup.Item key="shop" action href="#link3" style={{backgroundColor: selected === "shop" ? "orange" : "", border: selected === "shop" ? "orange" : ""}}
      onClick={()=>{handleShow("shop")}}>
        Shop
      </ListGroup.Item>
    </ListGroup></>
  );
}

function GestioneMusicisti({musicians, setMusicians}){
    const [show, setShow] = useState(true);
    
    const [isActive, setActive] = useState(false);
    const [musicianStates, setMusicianStates] = useState(
        musicians.map((musician) => ({ id: musician.id, modifica: false, alertShow: false }))
      );
    
    function handleModificaToggle(id) {
        setMusicianStates((prevStates) =>
            prevStates.map((state) =>
            state.id === id ? { ...state, modifica: !state.modifica } : state
        ));
    }
      
    function handleNameChange(event, id)
    {
        let updated = musicians.find((m) => m.id === id);
        updated.nome = event.target.value;
        setMusicians([...musicians, updated]);
        //chiama la POST
    }
    
    function handleInstrumentChange(event, id)
    {
        let updated = musicians.find((m) => m.id === id);
        updated.strumento = event.target.value;
        setMusicians([...musicians, updated]);
        //chiama la POST
    }

    function handlePicChange(event, id)
    {
        const file = event.target.files[0];
        console.log("File selezionato: "+ file);
        let updated = musicians.find((m) => m.id === id);
        if(file)
        {
            updated.foto = URL.createObjectURL(file);
            setMusicians([...musicians, updated]);
        }
        
    }
    function handleAlertShow(id)
    {
        setShow(!show);
        setMusicianStates((prevStates) =>
            prevStates.map((state) =>
            state.id === id ? { ...state, alertShow: !state.alertShow } : state
        ));
    }
    
    function confirmDelete(id)
    {       
        setMusicianStates(musicianStates.filter(m => m.id !== id));
        setMusicians(musicians.filter(m => m.id !== id));
    }
    return(
        <form className = "container-fluid py-4 px-0 mt-5" id="#about">
            <h5 className = "title text">Gestione musicisti</h5>
            <Accordion flush>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header style={{backgroundColor: "yellow"}}
                    onClick={() => setActive(!isActive)}>
                        <strong className="mx-auto">Lista musicisti</strong>
                        <button className='btn btnCustom'>Aggiungi</button>
                    </Accordion.Header>
                    <Accordion.Body className="p-0">
                    <Table striped bordered variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Strumento</th>
                                <th>Foto</th>
                                <th colSpan={3}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {musicianStates.map((musicianState) => {
                            const musician = musicians.find((m) => m.id === musicianState.id);
                            console.log("Renderizzo: "+musicianState.id);
                            return (
                                <tr key={musician.id} className = "mb-0 pb-0">
                                    <td>{musician.id}</td>
                                    <td>
                                        {musicianState.modifica ? (
                                            <textarea style={{resize: "none", border: "none", backgroundColor: "#2c3034", color: "white"}}
                                            onClick={console.log("Sto modificando: "+musician.id)}
                                            onChange={(e) => {handleNameChange(e, musician.id)}}
                                            value={musician.nome}/>
                                            ) : (
                                            <span>{musician.nome}</span>
                                        )}
                                    </td>
                                    <td>
                                        {musicianState.modifica ? (
                                            <textarea style={{resize: "none", border: "none", backgroundColor: "#2c3034", color: "white"}}
                                            onClick={console.log("Sto modificando: "+musician.id)}
                                            onChange={(e) => {handleInstrumentChange(e, musician)}}
                                            value={musician.strumento}/>
                                            ) : (
                                            <span>{musician.strumento}</span>
                                        )}
                                    </td>
                                    <td>
                                        {musicianState.modifica ? (
                                            <><img src={musician.foto} alt="foto" style={{ width: "5em", height: "5em" }}/>
                                            <input type="file" name="foto" accept="image/png, image/jpeg" onChange={(e)=>handlePicChange(e, musician.id)}/></>
                                            ) : (
                                            <img src={musician.foto} alt="foto" style={{ width: "5em", height: "5em" }}/>
                                        )}
                                        
                                    </td>
                                    <td>
                                        <button className="btn btnCustom" onClick={() => handleModificaToggle(musician.id)}>
                                            {musicianState.modifica ? "Salva" : "Modifica"}
                                        </button>
                                    </td>
                                    <td>
                                        {show &&
                                            <button className="btn btn-danger" onClick={() => handleAlertShow(musician.id)}>Rimuovi</button>
                                        }
                                        <Alert className="d-block mb-0"show={musicianState.alertShow} style={{backgroundColor:"rgba(0,0,0,0.9)", border:"rgba(0,0,0,0.9)"}}>
                                            <Alert.Heading className="title">Stai eliminando: {musician.nome}, {musician.strumento}</Alert.Heading>
                                            <hr/>
                                            <button className="btn btnCustom d-inline" onClick={()=> confirmDelete(musician.id)}>Conferma</button>
                                            <button className="btn btn-danger" onClick={()=> handleAlertShow(musician.id)}>Annulla</button>
                                            
                                        </Alert>
                                    </td>
                                </tr>        
                            );
                            })}
                        </tbody>
                        </Table>   
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </form>
    );
}

function Dashboard({musicians, setMusicians}){
    const [state, setState] = useState({aboutShow: false, eventShow: false, shopShow: false});
    return(
        <div className="container-fluid pt-5">
            <Lista state={state} setState={setState}/>
            {state.aboutShow &&
                <GestioneMusicisti musicians={musicians} setMusicians={setMusicians}/>
            }
            
        </div>
        
    );
}

export default Dashboard;