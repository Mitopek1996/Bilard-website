const mongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017'
const dbname = 'bilard'



function getUser(resolve,reject,username){
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, user) =>{
        if (err) {
            reject(err)
        } else {
            const db = user.db(dbname);
            db.collection('users').findOne({
                username: username
            }, (error, result) => {
                if(error){
                    reject(error)
                }
                else if(result){
                    resolve(result)
                }
                else
                {
                    resolve()
                }
            });
        }
    })
}

async function addUser(resolve,reject, username, password, admin){
    mongoClient.connect(url,{ useUnifiedTopology: true },(err,user)=>{
        if(err){
            reject(err)
        }else{
            const db = user.db(dbname)
            db.collection('users').insertOne({
                username: username,
                password: password,
                admin: admin
            },(error,result)=>{
                if(error){
                    reject(error)
                }
                else{
                    resolve();
                }
            })
        }
    })
}

function addTournament(resolve, reject, level,name, date, maxpeaple, cost, reward){
    mongoClient.connect(url,{ useUnifiedTopology: true },(err,user)=>{
        if(err){
            reject(err)
        }else{
            const db = user.db(dbname)
            db.collection('tournaments').insertOne({
                level: level,
                name: name,
                date: date,
                peaple: [], //empty table for users
                maxpeaple: maxpeaple,
                cost: cost,
                reward: reward
            }, (error,result)=>{
                if(error){
                    reject(error)
                }else{
                    resolve()
                }
            })
        }
    })
}

function addNews(resolve, reject, text,date){
    mongoClient.connect(url,{ useUnifiedTopology: true },(err,user)=>{
        if(err){
            reject(err)
        }else{
            const db = user.db(dbname)
            db.collection('news').insertOne({
                date: date,
                text: text
            }, (error,result)=>{
                if(error){
                    reject(error)
                }else{
                    resolve()
                }
            })
        }
    })
}

function getAllNews(resolve,reject){
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, user) =>{
        if (err) {
            reject(err)
        } else {
            const db = user.db(dbname);
            db.collection('news').find().sort({date: -1}).toArray((error, result) => {
                if(error){
                    reject(error)
                }
                else if(result){
                    resolve(result)
                }
                else
                {
                    resolve()
                }
            });
        }
    })
}

function getAllTournaments(resolve,reject){
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, user) =>{
        if (err) {
            reject(err)
        } else {
            const db = user.db(dbname);
            db.collection('tournaments').find().sort({date: 1}).toArray((error, result) => {
                if(error){
                    reject(error)
                }
                else if(result){
                    resolve(result)
                }
                else
                {
                    resolve()
                }
            });
        }
    })
}

function addUserToTournament(resolve, reject, username, tournamentname){
    mongoClient.connect(url,{ useUnifiedTopology: true },(err,user)=>{
        if(err){
            reject(err)
        }else{
            const db = user.db(dbname)
            db.collection('tournaments').updateOne({name: tournamentname},{$push: {
                peaple: username
            }}).then(()=>{
                resolve();
            }).catch((err)=>{
                reject(err);
            })
        }
    })
}




module.exports = {addUser, getUser, addTournament,getAllTournaments,addUserToTournament,addNews,getAllNews}