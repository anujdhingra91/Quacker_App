var app = require("../server"),
    request = require("supertest"),
    should = require("should"),
    app = request.agent(app);

describe("Quack", function () {
    var testQuack;

    before(function (done) {
        app
            .post("/users")
            .send({
                username: "ajcrites",
                password: "password123",
                email: "acrites@mobiquityinc.com",
            })
            .end(function () {
                app
                    .post("/authorize")
                    .send({
                        username: "ajcrites",
                        password: "password123",
                    })
                    .end(function (err, res) {
                        done(err);
                    });
            });
    });

    it("create a quack", function (done) {
        app
            .post("/quacks")
            .send({
                message: "This is a test quack",
            })
            .expect(201)
            .end(function (err, resp) {
                done(err);
            });
    });

    it("create a quack with images", function (done) {
        app
            .post("/quacks")
            .send({
                message: "This is another quack",
                images: [
                    {
                        src: "foo",
                        caption: "bar",
                    },
                    {
                        src: "baz",
                        caption: "quux",
                    }
                ]
            })
            .expect(201)
            .end(function (err, resp) {
                testQuack = resp.body._id;
                done(err);
            });
    });

    it("mark a quack as read and unread", function (done) {
        app
            .post("/quacks/" + testQuack + "/read")
            .send({read: true})
            .expect(200)
            .end(function () {
                app
                    .post("/quacks/" + testQuack + "/read")
                    .send({read: false})
                    .expect(200)
                    .end(done);
            });
    });
});
