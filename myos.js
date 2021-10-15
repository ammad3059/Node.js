const os = require("os");
let totalMemory = os.totalmem();
let release = os.release();

console.log(`Total memory: ${totalMemory}`);
console.log(`OS release: ${release}`);
