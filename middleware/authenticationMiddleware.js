var express = require("express");

var router = express.Router();

var User = require('../models/userModel.js');

var userModel = new User();
var Cloudant = require("cloudant");

var VCAP = require('../BluemixServices/StudyBuddy_VCAP_Services.json');
var username = VCAP["cloudantNoSQLDB"][0]["credentials"]["username"]; 
var password = VCAP["cloudantNoSQLDB"][0]["credentials"]["password"];
function cloudantMiddleware(req, res, next) {
    
    var latestUser = req.locals.newUser;
    userModel.findByPhoneNumber( latestUser.data.phoneNumber ).then(
    function successCallback( searchUser ) {
        console.log("FOUND THE USER!!!!!!!!!!!!!!!!!!");
        console.log(req.locals.newUser.userQuestion);
        if ( req.locals.userQuestion.toLowerCase()  == "yes" ) {
            console.log( "time to register new USER!!!!!" );
            userModel.create( latestUser ).then( 
            function successCallback( result ) {
                console.log( "promises are gr8t" );
                next();        
            },
            function failedCallback( error ) {
                console.log( error );
            });
        } 
        
    },
    function failedCallback( error ) {
        
		if ( req.locals.userQuestion.toLowerCase()  == "yes" ) {
            
			userModel.create( latestUser ).then( 
            function successCallback( result ) {
                console.log( "promises are gr8t" );
				res.send('<Response><Message>Welcome to StudyBuddy, ask me a computer science conceptual question./</Message></Response>');
                next();        
            },
            function failedCallback( error ) {
                console.log( error );
				res.send('<Response><Message>I am sorry, there was an error, please try again./</Message></Response>');
            });
        } 
        else { 
        	var message = 'Welcome to StudyBuddy please response with  yes   to register';
        	res.send('<Response><Message>'+message+'</Message></Response>');
		}
    });
};

router.get('/', cloudantMiddleware, function(req, res, next) {
    next();
});

router.post('/sendMessageBodyToWatson', cloudantMiddleware, function(req, res, next) {
    next();
});

function createNewUser( userData ) {
    return new Promise( function ( resolve, reject ) {
        
    });

};

module.exports = {
    cloudantHandler: router
}

