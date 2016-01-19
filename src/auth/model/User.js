var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    email: {type: String},
    password: {type: String, required: true},
    avatar: {type: String},
});

module.exports = mongoose.model("User", UserSchema);
