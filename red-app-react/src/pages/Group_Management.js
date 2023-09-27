import React,{useState,useEffect} from "react";
import {StartExplore} from "../components/StartExplore";
import {BrokerIP} from "../components/BrokerIP";
import { Shutdown } from "../components/shutdown";
import { Restart } from "../components/Restart";
import { getIP } from "../components/Get_brokerIP";
import { Button } from "@mui/material";
import { get_redID } from "../components/Get_redID";


export const Group=()=>{
  const [IP,setIP]=useState("");
    useEffect(()=>{
        const fetchIP=async()=>{
            try{
                const IP=await getIP();
                setIP(IP);
            }catch(error){
                console.log(error);
            }
        };
        fetchIP();
    },[]);

    const [ID,setID]=useState([]);
    useEffect(()=>{
        const fetchID=async()=>{
            try{
                const result=await get_redID();
                setID(result);
            }catch(error){
                console.log(error);
            }
        };
        fetchID();
    },[ID]);


        return(
            <div>
                <h1>**Swarm System Operation and Management**</h1>
                <h2>Server's IP address :{IP}</h2>
                <ul>{ID.map((item,index)=>(<li key={index}>{item}</li>))}</ul>
        
                <Button variant="outlined" onClick={()=>{BrokerIP(IP)}}>BrokerIP</Button>
                <Button variant="outlined" onClick={StartExplore}>Start Explore</Button>
                <Button variant="outlined" onClick={Shutdown}>Shutdown</Button>
                <Button variant="outlined" onClick={Restart}>Restart</Button>
            </div>
        );
    
}
