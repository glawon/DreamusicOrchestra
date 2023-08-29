import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import {loginUser} from './services/user.js';
//import AuthStore from './AuthStore';
import background from "../externals/locandina.png";
//import SignIn from "./Sign-in";

function Successful({navigate, show, setShow}){
    function redirect()
    {
        setShow(false);
        navigate("/");
    }
    return(
        <div className="container-fluid">
            <Alert show={show} style={{backgroundColor:"rgba(0,0,0,0.9)", border:"rgba(0,0,0,0.9)"}}>
            <Alert.Heading className="title">Bentornato!</Alert.Heading>
            <hr/>
            <button className="btn btnCustom" onClick={redirect}>Continua sul sito</button>
            </Alert>
        </div>
        
    );
}

function SignIn({setUser, setLogged}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
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
                setLogged(user.logged);
                if(user.logged)
                    setShow(true);
            })
            .catch(error => alert("Errore nel caricare i dati\n"+error));
        }

        setter();      
    }

    return(
        <div className="col-8 bg-image d-flex my-0 align-items-center"
        style={{backgroundImage: `url(${background}`, backgroundSize:"cover", height: "700px"}}>
            <div className="col-6 justify-content-center pt-5">
                {show&&
                    <Successful navigate={navigate} show={show} setShow={setShow}/>      
                }   
            </div>
            <div className="col-6">
                <form className="container-fluid justify-content-center">
                    <span className="text text-black mt-5 mb-5">Hai già un account?</span>
                    <h1 className="title">Log-in</h1>
                    <div className="row my-3 justify-content-center">
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
                        <div className="col-auto mt-3 justify-content-center">
                            <button type="button" className="btn btnCustom" onClick={submitControl}>Conferma</button>
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
        <>
        <SignUp setUser={setUser} setLogged={setLogged}/>
        <SignIn setUser={setUser} setLogged={setLogged}/>

        </>
    );
}

export default Login;