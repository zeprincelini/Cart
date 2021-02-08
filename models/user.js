const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {required: true, type: String},
    password: {required: true, type: String}
});

userSchema.methods.encryptPassword = function(password){
    bcrypt.hash(password, 10, function(err, hash){
        if(err){
            console.log(err);
        }
        return hash;
    })
};

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);