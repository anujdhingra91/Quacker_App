var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
    src: {type: String, required: true},
    caption: {type: String},
});

module.exports = mongoose.model("Image", ImageSchema);
