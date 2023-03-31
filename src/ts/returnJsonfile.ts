function returnJson(data: any, columns: any, config: any) {
  const jsonData = { data, columns, config };
  let url =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(jsonData));
  let a = document.createElement("a");
  a.href = url;
  a.download = "data.json";
  a.click();
}

export default returnJson;
