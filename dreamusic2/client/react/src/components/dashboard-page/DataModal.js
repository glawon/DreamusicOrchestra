import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "../../App.css";
import { useState } from 'react';
import { createMusician } from '../services/admin';

function InsertDataModal({show, setShow, getter, type})
{
  const [musician, setMusician] = useState({nome:"", cognome:"", strumento:""});
  const [evento, setEvento] = useState({nome:"", cognome:"", data:"", ora:"", citta:"", luogo:""})
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
      setMusician({...musician, foto: file});
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
    setEvento({...evento, ora:e.target.value});
  }

  function handleProgramChange(e)
  {
    setEvento({...evento, programma:e.target.value});
  }

  function postMusician() 
  {
    createMusician(musician)
    .then(() => {setSuccess(true); getter()})
    .catch(error => {setSuccess(false); alert("Errore nella creazione: ", error)});
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
          <><Form.Group className="mb-3" controlId="input4">
            <Form.Label>Data</Form.Label>
            <Form.Control className="autofocusCustom" type="date" autofocus onChange={(e) => handleDateChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="input5">
            <Form.Label>Ora</Form.Label>
            <Form.Control className="autofocusCustom" type="time" autofocus onChange={(e) => handleTimeChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="input6">
            <Form.Label>Programma</Form.Label>
            <textarea className="autofocusCustom" autofocus onChange={(e) => handleProgramChange(e)}></textarea>
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
          <span style={{color:"green"}}>Musicista aggiunto con successo!</span>
        }
        <button className="btn btn-danger" onClick={()=>{setShow(false); setSuccess(false)}}>Close</button>
        <button className="btn btnCustom" onClick={postMusician}>Salva</button>
      </Modal.Footer>
    </Modal>
  );
}

export default InsertDataModal;