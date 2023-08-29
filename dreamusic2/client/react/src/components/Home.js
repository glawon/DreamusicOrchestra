import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import "../App.css";
import Bio from './bio';
import Eventi from './evento';
import About from './About';
import logo from "../externals/logo.jpg";

function Home({eventi, setEventId, setCambia, musicians}){
  function useScrollToTop(){
      const location = useLocation();
      useEffect(() => {
        window.scrollTo({ top: 0 });
      }, [location]);
    };
  
    useScrollToTop();
  
      return(
          <>
              <div className="container text-center py-5">
                  <img src={logo} className="img-fluid" style={{width:45+'rem'}}/>
              </div>
              <Bio />
              <section className="section py-5" id="eventscroll">
                <Eventi eventi={eventi} setEventId={setEventId} setCambia={setCambia}/>
              </section>
              <section className="section py-5" id="about" style={{backgroundColor: "#333a3f"}}>
                <About musicians={musicians}/>
              </section>
        </>
      )
}

export default Home;