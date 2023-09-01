import Table from 'react-bootstrap/esm/Table';
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';
import { updateMusician, fetchMusicians, deleteMusician } from '../services/admin';
import InsertDataModal from './DataModal';

export default function GestioneMusicisti(){
    const [musicians, setMusicians] = useState([]);
    const [musicianStates, setMusicianStates] = useState([]);

    useEffect(()=>{
        async function getMusicians() {
            try {
                const musicians = await fetchMusicians();
                console.log(musicians);
                setMusicians(musicians);
                setMusicianStates(musicians.map((musician) =>
                ({ id: musician.id, modifica: false, alertShow: false })
                ));
            } catch (error) {
                alert("Errore nel caricare i musicisti: ", error);
            }
          }
        getMusicians();
    }, []);

    const [show, setShow] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    function handleModificaToggle(musician, stato) {
        setMusicianStates((prevStates) =>
            prevStates.map((state) =>
            state.id === musician.id ? { ...state, modifica: !state.modifica } : state
        ));
        if(stato === "salva")
            updateMusician(musician);
    }
      
    function handleNameChange(event, id)
    {
        let updated = musicians.find((m) => m.id === id);
        updated.nome = event.target.value;
        setMusicians([...musicians, updated]);
    }

    function handleSurnameChange(event, id)
    {
        let updated = musicians.find((m) => m.id === id);
        updated.cognome = event.target.value;
        setMusicians([...musicians, updated]);
    }
    
    function handleInstrumentChange(event, id)
    {
        let updated = musicians.find((m) => m.id === id);
        updated.strumento = event.target.value;
        setMusicians([...musicians, updated]);
    }

    function handlePicChange(event, id)
    {
        const file = event.target.files[0];
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
    
    function confirmDelete(musician)
    {       
        setMusicianStates(musicianStates.filter(m => m.id !== musician.id));
        setMusicians(musicians.filter(m => m.id !== musician.id));
        deleteMusician(musician);
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
                        <th>Cognome</th>
                        <th>Strumento</th>
                        <th>Foto</th>
                        <th colSpan={3}></th>
                    </tr>
                </thead>
                <tbody>
                    {musicianStates.map((musicianState) => {
                    const musician = musicians.find((m) => m.id === musicianState.id);
                    return (
                        <tr key={musician.id} className = "mb-0 pb-0">
                            <td>{musician.id}</td>
                            <td>
                                {musicianState.modifica ? (
                                    <textarea style={{resize: "none", border: "none", backgroundColor: "#2c3034", color: "white"}}
                                    onChange={(e) => {handleNameChange(e, musician.id)}}
                                    value={musician.nome}/>
                                    ) : (
                                    <span>{musician.nome}</span>
                                )}
                            </td>
                            <td>
                                {musicianState.modifica ? (
                                    <textarea style={{resize: "none", border: "none", backgroundColor: "#2c3034", color: "white"}}
                                    onChange={(e) => {handleSurnameChange(e, musician.id)}}
                                    value={musician.cognome}/>
                                    ) : (
                                    <span>{musician.cognome}</span>
                                )}
                            </td>
                            <td>
                                {musicianState.modifica ? (
                                    <textarea style={{resize: "none", border: "none", backgroundColor: "#2c3034", color: "white"}}
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
                                <button className="btn btnCustom" onClick={
                                    musicianState.modifica ? () => handleModificaToggle(musician, "salva") : () => handleModificaToggle(musician, "modifica")}>
                                    {musicianState.modifica ? "Salva" : "Modifica"}
                                </button>
                            </td>
                            <td>
                                {show &&
                                    <button className="btn btn-danger" onClick={() => handleAlertShow(musician.id)}>Rimuovi</button>
                                }
                                <Alert className="container-fluid d-block mb-0" show={musicianState.alertShow} style={{backgroundColor:"rgba(0,0,0,0.9)", border:"rgba(0,0,0,0.9)"}}>
                                    <Alert.Heading className="title">Stai eliminando:<br/>{musician.nome}, {musician.strumento}</Alert.Heading>
                                    <button className="btn btnCustom me-3" onClick={()=> confirmDelete(musician)}>Conferma</button>
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