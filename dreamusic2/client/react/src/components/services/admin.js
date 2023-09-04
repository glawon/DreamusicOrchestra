export async function fetchMusicians()
{
    try {
        const response = await fetch('http://localhost:8000/api/musicians/index', { method: "GET" });
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
    const FormData = require('form-data');
    const form = new FormData();

    form.append('id', musician.id);
    form.append('nome', musician.nome);
    form.append('cognome', musician.cognome);
    form.append('strumento', musician.strumento);
    form.append('immagine', musician.immagine, { filename: 'nome_file.jpg' });

    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8000/api/musicians/${id}/update`,
        {
            method: "PUT",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
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
        fetch(`http://localhost:8000/api/musicians/${id}/delete`,
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

export async function createMusician(musician)
{
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/api/musicians/store',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(musician)
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

export async function fetchImages()
{
    try {
        const response = await fetch('http://localhost:8000/api/images/gallery', { method: "GET" });
        const data = await response.json();
        console.log("Dati:", data.gallery);
        return data.gallery;
    } catch (error) {
        alert("Errore nel caricare i musicisti: ", error);
        return null;
    }
}