// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    local            : {
        email        : String,
        password     : String,
        name         : String,
        phone        : String,
        cpf          : String
    },
    supervisor   : Boolean

});
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.validCpf = function(cpf) {
    console.log(this.local.cpf);
    return cpf.toString()==this.local.cpf;
};
module.exports = mongoose.model('User', userSchema);