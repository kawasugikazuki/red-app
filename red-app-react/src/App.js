import React,{ useState,useEffect } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import {Time} from "./pages/Title_and_Time";
import {Radicon} from "./pages/Radicon_Mode";
import {Group} from "./pages/Group_Management";
import {Entire} from "./pages/Entire_Management";
import {Algorithm} from "./pages/Algorithm_Mode";
import Appstyle from "./Appstyle.css";
import { useMqtt } from "./context/mqtt-hooks";
import { getIP } from "./components/Get_brokerIP";




function App() {
  const [serverIP,setServerIP]=useState("");
  const { mqttConnect, connectStatus, client, allIP, nowIP, reddata } = useMqtt();
  const mqttstate={connectStatus,client,allIP,nowIP,reddata};
  useEffect(()=>{
      const fetchIP=async()=>{
          try{
              const serverIP=await getIP();
              setServerIP(serverIP);
              console.log(serverIP);
          }catch(error){
              console.log(error);
          }
      };
      fetchIP();
  },[serverIP]);
  useEffect(()=>{
      if(serverIP){
          mqttConnect(serverIP);
      }
  },[serverIP]);

  useEffect(() => {
    console.log("MQTT状態が更新されました:", mqttstate);
  }, [mqttstate.connectStatus, mqttstate.client, mqttstate.allIP, mqttstate.nowIP]);
  
  return (
    <BrowserRouter>
      <h1>{JSON.stringify(mqttstate)}</h1>
       <ul>
         <li>
            <Link to="/">
              <button>Title and Time</button>
            </Link>
         </li>
         <li>
            <Link to="/Radicon">
              <button>Radicon Mode</button>
            </Link>
         </li>
         <li>
            <Link to="/Group">
              <button>Group Management</button>
            </Link>
         </li>
         <li>
            <Link to="/Entire">
              <button>Entire Manegement</button>
            </Link>
         </li>
         <li>
            <Link to="/Algorithm">
              <button>Algorithm Mode</button>
            </Link>
         </li>
       </ul>
     
      
      
        <Switch>
          <Route exact path="/" component={Time}/>
          <Route path="/Radicon" component={Radicon} />
          <Route path="/Group" component={Group} />
          <Route path="/Entire" component={Entire} />
          <Route 
          path="/Algorithm" 
          component={Algorithm}
           />
         <Route component={Notfound} />
        </Switch>
        
    </BrowserRouter>
  );
}

function Notfound(){
  return <h2>Not Found Page</h2>;
}


export default App;
