import React from "react";

export function ShowGroup({group,param,frequency,ID}){
    return(
        <div>
            {/* <h2>{group}</h2> */}
            <p>TransitTime:{param.TransitTime}</p>
            <p>Mu:{param.Mu}</p>
            <p>Sigma:{param.Sigma}</p>
            <p>Outer_Rth:{param.Outer_Rth}</p>
            <p>Inner_Rth:{param.Inner_Rth}</p>
            <p>frequencyA:{frequency.MarkerFrequency_A}</p>
            <p>frequencyB:{frequency.MarkerFrequency_B}</p>
            <p>ShutterSpeed:{param.ShutterSpeed}</p>
            <p>X:{param.Xcoord},Y:{param.Ycoord}</p>
            {/* <p>ID:{JSON.stringify(ID)}</p> */}
        </div>
    );
}