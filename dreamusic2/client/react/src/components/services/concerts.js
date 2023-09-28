
import { getHost  } from "./service_host";
export async function fetchConcerts() {
    try {
        const response = await fetch(getHost()+'/concert/index', { method: "GET" });
        const data = await response.json();
        console.log(data)
        return data.concerto;
    } catch (error) {
        alert("Errore nel caricare i concerti: ", error);
        return null;
    }
}

export async function fetchSingle(id)
{
    try {
        const evento = {dettagli:{}, prezzo:0};
        const response = await fetch(getHost()+`/concert/${id}/show`, { method: "GET" });
        const data = await response.json();
        //console.log("Dati presi: ", data);
        evento.dettagli = data.concerto;
        evento.prezzo = data.prezzo;
        return(evento);
    } catch (error) {
        alert("Errore nel caricare il concerto ", error);
        return null;
    }
}

export async function sendReservation(q, u, eId)
{
    const data = {nome: u.nome, cognome: u.cognome, email: u.email, idConcerto: eId, quantita: q};
    console.log(data);
    return new Promise ((resolve, reject) => {
        fetch(getHost()+'/ticket-user/book', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore nella richiesta");
            }
            return response.json();
        })
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}