/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */

angular.module('app.main',['ui.bootstrap','ui.router'])
    .config(function ($stateProvider) {
        $stateProvider.state('main',{
            url: '/main',
            templateUrl: 'pages/main/view/view.html',
            controller: 'MainCtrl',
            controllerAs: 'main',
            resolve: {},
            ncyBreadcrumb: {
                label: '九鼎模板'
            }
        })
    }).controller("MainCtrl", MainCtrl);
