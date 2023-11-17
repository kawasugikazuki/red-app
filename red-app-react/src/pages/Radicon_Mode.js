import React,{useState,useEffect} from "react";
import {BsArrowUp,BsArrowCounterclockwise,BsPause,BsArrowClockwise,BsArrow90DegRight,BsArrow90DegLeft} from "react-icons/bs";
import Button from '@mui/material/Button';
import { udp } from "../components/UDP";
import { get_Floorimage } from "../components/Get_Floorimage";
import {get_Ceilimage} from "../components/Get_Ceilimage";
import Box  from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { get_redID } from "../components/Get_redID";
import { get_reddata } from "../components/Get_reddata";

export const  Radicon=()=> {
    const [reddata,setReddata]=useState({});
    useEffect(()=>{
        const fetchreddata=async()=>{
            try{
                const result=await get_reddata();
                setReddata(result);
                // console.log(result);
            }catch(error){
                console.log(error);
            }
        };
        fetchreddata();
    },[reddata]);
    const [radiconIP,setRadiconIP]=useState("255.255.255.255"); 
    const handleChange = (event) => {
        setRadiconIP(event.target.value);
    };
    const Floor_dict=reddata[radiconIP]?.FloorImage;
    const valueFloor =Floor_dict? Object.values(Floor_dict):[];
    const imageSrc = `data:image/png;base64,${valueFloor}`;

    const Ceil_dict=reddata[radiconIP]?.CeilImage;
    const valueCeil =Ceil_dict? Object.values(Ceil_dict):[];
    const imageSrcCeil = `data:image/png;base64,${valueCeil}`;

    


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

        return(
            <div>
                <h1>**Radicon Control Mode**</h1>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">ID</InputLabel>
                    <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={radiconIP}
                     label="radiconIP"
                     onChange={handleChange}
                    >
                        <MenuItem value={"255.255.255.255"}>{"ALL"} </MenuItem>
                     {ID.map((value)=>(<MenuItem key={value} value={value}>{value}</MenuItem>))}
                    </Select>
                </FormControl>
            </Box>
               
                <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("Left",50000,radiconIP)}><BsArrow90DegLeft/></Button>
                <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("Forward",50000,radiconIP)}><BsArrowUp /></Button>
                <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("Right",50000,radiconIP)}><BsArrow90DegRight/> </Button>
                <div >
                    <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("PivotLeft",50000,radiconIP)}><BsArrowCounterclockwise /></Button>
                    <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("Stop",50000,radiconIP)}><BsPause/></Button>
                    <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("PivotRight",50000,radiconIP)}><BsArrowClockwise /></Button>
                </div> 
                
                <img src={imageSrc} alt="FloorImage" />
                <img src={imageSrcCeil} alt="CeilImage" />
            </div>
        );
    
}

