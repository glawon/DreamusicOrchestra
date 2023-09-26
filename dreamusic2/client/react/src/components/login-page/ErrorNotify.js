import Toast from 'react-bootstrap/Toast';

export default function ErrorNotify({show, setShow, body})
{
    return(
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <i className="bi bi-exclamation-triangle me-1" style={{color:"red"}}></i>
            <strong className="mx-auto">Errore</strong>
          </Toast.Header>
          <Toast.Body style={{backgroundColor:"black", color:"white"}}>{body}</Toast.Body>
        </Toast>
    );
}