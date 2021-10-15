// File System Module
const fs = require("fs");
// FS comes with two versions of each method Sync(blocking) and Async (non-blocking)
let fsSync = fs.readdirSync("./");
console.log(`FS Sync--> ${fsSync}`);


fs.readdir("./", (err,files)=>{
    if (err){ console.log(`Error--> ${err}`)}
    else {console.log(`Files returned--> ${files}`)}
});

