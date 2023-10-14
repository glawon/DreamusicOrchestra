import image from "../externals/bioBackground.jpg";
function Bio(){
    return(
        <div className="bg-image container-fluid align-content-center" style={{backgroundImage: `linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0)), url(${image}`, height:"400px",
        backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>          
            <div className="col-3 text-black text-left pt-5">
                <h1 className="header pt-5">Bio</h1>
                <span className="text-center text-white">Inserisci la biografia del tuo gruppo</span>
            </div>
        </div>
    );
}

export default Bio;