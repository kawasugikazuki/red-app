export function  udp(message,port,host){
    // const host="255.255.255.255";
    const UDPmessage = {message,port,host};

    fetch("/UDP",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(UDPmessage),
    })
    .then(res => res.json())
    .then(data => {
        console.log("UDP message sent successfully:",data);
    })
    .catch(error => {
        console.error("Error sending UDP message:",error);
    });
}