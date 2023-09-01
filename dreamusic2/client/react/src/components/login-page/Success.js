import Toast from 'react-bootstrap/Toast';

export default function SuccessNotify({show, setShow})
{
    return(
        <Toast onClose={() => setShow(false)} show={show} >
          <Toast.Header>
            <i className="bi bi-check-lg me-1" style={{color:"green"}}></i>
            <strong className="mx-auto">Benvenuto!</strong>
          </Toast.Header>
          <Toast.Body style={{backgroundColor:"black", color:"white"}}>Accedi per continuare sul sito</Toast.Body>
        </Toast>
    );
}