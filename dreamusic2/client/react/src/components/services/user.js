export async function loginUser(credentials) {
    return new Promise((resolve, reject) =>{ fetch('http://localhost:8000/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
        })
        .then(data => data.json())
        .then((data) => {resolve(data); console.log(data)})
        .catch(error => reject(error));
    })
}


export function getLogin(){
    console.log("Sistemare");
    /*fetch('http://localhost:8000/api/user/login', {method:"GET"})
        .then((response) => response.json())*/
}

