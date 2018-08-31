/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */

angular.module('app.home',['ui.router'])
    .config(['$stateProvider',function ($stateProvider) {
        $stateProvider.state('main.home',{
            url: '/home',
            templateUrl: 'pages/home/view/view.html',
            controller: 'HomeCtrl',
            controllerAs: 'home',
            resolve: {},
            ncyBreadcrumb: {
                label: '系统首页',
                parent:"main"
            }
        })
    }])
    .controller("HomeCtrl", HomeCtrl)
    .service('HomeService', HomeService);
