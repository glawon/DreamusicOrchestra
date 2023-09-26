import {getHost} from "./service_host"

export async function fetchImages()
{
    try {
        const response = await fetch(getHost()+'/images/gallery', { method: "GET" });
        const data = await response.json();
        //console.log("Dati:", data.gallery);
        return data.gallery;
    } catch (error) {
        alert("Errore nel caricare i musicisti: ", error);
        return null;
    }
}

export async function urlToBlob(imageUrl)
{
    try{
        const imageResponse = await fetch(imageUrl);
        const blob = await imageResponse.blob();

        // Ora 'blob' contiene l'immagine come file
        // Puoi utilizzarlo per creare un oggetto File se necessario
        const file = new File([blob], "nome_del_file.jpg", { type: "image/jpeg" });
    
        console.log("File convertito:", file);
        return file;
    } catch(error) {
        //alert("Errore nel caricate la locandina", error);
        return null;
    }
}

//musicisti
export async function fetchMusicians()
{
    try {
        const response = await fetch(getHost()+'/musicians/index', { method: "GET" });
        const data = await response.json();
        return data.musicisti;
    } catch (error) {
        alert("Errore nel caricare i musicisti: ", error);
        return null;
    }
}

export async function updateMusician(musician)
{   
    const id = musician.id;
    const form = new FormData();
    form.append('id', musician.id);
    form.append('nome', musician.nome);
    form.append('cognome', musician.cognome);
    form.append('strumento', musician.strumento);
    form.append('immagine', musician.immagine);

    console.log([...form.entries()]);

    return new Promise((resolve, reject) => {
        fetch(getHost()+`/musicians/${id}/update?_method=PUT`,
        {
            method: "POST",
            body: form
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore nella richiesta");
            }
            return response.json();
        })
        .then(data => {
            console.log("Risposta dal server:", data);
            resolve(data);
        })
        .catch(error => {reject(error)});
    })
}

export async function deleteMusician(musician)
{
    const id = musician.id;
    return new Promise((resolve, reject) => {
        fetch(getHost()+`/musicians/${id}/delete`,
        {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => {
            console.log("Risposta dal server:", response);
            if (!response.ok) {
                throw new Error("Errore nella richiesta");
            }
            return response.json();
        })
        .then(data => {
            console.log("Risposta dal server:", data);
            resolve(data);
        })
        .catch(error => {reject(error)});
    })
}

export async function createMusician(musician)
{
    const form = new FormData();
    form.append('nome', musician.nome);
    form.append('cognome', musician.cognome);
    form.append('strumento', musician.strumento);
    form.append('immagine', musician.immagine);

    console.log("Dati inviati:", [...form.entries()]);

    return new Promise((resolve, reject) => {
        fetch(getHost()+'/musicians/store',
        {
            method: 'POST',
            body: form
        })
        .then(response => {
            console.log("Risposta dal server:", response);
            if(!response.ok) 
            {
                console.log("Errore");
                throw new Error("Errore nella richiesta", response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            resolve(data);
        })
        .catch(error => {reject(error)});
    })
}

//eventi
export async function createEvent(event)
{
    const form = new FormData();
    form.append('nome', event.nome);
    form.append('data', event.data);
    form.append('ora', event.ora);
    form.append('citta', event.citta);
    form.append('teatro', event.teatro);
    form.append('programma', event.programma);
    form.append('tot_posti', event.tot_posti);
    form.append('prezzo', event.prezzo);
    form.append('locandina', event.locandina);
    console.log("Dati inviati:", [...form.entries()]);


    return new Promise((resolve, reject) => {
        fetch(getHost()+'/concert/store',
        {
            method: 'POST',
            body: form
        })
        .then(response => {
            if(!response.ok) 
            {
                throw new Error("Errore nella richiesta");
            }
            return response.json();
        })
        .then(data => {
            console.log("risposta dal server:", data);
            resolve(data);
        })
        .catch(error => reject(error));
    })
}

export async function updateEvent(event)
{   
    const id = event.id;
    const form = new FormData();
    form.append('nome', event.nome);
    form.append('data', event.data);
    form.append('ora', event.ora);
    form.append('citta', event.citta);
    form.append('teatro', event.teatro);
    form.append('programma', event.programma);
    form.append('locandina', event.locandina);

    console.log("Invio:", [...form.entries()]);

    return new Promise((resolve, reject) => {
        fetch(getHost()+`/concert/${id}/update?_method=PUT`,
        {
            method: "POST",
            body: form
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore nella richiesta");
            }
            return response.json();
        })
        .then(data => {
            console.log("Risposta dal server:", data);
            resolve(data);
        })
        .catch(error => {reject(error)});
    })
}

export async function deleteEvents(event)
{
    const id = event.id;
    return new Promise((resolve, reject) => {
        fetch(getHost()+`/concert/${id}/delete`,
        {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore nella richiesta");
            }
            return response.json();
        })
        .then(data => {
            console.log("Risposta dal server:", data);
            resolve(data);
        })
        .catch(error => {reject(error)});
    })
}

//biglietti
export async function fetchTickets()
{
    try {
        const response = await fetch(getHost()+'/ticket-user/index', { method: "GET" });
        const data = await response.json();
        console.log("Dati:", data);
        return data;
    } catch (error) {
        alert("Errore nel caricare i biglietti: ", error);
        return null;
    }
}
