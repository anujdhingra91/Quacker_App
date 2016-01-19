angular.module("quacker", ["ui.router"]).config(["$stateProvider", "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: 'home.html'
            })
            .state("login", {
                url: '/login',
                templateUrl: 'logIn/log-in.html',
                controller: 'LogInController as logIn'
            })
            .state("logout", {
                url: '/logout',
                controller: ['$state', 'user', function ($state, user) {
                    user.logout().then(function (result) {
                        $state.go('login');
                    });
                }]
            })
            .state("register", {
                url: '/register',
                templateUrl: 'register/register.html',
                controller: 'RegisterController as register'
            })
            .state("profile", {
                url: "/profile",
                abstract: true,
                template: '<div ui-view></div>'
            })
            .state("profile.edit", {
                url: '/edit',
                templateUrl: 'profile/edit-profile.html',
                controller: 'EditProfileController as edit'
            })
            .state("profile.view", {
                url: '/:id',
                templateUrl: 'profile/view-profile.html',
                controller: 'ViewProfileController as view'
            });

    }
]);