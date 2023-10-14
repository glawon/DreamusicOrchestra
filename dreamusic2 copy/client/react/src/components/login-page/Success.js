import Toast from 'react-bootstrap/Toast';

export default function SuccessNotify({show, setShow, success, header, body})
{
    return(
        <Toast show={show} delay={3000} autohide onClose={() => setShow(false)}>
          <Toast.Header>
            {success === true ?
            (
              <i className="bi bi-check-lg me-1" style={{color:"green"}}></i>
            ) : (
              <i className="bi bi-exclamation-triangle me-1" style={{color:"red"}}></i>
            )
            }       
            <strong className="mx-auto">{header}</strong>
          </Toast.Header>
          {body !== "" &&
            <Toast.Body style={{backgroundColor:"black", color:"white"}}>{body}</Toast.Body>
          }
        </Toast>
    );
}