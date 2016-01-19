angular.module("quacker").directive ("createQuack", function () {
    return {
        controller : "CreateQuackController as create",
        templateUrl : "quacks/create-quack.html"
    };
});