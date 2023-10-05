import React,{useState} from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { SendParam } from "../components/send_param";


export const Algorithm = () =>{
    const [param,setParam]=useState({
        IsExploring: false,
        TransitTime: 2,
        Mu:1.0,
        Sigma: 1.0,
        Outer_Rth: 3.0,
        Inner_Rth: 0.0,
        Height: 2.2,
        BetweenMarkers: 0.8,
        Height_Correction: false,
        Reject: "A",
        MarkerColor: "Green",
        ShutterSpeed: 100,
        Xcoord: 0,
        Ycoord: 0,
        LeftPWM: 0,
        RightPWM: 0,
    });
    const [frequency,setFrequency]=useState({
        MarkerFrequency_A: 0,
        MarkerFrequency_B: 0,
    });

    const handleChange = (event) => {
        const id = event.target.id;
        const value =event.target.value;
        if (!isNaN(value)) {
            if (id==="ShutterSpeed"){
                const num =parseInt(value);
                setParam({...param,[id]:num});
            }else if (id==="MarkerColor"){
                const num =String(value);
                setParam({...param,[id]:num});
            } else{
                const num =parseFloat(value);
                setParam({...param,[id]:num});
            }
        }else{
            alert("Please enter a number");
        }
    };

    const handleChangefreqency = (event) => {
        const id=event.target.id;
        const value=event.target.value;
    
        if (!isNaN(value)) {
            const num =parseFloat(value);
            setFrequency({...frequency,[id]:num});
        }else{
            alert("Please enter a number");
        }
    }
    const handleSwitch = (event) => {
        setParam({...param,[event.target.name]:event.target.checked});
    }
    

        return(
            <div>
                <h1>**Algorithm Control Mode**</h1>
                <FormGroup>
                    <p>Algorithm
                        <FormControlLabel control={<Switch name="IsExploring" checked={param.IsExploring} onChange={handleSwitch}/>} label={param.IsExploring ? 'on':'off'} />
                    </p>
                </FormGroup>
                <TextField
                required
                id="TransitTime"
                label="TransitTime"
                defaultValue={param.TransitTime}
                onChange={handleChange}
                />
                <TextField
                required
                id="Inner_Rth"
                label="Inner_Rth"
                defaultValue={param.Inner_Rth}
                onChange={handleChange}
                />
                <TextField
                required
                id="Mu"
                label="Mu"
                defaultValue={param.Mu}
                onChange={handleChange}
                />
                <div>
                <TextField
                required
                id="Sigma"
                label="Sigma"
                defaultValue={param.Sigma}
                onChange={handleChange}
                />
                <TextField
                required
                id="Outer_Rth"
                label="Outer_Rth"
                defaultValue={param.Outer_Rth}
                onChange={handleChange}
                />
                <TextField
                required
                id="Height"
                label="Height"
                defaultValue={param.Height}
                onChange={handleChange}
                />
                </div>
                <div>
                <TextField
                required
                id="MarkerFrequency_A"
                label="MarkerFrequency_A"
                defaultValue={frequency.MarkerFrequency_A}
                onChange={handleChangefreqency}
                />
                <TextField
                required
                id="MarkerFrequency_B"
                label="MarkerFrequency_B"
                defaultValue={frequency.MarkerFrequency_B}
                onChange={handleChangefreqency}
                />
                </div>
                <div>
                <TextField
                required
                id="Between Makers"
                label="Between Makers"
                defaultValue={param.BetweenMarkers}
                onChange={handleChange}
                />
                <TextField
                required
                id="Xcoord"
                label="Xcoord"
                defaultValue={param.Xcoord}
                onChange={handleChange}
                />
                <TextField
                required
                id="Ycoord"
                label="Ycoord"
                defaultValue={param.Ycoord}
                onChange={handleChange}
                />
                </div>
                <FormGroup>
                <p>Height Correction
                    <FormControlLabel control={<Switch name="Height_Correction" checked={param.Height_Correction} onChange={handleSwitch} />} label={param.Height_Correction ? 'on' : 'off'} />
                </p>  
                </FormGroup>

                <Button variant="contained" onClick={()=>{SendParam(param,frequency)}} endIcon={<SendIcon />}>
                    Send
                </Button>
                 {frequency.MarkerFrequency_A} {frequency.MarkerFrequency_B} 
            </div>
        );
}
