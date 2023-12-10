export function SendParam(param,frequency,selectedID) {
    if (frequency===true){
        console.log("frequency is true");
    }else if(frequency.MarkerFrequency_A>0 && frequency.MarkerFrequency_B>0){
        param.MarkerColor=String(frequency.MarkerFrequency_A)+"_"+String(frequency.MarkerFrequency_B);
    }else if ( frequency.MarkerFrequency_B===0){
        param.MarkerColor=String(frequency.MarkerFrequency_A);
    }else if ( frequency.MarkerFrequency_A===0){
        param.MarkerColor=String(frequency.MarkerFrequency_B);
    }
    // console.log(param.MarkerColor);



    const sendparam={param,selectedID};
    fetch("/send_param",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sendparam),
    })
    .then(res => res.json())
    .then(data => {
        console.log("param sent successfully:",data);
    })
    .catch(error => {
        console.error("Error sending param :",error);
    });
}