import React from "react";
import {BsArrowUp,BsArrowCounterclockwise,BsPause,BsArrowClockwise,BsArrow90DegRight,BsArrow90DegLeft} from "react-icons/bs";
import radiconstyle from"./Radicon_Mode.css";

class Radicon extends React.Component{
    render(){
        return(
            <div>
                <h1>**Radicon Control Mode**</h1>
                <h2>Server's IP address : </h2>
                <button className="Arrow" ><BsArrow90DegLeft/></button>
                <button className="Arrow" ><BsArrowUp /></button>
                <button className="Arrow" ><BsArrow90DegRight/> </button>
                <div >
                    <button className="Arrow" ><BsArrowCounterclockwise /></button>
                    <button className="Arrow" ><BsPause/></button>
                    <button className="Arrow" ><BsArrowClockwise /></button>
                </div>
            </div>
        );
    }
}

export default Radicon;