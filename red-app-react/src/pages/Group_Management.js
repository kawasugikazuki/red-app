import React from "react";
import StartExplore from "../components/StartExplore";
import BrokerIP from "../components/BrokerIP";

class Group extends React.Component{
    render(){
        return(
            <div>
                <h1>**Swarm System Operation and Management**</h1>
                <BrokerIP />
                <StartExplore />
            </div>
        );
    }
}
export default Group;