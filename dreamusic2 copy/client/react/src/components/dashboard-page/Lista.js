import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';

export default function Lista({state, setState}) {
    const [selected, setSelected] = useState();
    function handleShow(key){
        if(key === "about")
          setState({aboutShow: true, eventShow: false, ticketShow: false, userShow: false});
        else if(key === "event")
          setState({aboutShow: false, eventShow: true, ticketShow: false, userShow: false});
        else if(key === "tickets")
          setState({aboutShow: false, eventShow: false, ticketShow: true, userShow: false});
        else if(key === "users")
        setState({aboutShow: false, eventShow: false, ticketShow: false, userShow: true});
        setSelected(key);    
    }
  return (
    <><h2 className="title">Pagine</h2>
    <ListGroup horizontal defaultActiveKey="#lista" className="d-flex">
      <ListGroup.Item key="about" action href="#musicians" style={{backgroundColor: selected === "about" ? "#b57c1c" : "", border: selected === "about" ? "#b57c1c" : ""}}
      onClick={()=>{handleShow("about")}}>
        Musicisti
      </ListGroup.Item>
      <ListGroup.Item key="event"action href="#events" style={{backgroundColor: selected === "event" ? "#b57c1c" : "", border: selected === "event" ? "#b57c1c" : ""}}
      onClick={()=>{handleShow("event")}}>
        Eventi
      </ListGroup.Item>
      <ListGroup.Item key="tickets" action href="#tickets" style={{backgroundColor: selected === "tickets" ? "#b57c1c" : "", border: selected === "tickets" ? "#b57c1c" : ""}}
      onClick={()=>{handleShow("tickets")}}>
        Biglietti
      </ListGroup.Item>
      <ListGroup.Item key="tickets" action href="#users" style={{backgroundColor: selected === "users" ? "#b57c1c" : "", border: selected === "users" ? "#b57c1c" : ""}}
      onClick={()=>{handleShow("users")}}>
        Utenti
      </ListGroup.Item>
    </ListGroup></>
  );
}