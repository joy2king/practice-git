(function() {
    'use strict'

    angular.module('main')
        .controller('LoginCtrl',['$http','LoginService','$sce',
            function($http,LoginService,$sce){
                    var scope = this;
                    scope.signup = function(user) {
                        $http.post('/api/login', user).success(function(info) {
                            if(info.username)
                            LoginService.loginModal.close({username:info.nickname});
                            //TODO:handle error
                        });
                    }
                    scope.login = function(user) {
                        user.isLogin = true;
                        $http.post('/api/login', user).success(function(info) {
                            if (info.status) {
                                scope.username = user.username;
                                LoginService.loginModal.close({username:user.nickname}); 
                            }
                          scope.errmsg =$sce.trustAsHtml('<i>Login Failed :'+(info.err||'Unknow error')+'</i>');
                        });
                    };
                   


        
        }])
})();
