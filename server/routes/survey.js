const e = require('express');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let surveyController = require('../controllers/survey');

//helper function for Guard

function requireAuth(req,res, next)
{
    //to check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}

/* Get Route for our Book List Page */

router.get('/', surveyController.displaySurvey);


//Get Route For Add Page - Create Application
  
router.get('/create', requireAuth, surveyController.displayCreatePage);

//Post Route for processing
router.post('/create', requireAuth, surveyController.displayProcessCreatePage);

// Get Route for Edit Page - Update Operations

router.get('/edit/:id', requireAuth, surveyController.displayEditPage);


//Post Route for processing - Update

router.post('/edit/:id', requireAuth, surveyController.displayProcessEditPage);

//Get route for performing deletion

router.get('/delete/:id', requireAuth, surveyController.ProcessDelete);

module.exports = router;