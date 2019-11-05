const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique: true},
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    userImg: String,
});

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;