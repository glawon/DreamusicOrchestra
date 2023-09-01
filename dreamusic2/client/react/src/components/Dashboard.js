//import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react';
import GestioneMusicisti from './dashboard-page/GestioneMusicisti';
import Lista from './dashboard-page/Lista';

function Dashboard({musicians, setMusicians}){
    const [state, setState] = useState({aboutShow: false, eventShow: false, shopShow: false});
    return(
        <div className="container-fluid pt-5">
            <Lista state={state} setState={setState}/>
            {state.aboutShow &&
                <GestioneMusicisti musicians={musicians} setMusicians={setMusicians}/>
            }
            
        </div>
        
    );
}

export default Dashboard;