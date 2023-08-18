import React, {Component, useState} from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import microphone from "../externals/microphone.png";
import radio from "../externals/radio.png";
import "../Page.css";
import RecapOrdine from './recapOrdine';

/*function handleDelete(aId) {
    const acquisti = this.state.acquisti.filter(acquisto => acquisto.id !== aId)
    this.setState({acquisti});
}*/

const lista = [
    {id:0, tipo: "partitura", titolo:"Il mondo è mio", quantità:2, prezzo: 30.00, checked: true},
    {id:1, tipo: "audio", titolo:"Il mondo è mio", quantità:1, prezzo: 8.00, checked: true},
    {id:2, tipo:"partitura", titolo:"Principe Alì", quantità:1, prezzo: 15.00, checked: true}
];

function AfterLogin(){
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
                <i className="bi bi-filetype-pdf"></i>
            );
        }
        else if(a.tipo == "audio")
        {
            return(
                <i className="bi bi-music-note-beamed"></i>
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
        <><h1 className="header">Benvenuto, nome cognome</h1>
        <hr className="divider"/>
        <div className="row row-cols-3">
        <div className="col align-self-center">
            <img className="img-fluid w-50" src={radio} alt=""/>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
            <Table responsive className="align-self-center">
                <thead>
                    <tr>
                        <th className="title" colSpan="8">Carrello</th>
                    </tr>
                </thead>
                <tbody>
                    {/*icona del prodotto: pdf vs audio*/}
                    {
                        acquisti.map((acquisto) => (
                            <tr className="align-items-center" style={{backgroundColor:"black"}}>
                                <td>
                                    <Form.Check type="checkbox" value="" checked={acquisto.checked} style={{color:"#e3841f"}}
                                    onChange={()=>handleCheck(acquisto.id)}/>
                                </td>
                                
                                <td>
                                    {getType(acquisto)}
                                </td>
                                <td>
                                    <span>{acquisto.titolo}</span>
                                </td>
                                <td>
                                    <button className="btn" onClick={()=>decrease(acquisto.id)}>-</button>
                                </td>
                                <td>
                                    <textarea readonly value={acquisto.quantità} style={{resize:"none", border: "none", maxWidth:"2rem", maxheight:"0.5rem"}}>{acquisto.quantità}</textarea>
                                </td>
                                <td>
                                    <button className="btn" onClick={()=>{increase(acquisto.id)}}>+</button>
                                </td>
                                <td>
                                    <span>€{acquisto.prezzo}</span>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={()=>{handleDelete(acquisto.id)}}>Rimuovi</button>
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
            <img className="img-fluid w-25" src={microphone} alt=""/>
        </div>
        </div>
        <RecapOrdine
            acquisti={acquisti}
            totale={totale}
        />
        
        </>
    );
}

function Cart(){
    return(
        <AfterLogin/>
    );
}
export default Cart;