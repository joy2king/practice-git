(function() {
    'use strict'

    angular.module('main')
        .controller('LoginCtrl',['$scope','$http','LoginService','$sce',
            function(scope,$http,LoginService,$sce){
                    scope.signup = function(user) {
                        $http.post('/api/login', user).success(function(user) {
                            scope.username = user.name;

                        });
                    }
                    scope.login = function(user) {
                        user.isLogin = true;
                        $http.post('/api/login', user).success(function(info) {
                            if (info.status) {
                                scope.username = user.name;
                                LoginService.loginModal.close({username:user.name}); 
                            }
                          scope.errmsg =$sce.trustAsHtml('<i>Login Failed :'+(info.err||'Unknow error')+'</i>');
                        });
                    };
                   


        
        }])
})();
