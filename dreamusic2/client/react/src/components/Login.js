import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginUser} from './services/user.js';
import background from "../externals/locandina.png";
import SignIn from "./login-page/Sign-in";
import SignUp from "./login-page/Signup.js";

function Login({setUser, setLogged}){
    return(
            <div className="row">
                <SignUp/>
                <SignIn setUser={setUser} setLogged={setLogged}/>
            </div>
    );
}

export default Login;