import { createContext, useState } from "react";

const EventContext = createContext({});
export const EventHandler = ({children}) => {
    const [event, setEvent] = useState({}); //id dell'evento
    return(
        <EventContext.Provider value={{event, setEvent}}>
            {children}
        </EventContext.Provider>
    );
}

export default EventContext;