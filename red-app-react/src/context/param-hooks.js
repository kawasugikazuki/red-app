import React,{createContext,useState, useContext,useReducer} from "react";
import {param} from "./param_data";

const ParamContext=createContext();
const paramReducer=(state,action)=>{
    switch(action.type){
        case "SET_PARAM":
            return{
                ...state,
                [action.name]:action.payload
            };
        default:
            throw state;
    }
};

export const ParamProvider=({children})=>{
    const [paramState,paramDispatch]=useReducer(paramReducer,param);
    const [paramset,setParamset]=useState([]);
    return(
        <ParamContext.Provider value={{paramState,paramDispatch,paramset,setParamset}}>
            {children}
        </ParamContext.Provider>
    );
};

export const useParam=()=> useContext(ParamContext);