import React,{useState,useEffect} from "react";
import {BsArrowUp,BsArrowCounterclockwise,BsPause,BsArrowClockwise,BsArrow90DegRight,BsArrow90DegLeft} from "react-icons/bs";
import Button from '@mui/material/Button';
import { udp } from "../components/UDP";
// import { get_Floorimage } from "../components/Get_Floorimage";
import Box  from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { get_redID } from "../components/Get_redID";

export const  Radicon=()=> {
    // const [FloorImage,setFloorImage]=useState({});
    // useEffect(()=>{
    //     const fetchFloorImage=async()=>{
    //         try{
    //             const result=await get_Floorimage();
    //             setFloorImage(result);
    //             // console.log(result);
    //         }catch(error){
    //             console.log(error);
    //         }
    //     };
    //     fetchFloorImage();
    // },[FloorImage]);
    // const value = Object.values(FloorImage);
    // const imageSrc = `data:image/png;base64,${value}`;
    const [radiconIP,setRadiconIP]=useState("255.255.255.255");
    const handleChange = (event) => {
        setRadiconIP(event.target.value);
    };

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
                {/* <img src={imageSrc} alt="FloorImage" /> */}
                <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("Left",50000,radiconIP)}><BsArrow90DegLeft/></Button>
                <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("Forward",50000,radiconIP)}><BsArrowUp /></Button>
                <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("Right",50000,radiconIP)}><BsArrow90DegRight/> </Button>
                <div >
                    <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("PivotLeft",50000,radiconIP)}><BsArrowCounterclockwise /></Button>
                    <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("Stop",50000,radiconIP)}><BsPause/></Button>
                    <Button variant="contained" sx={{fontSize: '6rem', padding: '16px 24px'}} onClick={()=>udp("PivotRight",50000,radiconIP)}><BsArrowClockwise /></Button>
                </div>
            </div>
        );
    
}

