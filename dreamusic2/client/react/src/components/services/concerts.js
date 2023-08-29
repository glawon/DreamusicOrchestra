export async function fetchConcerts() {
    try {
        const response = await fetch('http://localhost:8000/api/concert/index', { method: "GET" });
        const data = await response.json();
        return data.concerto;
    } catch (error) {
        alert("Errore nel caricare i concerti: ", error);
        return null;
    }
}

export async function fetchSingle(id)
{
    try {
        const response = await fetch(`http://localhost:8000/api/concert/${id}/show`, { method: "GET" });
        const data = await response.json();
        return data.concerto;
    } catch (error) {
        alert("Errore nel caricare i concerti: ", error);
        return null;
    }
}

export async function sendReservation(q, u)
{
    const data = {user: u, quantita: q};
    return fetch('/api'), {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    .then(data => data.json())
}