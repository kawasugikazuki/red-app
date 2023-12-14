import React,{useState,useEffect} from "react";
import DigitalDateTime from "../components/DegitalDatetime";
import { getIP } from "../components/Get_brokerIP";
import { useMqtt } from "../context/mqtt-hooks";


export const Time=()=>{
        return (
            <div>
                <h1 style={{ color: "red", fontSize: "150px", textAlign: "center" }}>RED</h1>
                <DigitalDateTime />
            </div>
        );
    
}