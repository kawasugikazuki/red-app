export const get_devicedata=()=>{
    return fetch("/get_devicedata",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res => res.json())
    .then(data => {
        // console.log(data);
    return data;
    })
    .catch(error => {
        console.error("Error getting redID :",error);
    });

    }