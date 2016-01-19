var server,
    http = require("http"),
    express = require("express"),
    cookie = require("cookie"),
    cookieParser = require("cookie-parser"),
    cookieSession = require("cookie-session"),
    passport = require("passport"),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/quacker_devel");

app.use(cookieParser());
app.use(cookieSession({
    secret: "quacker-secret",
    key: "express.sid"
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static("public"));

app.authCheck = function (req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        res.status(403).end();
    }
}

require("./src/auth/routes")(app);
require("./src/quack/routes")(app);

if (require.main === module) {
    server = http.createServer(app);
    server.listen(process.env.PORT || 3004, function () {
        console.log("Server is listening on " + (process.env.PORT || 3004));
    });
    server.on("error", function (err) {
        if (err) {
            throw err;
        }
    });
}

module.exports = app;
