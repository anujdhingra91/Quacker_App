var mongoose = require("mongoose"),
    Image = require("./Image"),
    Schema = mongoose.Schema;

var QuackSchema = new Schema({
    message: {type: String, required: true},
    user: {type: Schema.ObjectId, ref: "User"},
    readers: [{type: Schema.ObjectId, ref: "User"}],
    images: [{type: Schema.ObjectId, ref: "Image"}],
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Quack", QuackSchema);
