angular.module('quacker').controller('MessagesController', ['user',
    function(user) {
        var self = this;

        self.messages = user.messages;

        self.close = function(index) {
            user.removeMessage(index);
        };
    }
]);