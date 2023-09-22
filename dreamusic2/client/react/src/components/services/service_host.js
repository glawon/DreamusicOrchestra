
//import process from "process"

export function getHost(){

  if(!process.env.NODE_ENV || process.env.NODE_ENV=="development"){
    return "//localhost:8000/api";
} else {
    return "//"+window.location.host+"/api";
}

}