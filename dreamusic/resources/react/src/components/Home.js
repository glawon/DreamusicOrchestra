import React, {Component} from 'react';
import "../Page.css";
import Bio from './bio';
import Eventi from './evento';
import About from './About';
import logo from "../externals/logo.jpg";

class Home extends Component{
   
    render(){
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
}

export default Home;