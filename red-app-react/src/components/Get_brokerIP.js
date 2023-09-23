export const getIP = () => {
    return fetch('/get_IP')
    .then(response => response.json())
    .then(data => {
        return data;
    });
}