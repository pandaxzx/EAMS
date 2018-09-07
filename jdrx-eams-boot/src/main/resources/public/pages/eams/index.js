/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */

angular.module('app.eams',['ui.router','ui.bootstrap', 'w5c.validator'])
    .config(['w5cValidatorProvider','$stateProvider',function (w5cValidatorProvider, $stateProvider) {
        //验证规则
        w5cValidatorProvider.setRules({
            name: {
                required : '编号不能为空',
                maxlength: '编号长度不能大于{maxlength}'
            },
            age: {
                required : '描述不能为空',
                pattern  : '年龄在1-100之间',
            },
            gender: {
                required : "该选项不能为空"
            }
        });
        $stateProvider.state('main.eams',{
            url: '/eams',
            templateUrl: 'pages/eams/view/view.html',
            controller: 'EAMSCtrl',
            controllerAs: 'eams',
            resolve: {},
            ncyBreadcrumb: {
                label: '资产管理',
                parent:"main"
            }
        });
    }])
    .controller("EAMSCtrl", EAMSCtrl)
    .controller('EAMSModalCtrl',EAMSModalCtrl)
    .service('EAMSService', EAMSService);
