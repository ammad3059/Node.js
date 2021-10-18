// ============================= CALLBACKS=============================
console.log("Before");
getUser(1, (result)=>{
    console.log(result);

    getRepos(result.gitHubUsername, (repos)=>{
        console.log(repos);
    })
})
console.log("After");

function getUser(id, callback){  // callback is a function that have the result of the async code
    setTimeout(()=>{
        console.log("Reading a given user from a database..");
        callback({id:id, gitHubUsername:"Mosh Hamedani"})
    },2000);
}


function getRepos(name, callback){
    console.log(`username is ${name}`);
    setTimeout(()=>{
        console.log(`Getting Repos`);
        callback(['data Science', "Database MySQL", "Web development"])
    },2000)
    
}