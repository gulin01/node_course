const fs = require("fs");

const dataBuffer = fs.readFileSync("1-json.json");
const dataJson = dataBuffer.toString();
const data = JSON.parse(dataJson);
data.name = "Gulasal";
data.age = 22;
const jsonD = JSON.stringify(data);
fs.writeFileSync("1-json.json", jsonD);
