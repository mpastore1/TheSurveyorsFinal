

let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET Log In Page */
router.get('/login', indexController.displayLoginPage);

/* Post Processing Log In Page */
router.post('/login', indexController.ProcessingLoginPage);

/* GET Log In Register Page */
router.get('/register', indexController.displayRegisterPage);

/* Post Processing Register Page */
router.post('/register', indexController.ProcessingRegisterPage);

/* GET Processing Log OutPage */
router.get('/logout', indexController.ProcessingLogOut);

module.exports = router;
