import React from "react";
import {BsArrowUp,BsArrowCounterclockwise,BsPause,BsArrowClockwise,BsArrow90DegRight,BsArrow90DegLeft} from "react-icons/bs";
import Button from '@mui/material/Button';
import { udp } from "../components/UDP";

export const  Radicon=()=> {
        return(
            <div>
                <h1>**udp Control Mode**</h1>
                
                <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("Left",50000)}><BsArrow90DegLeft/></Button>
                <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("Forward",50000)}><BsArrowUp /></Button>
                <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("Right",50000)}><BsArrow90DegRight/> </Button>
                <div >
                    <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("PivotLeft",50000)}><BsArrowCounterclockwise /></Button>
                    <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("Stop",50000)}><BsPause/></Button>
                    <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("PivotRight",50000)}><BsArrowClockwise /></Button>
                </div>
            </div>
        );
    
}

