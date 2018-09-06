/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */

angular.module('app.login',['ui.router', 'w5c.validator'])
    .config(['w5cValidatorProvider','$stateProvider',function (w5cValidatorProvider, $stateProvider) {

        w5cValidatorProvider.setRules({
            username: {
                required: '名称不能为空',
                maxlength: '名称长度不能大于{maxlength}'
            },
            password: {
                required: '密码不能为空',
                maxlength: '密码长度不能大于{maxlength}'
            }
        });
        $stateProvider.state('login',{
            url: '/login',
            templateUrl: 'pages/login/view/view.html',
            controller: 'LoginCtrl',
            controllerAs: 'login',
            resolve: {}
        });
    }])
    .controller("LoginCtrl", LoginCtrl)
    .service("RBACLoginService",RBACLoginService);
