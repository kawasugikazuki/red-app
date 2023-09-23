import React,{useState,useEffect} from "react";
import {StartExplore} from "../components/StartExplore";
import {BrokerIP} from "../components/BrokerIP";
import { Shutdown } from "../components/shutdown";
import { Restart } from "../components/Restart";
import { getIP } from "../components/Get_brokerIP";
import { Button } from "@mui/material";


export const Group=()=>{
  const [IP,setIP]=useState("");
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response=await getIP();
                setIP(response);
            }catch(error){
                console.log(error);
            }
        };
        fetchData();
    },[]);
     
        return(
            <div>
                <h1>**Swarm System Operation and Management**</h1>
                <h2>Server's IP address :{IP}</h2>
                <Button variant="outlined" onClick={()=>{BrokerIP(IP)}}>BrokerIP</Button>
                <Button variant="outlined" onClick={StartExplore}>Start Explore</Button>
                <Button variant="outlined" onClick={Shutdown}>Shutdown</Button>
                <Button variant="outlined" onClick={Restart}>Restart</Button>
            </div>
        );
    
}
