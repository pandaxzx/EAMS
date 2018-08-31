/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */
var LoginCtrl = function ($scope, $state) {
    $scope.user = {};
    $scope.submit = function () {
        console.log($scope.user);
        if($scope.user.username === 'admin' && $scope.user.password === '123'){
            $state.go("main.home");
        }else{
            layer.msg('用户名或者密码错误',{icon: 2});
        }
    }
};