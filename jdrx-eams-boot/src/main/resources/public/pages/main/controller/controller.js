/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */
var MainCtrl = function ($scope,$sce) {
    $scope.aaa = 'aaa';
    $scope.htmlTooltip = $sce.trustAsHtml('代码示例 <code>id:5</code>');
    $scope.menus = [
        // {
        //     label: '首页',
        //     route: 'main.home',
        //     badge: '1',
        //     icon: 'glyphicon-th-large'
        // }, {
        //     label: '基础列表',
        //     route: 'main.list',
        //     badge: '',
        //     icon: 'glyphicon-globe'
        // }, {
        //     label: '学生列表',
        //     route: 'main.student',
        //     badge: '',
        //     icon: 'glyphicon-globe'
        // }, 
        {
            label: '资产管理',
            route: 'main.eams',
            badge: '',
            icon: 'glyphicon-globe'
        }, {
            label: '权限管理',
            // route: 'main.rbac',
            badge: '',
            icon: 'glyphicon-globe',
            children: [
                {
                    label: '用户管理',
                    route: 'main.rbac_user',
                    badge: ''
                }, {
                    label: '角色管理',
                    route: 'main.rbac_role',
                    badge: ''
                },{
                    label: '部门管理',
                    route: 'main.rbac_dept',
                    badge: ''
                },{
                    label: '资源管理',
                    route: 'main.rbac_resource',
                    badge: ''
                }
            ]
        },
        //  {
        //     label: '系统管理',
        //     badge: '',
        //     icon: 'glyphicon-cog',
        //     children: [
        //         {
        //             label: '用户管理',
        //             route: 'main.student',
        //             badge: ''
        //         }, {
        //             label: '角色管理',
        //             route: 'main.main2',
        //             badge: ''
        //         }
        //     ]
        // }
    ];
};