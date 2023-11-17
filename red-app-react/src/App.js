import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import {Time} from "./pages/Title_and_Time";
import {Radicon} from "./pages/Radicon_Mode";
import {Group} from "./pages/Group_Management";
import {Entire} from "./pages/Entire_Management";
import {Algorithm} from "./pages/Algorithm_Mode";
import Appstyle from "./Appstyle.css";


function App() {
  return (
    <BrowserRouter>
     
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
          <Route path="/Algorithm" component={Algorithm} />
         <Route component={Notfound} />
        </Switch>
        
    </BrowserRouter>
    
  );
}

function Notfound(){
  return <h2>Not Found Page</h2>;
}


export default App;
