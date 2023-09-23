export const  StartExplore=()=>{
    const message = "StartExplore";

    fetch("/send_startexplore",{
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
