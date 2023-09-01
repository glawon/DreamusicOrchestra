import { useContext } from "react";
import AuthContext from "../components/services/AuthProvider";

export const useAuth = ()=>{
    return useContext(AuthContext);
}