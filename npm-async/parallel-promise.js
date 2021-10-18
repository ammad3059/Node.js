const p1 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log("First promise")
        resolve(1)
    },2000)
})


const p2 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log("Second promise")
        resolve(2)
    },2000)
})

Promise.all([p1,p2]).then(result=>{
    console.log(result);
    console.log("Promise.all completed");
})

Promise.race([p1,p2]).then(result=>{
    console.log(result);
})