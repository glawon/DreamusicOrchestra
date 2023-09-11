import React, {Component} from 'react';
class BottomBar extends Component{
    render(){
        return(
            <><div className="row row-cols-3 py-3 justify-content-center align-items-center bg-dark" >
                <div className="col justify-text-left" style={{color:"#b4abab", fontSize:"0.8rem"}}>
                Design and front-end programming: Adriana Cannata <br/>
                Back-end programming: Diletta Moscatt <br/>
                2023
            </div>
            <div className="col align-self-center" style={{width:"33.33%"}}>
                <img src={this.props.logo} className="img-fluid w-25" style={{width:20+'rem'}}/>
            </div>
            <div className="col text-center" style={{width:"33.33%"}}>
                <h5 className="title mb-1">Contatti:</h5>
                <button type="button" className="btn btn-link text-wrap text mb-0">groupname@mail.com</button>
                <br/>
                <button type="button" className="btn">
                    <a href="https://www.facebook.com/">
                        <i className="bi bi-facebook"></i>
                    </a>
                </button>
                <button type="button" className="btn">
                    <a href="https://www.instagram.com/">
                        <i className="bi bi-instagram"></i>
                    </a>
                </button>
                <button type="button" className="btn">
                    <a href="https://www.youtube.com/">
                        <i className="bi bi-youtube"></i>
                    </a> 
                </button>
            </div></div></>
        );
    }
}

export default BottomBar;