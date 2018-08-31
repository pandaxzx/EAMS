/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/9
 */

angular.module('app.menu',[]).directive('jdrxMenu',function () {
    return{
        restrict: "E",
        replace: true,
        template: function (tElement, tAttrs) {
            var _html = '<ul class="nav nav-tabs nav-stacked" style="">' +
                '           <li ng-repeat="menu in menus" ng-class="{\'active\':isActive(menu)}">' +
                '               <a class="nav-header collapsed" ng-click="menuClick(menu)">' +
                '                   <i class="glyphicon {{menu.icon}}"></i>' +
                '                   {{menu.label}}' +
                '                   <span ng-if="menu.children && menu.children.length > 0" class="pull-right glyphicon glyphicon-chevron-down"></span>' +
                '                   <span class="label label-warning pull-right">{{menu.badge}}</span>'+
                '               </a>' +
                '               <ul ng-if="menu.children && menu.children.length > 0" ng-class="{\'collapse\' : !menu.opened}" class="nav nav-list secondmenu">' +
                '                   <li ng-repeat="subMenu in menu.children" ng-class="{\'active\':isActive(subMenu)}">' +
                '                       <a ng-click="menuClick(subMenu)">' +
                // '                           <i class="glyphicon glyphicon-user"></i>' +
                '                           {{subMenu.label}}' +
                '                           <span class="label label-warning pull-right">{{subMenu.badge}}</span>'+
                '                       </a>' +
                '                   </li>' +
                '               </ul>' +
                '           </li>' +
                '       </ul>';
            return _html;
        },
        scope: {
            menus: '='
        },
        controller: function ($scope, $state) {
            $scope.isActive = function (menu) {
                var children = menu.children;
                if(children && children.length > 0){
                    return false;
                }
                if(menu.route === $scope.currentRouteName){
                    return true;
                }
                return false;
            };
            $scope.menuClick = function (menu) {
                if(menu.children && menu.children.length > 0){
                    menu.opened = !menu.opened;
                }else{
                    $state.go(menu.route);
                }
            };
            $scope.$on('$stateChangeSuccess', function () {
                $scope.currentRouteName = $state.$current.name;
                console.log($state.$current.name);
            });
        }
    }
});
