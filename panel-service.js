const database = require('./database-system');

function addTournament(level,name,date,maxpeaple,cost,prize){
    return promise = new Promise((resolve,reject)=>{
        database.addTournament(resolve,reject,level,name,date,maxpeaple,cost,prize);
    })
}

function addNews(text){
    const date = new Date();
    return promise = new Promise((resolve,reject)=>{
        database.addNews(resolve,reject,text,date);
    })
}

function getAllNews(){
    return new Promise((resolve,reject)=>{
        database.getAllNews(resolve,reject);
    })
}

module.exports = {addTournament,addNews,getAllNews}