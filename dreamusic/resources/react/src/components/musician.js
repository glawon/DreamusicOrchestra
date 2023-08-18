import React, {Component} from 'react'

class Musician extends Component{
    render(){
        return(
            
            <div className="container text-center">
                <div className="row row-cols-auto" style={{paddingBottom: "30px"}}>
                    <div className="col">
                        <img src={this.props.picture} className="img-fluid" style={{width:'10rem', height:'10rem'}}/>
                    </div>
                    <div className="col" style={{textAlign:"center"}}>
                        <h4 className="title">{this.props.noun}</h4>
                        <span className="text">{this.props.instrument}</span>
                    </div>
                </div>
            </div>
         );
    }
}

export default Musician;