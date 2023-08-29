import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { useState } from "react";
import {loginUser} from './services/user.js';
import background from "../externals/locandina.png";

function Successful({navigate}){
    function redirect()
    {
        navigate("/");
    }
    return(
        <Alert>
            <Alert.Heading>Bentornato!</Alert.Heading>
            <hr/>
            <button className="btn btnCustom" onClick={redirect}>Continua sul sito</button>
        </Alert>
    );
}

function SignIn({handleLogin}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logged, setLogged] = useState(false);
    const navigate = useNavigate();

    function handleEmailChange(e){
        setEmail(e.target.value);
    }

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    function submitControl(){
        let userData;
        let isLogged;
        if(password.length < 1)
        {
            alert("La password deve avere almeno 8 caratteri");
            return;
        }

        let response = loginUser({email, password})
        .then(data => (data.json()))
        .then((data) =>{
            userData = data.user;
            isLogged = data.logged;
        })

        const setter = async() => {
            const r = await response;
            const u = userData;
            const l = isLogged;
            handleLogin(u,l);
            setLogged(true);
        }
        setter();
        if(logged)
        {
            return(
                <Successful navigate={navigate}/>
            );
        }   
    }

    return(
        <div className="col-8 bg-image d-flex my-0 align-items-center"
        style={{backgroundImage: `url(${background}`, backgroundSize:"cover", height: "700px"}}>
            <div className="col-6"></div>
            <div className="col-6">
                <form className="container-fluid justify-content-center">
                    <span className="text text-black mt-5 mb-5">Hai già un account?</span>
                    <h1 className="title">Sign in</h1>
                    <div className="row my-3 justify-content-center">
                        <div className="col-auto">
                            <label htmlFor="usermail" className="form-label text-white">Email address</label>
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
                            <button type="button" className="btn btnCustom" onClick={submitControl}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;