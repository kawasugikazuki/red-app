import React,{createContext,useState, useContext,useReducer} from "react";
import {param} from "./fruit-data";

const FruitContext=createContext();
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

export const FruitProvider=({children})=>{
    const [paramState,paramDispatch]=useReducer(paramReducer,param);
    const [paramver,setParamver]=useState(param);
    const [fruits,setFruits]=useState(["apple", "banana", "orange", "grape", "mango"]);
    const addFruit=(newfruit)=> setFruits([...fruits,newfruit]);
    const removeFruit=(fruitToRemove)=> setFruits(fruits.filter(fruit=> fruit!==fruitToRemove));
    return(
        <FruitContext.Provider value={{paramState,paramDispatch,removeFruit}}>
            {children}
        </FruitContext.Provider>
    );
};

export const useFruits=()=> useContext(FruitContext);