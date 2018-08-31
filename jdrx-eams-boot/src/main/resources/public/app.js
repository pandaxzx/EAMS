/**
 * 说明：应用入口
 * 创建人：pluto
 * 创建时间：2018/8/3
 */

angular.module('app', ['ui.bootstrap', 'w5c.validator', 'app.route', 'app.menu', 'app.breadcrumb','app.interceptor'])
    .config(['$httpProvider','w5cValidatorProvider', function ($httpProvider, w5cValidatorProvider) {
        w5cValidatorProvider.config({
            blurTrig: true,
            showError: true,
            removeError: true
        });
        $httpProvider.interceptors.push('httpInterceptor');
    }])
    .config(function($stateProvider, $urlRouterProvider,$locationProvider){
        //路由依旧表现的与之前版本的一致  /#!/
        $locationProvider.hashPrefix('');
        $urlRouterProvider.when("", "/login");
        $urlRouterProvider.when("/main", "/main/home");
        $urlRouterProvider.otherwise("/login");
    })
    .run(['$rootScope', function ($root) {
        $root.$on('$stateChangeStart', function (e, newUrl, oldUrl) {
            if (newUrl !== oldUrl) {
                NProgress.start();
            }
        });
        $root.$on('$stateChangeSuccess', function () {
            NProgress.done();
        });
        $root.$on('$stateChangeError', function () {
            NProgress.done();
        });
    }]);