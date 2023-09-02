import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import "../App.css";
import Bio from './bio';
import Eventi from './evento';
import About from './About';
import Gallery from './gallery';
import ShopPreview from './ShopPreview';
import image from "../externals/giradischi.jpg";
import back from "../externals/galleryBack.jpg";

function Home({eventi, logo, setEventId, setCambia, musicians}){
  function useScrollToTop(){
      const location = useLocation();
      useEffect(() => {
        window.scrollTo({ top: 0 });
      }, [location]);
    };
  
    useScrollToTop();
  
      return(
          <>
              <section className="section" id="home" style={{backgroundColor: "black"}}>
                <div className="container text-center py-5">
                    <img src={logo} className="img-fluid w-50"/>
                </div>
                <Bio />
              </section>
              <section className="section py-5" id="eventscroll">
                <Eventi eventi={eventi} setEventId={setEventId} setCambia={setCambia}/>
              </section>
              <section className="section py-5" id="about" style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9)),url(${back}`, backgroundPosition:"center",
        backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>
                <About musicians={musicians}/>
              </section>
              <section className="section bg-image py-5" id="gallery">
                <Gallery />
              </section>
              <section className="section bg-image py-5" id="shop" style={{backgroundImage:`linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url(${image}`, backgroundPosition:"center",
        backgroundSize:"cover", backgroundRepeat:"no-repeat", height:"500px"}}>
                <ShopPreview />
              </section>
        </>
      )
}

export default Home;