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
import isEqual from 'lodash/isEqual';
import { useParam } from "../context/param-hooks";




export const Algorithm = () =>{
const {paramState,paramDispatch,paramset,setParamset}=useParam();

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

    const [frequency,setFrequency]=useState({
        MarkerFrequency_A: 0,
        MarkerFrequency_B: 0,
    });


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


    const [selectedID, setSelectedID] = useState([]);

    const handleChangeID = (event, value) => {
        setSelectedID(value);
    }
    const handleChangeparam = (event,value) => {
        setSelectedparam(value);
    }

    const [selectedparam,setSelectedparam]=useState([]);


    const param_preserve=(param,frequency)=>{
        if(frequency.MarkerFrequency_A>0 && frequency.MarkerFrequency_B>0){
            param.MarkerColor=String(frequency.MarkerFrequency_A)+"_"+String(frequency.MarkerFrequency_B);
        }else if ( frequency.MarkerFrequency_B===0){
            param.MarkerColor=String(frequency.MarkerFrequency_A);
        }else if ( frequency.MarkerFrequency_A===0){
            param.MarkerColor=String(frequency.MarkerFrequency_B);
        }
        const isObjectInArray = paramset.some((item) => isEqual(item, param));

        if (!isObjectInArray) {
        setParamset((prevParamSet) => [...prevParamSet, {...param}]);
        }
    }

        return(

            <div>
                <h1>**Algorithm Control Mode**</h1>
                <Autocomplete
                    multiple
                    id="selectID"
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
                        <FormControlLabel control={<Switch name="IsExploring" checked={paramState.IsExploring} onChange={(event)=>paramDispatch({type:"SET_PARAM",name:"IsExploring",payload:event.target.checked})}/>} label={paramState.IsExploring ? 'on':'off'} />
                    </p>
                </FormGroup>
                <TextField
                required
                id="TransitTime"
                label="TransitTime"
                value={paramState.TransitTime}
                onChange={(event)=>paramDispatch({type:"SET_PARAM",name:"TransitTime",payload:event.target.value})}
                />

                <TextField
                required
                id="Inner_Rth"
                label="Inner_Rth"
                value={paramState.Inner_Rth}
                onChange={(event=>paramDispatch({type:"SET_PARAM",name:"Inner_Rth",payload:event.target.value}))}
                />
                <TextField
                required
                id="Mu"
                label="Mu"
                value={paramState.Mu}
                onChange={(event)=>paramDispatch({type:"SET_PARAM",name:"Mu",payload:event.target.value})}
                />
                <div>
                <TextField
                required
                id="Sigma"
                label="Sigma"
                value={paramState.Sigma}
                onChange={(event)=>paramDispatch({type:"SET_PARAM",name:"Sigma",payload:event.target.value})}
                />
                <TextField
                required
                id="Outer_Rth"
                label="Outer_Rth"
                value={paramState.Outer_Rth}
                onChange={(event)=>paramDispatch({type:"SET_PARAM",name:"Outer_Rth",payload:event.target.value})}
                />
                <TextField
                required
                id="Height"
                label="Height"
                value={paramState.Height}
                onChange={(event)=>paramDispatch({type:"SET_PARAM",name:"Height",payload:event.target.value})}
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
                value={paramState.BetweenMarkers}
                onChange={(event)=>paramDispatch({type:"SET_PARAM",name:"BetweenMarkers",payload:event.target.value})}
                />
                </div>
                <div>
                
                <Box sx={{ minWidth: 20 }}>
                <FormControl style={{ width: '150px' }}>
                 <InputLabel htmlFor="Reject">
                    Reject
                </InputLabel>
                <NativeSelect
                 value={paramState.Reject}
                  inputProps={{
                   name: 'Reject',
                   id: 'Reject',
                  }}
                onChange={(event) => {
                    paramDispatch({type:"SET_PARAM",name:"Reject",payload:event.target.value});
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
                value={paramState.ShutterSpeed}
                onChange={(event)=>paramDispatch({type:"SET_PARAM",name:"ShutterSpeed",payload:event.target.value})}
                />
                <TextField
                required
                id="Xcoord"
                label="Xcoord"
                value={paramState.Xcoord}
                onChange={(event)=>paramDispatch({type:"SET_PARAM",name:"Xcoord",payload:event.target.value})}
                />
                <TextField
                required
                id="Ycoord"
                label="Ycoord"
                value={paramState.Ycoord}
                onChange={(event)=>paramDispatch({type:"SET_PARAM",name:"Ycoord",payload:event.target.value})}
                />  
                </div>
                <FormGroup>
                <p>Height Correction
                    <FormControlLabel control={<Switch name="Height_Correction" checked={paramState.Height_Correction} onChange={(event)=>paramDispatch({type:"SET_PARAM",name:"Height_Correction",payload:event.target.checked})} />} label={paramState.Height_Correction ? 'on' : 'off'} />
                </p>  
                </FormGroup>

                <div>
                 <Button variant="contained" onClick={()=>{SendParam(paramState,frequency,selectedID)}} endIcon={<SendIcon />}>
                    Send
                </Button>
                </div>

                <Button variant="contained" onClick={()=>{param_preserve(paramState,frequency)}}>
                    param preserve
                </Button>
                {paramset.map((paramset,index) => (
                    <div key={index}>
                        <p>
                        {index}:IsExploring:{JSON.stringify(paramset.IsExploring)},TransitTime:{paramset.TransitTime},Mu:{paramset.Mu},Sigma:{paramset.Sigma},Outer_Rth:{paramset.Outer_Rth},Inner_Rth:{paramset.Inner_Rth},Reject:{paramset.Reject},MarkerFrequency:{paramset.MarkerColor},Xcoord:{paramset.Xcoord},Yccord:{paramset.Ycoord}
                        </p>
                    </div>
                ))}

                 <Autocomplete
                    multiple={false}
                    id="selectparam"
                    options={paramset}
                    disableCloseOnSelect
                    onChange={handleChangeparam}
                    getOptionLabel={(option) => JSON.stringify(option)}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                            />
                            <span>{paramset.indexOf(option)}</span>
                        </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                        <TextField {...params} label="paramset" />
                    )}
                />
                {/* {JSON.stringify(selectedparam)} */}
                <Button variant="contained" onClick={()=>{SendParam(selectedparam,true,selectedID)}} endIcon={<SendIcon />}>
                    Send paramset
                </Button>

                 {/* {frequency.MarkerFrequency_A} {frequency.MarkerFrequency_B}  */}
                 {/* {JSON.stringify(paramState)} */}
                 {/* {JSON.stringify(paramset)} */}
            </div>
        );
}
