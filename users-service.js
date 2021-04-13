const database = require('./database-system');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy

async function initializePassport(passport){
    passport.use(new LocalStrategy(
        async function(username, password, done) {
            findUser(username).then(async (resolve)=>{
                if(await bcrypt.compare(password, resolve.password)){
                    return done(null, resolve)
                }else{
                    return done(null,false,"Nieprawidłowe hasło!")
                }
            }).catch(()=>{
                return done(null,false,"Nieprawidłowa nazwa użytkownika!")
            })
        }
    ));
    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });
    
    passport.deserializeUser(function(username, done) {
        findUser(username).then((result)=>{
            done(null,result)
        })
    }); 
}



function findUser(username){
    return promise = new Promise((resolve,reject)=>{
        database.getUser(resolve,reject,username);
    }) 
}

async function addUser(username,password, admin=0){
    const hashedPassword = await bcrypt.hash(password,10);  
    return promise = new Promise((resolve,reject)=>{
        database.addUser(resolve,reject,username,hashedPassword,admin);
    })
}




module.exports = {findUser,addUser,initializePassport};