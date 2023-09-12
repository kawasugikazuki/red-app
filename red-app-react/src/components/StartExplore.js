import React from "react";

class StartExplore extends React.Component{
sendMassages = () => {
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

};
    render(){
        return(
            <div>
                <button onClick={this.sendMassages}>StartExplore</button>
            </div>
        );
    }
}
export default StartExplore;