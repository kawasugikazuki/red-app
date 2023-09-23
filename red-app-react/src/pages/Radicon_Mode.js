import React from "react";
import {BsArrowUp,BsArrowCounterclockwise,BsPause,BsArrowClockwise,BsArrow90DegRight,BsArrow90DegLeft} from "react-icons/bs";
import { radicon } from "../components/radicon";
import Button from '@mui/material/Button';

export const  Radicon=()=> {
        return(
            <div>
                <h1>**Radicon Control Mode**</h1>
                
                <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>radicon("Left")}><BsArrow90DegLeft/></Button>
                <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>radicon("Forward")}><BsArrowUp /></Button>
                <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>radicon("Right")}><BsArrow90DegRight/> </Button>
                <div >
                    <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>radicon("PivotLeft")}><BsArrowCounterclockwise /></Button>
                    <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>radicon("Stop")}><BsPause/></Button>
                    <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>radicon("PivotRight")}><BsArrowClockwise /></Button>
                </div>
            </div>
        );
    
}

