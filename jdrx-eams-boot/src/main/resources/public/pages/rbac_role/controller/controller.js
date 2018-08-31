/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */
var RBACRoleCtrl = function ($scope,$uibModal,$log,RBACRoleService) {
    $scope.role = {
        id  : undefined,
        name: undefined,
    };
    $scope.result = {
        map : {},
        page:{
            current : 1,
            pageSize: 5,
            total   : 0,
        }
    };

    // 更新 $scope 属性
    var setResult = function(resultData){
        if( resultData ){
            var page = {
                total    : resultData.total || resultData.length,
                pageSize : resultData.pageSize,
                current  : resultData.pageNum || 1
            };                    
            setData(resultData);
            setPage(page);
        }
    };
    var setData = function (data){
        var map = {};
        if( !Array.isArray(data) ){
            data = [data];
        }
        data && 0 < data.length && data.forEach(function(item){map[item.id]=item;});
        $scope.result.map = map;
    };
    var setPage = function (page){
        $scope.result.page.total = page.total;
        $scope.result.page.pageSize = page.total;
    };
    var updData = function (role){
        if(!role || !role.id){
            return ;
        }
        var map = $scope.result.map;
        var roleId = role.id;
        for(var id in map){
            if(roleId == id){
                map[id]=role;
                break;
            }
        }
    };


    // 绑定事件
    $scope.find = function(){
        var reqPage = $scope.result.page;
        
        var selectDto = {
            id  :  $scope.role.id,
            page: {
                pageNum : reqPage.current - 1,
                pageSize: reqPage.pageSize
            }
        };
        RBACRoleService.get(selectDto).then(function(res){setResult([res]);});
    };
    $scope.findAll = function(){
        var reqPage = $scope.result.page;
        reqPage = {
            pageNum : reqPage.current - 1,
            pageSize: reqPage.pageSize
        };
        RBACRoleService.find(reqPage).then(setResult);
    };
    $scope.toAdd =  function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/rbac_role/view/add.html',
            controller: 'RBACRoleModalCtrl',
            backdrop: "static",
            size: 'lg',
            resolve : {
                data: function () {
                    return {};
                }
            }
        });

        modalInstance.result.then(function (role) {
            // $log.info('Modal dismissed at: ' + selectedItem + "," + new Date());
            
            var promise = RBACRoleService.create(role);
            promise && promise.then($scope.findAll);
        }, function (aaa) {
            $log.info('Modal cancel at: ' + aaa + "," + new Date());
        });
    };
 
    $scope.del = function (id) {
        layer.confirm('确定删除该记录吗？', {
            btnAlign: 'c',
            closeBtn: 1,
            btn: ['确定', '取消'] //按钮
        }, function () {
            var promise = RBACRoleService.delete({id}).then($scope.findAll);
            promise && promise.then($scope.findAll);
        }, function () {
            
        });
    };
    $scope.toUpd = function (role) {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/rbac_role/view/add.html',
            controller: 'RBACRoleModalCtrl',
            backdrop: "static",
            size: 'lg',
            resolve: {
                data: function(){
                    return role;
                }
            }
        });

        modalInstance.result.then(function (role) {
            // $log.info('Modal dismissed at: ' + selectedItem + "," + new Date());
            
            var promise = RBACRoleService.update(role);
            promise && promise.then(
                function(){
                    updData(role);
                }
            );
        }, function (aaa) {
            $log.info('Modal cancel at: ' + aaa + "," + new Date());
        });
    };
    $scope.onPageChange = function () {
        console.log('aaa',$scope.result.page.current);
        $scope.find();
    };


    
    $scope.dat = new Date();
    $scope.format = "yyyy/MM/dd";
    $scope.altInputFormats = ['yyyy/M!/d!'];

    $scope.popup1 = {
        opened: false,
        dateOptions:{
            maxDate: $scope.role.updateAtLte || new Date(),
        },
        modelOptions:{
            timezone: true
        }
    };
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.popup2 = {
        opened: false,
        dateOptions:{
            minDate: $scope.role.updateAtGte,
        }
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.findAll();
};

var RBACRoleModalCtrl = function ($scope, $uibModalInstance, data) {
    $scope.role = angular.copy(data);
    $scope.gender = ["MALE","FEMALE"];
    $scope.confirm = function () {
        $uibModalInstance.close($scope.role);
    };
    $scope.close = function () {
        $uibModalInstance.dismiss("cancel");
    };

};