const express = require('express');
const bodyParser = require('body-parser');
const dgram = require('dgram');
const app = express();
const port = 3001;
const mqtt=require('mqtt');
const client_mqtt=mqtt.connect('mqtt://localhost:1883',{clientId:'app'});
const os = require('os');


    

    // client_mqtt.subscribe('RED/+/Param');
    
client_mqtt.on('connect',()=>{
    client_mqtt.subscribe('RED/+/connect',{qos:1, retain:true});
    client_mqtt.subscribe('RED/+/disconnect',{qos:1, retain:true});
    client_mqtt.subscribe('RED/+/RobotStatus',{qos:1});
    client_mqtt.subscribe('RED/+/DeviceData',{qos:1});
    client_mqtt.subscribe('RED/+/Obstacle',{qos:1});
    // client_mqtt.subscribe('+/Status');
    client_mqtt.subscribe('RED/+/CeilImage',{qos:1});
    client_mqtt.subscribe('RED/+/FloorImage',{qos:1});
    console.log("connect");
});

// client_mqtt.on('message', (topic, message)=> {
//     console.log(message.toString());
// });

app.use(bodyParser.json());

app.post('/UDP', (req, res) => {
    const message = req.body.message;
    const serverport = req.body.port;
    const serverhost = req.body.host;

    const client = dgram.createSocket('udp4');

    client.bind(()=>{
        client.setBroadcast(true);
    });

    client.send(message, serverport, serverhost, (err) => {
        if (err) {
            console.error('Error sending broadcast message:', err);
            res.status(500).json({error: "Error sending UDP message" });
            
        } else {
            console.log({message});
            res.json({message: "UDP message sent successfully"});
            
            }
          client.close();
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/send_param', (req, res) => {
    const param=req.body;
    // console.log(param);
    client_mqtt.publish('RED/Status',JSON.stringify(param),{qos:1, retain:true});
});



app.get('/get_IP', (req, res) => {
(async () => {
  const netInfos = os.networkInterfaces();
  const en0 = netInfos['en0'];

  const ipv4 = en0.find(({family}) => family === 'IPv4');
  res.json(ipv4.address);
//   console.log(ipv4.address);
})();
});

const IPArray=[];
let RobotStatus={};
let DeviceData={};
let ObstacleData={};
let reddata={};
let CeilImage={};
let FloorImage={};
client_mqtt.on('message', (topic,message)=> {
    // console.log(message.toString());

    //このif文はconnectとdisconnectの処理
    if (message.includes("connect")){
        const messagestring=message.toString();
        console.log(message.toString());
        const messagearray=messagestring.split(' ');
        const IP=messagearray[2];
        if (messagearray[0]==="connect"){
            if (!IPArray.includes(IP)){
                IPArray.push(IP);
                // console.log(IPArray);
                reddata[IP]={};
            }
        }else if (messagearray[0]==="disconnect"){
            const index=IPArray.indexOf(IP);
            // console.log(index);
            if (index !==-1){
                IPArray.splice(index,1);
            }
            // console.log(IPArray); 
        } 
    }
    if (topic.includes("RobotStatus")){
        const messagestring=message.toString();
        RobotStatus=JSON.parse(messagestring);
        if (reddata[RobotStatus.ID]){
            reddata[RobotStatus.ID].RobotStatus=RobotStatus;
        }

        // console.log(messagestring);
    }
     if (topic.includes("DeviceData")){
        const messagestring=message.toString();
        DeviceData=JSON.parse(messagestring);
        // console.log(DeviceData);
        if (reddata[DeviceData.ID]){
            reddata[DeviceData.ID].DeviceData=DeviceData;
        }
        // console.log(messagestring);
    }
    if (topic.includes("Obstacle")){
        const messagestring=message.toString();
        ObstacleData=JSON.parse(messagestring);
        if (reddata[ObstacleData.ID]){
            reddata[ObstacleData.ID].ObstacleData=ObstacleData;
        }
        // console.log(messagestring);
    }
    // if (topic.includes("CeilImage")){
    //     CeilImage=JSON.parse(message);
    // }
    // if (topic.includes("FloorImage")){
    //     FloorImage=JSON.parse(message);
    // }
    // console.log(reddata);
});
app.get('/get_redID', (req, res) => {
    res.json(IPArray);
});

app.get('/get_reddata', (req, res) => {
    res.json(reddata);
});

// app.get('/get_Ceilimage', (req, res) => {
//     res.json(CeilImage);
// });
// app.get('/get_Floorimage', (req, res) => {
//     res.json(FloorImage);
// });


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});



