async function request (url, method='GET',body) {
    const config = {
        method: method,
        headers: {
            "Context-Type": "application/json"
        }
    }
    if(body) {
        config.body = JSON.stringify(body) 
    }
    const res = await fetch(url, config)
        const data = await res.json();
        if (data.error) throw data.error;
        return data;
}
export default request