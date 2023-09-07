export async function loginUser(credentials, type) {
    let api;
    return new Promise((resolve, reject) =>{
        if(type==="register")
            api='http://localhost:8000/api/user/register';
        else if(type==="login")
            api='http://localhost:8000/api/user/login';
        fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
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

export async function fetchOneUser(id)
{
    try {
        const response = await fetch(`http://localhost:8000/api/user/${id}/show`, { method: "GET" });
        const data = await response.json();
        console.log(data.user);
        return data.user;
    } catch (error) {
        alert("Errore nel caricare l'utente: ", error);
        return null;
    }
}

export async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:8000/api/user/index', { method: "GET" });
        const data = await response.json();
        console.log(data.users);
        return data.users;
    } catch (error) {
        alert("Errore nel caricare gli utenti: ", error);
        return null;
    }
}

export async function deleteReservation(id){
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8000/api/ticket-user/${id}/delete`,
        {
            method: "DELETE"
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