const e = require("express");
let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create reference to DB
let Survey = require('../models/survey');

let surveyController = require('../controllers/survey');
//create User Model
let userModel = require('../models/user');
let User = userModel.User;

/*
module.exports.displayHomePage = (req, res, next) =>{
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});

}*/
module.exports.displayHomePage = (req, res, next) =>{
    Survey.find((err, surveyList) => {
        if (err)
        {
            return console.error(err);
        }
        else {
    
            //console.log(bookList)
    
            res.render('index', 
            {title: 'Home', 
            SurveyList: surveyList, displayName: req.user ? req.user.displayName : ''});
        }

})}

module.exports.displaySurveyPage = (req, res, next) =>{
    res.render('survey', { title: 'Surveys', displayName: req.user ? req.user.displayName : ''});
}



module.exports.displayLoginPage = (req, res, next) =>{
    //check if user logged in

    if(!req.user)
    {
        res.render('auth/login', 
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else{
        return res.redirect('/');
    }
    
}

module.exports.ProcessingLoginPage = (req, res, next) =>{
    passport.authenticate('local',
    (err, user, info)=> {
        //server err
        if(err){
            return next(err);
        }
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        req.login(user, (err) => {
            //server error
            if(err){
                return next(err);
            }
            return res.redirect('/survey');
        });
    }) (req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) =>{
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else{
        return res.redirect('/');
    }

}

module.exports.ProcessingRegisterPage = (req, res, next) =>{
    //User Object
    let newUser = new User ({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err)=>{
        if(err)
        {
            console.log("Error Inserting New User");
            if(err.name == "userExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );

                console.log('Error: User Already Exists')
            }
            return res.render('auth/register', {
                title: "Register",
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''

            });
        }
        else {
            //no error, registration success
            //redirect user and authenticate

            return passport.authenticate('local')(req,res, () => {
                res.redirect('/survey')
            });


        }
    });

}

module.exports.ProcessingLogOut = (req, res, next) =>{
    req.logout();
    res.redirect('/');

}





module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if (err)
        {
            return console.error(err);
        }
        else {
    
            //console.log(bookList)
    
            res.render('index', 
            {title: 'Hom', 
            SurveyList: surveyList, displayName: req.user ? req.user.displayName : ''});
        }
    
    });
}
