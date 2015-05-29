var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var schema = new Schema({
    name: String
});
module.exports = Mongoose.model('Place', schema);