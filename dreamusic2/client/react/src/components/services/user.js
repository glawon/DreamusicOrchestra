/*export async function loginUser(credentials) {
    let api=;
    return new Promise((resolve, reject) =>{
        fetch('http://localhost:8000/api/user/login', {
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
}*/

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


export function getLogin(){
    console.log("Sistemare");
    /*fetch('http://localhost:8000/api/user/login', {method:"GET"})
        .then((response) => response.json())*/
}

/*function Users()
{
    const [users, setUsers] = useState();
    return(

    );
}

export default Users;*/
