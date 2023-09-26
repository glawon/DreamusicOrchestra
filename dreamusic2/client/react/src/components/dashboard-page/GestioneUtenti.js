import { fetchUsers, upgradeRole } from "../services/user";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/esm/Table";

export default function GestioneUtenti(){
    const [users, setUsers] = useState();

    async function getUsers() {
        try {
            const users = await fetchUsers();
            console.log(users);
            setUsers(users);
        } catch (error) {
            alert("Errore nel caricare gli utenti: ", error);
        }
    }
    
    function manageUser(id){
        let updated = users.find(u => u.id === id);
        console.log("User da modificare:", updated);
            updated.ruolo = "user";
        upgradeRole(updated);
        setUsers([...users, updated]);
    }

    useEffect(()=>{
        getUsers();
    }, []);

    return(
        <div className = "container-fluid py-4 px-0 mt-5" id="#users">
            <h3 className = "title text">Utenti <i className="bi bi-person-fill"></i></h3>
            {!users ? (
                <span>Caricamento</span>
            ) : (
                
                <Table responsive striped bordered variant="dark">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>E-mail</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                        return (
                            <tr className="rowCustom mb-0 pb-0" key={user.id}>
                                <td>
                                    {user.ruolo === "admin" ? 
                                        <span className="names text">{user.ruolo}</span>
                                        :
                                        <span className="names">{user.ruolo}</span>
                                    }
                                </td>
                                <td>
                                    {user.ruolo === "admin" ? 
                                        <span className="names text">{user.nome}</span>
                                        :
                                        <span className="names">{user.nome}</span>
                                    }
                                </td>
                                <td>
                                    {user.ruolo === "admin" ? 
                                        <span className="names text">{user.cognome}</span>
                                        :
                                        <span className="names">{user.cognome}</span>
                                    }
                                </td>
                                <td>
                                    {user.ruolo === "admin" ? 
                                        <span className="text">{user.email}</span>
                                        :
                                        <span className="text text-white">{user.email}</span>
                                    }
                                </td>
                                <td>
                                    {user.ruolo === "user" ?
                                        <button className="btn btnCustom" onClick={() => manageUser(user.id)}>Rendi admin</button>
                                        :
                                        <span></span>
                                    }
                                </td>
                            </tr>        
                        );
                    })}
                    </tbody>
                </Table>        
            )
            }
        </div>   
    );
}