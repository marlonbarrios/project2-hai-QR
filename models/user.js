const mongoose =require('mongoose')

const Schema = mongoose.Schema;
// Create a user Schema
// The userSchema will have the following fields
// 1) username - String
// 2) password field - String
// 3) (optional) timestamps 

const userSchema = new Schema({
    username: String,
    password: String,
    passwordMatch: String,
    // isAuthor: Boolean,
}, { timestamps: true });

const createdBy = mongoose.model('User', userSchema);
// Export the result of compiling our Schema into a model
module.exports = mongoose.model('User', userSchema);