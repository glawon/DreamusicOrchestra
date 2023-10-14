import { fetchTickets } from "../services/admin";
import { useState, useEffect } from "react";
import moment from "moment";
import Table from "react-bootstrap/esm/Table";

export default function GestioneBiglietti()
{
    const [tickets, setTickets] = useState();

    async function getTickets() {
        try {
            const tickets = await fetchTickets();
            console.log(tickets);
            setTickets(tickets);
        } catch (error) {
            alert("Errore nel caricare i biglietti: ", error);
        }
      }
    
    useEffect(()=>{
        getTickets();
    }, []);

    return(
        <div className = "container-fluid py-4 px-0 mt-5" id="#tickets">
            <h3 className = "title text">Biglietti <i className="bi bi-ticket-detailed"></i></h3>
            {!tickets ? (
                <span>Caricamento...</span>
            ) : (
                <Table responsive striped bordered variant="dark">
                    <tbody>
                    <tr>
                        <th colSpan={3}>Concerto</th>
                        <th colSpan={2}>Utente</th>
                        <th rowSpan={2} className="align-middle">Quantità</th>
                        <th rowSpan={2} className="align-middle">Data prenotazione</th>
                    </tr>
                        <tr>
                            <td>Nome</td>
                            <td>Luogo</td>
                            <td>Data</td>
                            <td>Nome</td>
                            <td>Cognome</td>
                        </tr>
                        {tickets.map((ticket) => {
                        return (
                            ticket.ticket.concert && ticket.user &&
                            <tr className="rowCustom mb-0 pb-0" key={ticket.id}>
                                <td>
                                    {ticket.ticket.concert.nome}
                                </td>
                                <td>
                                    {ticket.ticket.concert.citta}
                                </td>
                                <td>
                                    {moment(ticket.ticket.concert.data, 'yyyy/mm/DD').format('DD/mm/yyyy')}
                                </td>
                                <td>
                                    {ticket.user.nome}
                                </td>
                                <td>
                                    {ticket.user.cognome}
                                </td>
                                <td>
                                    {ticket.quantita}
                                </td>
                                <td>
                                    {ticket.created_at ? moment(ticket.created_at, 'YYYY-MM-DD/THH:mm:ss').format('DD/MM/YYYY HH:mm:ss') : "13/08/2023 21:47:32"}
                                </td>
                            </tr> 
                        );
                    })}
                    </tbody>
                </Table>        
            )
            }
        </div>   
    );
}