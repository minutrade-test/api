var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var schema = new Schema({
    from_place : { type: Schema.Types.ObjectId, ref: 'Place' },
    to_place : { type: Schema.Types.ObjectId, ref: 'Place' },
    from_date: String,
    to_date : String,
    score: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});
module.exports = Mongoose.model('Trip', schema);