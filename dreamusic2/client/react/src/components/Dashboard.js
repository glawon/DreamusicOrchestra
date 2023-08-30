import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import { Modal } from 'bootstrap';
import Table from 'react-bootstrap/esm/Table';
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';
import { updateMusician } from './services/admin';

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
    <><h2 className="title">Pagine</h2>
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

function InsertDataModal()
{
    return(
        <><span>Ciao</span>
        {/*<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
    </Modal>*/}</>
    );
}

function GestioneMusicisti({musicians, setMusicians}){
    const [show, setShow] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [musicianStates, setMusicianStates] = useState(musicians.map((musician) =>
    ({ id: musician.id, modifica: false, alertShow: false })
    ));
    
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
        //updateMusician(updated);
    }
    
    function handleInstrumentChange(event, id)
    {
        let updated = musicians.find((m) => m.id === id);
        updated.strumento = event.target.value;
        setMusicians([...musicians, updated]);
        //updateMusician(updated);
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
        //updateMusician(updated);
        
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
        <div className = "container-fluid py-4 px-0 mt-5" id="#about">
            <h3 className = "title text">Musicisti <i class="bi bi-music-note-beamed"></i></h3>
            <button className ="btn btnCustom mb-3" onClick={()=>setShowModal(true)}>Aggiungi</button>
            {showModal &&
                <InsertDataModal />
            }
            <Table responsive striped bordered variant="dark">
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
                                    <><img src={musician.foto} alt="foto" style={{ width: "5em", height: "5em" }}/><br/>
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
                                <Alert className="container-fluid d-block mb-0" show={musicianState.alertShow} style={{backgroundColor:"rgba(0,0,0,0.9)", border:"rgba(0,0,0,0.9)"}}>
                                    <Alert.Heading className="title">Stai eliminando:<br/>{musician.nome}, {musician.strumento}</Alert.Heading>
                                    <button className="btn btnCustom me-3" onClick={()=> confirmDelete(musician.id)}>Conferma</button>
                                    <button className="btn btn-danger ms-3" onClick={()=> handleAlertShow(musician.id)}>Annulla</button>
                                    
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