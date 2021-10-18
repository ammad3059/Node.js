
async function display() {
    try {
        const user = await getUser(2);
        console.log(`resolved user--> ${user}`);
        const repos = await getRepos(user.name);
        console.log(`resolved repos are --> ${repos}`);
        const commit = await getCommits(repos[1])
        console.log(commit);

    }
    catch (err) {
        console.log("Error: ", err.message);
    }
}
display();

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Getting the user from database with following id ", id);
            resolve({ id: id, name: "John Smith", age: 22, country: "Pakistan" })
        },2000)

    })
}


function getRepos(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Waiting for GitHub API");
            resolve(['JS-Repo', "Python-Repo", "Data Science Repo"])
        },2000)
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Fetching Commits in the repo: ", repo);
            resolve(['Commit1', "Commit2", "Commit3"])
        },2000)
    })
}