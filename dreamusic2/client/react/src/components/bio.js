import image from "../externals/bioBackground.jpg";
function Bio(){
    return(
        <div className="bg-image container-fluid align-content-center" style={{backgroundImage: `url(${image}`, height:"400px", backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>          
            <div className="col-2 text-black text-left pt-5">
                <h1 className="header text-black">Bio</h1>
                <span>Inserisci la biografia del tuo gruppo</span>
            </div>
        </div>
    );
}

export default Bio;