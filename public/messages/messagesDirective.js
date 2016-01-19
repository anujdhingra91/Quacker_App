angular.module('quacker').directive('messages', [
    function() {
        return {
            templateUrl: 'messages/messages.html',
            controller: 'MessagesController as messages'
        }
    }
]);