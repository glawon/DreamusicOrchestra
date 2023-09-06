//import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react';
import GestioneMusicisti from './dashboard-page/GestioneMusicisti';
import GestioneEventi from './dashboard-page/GestioneEventi';
import GestioneBiglietti from './dashboard-page/GestioneBiglietti';
import GestioneUtenti from './dashboard-page/GestioneUtenti';
import Lista from './dashboard-page/Lista';

function Dashboard(){
    const [state, setState] = useState({aboutShow: false, eventShow: false, ticketShow: false, userShow: false});
    
    return(
        <div className="container-fluid pt-5">
            <Lista state={state} setState={setState}/>
            {state.aboutShow &&
                <GestioneMusicisti/>
            }
            {state.eventShow &&
                <GestioneEventi/>
            }
            {state.ticketShow &&
                <GestioneBiglietti/>
            }
            {state.userShow &&
                <GestioneUtenti/>
            }    
        </div>
        
    );
}

export default Dashboard;