/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/9
 */

angular.module('app.breadcrumb', ['ui.router'])
    .directive('ngBreadcrumb', function ($state,$stateParams,$interpolate,$rootScope) {
        /**
         * 返回当前状态或者当前状态的父状态
         * @param stateName
         */
        function breadcrumbParentState (stateName) {
            var curState = $state.get(stateName);
            if (curState.abstract)
                return; //如果状态配置了面包屑对象，并且配置了parent属性
            if (curState.ncyBreadcrumb && curState.ncyBreadcrumb.parent) {
                var isFunction = typeof curState.ncyBreadcrumb.parent === 'function';
                //判断父状态的配置属性是否是函数
                var parentStateRef = isFunction ? curState.ncyBreadcrumb.parent($rootScope) : curState.ncyBreadcrumb.parent;
                if (parentStateRef) {
                    return parentStateRef;
                }
            }
            //返回当前状态的父状态
            //let parent = curState.parent(/^(.+)\.[^.]+$/.exec(curState.name) [])[1];
            var isObjectParent = typeof parent === "object";
            return isObjectParent ? parent.name : parent;
        }
        /**
         * 生成面包屑
         * @param chain
         * @param stateName
         */
        function generateBreadcrumbs(chain, stateName) {
            var skip = false;
            var displayName, breadcrumbLabel;
            //如果状态已经存在状态链中，直接返回
            for (var i = 0; i < chain.length; i++) {
                if (chain[i].name === stateName) {
                    return;
                }
            }
            var state = $state.get(stateName);
            if (state.ncyBreadcrumb && state.ncyBreadcrumb.label) {
                breadcrumbLabel = state.ncyBreadcrumb.label;
                displayName = $interpolate(breadcrumbLabel)($rootScope);
            } else {
                displayName = state.name;
            }
            if (state.ncyBreadcrumb) {
                if (state.ncyBreadcrumb.skip) {
                    skip = true;
                }
            }
            if (!state.abstract && !skip) {//如果当前状态不是抽象的，并且skip为false
                // 需要显示参数的面包屑
                if (state.ncyBreadcrumb && state.ncyBreadcrumb.param) {
                    chain.push({link: stateName, label: $stateParams[state.ncyBreadcrumb.param], abstract: false});
                }
                chain.push({
                    link: stateName,
                    label: displayName,
                    abstract: false
                });
            }
        }

        function updateBreadcrumbs() {
            var breadcrumbs = [];
            for (var curState = $state.$current.name; curState; curState = breadcrumbParentState(curState)) {
                generateBreadcrumbs(breadcrumbs, curState);
            }
            return breadcrumbs.reverse();
        }


        return{
            restrict: 'E',
            replace: true,
            template:'<ol class="breadcrumb">' +
            '    <li ng-repeat="step in steps" ng-class="{active:$last}" ng-switch="$last">' +
            '        <a ng-switch-when="false" ui-sref="{{step.link}}">{{step.label}}</a>' +
            '        <span ng-switch-when="true">{{step.label}}</span>' +
            '    </li>' +
            '</ol>',
            scope: {},
            link: function(scope, element, attrs) {
                scope.$on('$stateChangeSuccess', function () {
                    scope.steps = updateBreadcrumbs();
                });
            }
        }
    });