/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */

angular.module('app.rbac_role',['ui.router','ui.bootstrap', 'w5c.validator'])
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
        $stateProvider.state('main.rbac_role',{
            url: '/rbac/role',
            templateUrl: 'pages/rbac_role/view/view.html',
            controller: 'RBACRoleCtrl',
            controllerAs: 'rbac_role',
            resolve: {},
            ncyBreadcrumb: {
                label: '角色管理',
                parent: "main"
            }
        });
    }])
    .controller("RBACRoleCtrl", RBACRoleCtrl)
    .controller('RBACRoleModalCtrl',RBACRoleModalCtrl)
    .service('RBACRoleService', RBACRoleService);
