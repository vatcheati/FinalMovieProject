var mongoose = require('mongoose');
var schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

//create schema
var Account = new schema({
username: String,
password: String,
name: String,
someID: String
});

Account.plugin(passportLocalMongoose);

//make public
module.exports = mongoose.model('Account', Account);