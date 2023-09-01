import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';

export default function Lista({state, setState}) {
    const [selected, setSelected] = useState();
    function handleShow(key){
        if(key === "about")
            setState({aboutShow: true, eventShow: false, shopShow: false});
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