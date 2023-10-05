import React,{useState,useEffect} from "react";
import { getIP } from "../components/Get_brokerIP";
import { Button } from "@mui/material";
import { get_redID } from "../components/Get_redID";
import { get_robotstatus } from "../components/Get_RobotStatus";
import { udp } from "../components/UDP";
import { get_devicedata } from "../components/Get_DeviceData";


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

    const [Status,setStatus]=useState({});

    useEffect(()=>{
        const fetchStatus=async()=>{
            try{
                const result= await get_robotstatus();
                setStatus(result);
            }catch(error){
                console.log(error);
            }
        };
        fetchStatus();
    },[Status]);
    const StatusArray=Object.values(Status);

    const [DeviceData,setDeviceData]=useState({});
    useEffect(()=>{
        const fetchDeviceData=async()=>{
            try{
                const result=await get_devicedata();
                setDeviceData(result);
            }catch(error){
                console.log(error);
            }
        };
        fetchDeviceData();
    },[DeviceData]);
    const DeviceDataArray=Object.values(DeviceData);

        return(
            <div>
                <h1>**Swarm System Operation and Management**</h1>
                <h2>Server's IP address :{IP}</h2>
                <ul>{ID.map((item,index)=>(<li key={index}>{item}</li>))}</ul>
                <ul>{StatusArray.map((item,index)=>(<li key={index}>{item}</li>))}</ul>
                <ul>{DeviceDataArray.map((item,index)=>(<li key={index}>{item}</li>))}</ul>

                
        
                <Button variant="outlined" onClick={()=>{udp("BrokerIP_is_"+IP+"_Exploration_Tag",50003)}}>BrokerIP</Button>
                <Button variant="outlined" onClick={()=>{udp("StartExplore",50000)}}>Start Explore</Button>
                <Button variant="outlined" onClick={()=>{udp("Shutdown",50002)}}>Shutdown</Button>
                <Button variant="outlined" onClick={()=>{udp("Restart",50001)}}>Restart</Button>
            </div>
        );
    
}
