import React, {Component, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import "../Page.css";
import Bio from './bio';
import Eventi from './evento';
import About from './About';
import logo from "../externals/logo.jpg";

function Home(){
    function useScrollToTop(){
        const location = useLocation();
        useEffect(() => {
          window.scrollTo({ top: 0 });
        }, [location]);
      };
    
      useScrollToTop()
        return(
            <>
                <div className="container text-center mb-5">
                    <img src={logo} className="img-fluid" style={{width:45+'rem'}}/>
                </div>
                <Bio />
                <Eventi />
                <hr className="divider"/>
                <About/>
          </>
        )
}

export default Home;