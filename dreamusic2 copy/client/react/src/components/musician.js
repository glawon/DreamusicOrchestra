import React, {Component} from 'react'

class Musician extends Component{
    render(){
        return(   
            <div className="container d-flex justify-content-center">
                <div className="row row-cols-3 pb-5">
                    <div className="col-auto">
                        <img src={this.props.picture} className="rounded-circle" style={{height:"7rem", width:"12rem"}}/>
                    </div>
                    <div className="col-auto align-self-center justify-content-center">
                        <div className="container-fluid al">
                            <h4 className="title mb-0">{this.props.noun}</h4><br/>
                            <span className="text mt-0">{this.props.instrument}</span>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}

export default Musician;