import React from "react";
import {BsArrowUp} from "react-icons/bs";
import {BsArrowCounterclockwise} from "react-icons/bs";
import {BsArrowDown} from "react-icons/bs";
import {BsArrowClockwise} from "react-icons/bs";

class Radicon extends React.Component{
    render(){
        return(
            <div>
                <h1>**Radicon Control Mode**</h1>
                <h1>Server's IP address : </h1>
                <button><BsArrowUp /></button>
                <div>
                    <button><BsArrowCounterclockwise /></button>
                    <button><BsArrowDown /></button>
                    <button><BsArrowClockwise /></button>
                </div>
            </div>
        );
    }
}

export default Radicon;