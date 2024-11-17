const fs = require("fs");
const readline = require("readline");




module.exports = function readFile(fileName, onEachLine, onClose) {

    const fileStream = fs.createReadStream(fileName);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });


    rl.on("line", onEachLine);
    
    rl.on("close", onClose);

}