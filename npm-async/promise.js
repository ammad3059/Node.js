// ================================ PROMISES=====================================
/*
const prom = new Promise((resolve,reject)=>{        // pending state
    setTimeout(()=>{                                // asynchoronous work
        resolve(1)                                  // promise resolved
        // reject(new Error("error message"))          promise rejected
    },1500)
})


prom                                                // Consume the promise
    .then(res => {console.log(res);})
    .catch(err => {console.log(err).message;})

*/

getUser(1)
    .then(user => {
        console.log(user);
        return getRepos(user.gitHubUsername)
    })
    .then(repos => { console.log(repos) })
    .catch(err => { console.log("Error: ", err.message); })

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading a given user from a database..");
            resolve({ id: id, gitHubUsername: "Mosh Hamedani" })
        }, 2000);
    })
}


function getRepos(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`username is ${name}`);
            console.log(`Getting Repos`);
            resolve(['data Science', "Database MySQL", "Web development"])
        }, 2000)
    })
}