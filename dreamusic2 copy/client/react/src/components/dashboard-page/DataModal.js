import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "../../App.css";
import { useState } from 'react';
import { createEvent, createMusician } from '../services/admin';
import moment from 'moment';

function InsertDataModal({show, setShow, getter, type})
{
  const [musician, setMusician] = useState({nome:"", cognome:"", strumento:""});
  const [evento, setEvento] = useState({nome:"", data:"", ora:"", citta:"", teatro:"", tot_posti:0, prezzo:0, programma:""})
  const [success, setSuccess] = useState(false);

  function handleNameChange(e)
  {
    if(type === "musician")
      setMusician({...musician, nome: e.target.value});
    else if (type === "event")
      setEvento({...evento, nome:e.target.value});
  }

  function handleSurnameChange(e)
  {
    setMusician({...musician, cognome: e.target.value});
  }

  function handleInstrumentChange(e)
  {
    setMusician({...musician, strumento: e.target.value});
  }

  function handlePicChange(e)
  { 
    const file = e.target.files[0];
    let foto;
    if(file)
        foto = URL.createObjectURL(file);
    if(type === "musician")
      setMusician({...musician, immagine:file});
    else if(type === "event")
      setEvento({...evento, locandina: file});
  }

  function handleCityChange(e)
  {
    setEvento({...evento, citta:e.target.value});
  }

  function handleLocationChange(e)
  {
    setEvento({...evento, teatro:e.target.value});
  }

  function handleDateChange(e)
  {
    setEvento({...evento, data:e.target.value});
  }

  function handleTimeChange(e)
  {
    const ora = moment(e.target.value, 'HH:mm').format('HH:mm:ss');
    setEvento({...evento, ora:ora});
  }

  function handleProgramChange(e)
  {
    setEvento({...evento, programma:e.target.value});
  }

  function handleQuantityChange(e)
  {
    setEvento({...evento, tot_posti:e.target.value});
  }

  function handlePriceChange(e)
  {
    setEvento({...evento, prezzo:e.target.value});
  }

  function postRes(type) 
  {
    if(type === "musician")
    {
      createMusician(musician)
      .then(() => {setSuccess(true); getter()})
      .catch(error => {setSuccess(false); console.error("Errore nella creazione:", error);
      alert("Errore nella creazione: " + error.message); });
    }
    else if(type === "event")
    {
      console.log("Evento da creare: ", evento);
      createEvent(evento)
      .then(() => {setSuccess(true); getter()})
      .catch(error => {setSuccess(false); console.error("Errore nella creazione:", error);
      alert("Errore nella creazione: " + error.message); });
    }
  }

  return(
    <Modal show={show} onHide={()=>setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{type === "musician" ? "Nuovo musicista" : "Nuovo evento"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="input1">
            <Form.Label>Nome</Form.Label>
            <Form.Control className="autofocusCustom" type="text" placeholder="Nome" autofocus onChange={(e) => handleNameChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="input2">
            <Form.Label>{type === "musician" ? "Cognome" : "Città"}</Form.Label>
            <Form.Control className="autofocusCustom" type="text" placeholder={type === "musician" ? "Cognome" : "Città"} autofocus onChange={type === "musician" ? (e) => handleSurnameChange(e) : (e) => handleCityChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="input3">
            <Form.Label>{type === "musician" ? "Strumento" : "Luogo"}</Form.Label>
            <Form.Control className="autofocusCustom" type="text" placeholder={type === "musician" ? "Strumento" : "Luogo"} autofocus onChange={type === "musician" ? (e) => handleInstrumentChange(e) : e=> handleLocationChange(e)}/>
          </Form.Group>
          {type === "event" &&
          <><Form.Group className="mb-3" controlId="totPosti">
            <Form.Label>Totale posti</Form.Label> <br/>
            <Form.Control className="autofocusCustom" type="number" placeholder="0" autofocus onChange={(e) => handleQuantityChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="prezzo">
            <Form.Label>Prezzo</Form.Label>
            <Form.Control className="autofocusCustom" type="number" autofocus onChange={(e) => handlePriceChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="data">
            <Form.Label>Data</Form.Label>
            <Form.Control className="autofocusCustom" type="date" autofocus onChange={(e) => handleDateChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="ora">
            <Form.Label>Ora</Form.Label>
            <Form.Control className="autofocusCustom" type="time" autofocus onChange={(e) => handleTimeChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="programma">
            <Form.Label>Programma</Form.Label> <br/>
            <textarea style={{width:"100%", minHeight:"5rem"}} className="autofocusCustom" autofocus onChange={(e) => handleProgramChange(e)}></textarea>
          </Form.Group>
          </>
          }
          <Form.Group className="mb-3" controlId="foto" onChange={(e) => handlePicChange(e)}>
            <Form.Label>{type === "musician" ? <span>Foto</span> : <span>Locandina</span>}</Form.Label>
            <Form.Control type="file" name="foto" accept="image/png, image/jpeg"/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {success &&
          <span style={{color:"green"}}>{type === "musician" ? "Musicista" : "Evento"} aggiunto con successo!</span>
        }  
        <button type="submit" className="btn btnCustom" onClick={() => postRes(type)}>Salva</button>
        <button className="btn btnDanger" onClick={()=>{setShow(false); setSuccess(false)}}>Chiudi</button>
      </Modal.Footer>
    </Modal>
  );
}

export default InsertDataModal;