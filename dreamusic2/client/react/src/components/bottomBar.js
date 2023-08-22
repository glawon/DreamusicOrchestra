import React, {Component} from 'react';
class BottomBar extends Component{
    render(){
        return(
            <div className="row py-3 justify-content-center align-items-center bg-dark">
                <div className="col-4 justify-text-left" style={{color:"#b4abab", fontSize:"0.8rem"}}>
                    Design and front-end programming: Adriana Cannata <br/>
                    Back-end programming: Diletta Moscatt <br/>
                    2023
                </div>
                <div className="col-4 align-self-center">
                    <img src={this.props.logo} className="img-fluid" style={{width:20+'rem'}}/>
                </div>
                <div className="col-4 text-center">
                    <h5 className="title mb-1">Contatti:</h5>
                    <button type="button" className="btn btn-link" style={{color:"#e3841f"}}>groupname@mail.com</button>
                    <br/>
                    <button type="button" className="btn">
                        <a href="https://www.facebook.com/">
                            <i className="bi bi-facebook" style={{color:"#e3841f"}}></i>
                        </a>
                    </button>
                    <button type="button" className="btn">
                        <a href="https://www.instagram.com/">
                            <i className="bi bi-instagram" style={{color:"#e3841f"}}></i>
                        </a>
                    </button>
                    <button type="button" className="btn">
                        <a href="https://www.youtube.com/">
                            <i className="bi bi-youtube"style={{color:"#e3841f"}}></i>
                        </a> 
                    </button>
                </div>
            </div>
        );
    }
}

export default BottomBar;