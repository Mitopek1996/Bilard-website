const express = require('express');
const flash = require('express-flash')
const session = require('express-session');
const passport = require('passport');
const app = express();
const usersService = require('./users-service');
const panelService = require('./panel-service');
const tournamentsService = require('./tournaments-service');
usersService.initializePassport(passport)

app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))
app.use('/js',express.static(__dirname+"public/js"))
app.use('/img',express.static(__dirname+"public/img"))
app.use(express.urlencoded({extended:false}))
app.set('view-engine','ejs')

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
        },
    })
);
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

app.use((req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
})

app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.get('/kontakt',(req,res)=>{
    res.render('contact.ejs')
})

app.get('/admin', checkAuthenticate, (req,res)=>{
    res.render('admin.ejs')
})

app.post('/turnieje',(req,res)=>{
    tournamentsService.addUserToTournament(req.user.username,req.body.tournamentname).then(()=>{
        req.flash('subscribed','Zapisałeś się!')
        res.redirect('/turnieje')
    }).catch(()=>{
        req.flash('subscribed','Spróbuj później')
        res.redirect('/turnieje')
    })
})

app.post('/admin',(req,res)=>{
    if(req.body.formid === "addtournament"){
        panelService.addTournament(req.body.level,req.body.name, new Date(req.body.date),req.body.peaple, req.body.cost, req.body.reward).then(()=>{
            req.flash('tournaments','Dodano nowy turniej');
            res.redirect('/admin');
        }).catch(()=>{
            req.flash('tournaments','Błąd podczas dodawania turnieju');
            res.redirect('/admin');
        })
    }else if(req.body.formid === "addnews"){
        panelService.addNews(req.body.text).then(()=>{
            req.flash('images','Dodano nowego newsa');
            res.redirect('/admin');
        }).catch(()=>{
            req.flash('tournaments','Błąd podczas dodawania newsa');
            res.redirect('/admin');
        })
    }
})

app.get('/news',(req,res)=>{
    panelService.getAllNews().then((resolve)=>{
        res.render('news.ejs',{news: resolve})
    }).catch(()=>{
        res.render('news.ejs')
    })
})

app.get('/turnieje', checkAuthenticate,(req,res)=>{
    tournamentsService.getAllTournaments().then((resolve)=>{
        res.render('tournaments.ejs',{tournaments: resolve, user: req.user})
    }).catch(()=>{
        res.render('tournaments.ejs',{user: req.user})
    })
})

app.get('/rejestracja' ,checkNotAuthenticate ,(req,res)=>{
    res.render('register.ejs')
})

app.get('/logowanie', checkNotAuthenticate, (req,res)=>{
    res.render('login.ejs')
})

app.post('/logowanie',checkNotAuthenticate,passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/logowanie',
    failureFlash: true }))

app.post('/rejestracja',checkNotAuthenticate,(req,res)=>{
    usersService.findUser(req.body.username).then((resolve)=>{    
        if(resolve){
            req.flash('login','Podana nazwa użytkownika jest już zajęta');
            res.redirect('/rejestracja');
        }else{
            usersService.addUser(req.body.username,req.body.password1).then(()=>{
                res.redirect('/logowanie');
            }).catch(()=>{
                req.flash('login','Wystapił błąd z rejestracją użytkownika, spróbuj później');
                res.redirect('/rejestracja');
            })
        }
    }).catch((reject)=>{
        req.flash('login','Wystapił błąd z rejestracją użytkownika, spróbuj później');
        res.redirect('/rejestracja');
    })
})

app.get('/logout',checkAuthenticate,(req,res)=>{
    req.logOut();
    req.isLogin = false;
    res.redirect('/');
})

function checkAuthenticate(req,res,next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/logowanie')
    }
}

function checkNotAuthenticate(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    else{
        next();
    }
}


app.listen(8080);