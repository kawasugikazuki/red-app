
export function  BrokerIP (IP){
    const message = "BrokerIP_is_"+IP+"_Exploration_Tag";

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

}
