export function SendParam(param) {
    fetch("/send_param",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
    })
    .then(res => res.json())
    .then(data => {
        console.log("param sent successfully:",data);
    })
    .catch(error => {
        console.error("Error sending param :",error);
    });
}