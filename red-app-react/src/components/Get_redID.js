export const get_redID=()=>{
    return fetch("/get_redID",{
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