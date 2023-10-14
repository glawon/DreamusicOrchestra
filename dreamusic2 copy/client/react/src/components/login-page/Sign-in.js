import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import {loginUser} from '../services/user.js';
import background from "../../externals/locandina.png";
import ErrorNotify from "./ErrorNotify.js";

function SignIn({setUser, setLogged}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow]  = useState(false);
    const {setAuth} = useAuth();
    const navigate = useNavigate();

    function handleEmailChange(e){
        setEmail(e.target.value);
    }

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    function submitControl(){       
        if(password.length < 4)
        {
            alert("La password deve avere almeno 4 caratteri");
            return;
        }
     
        function setter(){
            let accessToken = 0;
            loginUser({email, password}, "login")
            .then(user =>{
                setUser(user.user);
                accessToken = user.token;
                setAuth({user, accessToken});
                setLogged(true);
                if(user.token)
                {
                    sessionStorage.setItem("userID", user.user.id);
                    navigate("/");
                }
                    
                else
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

export default SignIn;