import React,{createContext,useState, useContext,useReducer} from "react";

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
const param = {
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
    RightPWM: 0.0
};


export const ParamProvider=({children})=>{
    const [paramState,paramDispatch]=useReducer(paramReducer,param);
    const [paramset,setParamset]=useState([]);
    const [frequency,setFrequency]=useState(
        {
            MarkerFrequency_A: 0,
            MarkerFrequency_B: 0,
        }
    );
    return(
        <ParamContext.Provider value={{paramState,paramDispatch,paramset,setParamset,frequency,setFrequency}}>
            {children}
        </ParamContext.Provider>
    );
};

export const useParam=()=> useContext(ParamContext);