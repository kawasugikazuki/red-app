const express = require('express');
const bodyParser = require('body-parser');
const dgram = require('dgram');
const app = express();
const port = 3001;
const mqtt=require('mqtt');
//自分のPCでbrokerを立てる場合
const aedes=require('aedes')();
const server = require('net').createServer(aedes.handle);
const port_aedes = 1883;
const path = require('path');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const ws = require('websocket-stream');
const http = require('http');

const httpServer = http.createServer();
ws.createServer({ server: httpServer }, aedes.handle);

const wsPort = 3003;
httpServer.listen(wsPort, function () {
  console.log('Aedes WebSocket listening on port:', wsPort);
});



server.listen(port_aedes, function () {
    console.log('server started and listening on port ', port_aedes);
})

aedes.on('client', function (client) {
    console.log(client.id)
})
aedes.on('clientDisconnect', function (client) {
    console.log('Client Disconnected:', client.id);
});

// const client_mqtt=mqtt.connect('mqtt://broker.emqx.io:1883',{clientId:'app'});
const client_mqtt=mqtt.connect('mqtt://localhost:1883',{clientId:'app'})
//安藤さんのPCのIPアドレスにする
// const client_mqtt=mqtt.connect('mqtt://192.168.1.113:1883',{clientId:'app'});


const os = require('os');


    

    // client_mqtt.subscribe('RED/+/Param');
    
client_mqtt.on('connect',()=>{
    client_mqtt.subscribe('RED/+/connect',{qos:1});
    client_mqtt.subscribe('RED/+/disconnect',{qos:1});
    client_mqtt.subscribe('RED/+/RobotStatus',{qos:1});
    client_mqtt.subscribe('RED/+/DeviceData',{qos:1});
    client_mqtt.subscribe('RED/+/Obstacle',{qos:1});
    client_mqtt.subscribe('+/Status');
    client_mqtt.subscribe('RED/+/Param');
    client_mqtt.subscribe('RED/+/CeilImage',{qos:1});
    client_mqtt.subscribe('RED/+/FloorImage',{qos:1});
    console.log("connect");
});

app.use(bodyParser.json());

app.post('/UDP', (req, res) => {
    const message = req.body.message;
    const serverport = req.body.port;
    const serverhost = req.body.host;

    const client = dgram.createSocket('udp4');

    if (serverhost === "255.255.255.255"){
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
    }else{
        //個別送信のコードを書く
        client.send(message,serverport,serverhost,(err)=>{
            if (err){
                console.error("error sending unicast message",err);
                res.status(500).json({error: "error sending unicast message"});
            }else{
                console.log({message});
                res.json({message: "UDP message sent successfully"});
            }
            client.close();

        });
    }
    
    
    
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/send_param', (req, res) => {
    const param=req.body.param;
    const selectedID=req.body.selectedID;
    // console.log(param);
    // console.log(selectedID);
    async function send_param(){
        try{
            if (selectedID.length===0){
                await publishMessage('RED/Status',JSON.stringify(param),{qos:1});
            }else{
                for (const ID of selectedID){
                    await publishMessage('RED/'+ID+'/Param',JSON.stringify(param),{qos:1});
                }
            }
                res.status(200).json({message: "param sent successfully"});
        }catch(err){
                console.log(err);
                res.status(500).json({error: "Error sending param"});
            }
        }
    send_param();
});
async function publishMessage(topic,message,options){
    return new Promise((resolve,reject)=>{
        client_mqtt.publish(topic,message,options,(err)=>{
            if (err){
                reject(err);
            }else{
                resolve();
            }
        });
    });
}



app.get('/get_IP', (req, res) => {
(async () => {
  const netInfos = os.networkInterfaces();
  const en0 = netInfos['en0'];

  const ipv4 = en0.find(({family}) => family === 'IPv4');
  res.json(ipv4.address);
//   console.log(ipv4.address);
})();
});

