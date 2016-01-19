angular.module("quacker").controller("LogInController", ['$state', 'user',
    function ($state, user) {
        var self = this;

        self.username = '';
        self.password = '';

        self.login = function () {
            user.login(self.username, self.password).then(function (result) {
                if (result.status === 200)
                    $state.go('home');
            });
        };

    }
]);
