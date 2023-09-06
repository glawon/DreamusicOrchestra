//import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react';
import GestioneMusicisti from './dashboard-page/GestioneMusicisti';
import GestioneEventi from './dashboard-page/GestioneEventi';
import GestioneBiglietti from './dashboard-page/GestioneBiglietti';
import Lista from './dashboard-page/Lista';
import eventsBack from '../externals/gallery2.jpg';

function Dashboard(){
    const [state, setState] = useState({aboutShow: false, eventShow: false, ticketShow: false});
    
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
            
        </div>
        
    );
}

export default Dashboard;