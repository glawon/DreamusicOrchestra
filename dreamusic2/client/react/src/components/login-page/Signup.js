import { useState } from "react";
import {loginUser} from '../services/user.js';
import SuccessNotify from "./Success.js";

function SignUp(){
    const data={nome:"", cognome:"", email:"", password:"", ruolo: "user"};
    const [credentials, setCredentials] = useState(data);
    const [show, setShow] = useState(false);
    const [header, setHeader] = useState("Benvenuto!");
    const [body, setBody] = useState("Accedi per continuare sul sito");

    function handleFirstNameChange(e){
        setCredentials({...credentials, nome: e.target.value});
    }

    function handleLastNameChange(e){
        setCredentials({...credentials, cognome: e.target.value});
    }

    function handleEmailChange(e){
        setCredentials({...credentials, email: e.target.value});
    }

    function handlePasswordChange(e){
        setCredentials({...credentials, password: e.target.value});
    }
    
    function submitControl(){
        if(credentials.password.length < 4)
        {
            alert("La password deve avere almeno 4 caratteri");
            return;
        }

        function setter(){
            let r = loginUser(credentials, "register")
            .then(user =>{
                console.log(user);
                setShow(true);
            })
            .catch(error =>
            {
                if(!error?.response)
                    alert("Nessuna risposta dal server");
                else if(error.response?.status === 400)
                    alert("Email o password mancante");
                else if(error.response?.status === 401)
                    alert("Non autorizzato");
                else
                    alert("Login fallito");
            })
            console.log(r);
        }

        setter();
    }

    return(
        <div className="col-4 align-self-center my-0">
            <div className="d-flex justify-content-center my-2">
                <SuccessNotify show={show} setShow={setShow} header={header} body={body}/>
            </div>
            
            <form className="container-fluid">
                <h1 className="title">Registrati</h1>
                <div className="row g-3 mt-3 justify-content-center">
                    <div className="col-auto">
                        <label htmlFor="firstName" className="form-label text-white">Nome:</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Nome" onChange={(event)=>{handleFirstNameChange(event)}}/>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="lastName" className="form-label text-white">Cognome:</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Cognome" onChange={(event)=>handleLastNameChange(event)}/>
                    </div>
                </div>
                <div className="row g-3 my-3 justify-content-center">
                    <div className="col-auto">
                        <label htmlFor="usermail" className="form-label text-white">Email</label>
                        <input type="email" className="form-control" id="usermail" placeholder="name@example.com" onChange={(event)=>handleEmailChange(event)}/>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="inputPassword" className="form-label text-white">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="password"aria-describedby="passwordHelpInline"
                        onChange={(event)=>handlePasswordChange(event)}/>
                    </div>  
                </div>    
                <div className="row justify-content-center">
                    <div className="col-auto mt-3">
                        <button type="submit" className="btn" style={{color: "black", backgroundColor: "#e3841f", border:"#e3841f"}}
                        onClick={submitControl}>Conferma</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignUp;