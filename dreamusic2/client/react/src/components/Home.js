import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import "../App.css";
import Caricamento from './Loader';
import Bio from './bio';
import Eventi from './evento';
import About from './About';
import Gallery from './gallery';
//import ShopPreview from './ShopPreview';
//import image from "../externals/giradischi.jpg";
import back from "../externals/galleryBack.jpg";

function Home({eventi, logo, setEventId, setCambia}){
  const location = useLocation();  
  const { hash } = location;
  
  function useScrollToTop(){ 
    useEffect(() => {
      window.scrollTo({ top: 0 });
    }, [location]);
  };

  function useScrollToPosition(){
    useEffect(() => {
      if (hash) {
        const sectionId = hash.slice(1);
        const targetElement = document.getElementById(sectionId);
  
        console.log("Elemento: ", targetElement);
        console.log("Elemento ID: ", targetElement ? targetElement.id : "Nessun elemento trovato");
  
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 800); // Ritardo di 100 millisecondi
      }
    }, [hash]);
  }
  
  useScrollToTop();
  useScrollToPosition();
  
  return(
    <>
          <section className="section scrollContainer" id="home" style={{backgroundColor: "black"}}>
          <div className="container text-center py-5">
              <img src={logo} className="img-fluid w-50"/>
          </div>
          <Bio />
        </section>
        <section className="section py-5 scrollContainer" id="eventscroll">
          <Eventi eventi={eventi} setEventId={setEventId} setCambia={setCambia}/>
        </section>
        <section className="section py-5 scrollContainer" id="about" style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9)),url(${back}`, backgroundPosition:"center",
        backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>
          <About/>
        </section>
        <section className="section bg-image py-5 scrollContainer" id="gallery">
          <Gallery />
        </section>
        {/* <section className="section bg-image py-5" id="shop" style={{backgroundImage:`linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url(${image}`, backgroundPosition:"center",
  backgroundSize:"cover", backgroundRepeat:"no-repeat", height:"500px"}}>
          <ShopPreview />
        </section> */}
    {/* //   ) : (
    //     <Caricamento/>
    //   )
    // } */}
    </>
  )
}

export default Home;