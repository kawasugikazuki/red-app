import React,{useState,useEffect} from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { SendParam } from "../components/send_param";
import { get_redID } from "../components/Get_redID";
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';




export const Algorithm = () =>{

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const [ID,setID]=useState([]);
    useEffect(()=>{
        const fetchID=async()=>{
            try{
                const result=await get_redID();
                if (!arraycheck(result,ID)){
                    console.log("ID changed");
                    setID(result);
                };
                console.log(result);
            }catch(error){
                console.log(error);
            }
        };
        fetchID();
        const arraycheck=(array1,array2)=>{
            return JSON.stringify(array1)===JSON.stringify(array2);
        };
    },[ID]);

    const [param,setParam]=useState({
        IsExploring: false,
        TransitTime: 2.0,
        Mu:1.0,
        Sigma: 1.0,
        Outer_Rth: 3.0,
        Inner_Rth: 0.0,
        Height: 2.2,
        BetweenMarkers: 0.8,
        Height_Correction: false,
        Reject: "A",
        MarkerColor: "",
        ShutterSpeed: 100,
        Xcoord: 0.0,
        Ycoord: 0.0,
        LeftPWM: 0.0,
        RightPWM: 0.0,
    });
    const [frequency,setFrequency]=useState({
        MarkerFrequency_A: 0,
        MarkerFrequency_B: 0,
    });

    const handleChange = (event) => {
        const id = event.target.id;
        const value =event.target.value;
        if (value !== "" && value !== null) {
            if(id==="ShutterSpeed"){
                const num = parseInt(value);
                setParam({ ...param, [id]: num });
            }else{
                const num = parseFloat(value);
                setParam({ ...param, [id]: num });
            }
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

    const [selectedID, setSelectedID] = useState([]);

    const handleChangeID = (event, value) => {
        setSelectedID(value);
    }

    

        return(
            <div>
                <h1>**Algorithm Control Mode**</h1>
                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={ID}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    onChange={handleChangeID}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                            />
                            {option}
                        </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                        <TextField {...params} label="ID" />
                    )}
                />




                <FormGroup>
                    <p>Algorithm
                        <FormControlLabel control={<Switch name="IsExploring" checked={param.IsExploring} onChange={handleSwitch}/>} label={param.IsExploring ? 'on':'off'} />
                    </p>
                </FormGroup>
                <TextField
                required
                id="TransitTime"
                label="TransitTime"
                value={param.TransitTime}
                onChange={handleChange}
                />
                <TextField
                required
                id="Inner_Rth"
                label="Inner_Rth"
                value={param.Inner_Rth}
                onChange={handleChange}
                />
                <TextField
                required
                id="Mu"
                label="Mu"
                value={param.Mu}
                onChange={handleChange}
                />
                <div>
                <TextField
                required
                id="Sigma"
                label="Sigma"
                value={param.Sigma}
                onChange={handleChange}
                />
                <TextField
                required
                id="Outer_Rth"
                label="Outer_Rth"
                value={param.Outer_Rth}
                onChange={handleChange}
                />
                <TextField
                required
                id="Height"
                label="Height"
                value={param.Height}
                onChange={handleChange}
                />
                </div>
                <div>
                <TextField
                required
                id="MarkerFrequency_A"
                label="MarkerFrequency_A"
                value={frequency.MarkerFrequency_A}
                onChange={handleChangefreqency}
                />
                <TextField
                required
                id="MarkerFrequency_B"
                label="MarkerFrequency_B"
                value={frequency.MarkerFrequency_B}
                onChange={handleChangefreqency}
                />
                <TextField
                required
                id="BetweenMarkers"
                label="BetweenMarkers"
                value={param.BetweenMarkers}
                onChange={handleChange}
                />
                </div>
                <div>
                
                <Box sx={{ minWidth: 20 }}>
                <FormControl style={{ width: '150px' }}>
                 <InputLabel htmlFor="uncontrolled-native">
                    Reject
                </InputLabel>
                <NativeSelect
                 value={param.Reject}
                  inputProps={{
                   name: 'Reject',
                   id: 'Reject',
                  }}
                onChange={(event) => {
                    const value = event.target.value;
                    setParam({ ...param, Reject: value });
                  }}
                >
                <option value={"A"}>A</option>
                <option value={"B"}>B</option>
                <option value={"C"}>C</option>
                <option value={"D"}>D</option>
                </NativeSelect>
                </FormControl>
                </Box>



                <TextField
                required
                id="ShutterSpeed"
                label="ShutterSpeed"
                value={param.ShutterSpeed}
                onChange={handleChange}
                />
                <TextField
                required
                id="Xcoord"
                label="Xcoord"
                value={param.Xcoord}
                onChange={handleChange}
                />
                <TextField
                required
                id="Ycoord"
                label="Ycoord"
                value={param.Ycoord}
                onChange={handleChange}
                />
                </div>
                <FormGroup>
                <p>Height Correction
                    <FormControlLabel control={<Switch name="Height_Correction" checked={param.Height_Correction} onChange={handleSwitch} />} label={param.Height_Correction ? 'on' : 'off'} />
                </p>  
                </FormGroup>

                <Button variant="contained" onClick={()=>{SendParam(param,frequency,selectedID)}} endIcon={<SendIcon />}>
                    Send
                </Button>
                 {/* {frequency.MarkerFrequency_A} {frequency.MarkerFrequency_B}  */}
                 {JSON.stringify(param)}
            </div>
        );
}
