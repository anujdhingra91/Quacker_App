angular.module("quacker").controller("ViewProfileController", ["$stateParams", "user",
    function ($stateParams, user) {
        var self = this;

        self.info = {};

        user.getInfo($stateParams.id || user.info._id).then(function (response) {
            console.log('retrieveduser info in ViewProfileController');
            angular.extend(self.info, response);
        });
    }
]);