import React from "react";
import DigitalDateTime from "../components/DegitalDatetime";

class Time extends React.Component{
    render(){
        return(
            <div>
                <h1 style={{color:"red",fontSize:"150px",textAlign:"center"}}>RED</h1>
                <DigitalDateTime />
            </div>
            
        );
    }
}

export default Time;