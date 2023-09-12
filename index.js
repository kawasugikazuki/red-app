const express = require('express');
const bodyParser = require('body-parser');
const dgram = require('dgram');
const app = express();
const port = 3000;

const server = dgram.createSocket('udp4');
app.use(bodyParser.json());

app.post('/send_Broker', (req, res) => {
    const message = req.body.message;
    const serverport = 50003;
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
            console.log('Broadcast message sent successfully.');
            res.json({message: "UDP message sent successfully"});
            
            }
          client.close();
    });
});
            
app.post('/send_startexplore', (req, res) => {
    const message = req.body.message;
    const serverport = 50000;
    const serverhost = "255.255.255.255";

    const client = dgram.createSocket('udp4');

    client.bind(()=>{
        client.setBroadcast(true);
    });

    client.send(message, serverport, serverhost, (err) => {
        if (err) {
            console.error('Error sending broadcast message:', err);
            res.status(500).json({error: "Error sending UDP message"});
        } else {
            console.log('Broadcast message sent successfully.');
            res.json({message: "UDP message sent successfully"});
            }
          client.close();
    });
});
 
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});