//画像を保存する関数
function saveImage(image,topic){
    const filename=Object.keys(image)[0];
    const imageData=Buffer.from(image[filename],'base64');
    const redIP=topic.split("/")[1];
    const imageDir="images";
    if (!fs.existsSync(imageDir)){
        fs.mkdirSync(imageDir);
    }
    const robotDir=imageDir+"/"+redIP;
    if (!fs.existsSync(robotDir)){
        fs.mkdirSync(robotDir);
    }
    const now = new Date();
    const timestamp = `${now.getFullYear()}_${(now.getMonth() + 1).toString().padStart(2, '0')}_${now.getDate().toString().padStart(2, '0')}_` +
                 `${now.getHours().toString().padStart(2, '0')}_${now.getMinutes().toString().padStart(2, '0')}_${now.getSeconds().toString().padStart(2, '0')}_${now.getMilliseconds().toString().padStart(3, '0')}`;
    const filepath=path.join(robotDir,`${timestamp}_${filename}`);
    fs.writeFileSync(filepath,imageData,(err)=>{
        if (err){
            console.log(err);
        }else{
            console.log("Image saved");
        }
    });
}
//Devicedataをcsvに保存する関数
function saveToDeviceDataCSV(deviceData){
    const mqttDir="mqtt/deviceData";
    const lastThreeDigits = deviceData.ID.split('.').pop();
    const filePath=path.join(mqttDir,lastThreeDigits+".csv");
    
    if (!fs.existsSync(mqttDir)){
        fs.mkdirSync(mqttDir,{recursive: true});
    }
    const fileExists = fs.existsSync(filePath);
    
    const csvWriter = createCsvWriter({
        path:filePath,
        header:[
            {id:"group",title:"Group"},
            {id:"ID",title:"ID"},
            {id:"step",title:"Step"},
            {id:"distance",title:"Distance"},
            {id:"azimuth",title:"Azimuth"},
            {id:"transitTime",title:"TransitTime"},
            {id:"accept",title:"Accept"},
            {id:"reject",title:"Reject"},
            {id:"boids",title:"Boids"},
            {id:"randomRot",title:"RandomRot"},
            {id:"x",title:"x"},
            {id:"y",title:"y"},
        ],
        append: fileExists
    });
    const records={
        group: deviceData.Group,
        ID: deviceData.ID,
        step: deviceData.Step,
        distance: deviceData.Distance,
        azimuth: deviceData.Azimuth,
        transitTime: deviceData.TransitTime,
        accept: deviceData.Accept,
        reject: deviceData.Reject,
        boids: deviceData.Boids,
        randomRot: deviceData.RandomRot,
        x: deviceData.x,
        y: deviceData.y,
    };
    csvWriter.writeRecords([records])
        .then(()=>{console.log("The CSV file was written successfully");})
        .catch((err)=>{console.log(err);});
}


const IPnowArray=[];
let RobotStatus={};
let DeviceData={};
let ObstacleData={};
let reddata={};
let CeilImage={};
let FloorImage={};
let param={};
client_mqtt.on('message', (topic,message)=> {
    // console.log(message.toString());

    //このif文はconnectとdisconnectの処理
    if (message.includes("connect")){
        const messagestring=message.toString();
        console.log(message.toString());
        const messagearray=messagestring.split(' ');
        const IP=messagearray[2];
        if (messagearray[0]==="connect"){
            if (!IPnowArray.includes(IP)){
                IPnowArray.push(IP);
                IPnowArray.sort();
                // console.log(IPArray);
                reddata[IP]={};
            }
        }else if (messagearray[0]==="disconnect"){
            const index=IPnowArray.indexOf(IP);
            // console.log(index);
            if (index !==-1){
                IPnowArray.splice(index,1);
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
        const IP=topic.split("/")[1];
        // console.log(DeviceData);
        if (reddata[IP]){
            reddata[IP].DeviceData=DeviceData;
            saveToDeviceDataCSV(DeviceData);
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
    if (topic.includes("CeilImage")){
        Ceil_dict=JSON.parse(message);
        // console.log(Ceil_dict);
        if (reddata[topic.split("/")[1]]){
            reddata[topic.split("/")[1]].CeilImage=Ceil_dict;
        }
        CeilImage=Ceil_dict;
        // console.log(CeilImage);
        saveImage(Ceil_dict,topic);
    }
    if (topic.includes("FloorImage")){
        Floor_dict=JSON.parse(message);
        if (reddata[topic.split("/")[1]]){
            reddata[topic.split("/")[1]].FloorImage=Floor_dict;
        }
        
        FloorImage=Floor_dict;
        // console.log(FloorImage);
        saveImage(Floor_dict,topic);
    }
    if(topic.includes("Param")){
        const messagestring=message.toString();
        param=JSON.parse(messagestring);
        const parts=topic.split("/");
        const IP=parts[1];
        reddata[IP].param=param;
        // console.log(messagestring);
    }
    if(topic.includes("RED/Status")){
        const messagestring=message.toString();
        param=JSON.parse(messagestring);
        IPnowArray.map(IP=>reddata[IP].param=param);
    }
    // console.log(reddata);
});
app.get('/get_redID', (req, res) => {
    res.json(IPnowArray);
});

app.get('/get_reddata', (req, res) => {
    res.json(reddata);
});

app.get('/get_Ceilimage', (req, res) => {
    res.json(CeilImage);
});
app.get('/get_Floorimage', (req, res) => {
    res.json(FloorImage);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});



