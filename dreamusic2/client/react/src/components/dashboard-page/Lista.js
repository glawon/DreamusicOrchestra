import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';

export default function Lista({state, setState}) {
    const [selected, setSelected] = useState();
    function handleShow(key){
        if(key === "about")
            setState({aboutShow: true, eventShow: false, ticketShow: false});
        else if(key === "event")
            setState({aboutShow: false, eventShow: true, ticketShow: false});
        else if(key === "tickets")
            setState({aboutShow: false, eventShow: false, ticketShow: true});
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
      <ListGroup.Item key="tickets" action href="#link3" style={{backgroundColor: selected === "tickets" ? "orange" : "", border: selected === "tickets" ? "orange" : ""}}
      onClick={()=>{handleShow("tickets")}}>
        Biglietti
      </ListGroup.Item>
    </ListGroup></>
  );
}