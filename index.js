const express = require('express');
const bodyParser = require('body-parser');
const dgram = require('dgram');
const app = express();
const port = 3001;
const server = dgram.createSocket('udp4');
const mqtt=require('mqtt');
const client_mqtt=mqtt.connect('mqtt://localhost:1883',{clientId:'app'});
const os = require('os');

    // client_mqtt.subscribe('RED/+/DeviceData');
    

    // client_mqtt.subscribe('RED/+/Param');
    // client_mqtt.subscribe('RED/+/Status');
client_mqtt.on('connect',()=>{
    client_mqtt.subscribe('RED/+/connect');
    client_mqtt.subscribe('RED/+/disconnect');
    client_mqtt.subscribe('RED/+/RobotStatus');
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
    client_mqtt.publish('RED/Status',JSON.stringify(param));
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
client_mqtt.on('message', (topic,message)=> {
    // console.log(message.toString());
    if (message.includes("connect")){
    const messagestring=message.toString();
    const messagearray=messagestring.split(' ');
    const IP=messagearray[2];
        if (!IPArray.includes(IP)){
        IPArray.push(IP);
        // console.log(IPArray);
        }
    }
    if (message.includes("disconnect")){
        // console.log(message);
        const messagestring=message.toString();
        const messagearray=messagestring.split(' ');
        const IP=messagearray[2];
        const index=IPArray.indexOf(IP);
        if (index !==-1){
            IPArray.splice(index,1);
        }
        // console.log(IPArray); 
    }else if (topic.includes("RobotStatus")){
        // console.log(message.toString());
        const messagestring=message.toString();
        const RobotStatus=JSON.parse(messagestring);
        console.log(RobotStatus);
    }
});
app.get('/get_redID', (req, res) => {
    res.json({IPArray});
});

app.get('/get_robotstatus', (req, res) => {
    res.json({RobotStatus});
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});



