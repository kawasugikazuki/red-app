const express = require('express');
const bodyParser = require('body-parser');
const dgram = require('dgram');
const app = express();
const port = 3001;
const server = dgram.createSocket('udp4');
const mqtt=require('mqtt');
const client_mqtt=mqtt.connect('mqtt://localhost:1883',{clientId:'app'});
const os = require('os');


    

    // client_mqtt.subscribe('RED/+/Param');
    // client_mqtt.subscribe('RED/+/Status');
client_mqtt.on('connect',()=>{
    client_mqtt.subscribe('RED/+/connect', {qos:0});
    client_mqtt.subscribe('RED/+/disconnect', {qos:0});
    client_mqtt.subscribe('RED/+/RobotStatus');
    client_mqtt.subscribe('RED/+/DeviceData');
    client_mqtt.subscribe('RED/+/whereImage');
    console.log("connect");
});

// client_mqtt.on('message', (topic, message)=> {
//     console.log(message.toString());
// });

app.use(bodyParser.json());

app.post('/UDP', (req, res) => {
    const message = req.body.message;
    const serverport = req.body.port;
    const serverhost = "255.255.255.255";

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
    client_mqtt.publish('RED/Status',JSON.stringify(param),{qos:1});
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
client_mqtt.on('message', (topic,message)=> {
    // console.log(message.toString());

    //このif文はconnectとdisconnectの処理
    if (message.includes("connect")){
        const messagestring=message.toString();
        console.log(messagestring);
        const messagearray=messagestring.split(' ');
        const IP=messagearray[2];
        if (messagearray[0]==="connect"){
            if (!IPArray.includes(IP)){
            IPArray.push(IP);
            // console.log(IPArray);
            }
        }else if (messagearray[0]==="disconnect"){
            const index=IPArray.indexOf(IP);
            // console.log(index);
            if (index !==-1){
                IPArray.splice(index,1);
            }
            // console.log(IPArray); 
        } 
    }else if (topic.includes("RobotStatus")){
        const messagestring=message.toString();
        // console.log(messagestring);
        RobotStatus=JSON.parse(messagestring);
        // console.log(RobotStatus);
    }else if (topic.includes("DeviceData")){
        const messagestring=message.toString();
        DeviceData=JSON.parse(messagestring);
        // console.log(DeviceData);
    }
    else if (topic.includes("whereImage")){
        const messagestring=message.toString();
        // console.log(messagestring);
    }
    // console.log(IPArray);
});
app.get('/get_redID', (req, res) => {
    res.json(IPArray);
});

app.get('/get_robotstatus', (req, res) => {
    res.json(RobotStatus);
});
app.get('/get_devicedata', (req, res) => {
    res.json(DeviceData);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});



