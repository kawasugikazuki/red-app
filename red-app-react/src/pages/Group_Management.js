import React,{useState,useEffect} from "react";
import { getIP } from "../components/Get_brokerIP";
import { Button } from "@mui/material";
import { get_redID } from "../components/Get_redID";
import { udp } from "../components/UDP";
import { get_reddata } from "../components/Get_reddata";



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
                // console.log(result);
            }catch(error){
                console.log(error);
            }
        };
        fetchID();
    },[ID]);

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

        return(
            <div>
                <h1>**Swarm System Operation and Management**</h1>
                <h2>Server's IP address :{IP}</h2>
                <ul>{ID.map((item,index)=>(<li key={index}>{item}</li>))}</ul>
                <ul>
                    {Object.keys(reddata).map((key) => (
                    <li key={key}>
                        <strong>{key}:</strong> {JSON.stringify(reddata[key])}
                        </li>
                    ))}
                </ul>
        
                <Button variant="outlined" onClick={()=>{udp("BrokerIP_is_"+IP+"_Exploration_Tag",50003)}}>BrokerIP</Button>
                <Button variant="outlined" onClick={()=>{udp("StartExplore",50000)}}>Start Explore</Button>
                <Button variant="outlined" onClick={()=>{udp("Shutdown",50002)}}>Shutdown</Button>
                <Button variant="outlined" onClick={()=>{udp("Restart",50001)}}>Restart</Button>
            </div>
        );
    
}
