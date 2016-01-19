var mongoose = require("mongoose");

before(function (done) {
    mongoose.createConnection(process.env.MONGOLAB_URI);
    mongoose.connection.on("open", function () {
        mongoose.connection.db.dropDatabase(done);
    });
});
