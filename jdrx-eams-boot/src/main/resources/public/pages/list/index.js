/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */

angular.module('app.list',['ui.router','ui.bootstrap', 'w5c.validator'])
    .config(['w5cValidatorProvider','$stateProvider',function (w5cValidatorProvider, $stateProvider) {
        //验证规则
        w5cValidatorProvider.setRules({
            code: {
                required: '编号不能为空',
                maxlength: '编号长度不能大于{maxlength}'
            },
            desc: {
                required: '描述不能为空',
                maxlength: '描述长度不能大于{maxlength}'
            }
        });
        $stateProvider.state('main.list',{
            url: '/list',
            templateUrl: 'pages/list/view/view.html',
            controller: 'ListCtrl',
            controllerAs: 'list',
            resolve: {},
            ncyBreadcrumb: {
                label: '基础列表',
                parent:"main"
            }
        })
    }])
    .controller("ListCtrl", ListCtrl)
    .controller('ModalCtrl', ModalCtrl)
    .service('ListService', ListService);
