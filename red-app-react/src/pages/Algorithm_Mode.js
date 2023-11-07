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
import { ShowGroup } from "../components/ShowGroup";




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
        if (value !== null) {
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

    // const paramA={
    //     IsExploring: true,
    //     TransitTime: 0.2,
    //     Mu:0.4,
    //     Sigma: 1.0,
    //     Outer_Rth: 0.4,
    //     Inner_Rth: 0.0,
    //     Height: 2.2,
    //     BetweenMarkers: 0.5,
    //     Height_Correction: false,
    //     Reject: "D",
    //     MarkerColor: "7_5",
    //     ShutterSpeed: 10000,
    //     Xcoord: -1.5,
    //     Ycoord: -1.8,
    //     LeftPWM: 0.0,
    //     RightPWM: 0.0,
    // };
    // const frequencyA={
    //     MarkerFrequency_A: 7,
    //     MarkerFrequency_B: 5,
    // };
    // const selectedIDA=[
    //     "192.168.1.224",
    //     "192.168.1.216",
    //     "192.168.1.203",
    //     "192.168.1.187",
    //     "192.168.1.236",
    //     "192.168.1.246",
    //     "192.168.1.215",
    //     "192.168.1.198",
    //     "192.168.1.213",
    //     "192.168.1.237",
    //     "192.168.1.214",
    //     "192.168.1.244",
    //     "192.168.1.195",
    //     "192.168.1.219",
    //     "192.168.1.196",
    //     "192.168.1.192",
    //     "192.168.1.245",
    //     "192.168.1.218"
    // ];

    // const paramA2={
    //     IsExploring: true,
    //     TransitTime: 0.2,
    //     Mu:0.4,
    //     Sigma: 1.0,
    //     Outer_Rth: 0.4,
    //     Inner_Rth: 0.0,
    //     Height: 2.2,
    //     BetweenMarkers: 0.5,
    //     Height_Correction: false,
    //     Reject: "D",
    //     MarkerColor: "7_5",
    //     ShutterSpeed: 10000,
    //     Xcoord: 3.7,
    //     Ycoord: -0.5,
    //     LeftPWM: 0.0,
    //     RightPWM: 0.0,
    // };
    // const frequencyA2={
    //     MarkerFrequency_A: 7,
    //     MarkerFrequency_B: 5,
    // };
    // const selectedIDA2=[
    //     "192.168.1.224",
    //     "192.168.1.216",
    //     "192.168.1.203",
    //     "192.168.1.187",
    //     "192.168.1.236",
    //     "192.168.1.246",
    //     "192.168.1.215",
    //     "192.168.1.198",
    //     "192.168.1.213",
    //     "192.168.1.237",
    //     "192.168.1.214",
    //     "192.168.1.244",
    //     "192.168.1.195",
    //     "192.168.1.219",
    //     "192.168.1.196",
    //     "192.168.1.192",
    //     "192.168.1.245",
    //     "192.168.1.218"
    // ];

    // const paramB={
    //     IsExploring: true,
    //     TransitTime: 0.2,
    //     Mu:0.1,
    //     Sigma: 1.0,
    //     Outer_Rth: 0.3,
    //     Inner_Rth: 0.0,
    //     Height: 2.2,
    //     BetweenMarkers: 0.5,
    //     Height_Correction: true,
    //     Reject: "D",
    //     MarkerColor: "11",
    //     ShutterSpeed: 10000,
    //     Xcoord: 0,
    //     Ycoord: 0,
    //     LeftPWM: 0.0,
    //     RightPWM: 0.0,
    // };
    // const frequencyB={
    //     MarkerFrequency_A: 11,
    //     MarkerFrequency_B: 0,
    // };
    // const selectedIDB=[
    //     "192.168.1.195",
    //     "192.168.1.201",
    //     "192.168.1.202",
    //     "192.168.1.197",
    //     "192.168.1.208",
    //     "192.168.1.192",
    //     "192.168.1.207",
    //     "192.168.1.236",
    //     "192.168.1.238",
    //     "192.168.1.196",
    //     "192.168.1.237",

    // ];
    const bigmoveselectedIDA=[
        "192.168.1.218",
        "192.168.1.216",
        "192.168.1.206",
        "192.168.1.195",
        "192.168.1.237",
        "192.168.1.205",
        "192.168.1.219",
        "192.168.1.238",
        "192.168.1.246",

    ];
    const bigmoveselectedIDB=[
        "192.168.1.224",
        "192.168.1.197",
        "192.168.1.200",
        "192.168.1.210",
        "192.168.1.207",
        "192.168.1.202",
        "192.168.1.192",
        "192.168.1.244",
    ];
    const bigmoveselectedIDC=[
        "192.168.1.201",
        "192.168.1.208",
        "192.168.1.245",
        "192.168.1.203",
        "192.168.1.204",
        "192.168.1.214",
        "192.168.1.221",
        "192.168.1.213",
        "192.168.1.198",
    ];


    const bigmoveparam1 ={
        IsExploring: true,
        TransitTime: 0.2,
        Mu:0.3,
        Sigma: 0.1,
        Outer_Rth: 1,
        Inner_Rth: 0.0,
        Height: 2.2,
        BetweenMarkers: 0.5,
        Height_Correction: true,
        Reject: "D",
        MarkerColor: "",
        ShutterSpeed: 100,
        Xcoord: 0,
        Ycoord: -1.25,
        LeftPWM: 0.0,
        RightPWM: 0.0,
    };
    const bigmovefrequency1={
        MarkerFrequency_A: 5,
        MarkerFrequency_B: 11,
    };


    const bigmoveparam2 ={
        IsExploring: true,
        TransitTime: 1,
        Mu:0.3,
        Sigma: 0.1,
        Outer_Rth: 1,
        Inner_Rth: 0.0,
        Height: 2.2,
        BetweenMarkers: 0.5,
        Height_Correction: true,
        Reject: "D",
        MarkerColor: "",
        ShutterSpeed: 100,
        Xcoord: 10.25,
        Ycoord: -1.25,
        LeftPWM: 0.0,
        RightPWM: 0.0,
    };
    const bigmovefrequency2={
        MarkerFrequency_A: 5,
        MarkerFrequency_B: 11,
    };


    const bigmoveparam3 ={
        IsExploring: true,
        TransitTime: 0.2,
        Mu:0.3,
        Sigma: 0.1,
        Outer_Rth: 1,
        Inner_Rth: 0,
        Height: 2.2,
        BetweenMarkers: 0.5,
        Height_Correction: true,
        Reject: "D",
        MarkerColor: "",
        ShutterSpeed: 10000,
        Xcoord: 2.5,
        Ycoord: -1.25,
        LeftPWM: 0.0,
        RightPWM: 0.0,
    };
    const bigmovefrequency3={
        MarkerFrequency_A: 7,
        MarkerFrequency_B: 5,
    };

    const bigmoveparam4 ={
        IsExploring: true,
        TransitTime: 0.2,
        Mu:0,
        Sigma: 0.1,
        Outer_Rth: 0.2,
        Inner_Rth: 0,
        Height: 2.2,
        BetweenMarkers: 0.5,
        Height_Correction: true,
        Reject: "D",
        MarkerColor: "",
        ShutterSpeed: 10000,
        Xcoord: 4,
        Ycoord: 0,
        LeftPWM: 0.0,
        RightPWM: 0.0,
    };
    const bigmovefrequency4={
        MarkerFrequency_A: 11,
        MarkerFrequency_B: 7,
    };

    const bigmoveparam5 ={
        IsExploring: true,
        TransitTime: 0.2,
        Mu:0,
        Sigma: 0.1,
        Outer_Rth: 0.2,
        Inner_Rth: 0,
        Height: 2.2,
        BetweenMarkers: 0.5,
        Height_Correction: true,
        Reject: "D",
        MarkerColor: "",
        ShutterSpeed: 10000,
        Xcoord: 0,
        Ycoord: 0,
        LeftPWM: 0.0,
        RightPWM: 0.0,
    };
    const bigmovefrequency5={
        MarkerFrequency_A: 13,
        MarkerFrequency_B: 0,
    };

    const bigmoveparam6 ={
        IsExploring: true,
        TransitTime: 0.2,
        Mu:0.3,
        Sigma: 0.1,
        Outer_Rth: 1,
        Inner_Rth: 0,
        Height: 2.2,
        BetweenMarkers: 0.5,
        Height_Correction: true,
        Reject: "D",
        MarkerColor: "",
        ShutterSpeed: 10000,
        Xcoord: 4,
        Ycoord: -0.9,
        LeftPWM: 0.0,
        RightPWM: 0.0,
    };
    const bigmovefrequency6={
        MarkerFrequency_A: 9,
        MarkerFrequency_B: 13,
    };

    const bigmoveparam7 ={
        IsExploring: true,
        TransitTime: 0.2,
        Mu:0.25,
        Sigma: 0.2,
        Outer_Rth: 0.5,
        Inner_Rth: 0,
        Height: 2.2,
        BetweenMarkers: 0.5,
        Height_Correction: true,
        Reject: "D",
        MarkerColor: "",
        ShutterSpeed: 10000,
        Xcoord: 3.5,
        Ycoord: 0,
        LeftPWM: 0.0,
        RightPWM: 0.0,
    };
    const bigmovefrequency789={
        MarkerFrequency_A: 5,
        MarkerFrequency_B: 9,
    };

    const bigmoveparam8 ={
        IsExploring: true,
        TransitTime: 0.2,
        Mu:0.25,
        Sigma: 0.2,
        Outer_Rth: 0.5,
        Inner_Rth: 0,
        Height: 2.2,
        BetweenMarkers: 0.5,
        Height_Correction: true,
        Reject: "D",
        MarkerColor: "",
        ShutterSpeed: 10000,
        Xcoord: 3,
        Ycoord: 0.5,
        LeftPWM: 0.0,
        RightPWM: 0.0,
    };
    const bigmoveparam9 ={
        IsExploring: true,
        TransitTime: 0.2,
        Mu:0.25,
        Sigma: 0.2,
        Outer_Rth: 0.5,
        Inner_Rth: 0,
        Height: 2.2,
        BetweenMarkers: 0.5,
        Height_Correction: true,
        Reject: "D",
        MarkerColor: "",
        ShutterSpeed: 10000,
        Xcoord: 3,
        Ycoord: -0.5,
        LeftPWM: 0.0,
        RightPWM: 0.0,
    };

    const selectedIDD=[
        "192.168.1.245",
        "192.168.1.197",
        "192.168.1.195",
        "192.168.1.216",
        "192.168.1.214",
    ];
    const selectedIDE=[
        "",
    ];
    const  selectedIDF=[
        "",
    ];

    const demoparam1 ={
        IsExploring: true,
        TransitTime: 0.1,
        Mu:0,
        Sigma: 0.1,
        Outer_Rth: 0.1,
        Inner_Rth: 0.0,
        Height: 2.2,
        BetweenMarkers: 0.5,
        Height_Correction: true,
        Reject: "D",
        MarkerColor: "5_9",
        ShutterSpeed: 10000,
        Xcoord: 1,
        Ycoord: 1.8,
        LeftPWM: 0.0,
        RightPWM: 0.0,
    };
    const demofrequency1={
        MarkerFrequency_A: 5,
        MarkerFrequency_B: 9,
    };

    const demoparam2 ={
        IsExploring: true,
        TransitTime: 0.1,
        Mu:0,
        Sigma: 0.1,
        Outer_Rth: 0.1,
        Inner_Rth: 0.0,
        Height: 2.2,
        BetweenMarkers: 0.5,
        Height_Correction: true,
        Reject: "D",
        MarkerColor: "5_9",
        ShutterSpeed: 10000,
        Xcoord: 3,
        Ycoord: 0,
        LeftPWM: 0.0,
        RightPWM: 0.0,
    };

    const demofrequency2={
        MarkerFrequency_A: 5,
        MarkerFrequency_B: 9,
    };

    const demoparam3 ={
        IsExploring: true,
        TransitTime: 0.1,
        Mu:0,
        Sigma: 0.1,
        Outer_Rth: 0.1,
        Inner_Rth: 0.0,
        Height: 2.2,
        BetweenMarkers: 0.5,
        Height_Correction: true,
        Reject: "D",
        MarkerColor: "5_9",
        ShutterSpeed: 10000,
        Xcoord: -0.43,
        Ycoord: -2.85,
        LeftPWM: 0.0,
        RightPWM: 0.0,
    };

    const demofrequency3={
        MarkerFrequency_A: 5,
        MarkerFrequency_B: 9,
    };

    const demoparam4 ={
        IsExploring: true,
        TransitTime: 0.1,
        Mu:0,
        Sigma: 0.1,
        Outer_Rth: 0.1,
        Inner_Rth: 0.0,
        Height: 2.2,
        BetweenMarkers: 0.5,
        Height_Correction: true,
        Reject: "D",
        MarkerColor: "5_11",
        ShutterSpeed: 10000,
        Xcoord: -0.88,
        Ycoord: -2.2,
        LeftPWM: 0.0,
        RightPWM: 0.0,
    };

    const demofrequency4={
        MarkerFrequency_A: 5,
        MarkerFrequency_B: 11,
    };










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
                 {/* {JSON.stringify(param)} */}
                {/* <ShowGroup group="A" param={paramA} frequency={frequencyA} ID={selectedIDA}/>
                <Button variant="contained" onClick={()=>{SendParam(paramA,frequencyA,selectedIDA)}} endIcon={<SendIcon />}>
                    Send A
                </Button>
                <ShowGroup group="A2" param={paramA2} frequency={frequencyA2} ID={selectedIDB}/>
                <Button variant="contained" onClick={()=>{SendParam(paramA2,frequencyA2,selectedIDA2)}} endIcon={<SendIcon />}>
                    Send A2
                </Button>
                <ShowGroup group="B" param={paramB} frequency={frequencyB} ID={selectedIDB}/>
                <Button variant="contained" onClick={()=>{SendParam(paramB,frequencyB,selectedIDB)}} endIcon={<SendIcon />}>
                    Send B
                </Button> */}
                <h2>大移動用</h2>
                <ShowGroup group="A" param={bigmoveparam2} frequency={bigmovefrequency2} ID={bigmoveselectedIDA}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam2,bigmovefrequency2,bigmoveselectedIDA)}} endIcon={<SendIcon />}>
                    Aを2に(大移動)
                </Button>
                <ShowGroup group="A" param={bigmoveparam3} frequency={bigmovefrequency3} ID={bigmoveselectedIDA}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam3,bigmovefrequency3,bigmoveselectedIDA)}} endIcon={<SendIcon />}>
                    Aを3に(大移動)
                </Button>
                <ShowGroup group="A" param={bigmoveparam4} frequency={bigmovefrequency4} ID={bigmoveselectedIDA}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam4,bigmovefrequency4,bigmoveselectedIDA)}} endIcon={<SendIcon />}>
                    Aを4に(大移動)
                </Button>
                <ShowGroup group="A" param={bigmoveparam5} frequency={bigmovefrequency5} ID={bigmoveselectedIDA}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam5,bigmovefrequency5,bigmoveselectedIDA)}} endIcon={<SendIcon />}>
                    Aを5に(大移動)
                </Button>
                <ShowGroup group="A" param={bigmoveparam6} frequency={bigmovefrequency6} ID={bigmoveselectedIDA}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam6,bigmovefrequency6,bigmoveselectedIDA)}} endIcon={<SendIcon />}>
                    Aを6に(大移動)
                </Button>
                <ShowGroup group="A" param={bigmoveparam7} frequency={bigmovefrequency789} ID={bigmoveselectedIDA}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam7,bigmovefrequency789,bigmoveselectedIDA)}} endIcon={<SendIcon />}>
                    Aを7に(大移動)
                </Button>

                <ShowGroup group="B" param={bigmoveparam1} frequency={bigmovefrequency1} ID={bigmoveselectedIDB}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam1,bigmovefrequency1,bigmoveselectedIDB)}} endIcon={<SendIcon />}>
                    Bを1に(大移動)
                </Button>

                <ShowGroup group="B" param={bigmoveparam2} frequency={bigmovefrequency2} ID={bigmoveselectedIDB}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam2,bigmovefrequency2,bigmoveselectedIDB)}} endIcon={<SendIcon />}>
                    Bを2に(大移動)
                </Button>
                <ShowGroup group="B" param={bigmoveparam3} frequency={bigmovefrequency3} ID={bigmoveselectedIDB}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam3,bigmovefrequency3,bigmoveselectedIDB)}} endIcon={<SendIcon />}>
                    Bを3に(大移動)
                </Button>
                <ShowGroup group="B" param={bigmoveparam4} frequency={bigmovefrequency4} ID={bigmoveselectedIDB}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam4,bigmovefrequency4,bigmoveselectedIDB)}} endIcon={<SendIcon />}>
                    Bを4に(大移動)
                </Button>
                <ShowGroup group="B" param={bigmoveparam5} frequency={bigmovefrequency5} ID={bigmoveselectedIDB}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam5,bigmovefrequency5,bigmoveselectedIDB)}} endIcon={<SendIcon />}>
                    Bを5に(大移動)
                </Button>
                <ShowGroup group="B" param={bigmoveparam6} frequency={bigmovefrequency6} ID={bigmoveselectedIDB}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam6,bigmovefrequency6,bigmoveselectedIDB)}} endIcon={<SendIcon />}>
                    Bを6に(大移動)
                </Button>
                <ShowGroup group="B" param={bigmoveparam8} frequency={bigmovefrequency789} ID={bigmoveselectedIDB}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam8,bigmovefrequency789,bigmoveselectedIDB)}} endIcon={<SendIcon />}>
                    Bを8に(大移動)
                </Button>

                <ShowGroup group="C" param={bigmoveparam1} frequency={bigmovefrequency1} ID={bigmoveselectedIDB}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam1,bigmovefrequency1,bigmoveselectedIDB)}} endIcon={<SendIcon />}>
                    Cを1に(大移動)
                </Button>

                <ShowGroup group="C" param={bigmoveparam2} frequency={bigmovefrequency2} ID={bigmoveselectedIDC}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam2,bigmovefrequency2,bigmoveselectedIDC)}} endIcon={<SendIcon />}>
                    Cを2に(大移動)
                </Button>
                <ShowGroup group="C" param={bigmoveparam3} frequency={bigmovefrequency3} ID={bigmoveselectedIDC}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam3,bigmovefrequency3,bigmoveselectedIDC)}} endIcon={<SendIcon />}>
                    Cを3に(大移動)
                </Button>
                <ShowGroup group="C" param={bigmoveparam4} frequency={bigmovefrequency4} ID={bigmoveselectedIDC}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam4,bigmovefrequency4,bigmoveselectedIDC)}} endIcon={<SendIcon />}>
                    Cを4に(大移動)
                </Button>
                <ShowGroup group="C" param={bigmoveparam5} frequency={bigmovefrequency5} ID={bigmoveselectedIDC}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam5,bigmovefrequency5,bigmoveselectedIDC)}} endIcon={<SendIcon />}>
                    Cを5に(大移動)
                </Button>
                <ShowGroup group="C" param={bigmoveparam6} frequency={bigmovefrequency6} ID={bigmoveselectedIDC}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam6,bigmovefrequency6,bigmoveselectedIDC)}} endIcon={<SendIcon />}>
                    Cを6に(大移動)
                </Button>
                <ShowGroup group="C" param={bigmoveparam9} frequency={bigmovefrequency789} ID={bigmoveselectedIDC}/>
                <Button variant="contained" onClick={()=>{SendParam(bigmoveparam9,bigmovefrequency789,bigmoveselectedIDC)}} endIcon={<SendIcon />}>
                    Cを9に(大移動)
                </Button>
                <h2>デモ用</h2>

                <ShowGroup group="D" param={demoparam1} frequency={demofrequency1} ID={selectedIDD}/>
                <Button variant="contained" onClick={()=>{SendParam(demoparam1,demofrequency1,selectedIDD)}} endIcon={<SendIcon />}>
                    Dを1に(デモ)
                </Button>
                <ShowGroup group="D" param={demoparam2} frequency={demofrequency2} ID={selectedIDD}/>
                <Button variant="contained" onClick={()=>{SendParam(demoparam2,demofrequency2,selectedIDD)}} endIcon={<SendIcon />}>
                    Dを2に(デモ)
                </Button>
                <ShowGroup group="D" param={demoparam3} frequency={demofrequency3} ID={selectedIDD}/>
                <Button variant="contained" onClick={()=>{SendParam(demoparam3,demofrequency3,selectedIDD)}} endIcon={<SendIcon />}>
                    Dを3に(デモ)
                </Button>
                <ShowGroup group="D" param={demoparam4} frequency={demofrequency4} ID={selectedIDD}/>
                <Button variant="contained" onClick={()=>{SendParam(demoparam4,demofrequency4,selectedIDD)}} endIcon={<SendIcon />}>
                    Dを3に停止(デモ)
                </Button>

                <ShowGroup group="E" param={demoparam1} frequency={demofrequency1} ID={selectedIDE}/>
                <Button variant="contained" onClick={()=>{SendParam(demoparam1,demofrequency1,selectedIDE)}} endIcon={<SendIcon />}>
                    Eを1に(デモ)
                </Button>
                <ShowGroup group="E" param={demoparam2} frequency={demofrequency2} ID={selectedIDE}/>
                <Button variant="contained" onClick={()=>{SendParam(demoparam2,demofrequency2,selectedIDE)}} endIcon={<SendIcon />}>
                    Eを2に(デモ)
                </Button>
                <ShowGroup group="E" param={demoparam3} frequency={demofrequency3} ID={selectedIDE}/>
                <Button variant="contained" onClick={()=>{SendParam(demoparam3,demofrequency3,selectedIDE)}} endIcon={<SendIcon />}>
                    Eを3に(デモ)
                </Button>
                <ShowGroup group="E" param={demoparam4} frequency={demofrequency4} ID={selectedIDE}/>
                <Button variant="contained" onClick={()=>{SendParam(demoparam4,demofrequency4,selectedIDE)}} endIcon={<SendIcon />}>
                    Eを3に停止(デモ)
                </Button>

                <ShowGroup group="F" param={demoparam1} frequency={demofrequency1} ID={selectedIDF}/>
                <Button variant="contained" onClick={()=>{SendParam(demoparam1,demofrequency1,selectedIDF)}} endIcon={<SendIcon />}>
                    Fを1に(デモ)
                </Button>
                <ShowGroup group="F" param={demoparam2} frequency={demofrequency2} ID={selectedIDF}/>
                <Button variant="contained" onClick={()=>{SendParam(demoparam2,demofrequency2,selectedIDF)}} endIcon={<SendIcon />}>
                    Fを2に(デモ)
                </Button>
                <ShowGroup group="F" param={demoparam3} frequency={demofrequency3} ID={selectedIDF}/>
                <Button variant="contained" onClick={()=>{SendParam(demoparam3,demofrequency3,selectedIDF)}} endIcon={<SendIcon />}>
                    Fを3に(デモ)
                </Button>
                <ShowGroup group="F" param={demoparam4} frequency={demofrequency4} ID={selectedIDF}/>
                <Button variant="contained" onClick={()=>{SendParam(demoparam4,demofrequency4,selectedIDF)}} endIcon={<SendIcon />}>
                    Fを3に停止(デモ)
                </Button>





            </div>
        );
}
