const http = require('http')
/*
let server = http.createServer();
server.on('connection', (socket) => {
    console.log('someone connected!');
});

server.listen(3000);

console.log("Connection begins");
*/
// Extending..

let server = http.createServer((req,res)=>{
    if(req.url==="/"){
        res.write("Please Wait!!");
        res.end();
    }
    if(req.url==="/api/course"){
        res.write(JSON.stringify([1,2,3,4]))
        res.end();
    }
});

server.listen(3000);

console.log("Connection begins");
