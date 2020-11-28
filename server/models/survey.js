let mongoose = require('mongoose');

//create a model class

let surveyModel = mongoose.Schema({
    displayName: String,
    surveyTitle: String,
    createdBy: String,

    question1: String,
    q1option1: String, 
    q1option2: String,
    q1option3: String,
    q1option4: String,

    question2: String,
    q2option1: String,
    q2option2: String,
    q2option3: String,
    q2option4: String,

    question3: String,
    q3option1: String,
    q3option2: String,
    q3option3: String,
    q3option4: String,

    question4: String,
    q4option1: String,
    q4option2: String,
    q4option3: String,
    q4option4: String,

    question5: String,
    q5option1: String,
    q5option2: String,
    q5option3: String,
    q5option4: String
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);