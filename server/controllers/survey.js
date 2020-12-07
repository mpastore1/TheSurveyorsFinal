let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');

//create reference to DB
let Survey = require('../models/survey');

//create User Model
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displaySurvey = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if (err)
        {
            return console.error(err);
        }
        else {    
            res.render('survey/list', 
            {title: 'Surveys', 
            SurveyList: surveyList, displayName: req.user ? req.user.displayName : ''});




        }
    
    });
}

module.exports.displayResults = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if (err)
        {
            return console.error(err);
        }
        else {    
            res.render('survey/results', 
            {title: 'Results', SurveyList: surveyList, displayName: req.user ? req.user.displayName : ''});
        }
    
    });
}

module.exports.displayAPage = (req, res, next) => {
    let id = req.params.id;
    
    Survey.findById(id, (err, surveyToShow) => {
    if(err){
        console.log(err)
        res.end(err);
    }
    else{
        res.render('survey/asurvey', 
        {title: 'A Survey', survey: surveyToShow, displayName: req.user ? req.user.displayName : ''})
    }
    });
}

module.exports.displayCreatePage = (req, res, next) =>{
    res.render('survey/create', 
    {title: 'Create Survey', 
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProcessCreatePage = (req, res, next) =>{
    let newSurvey = Survey({
        "displayName":req.user.displayName,
        "surveyTitle": req.body.surveyTitle,
        "createdBy":req.body.createdBy,
        "question1": req.body.question1,
        "q1option1": req.body.q1option1,
        //q1countOption1:0,
        "q1option2": req.body.q1option2,
        //q1countOption2:0,
        "q1option3": req.body.q1option3,
        //q1countOption3:0,
        "q1option4": req.body.q1option4,
        //q1countOption4:0,

        "question2": req.body.question2,
        "q2option1": req.body.q2option1,
        "q2option2": req.body.q2option2,
        "q2option3": req.body.q2option3,
        "q2option4": req.body.q2option4,
    
        "question3": req.body.question3,
        "q3option1": req.body.q3option1,
        "q3option2": req.body.q3option2,
        "q3option3": req.body.q3option3,
        "q3option4": req.body.q3option4,
    
        "question4": req.body.question4,
        "q4option1": req.body.q4option1,
        "q4option2": req.body.q4option2,
        "q4option3": req.body.q4option3,
        "q4option4": req.body.q4option4,
    
        "question5": req.body.question5,
        "q5option1": req.body.q5option1,
        "q5option2": req.body.q5option2,
        "q5option3": req.body.q5option3,
        "q5option4": req.body.q5option4

    });

    Survey.create(newSurvey, (err, Survey)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            //refresh the booklist

            res.redirect('/survey');
        }
        
    });
}

module.exports.displayEditPage = (req, res, next) =>{
    let id = req.params.id;
    
        Survey.findById(id, (err, surveyToEdit) => {
        if(err){
            console.log(err)
            res.end(err);
        }
        else{
            if(req.user.displayName == surveyToEdit.displayName){
                res.render('survey/edit', 
                {title: 'Edit Survey', survey: surveyToEdit, displayName: req.user ? req.user.displayName : ''})
            } else {
                res.redirect('/survey');
                
            }
        }
        });
    
}
module.exports.displayProcessEditPage = (req, res, next) =>{

    let id = req.params.id;
    
    let updatedSurvey = Survey({
    "_id": id,
    "displayName":req.user.displayName,
    "surveyTitle": req.body.surveyTitle,
    "createdBy": req.body.createdBy,
    "question1": req.body.question1,
    "q1option1": req.body.q1option1,
    "q1option2": req.body.q1option2,
    "q1option3": req.body.q1option3,
    "q1option4": req.body.q1option4,

    "question2": req.body.question2,
    "q2option1": req.body.q2option1,
    "q2option2": req.body.q2option2,
    "q2option3": req.body.q2option3,
    "q2option4": req.body.q2option4,

    "question3": req.body.question3,
    "q3option1": req.body.q3option1,
    "q3option2": req.body.q3option2,
    "q3option3": req.body.q3option3,
    "q3option4": req.body.q3option4,

    "question4": req.body.question4,
    "q4option1": req.body.q4option1,
    "q4option2": req.body.q4option2,
    "q4option3": req.body.q4option3,
    "q4option4": req.body.q4option4,

    "question5": req.body.question5,
    "q5option1": req.body.q5option1,
    "q5option2": req.body.q5option2,
    "q5option3": req.body.q5option3,
    "q5option4": req.body.q5option4
    });
    
    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/survey');
        }
    });
}

module.exports.ProcessDelete = (req, res, next) =>{
    let id = req.params.id;
    
    Survey.remove({_id: id}, (err) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else{
           
                res.redirect('/survey');
            
        }
    });
}






