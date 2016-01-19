angular.module("quacker").directive ("quackList", function () {
    return {
        controller : "QuackListController as quacks",
        templateUrl : "quacks/quack-list.html"
    }
});