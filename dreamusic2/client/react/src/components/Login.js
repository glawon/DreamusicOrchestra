import { useState } from "react";
import PropTypes from 'prop-types';
import background from "../externals/locandina.png";

async function loginUser(credentials) {

    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

function SignIn({setLogged}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(e){
        setEmail(e.target.value);
    }

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    function submitControl(){
        if(password.length < 8)
        {
            alert("La password deve avere almeno 8 caratteri");
            return;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        /*const token = await loginUser({
            email,
            password
        });*/
    
        setLogged(true);   
    }

    return(
        <div className="col-8 bg-image d-flex my-0 align-items-center"
        style={{backgroundImage: `url(${background}`, backgroundSize:"cover", height: "700px"}}>
            <div className="col-6"></div>
            <div className="col-6">
                <form className="container-fluid justify-content-center" onSubmit={handleSubmit}>
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

function SignUp({setToken}){
    const data={nome:"", cognome:"", email:"", password:"", ruolo: "user"};
    const [login, setLogin] = useState(data);

    function handleFirstNameChange(e){
        setLogin({...login, nome: e.target.value});
        console.log("Nome: "+e.target.value)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser(login);
        setToken(token);   
    }

    return(
        <div className="col-4 align-self-center my-0">
            <form className="container-fluid" onSubmit={handleSubmit}>
                <h1 className="title">Sign Up</h1>
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
                    <div className="col-auto mt-3">
                        <button type="button" className="btn" style={{color: "black", backgroundColor: "#e3841f", border:"#e3841f"}}
                        onSubmit={submitControl}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function Login({setToken}){
    return(
        <>
        <SignUp setToken={setToken}/>
        <SignIn setToken={setToken}/>   
        </>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired  
}  

export default Login;