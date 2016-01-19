var mongoose = require("mongoose"),
    User = require("./model/User");

module.exports = function (app) {
    // Determine whether the user is currently logged in
    app.get("/authorize", function (req, res) {
        res.status(200);
        if (req.session.user) {
            res.json(req.session.user);
        }
        else {
            res.json(false);
        }
    });

    // Log user in
    app.post("/authorize", function (req, res) {
        console.log(req.body);
        User.findOne({username: req.body.username}, function (err, user) {
            if (user && user.password == req.body.password) {
                req.session.user = user;
                res.cookie("user", user.username, {
                    httpOnly: false,
                });
                res.status(200).json(user);
                res.end();
            }
            else {
                res.status(401).end();
            }
        });
    });

    // Create new user
    app.post("/users", function (req, res) {
        var user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            avatar: req.body.avatar,
        });

        user.save(function (err) {
            if (err) {
                res.status(500).end();
            }
            else {
                res.status(201).json(user);
            }
        });
    });

    app.patch("/users", app.authCheck, function (req, res) {
        User.findByIdAndUpdate(req.session.user._id, {
            password: req.body.password,
            email: req.body.email,
            avatar: req.body.avatar
        }, function (err, user) {
            if (err) {
                res.status(500).end();
            }
            else {
                res.status(200).json(user);
            }
        });
    });

    // Log user out
    app.delete("/authorize", app.authCheck, function (req, res) {
        req.session = null;
        res.clearCookie("user");
        res.status(200).end();
    });

    app.get("/user/:id", app.authCheck, function (req, res) {
        User.findOne({_id: req.params.id}, function (err, user) {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }
            if (!user) {
                return res.status(404).end();
            }

            res.status(200).json(user);
        });
    });
}
