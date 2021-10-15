const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    passwordMatch: String,

}, {
    timestamps: true
});

const createdBy = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);