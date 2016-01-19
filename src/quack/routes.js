var mongoose = require("mongoose"),
    Quack = require("./model/Quack"),
    Image = require("./model/Image");

module.exports = function (app) {
    app.get("/quacks", app.authCheck, function (req, res) {
        Quack.find({})
        .populate("images")
        .populate("user")
        .exec(function (err, result) {
            var quacks = [];
            if (err) {
                res.status(500).end();
            }
            else {
                result.forEach(function (quack, idx) {
                    var read = quack.readers.indexOf(req.session.user._id) !== -1;

                    quack = quack.toObject();
                    quack.read = read;

                    quacks.push(quack);
                });
                res.json(quacks);
                res.end();
            }
        });
    });

    app.post("/quacks/:id/read", app.authCheck, function (req, res) {
        var oper,
            query = {};

        if (req.body.read) {
            oper = "$push";
        }
        else {
            oper = "$pull";
        }
        query[oper] = {readers: req.session.user._id};

        Quack.findByIdAndUpdate(req.params.id, query, function (err) {
            if (err) {
                res.status(500).end();
            }
            else {
                res.status(200).end();
            }
        });
    });

    app.post("/quacks", app.authCheck, function (req, res) {
        if (req.body.images) {
            Image.collection.insert(req.body.images, createQuack);
        }
        else {
            createQuack();
        }

        function createQuack(err, images) {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }

            Quack.create({
                user: req.session.user._id,
                message: req.body.message,
                images: images,
            }, function (err, quack) {
                if (err) {
                    console.error(err);
                    res.status(500).end();
                }
                else {
                    quack
                        .populate("images")
                        .populate("user", function (err, quack) {
                            var quack = quack.toObject();
                            if (err) {
                                console.error(err);
                                res.status(500).end();
                            }
                            else {
                                quack.read = false;
                                res.status(201);
                                res.json(quack);
                                res.end();
                            }
                        });
                }
            });
        }
    });

    app.delete("/quacks/:id", app.authCheck, function (req, res) {
        Quack.findById(req.params.id, function (err, quack) {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }
            if (!quack) {
                return res.status(404).end();
            }

            if (quack.user.toString() == req.session.user._id) {
                quack.remove(function (err) {
                    if (err) {
                        console.error(err);
                        return res.status(500).end();
                    }

                    res.status(200).json(quack);
                });
            }
            else {
                res.status(403).end();
            }
        });
    });
};
