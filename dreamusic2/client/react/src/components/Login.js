import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';
import {loginUser} from './services/user.js';
import background from "../externals/locandina.png";
//import SignIn from "./Sign-in";

function ErrorNotify({show, setShow})
{
    return(
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <i className="bi bi-exclamation-triangle me-1" style={{color:"red"}}></i>
            <strong className="mx-auto">Errore</strong>
          </Toast.Header>
          <Toast.Body style={{backgroundColor:"black", color:"white"}}>Parametri errati</Toast.Body>
        </Toast>
    );
}

function SignIn({setUser, setLogged}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow]  = useState(false);
    const navigate = useNavigate();

    function handleEmailChange(e){
        setEmail(e.target.value);
    }

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    function submitControl(){       
        if(password.length < 1)
        {
            alert("La password deve avere almeno 8 caratteri");
            return;
        }
     
        function setter(){
            loginUser({email, password})
            .then(user =>{
                console.log(user);
                setUser(user.user);
                setLogged(user.token1);
                if(user.token1)
                    navigate("/");
                else
                    setShow(true);
            })
            .catch(error => alert("Errore nel caricare i dati\n"+error));
        }

        setter();      
    }

    return(
        <div className="col-8 bg-image d-flex align-items-center"
        style={{backgroundImage: `url(${background}`, backgroundSize:"cover", backgroundPosition:"center", height: "80vh"}}>
            <div className="col-6 justify-content-start pt-5">
                <ErrorNotify show={show} setShow={setShow}/>
            </div>
            <div className="col-6">
                <form className="container-fluid justify-content-center">
                    <h1 className="title text-black">Accedi</h1>
                    <div className="row my-3 justify-content-center">
                        <div className="col-auto">
                            <label htmlFor="usermail" className="form-label text-black">Email</label>
                            <input type="email" className="form-control" id="usermail" placeholder="name@example.com" onChange={(event)=>handleEmailChange(event)}/>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="inputPassword" className="form-label text-black">Password</label>
                            <input type="password" id="inputPassword" className="form-control" placeholder="password"aria-describedby="passwordHelpInline"
                            onChange={(event)=>handlePasswordChange(event)}/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto mt-3 justify-content-center">
                            <button type="button" className="btn" style={{backgroundColor:"#1d2124", color:"white"}} onClick={submitControl}>Conferma</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

function SignUp({handleLogin}){
    const data={nome:"", cognome:"", email:"", password:"", ruolo: "user"};
    const [login, setLogin] = useState(data);

    function handleFirstNameChange(e){
        setLogin({...login, nome: e.target.value});
    }

    function handleLastNameChange(e){
        setLogin({...login, cognome: e.target.value});
    }

    function handleEmailChange(e){
        setLogin({...login, email: e.target.value});
    }

    function handlePasswordChange(e){
        setLogin({...login, nome: e.target.value});
    }
    
    function submitControl(){
        if(login.password.length < 8)
        {
            alert("La password deve avere almeno 8 caratteri");
            return;
        }
    }

    return(
        <div className="col-4 align-self-center my-0">
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
                        <button type="button" className="btn" style={{color: "black", backgroundColor: "#e3841f", border:"#e3841f"}}
                        onSubmit={submitControl}>Conferma</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function Login({setUser, setLogged}){
    return(
            <div className="row">
                <SignUp setUser={setUser} setLogged={setLogged}/>
                <SignIn setUser={setUser} setLogged={setLogged}/>
            </div>
    );
}

export default Login;