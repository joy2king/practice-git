(function() {
        "use strict"
        angular.module('main', ['ui.bootstrap', 'ui.router'])
            .config(['$compileProvider',
                function($compileProvider) {
                    $compileProvider.debugInfoEnabled(false);
                }
            ])
            .config(function($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('/');
                $stateProvider
                    .state('list', {
                        url: '/',
                        templateUrl: 'list.html',
                        controller: 'UserCtrl',
                        controllerAs: 'user'
                    })
                    .state('user', {
                        url: '/user',
                        templateUrl: 'user.html',
                        controller: 'UserCtrl',
                        controllerAs: 'user'
                    })

            })
            .service('LoginService', function($http) {
                var self = this;
                self.getUser = function() {
                    return $http.get('/api/login')
                }
                self.logout = function() {
                    return $http.get('/api/login/logout')
                }
            })

        .controller('UserCtrl', function($scope, $http, $uibModal, LoginService) {
                    var self = this;
                    LoginService.getUser().then(function(info) {
                        self.username = info.data.username;


                    })
                    self.logout = function() {
                        LoginService.logout().then(function() {
                            delete self.username
                        })
                    }
                    $http.get('/api/user').success(function(data) {
                        self.users = {};
                        data.forEach(function(user) {
                            self.users[user._id] = user;
                        });
                    })

                    self.add = function(user) {
                        $http.post('/api/user', user).success(function(data) {
                            self.users[data.user._id] = data.user;

                        });
                    }
                    self.selectUser = function(user) {
                        self.newUser = angular.copy(user);
                    }
                    self.updateUser = function(user) {
                        $http.put('/api/user', user).success(function(data) {
                            self.users[data.user._id] = data.user;
                        })
                    }
                    self.del = function(uid) {
                        $http.delete('/api/user/' + uid).success(function() {
                            delete self.users[uid];
                        })

                    }
                    self.openLoginForm = function() {
                        LoginService.loginModal = $uibModal.open({
                            templateUrl: 'login.html',
                            controller: 'LoginCtrl',
                            controllerAs: 'login'

                        });
                        LoginService.loginModal.result.then(function(data) {
                            self.username = data.username
                        })
                    }
                    self.openSigninForm = function() {
                        LoginService.loginModal = $uibModal.open({
                            templateUrl: 'signup.html',
                            controller: 'LoginCtrl',
                            controllerAs: 'login'

                        });
                        LoginService.loginModal.result.then(function(data) {
                            self.username = data.username
                        });

                    } }  ) })()
