/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */
var LoginCtrl = function ($scope, $state, RBACLoginService) {
    $scope.user = {};
    $scope.submit = function () {
        console.log($scope.user);

        RBACLoginService
            .login($scope.user)
            .then(function(res){
                if(res){
                    RBACLoginService.setLoggedUser(res);
                    $state.go("main.home");
                }else{
                    layer.msg('用户名或者密码错误',{icon: 2});
                }
            });

        // if($scope.user.username === 'admin' && $scope.user.password === '123'){
        //     $state.go("main.home");
        // }else{
        // }
    };
};