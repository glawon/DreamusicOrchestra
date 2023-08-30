export async function updateMusician(musician)
{   
    return fetch('/api'), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(musician)
        }
        .then(data => data.json());
}