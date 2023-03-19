function returnJson(data:any) {
    let url = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    let a = document.createElement('a');
    a.href = url;
    a.download = "data.json";
    a.click();
}

export default returnJson;