import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <button className="btn btnCustom" onClick={decoratedOnClick}>
      {children}
    </button>
  );
}

function RecapOrdine({acquisti, totale}) {
  return (
    <Accordion defaultActiveKey="0" className="container justify-content-center py-5">
      <Card>
        <Card.Header style={{backgroundColor:"#e3841f", border:"#e3841f"}}>
          <CustomToggle eventKey="0">Procedi all'acquisto</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <strong>Stai acquistando:</strong><br/>
            {
                acquisti.map((a) =>{
                    if(a.checked)
                    return (
                    <><li>"{a.titolo}", {a.tipo} ({a.quantità}) - {a.prezzo}€</li><br/></>)
                })
            }
            <strong>TOTALE: {totale}€</strong>
            <br/>
            <button className="btn btnCustom mt-3">Conferma</button>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default RecapOrdine;