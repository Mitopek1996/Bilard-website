const database = require('./database-system');

function getAllTournaments(){
    return new Promise((resolve,reject)=>{
        database.getAllTournaments(resolve,reject);
    })
}

function addUserToTournament(username,tournamentname){
    return new Promise((resolve,reject)=>{
        database.addUserToTournament(resolve,reject,username,tournamentname);
    })
}


module.exports = {getAllTournaments,addUserToTournament}