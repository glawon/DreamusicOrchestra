
//import process from "process"

export function getHost(){

  if(!process.env.NODE_ENV || process.env.NODE_ENV=="development"){
    return "//localhost:8000/api";
  } else {
      return "//"+window.location.host+"/api";
  }
}

export function getHostMusiciansImages(){

  if(!process.env.NODE_ENV || process.env.NODE_ENV=="development"){
    return "//localhost:8000/storage/musicisti";
  } else {
      return "//"+window.location.host+"/storage/musicisti";
  }
}

// export function getHostGallery(){

//   if(!process.env.NODE_ENV || process.env.NODE_ENV=="development"){
//     return "//localhost:8000/storage/gallery";
//   } else {
//       return "//"+window.location.host+"/storage/gallery";
//   }
// }