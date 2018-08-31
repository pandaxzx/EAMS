/**
 * 登陆验证拦截器
 */
angular.module('app.interceptor',[])
    // .factory('authLoginInterceptor', ['$q', '$window', function ($q, $window) {
    //     //拦截器配置
    //     return {
    //         request: function (config) {
    //             var url = config.url;
    //             var login_info = getLocalStorage("login_info");
    //             //console.log("拦截登陆信息",url,login_info);
    //             if (login_info == null || login_info.token == null || login_info.token == "") {
    //                 $window.location.href = "../html/login.html";
    //             }
    //             return config || $q.when(config);
    //         }
    //     };
    // }])
    .factory('httpInterceptor', function ($q) {
        // var loading;
        return {
            'responseError': function (response) {
                // layer.close(loading);
                NProgress.done();
                return $q.reject(response);
            },
            'response': function (response) {
                // layer.close(loading);
                NProgress.done();
                return response;
            },
            'request': function (config) {
                // loading = layer.load(1, {
                //     shade: [0.5,'#000'] //0.1透明度的白色背景
                // });
                NProgress.start();
                return config;
            },
            'requestError': function (config) {
                // layer.close(loading);
                NProgress.done();
                return $q.reject(config);
            }
        }
    });
