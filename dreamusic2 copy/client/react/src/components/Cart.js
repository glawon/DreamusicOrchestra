import React, {Component, useState} from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import "../App.css";
import RecapOrdine from './recapOrdine';
import background from '../externals/Cart.png';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';

/*function handleDelete(aId) {
    const acquisti = this.state.acquisti.filter(acquisto => acquisto.id !== aId)
    this.setState({acquisti});
}*/

const lista = [
    {id:0, tipo: "partitura", titolo:"Il mondo è mio", quantità:2, prezzo: 30.00, checked: true},
    {id:1, tipo: "audio", titolo:"Il mondo è mio", quantità:1, prezzo: 8.00, checked: true},
    {id:2, tipo:"partitura", titolo:"Principe Alì", quantità:1, prezzo: 15.00, checked: true}
];

function Cart({user}){
    const [acquisti, setAcquisti] = useState(lista);
    let tot=0;
    acquisti.map((a) =>{
        tot+=a.prezzo;
    })
    const [totale, setTot] = useState(tot);

    function increase(aId)
    {//funzionante
        const updated = acquisti.map((a, id) => {
            if(id === aId)
            {//aggiorna prezzo e quantità
                let q = a.quantità;
                let p = a.prezzo;
                setTot(totale+p);
                return {...a, quantità: q+1, prezzo: p*2};
            }
            else
                return a;
        })
        setAcquisti(updated);
    }

    function decrease(aId)
    {//funzionante
        const updated = acquisti.map((a, id) => {
            if(id === aId)
            {//aggiorna prezzo e quantità
                let q = a.quantità;
                let p = a.prezzo;
                if(q == 1)
                {
                    alert("Impossibile decrementare ancora");
                    return a;
                }
                else
                {
                    q--;
                    p/=2;
                    setTot(totale-p);
                }      
                return {...a, quantità: q, prezzo: p};
            }
            else
                return a;
        })
        setAcquisti(updated);
    }

    function getType(a)
    {
        if(a.tipo == "partitura")
        {
            return(
                <i className="bi bi-filetype-pdf align-middle"></i>
            );
        }
        else if(a.tipo == "audio")
        {
            return(
                <i className="bi bi-music-note-beamed align-middle"></i>
            );
        }
    }

    function handleDelete(aId) { //funziona
        acquisti.map((a, id) =>{
            if(id === aId)
                return setTot(totale-a.prezzo);
        });
        setAcquisti(acquisti.filter(acquisto => acquisto.id !== aId));
    }

    function handleCheck(aId){//funziona
        const updated = acquisti.map((a, id)=>{
            if(id === aId)
            {
                let isChecked = !(a.checked);
                if(!isChecked)
                    setTot(totale-a.prezzo);
                else
                    setTot(totale+a.prezzo);
                return{...a, checked: isChecked};
            }
            else
                return a;
        })
        setAcquisti(updated);
    }
    
    return(
        <><h1 className="header">Benvenuto, {user.nome} {user.cognome}</h1>
        <hr className="divider"/>
        <div className="row row-cols-3">
        <div className="col align-self-center">
            <ListGroup>
                <ListGroup.Item> Torna allo shop
                </ListGroup.Item>
                <ListGroup.Item>Il tuo profilo</ListGroup.Item>
            </ListGroup>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
            <Table striped responsive className="align-self-center" >
                <thead>
                    <tr>
                        <th className="title" colSpan="8">Carrello</th>
                    </tr>
                </thead>
                <tbody>
                    {/*icona del prodotto: pdf vs audio*/}
                    {
                        acquisti.map((acquisto) => (
                            <tr className="align-items-center">
                                <td>
                                    <Form.Check className="align-top" type="checkbox" value="" checked={acquisto.checked}
                                    onChange={()=>handleCheck(acquisto.id)}/>
                                </td>
                                
                                <td>
                                    {getType(acquisto)}
                                </td>
                                <td>
                                    <span className="align-middle">{acquisto.titolo}</span>
                                </td>
                                <td>
                                    <button className="btn align-top" onClick={()=>decrease(acquisto.id)}><i class="bi bi-dash-circle "></i></button>
                                </td>
                                <td>
                                    <span className="align-middle">{acquisto.quantità}</span>
                                </td>
                                <td>
                                    <button className="btn align-top" onClick={()=>{increase(acquisto.id)}}><i class="bi bi-plus-circle"></i></button>
                                </td>
                                <td>
                                    <span className="align-middle">€{acquisto.prezzo}</span>
                                </td>
                                <td>
                                    <button className="btn align-top" style={{backgroundColor:"#e27500"}}onClick={()=>{handleDelete(acquisto.id)}}>Rimuovi</button>
                                </td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td colSpan="8" className="text justify-content-right">Totale: {totale}€</td>
                    </tr>
                </tbody>
            </Table>
        </div>
        <div className="col align-self-center">
            <img className="img-fluid w-25" alt=""/>
        </div>
        <RecapOrdine
            acquisti={acquisti}
            totale={totale}
        /> 
        </div>
          
        </>
    );
}
export default Cart;