import { getHost } from "./service_host";

export async function loginUser(credentials, type) {
    let api;
    return new Promise((resolve, reject) =>{
        if(type==="register")
            api=getHost()+'/user/register';
        else if(type==="login")
            api=getHost()+'/user/login';
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
        const response = await fetch(getHost()+`/user/${id}/show`, { method: "GET" });
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
        const response = await fetch(getHost()+'/user/index', { method: "GET" });
        const data = await response.json();
        console.log(data.users);
        return data.users;
    } catch (error) {
        alert("Errore nel caricare gli utenti: ", error);
        return null;
    }
}

export async function updateUser(user) {

    const id = user.id;

    return new Promise((resolve, reject) => {
        fetch(getHost()+`/user/${id}/update?_method=PUT`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
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

export async function upgradeRole(user){
    const id = user.id;
    return new Promise((resolve, reject) => {
        fetch(getHost()+`/user/${id}/upgradeRole`,
        {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
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

export async function deleteUser(id){
    return new Promise((resolve, reject) => {
        fetch(getHost()+`/user/${id}/delete`,
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

export async function deleteReservation(id){
    return new Promise((resolve, reject) => {
        fetch(getHost()+`/ticket-user/${id}/delete`,
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

export async function purchase(id){
    return new Promise((resolve, reject) => {
        fetch(getHost()+`/ticket-user/${id}/purchase`,
        {
            method: "PUT"
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