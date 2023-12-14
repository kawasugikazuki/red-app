import React,{createContext, useContext, useReducer,useEffect} from "react";
import mqtt from "mqtt";

const MqttContext=createContext();

const initialState={
    reddata:{},
    connectStatus: 'Disconnected',
    client:null,
    allIP:[],
    nowIP:[],
};

const mqttReducer=(state,action)=>{
    switch(action.type){
        case "CONNECTED":
            return{
                ...state,
                connectStatus:"connected",
            };
        case "DISCONNECTED":
            return{
                ...state,
                connectStatus:"disconnected",
                client:null,
            };
        case "ERROR":
            console.log("接続エラー",action.payload.error);
            //存在してたら終了
            state.client && state.client.end();
            return{
                ...state,
                connectStatus:"Disconnected",
            };
        case "RECONNECTING":
            console.log("再接続中");
            return{
                ...state,
                connectStatus:"reconnecting",
            };
        case "MESSAGE":
            const {topic,message}=action.payload;
            const IP=topic.split('/')[1];
            const dataname=topic.split('/')[2];
            let newData={};


            //topicがRed/Statusの場合
            if(IP==="Status"){
                return{
                    ...state,
                    //全てのreddata[IP].paramを更新
                    reddata:Object.keys(state.reddata).reduce((acc,IP)=>{
                        return{
                            ...acc,
                            [IP]:{...state.reddata[IP],param:JSON.parse(message.toString())},
                        };
                    },{}),
                };
            }else{

                if(dataname==="connect"){
                    return{
                        ...state,
                        allIP:state.allIP.includes(IP)?state.allIP:[...state.allIP,IP],
                        nowIP:state.nowIP.includes(IP)?state.nowIP:[...state.nowIP,IP],
                        reddata:{...state.reddata,[IP]:{}},
                    };
                }
                if(dataname==="disconnect"){
                    return{
                        ...state,
                        nowIP:state.nowIP.filter((value)=>value!==IP),
                    };
                }else{

                try {
                    newData=JSON.parse(message.toString());
                }catch(error){
                    console.log(message.toString());
                    console.log("JSON解析エラー");
                    return state;
                }
                const updatedData={
                    ...state.reddata[IP],
                    [dataname]:newData,
                };
                return{
                    ...state,
                    reddata:{...state.reddata,[IP]:updatedData}
                };

                }

            }
        default:
            throw state;
    }
};


export const MqttProvider=({children})=>{
    const  [mqttstate,mqttDispatch]=useReducer(mqttReducer,initialState);
    const mqttConnect=(serverIP)=>{
        if (mqttstate.client && mqttstate.client.connected){
            return;
        }
        const mqttOption={clientId:"webapp"}

        const client=mqtt.connect(`ws://${serverIP}:3000`,mqttOption);
            
            client.on('connect', () => {
                mqttDispatch({ type: 'CONNECTED'});
                client.subscribe('RED/+/connect',{qos:1});
                client.subscribe('RED/+/disconnect',{qos:1});
                client.subscribe('RED/+/RobotStatus',{qos:1});
                client.subscribe('RED/+/DeviceData',{qos:1});
                client.subscribe('RED/+/Obstacle',{qos:1});
                client.subscribe('+/Status');
                client.subscribe('RED/+/Param');
                client.subscribe('RED/+/CeilImage',{qos:1});
                client.subscribe('RED/+/FloorImage',{qos:1});
            });
            client.on('error', error => {
                mqttDispatch({ type: 'ERROR', payload: { error } });
                client.end();
                mqttDispatch({ type: 'DISCONNECTED' });
            });
            client.on('reconnecting', () => {
                mqttDispatch({ type: 'RECONNECTING' });
            });
            client.on('message', (topic, message) => {
                mqttDispatch({ type: 'MESSAGE', payload: { topic, message } });
            });
    };

        useEffect(() => {
            return () => {
                if(mqttstate.client){
                    mqttstate.client.end();
                    mqttDispatch({ type: 'DISCONNECTED' });
                }
            };
    }, [mqttstate.client]);

    

    return(
        <MqttContext.Provider value={{mqttConnect, ...mqttstate}}>
            {children}
        </MqttContext.Provider>
    );
};

export const useMqtt=()=> useContext(MqttContext);