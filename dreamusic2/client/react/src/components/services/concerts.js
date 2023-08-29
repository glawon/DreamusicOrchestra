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



export function fetchSingle(id)
{
    fetch('http://localhost:8000/api/concert/${eventId}/show', {method:"GET"})
          .then((response) => response.json())
}