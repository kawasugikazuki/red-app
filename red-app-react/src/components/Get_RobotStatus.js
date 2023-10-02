export const get_robotostatus=()=>{
    return fetch("/get_robotostatus",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    return data;
    })
    .catch(error => {
        console.error("Error getting redID :",error);
    });

}