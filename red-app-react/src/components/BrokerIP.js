import React from "react";

class BrokerIP extends React.Component{
sendMassages = () => {
    const message = "BrokerIP_is_192.168.1.109_Exploration_Tag";

    fetch("/send_Broker",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({message}),
    })
    .then(res => res.json())
    .then(data => {
        console.log("UDP message sent successfully:",data);
    })
    .catch(error => {
        console.error("Error sending UDP message:",error);
    });

};
    render(){
        return(
            <div>
                <button onClick={this.sendMassages}>BrokerIP</button>
            </div>
        );
    }
}
export default BrokerIP;