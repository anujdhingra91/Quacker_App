angular.module("quacker").controller("RegisterController", ['$state', 'user',
	function($state, user) {
        var self = this;

        self.registerUser = function() {
            user.register({
                username: self.username,
                password: self.password,
                avatar: self.avatar,
                email: self.email
            }).then(function(response) {
                user.addMessage('success', 'Registration was successful', response);
                $state.go('login');
            })
        };
	}
]);