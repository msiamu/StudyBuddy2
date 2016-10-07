var db = require('../db/cloudantModel.js');
var conversation = require('../BluemixServices/WatsonConversation/WatsonConversationModule.js');
console.log("----------conversation in question module connected--------------");
console.log(conversation);
var Question = function ( questionText, phoneNumber, clientID ) {  

    var data = {
        "questionText": questionText,
        "phoneNumber": phoneNumber,
        "clientID": clientID,
        "conversationID": 0,
    };
    this.data = data;
    return this;
};


Question.prototype.getDetails = function () {
    console.log("Getting question data");
    
    return this.data;
};

Question.prototype.getAll = function () {
    console.log(db);
    db.list(function(err, allDbs) {
            console.log('All my databases: %s', allDbs.join(', '))
    });
};

Question.prototype.askQuestion = function(question) {
    console.log(question);
}

Question.prototype.findById = function (id, callback) {  
    db.get('questions', {id: id}).run(function (err, data) {
        if (err) return callback(err);
        callback(null, new User(data));// first parameter is for error the other is for data so callback function( error, data){ do business logic in here but this is in OTHER FILE}
    });
};

module.exports = Question;
