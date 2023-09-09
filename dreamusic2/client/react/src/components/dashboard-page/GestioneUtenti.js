import { fetchUsers } from "../services/user";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/esm/Table";

export default function GestioneUtenti(){
    const [users, setUsers] = useState();
    const [admins, setAdmins] = useState(0);
    const [stdUsers, setStdUsers] = useState(0);

    async function getUsers() {
        try {
            const users = await fetchUsers();
            console.log(users);
            setUsers(users);
        } catch (error) {
            alert("Errore nel caricare gli utenti: ", error);
        }
      }
    
    useEffect(()=>{
        getUsers();
        users &&
            users.map((user) => {
            if(user.ruolo === "admin")
                setAdmins(admins+1);
            else if(user.ruolo === "user")
                setStdUsers(stdUsers+1);
            })
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
                                        <span className="text">{user.email}</span>
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