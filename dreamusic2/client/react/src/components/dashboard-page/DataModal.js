import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "../../App.css";
import { useState } from 'react';
import { createMusician } from '../services/admin';

function InsertDataModal({show, setShow, getMusicians})
{
  const [musician, setMusician] = useState({nome:"", cognome:"", strumento:""});
  const [success, setSuccess] = useState(false);

  function handleNameChange(e)
  {
    setMusician({...musician, nome: e.target.value});
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
    setMusician({...musician, foto: e.target.value});
  }

  function postMusician()
  {
    createMusician(musician)
    .then(() => {setSuccess(true); getMusicians()})
    .catch(error => {setSuccess(false); alert("Errore nella creazione: ", error)});
  }

  return(
    <Modal show={show} onHide={()=>setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Nuovo musicista</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control className="autofocusCustom" type="text" placeholder="Nome" autofocus onChange={(e) => handleNameChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="cognome">
            <Form.Label>Cognome</Form.Label>
            <Form.Control className="autofocusCustom" type="text" placeholder="Cognome" autofocus onChange={(e) => handleSurnameChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="strumento">
            <Form.Label>Strumento</Form.Label>
            <Form.Control className="autofocusCustom" type="text" placeholder="Strumento" autofocus onChange={(e) => handleInstrumentChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="foto" onChange={(e) => handlePicChange(e)}>
            <Form.Label>Foto</Form.Label>
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