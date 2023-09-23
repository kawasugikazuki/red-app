export const  Restart=()=>{
    const message = "Restart";

    fetch("/Restart",{
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