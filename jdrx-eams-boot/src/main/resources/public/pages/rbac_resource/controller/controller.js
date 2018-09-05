/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */
var RBACResourceCtrl = function ($scope,$uibModal,$log,RBACResourceService) {
    $scope.resource = {
        id  : undefined,
        name: undefined,
        pwd : undefined,
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
        if(data && 0 < data.length ){
            data.forEach(function(item){
                map[item.id]=item;
            });
        }
        $scope.result.map = map;
    };
    var setPage = function (page){
        $scope.result.page.total = page.total;
        $scope.result.page.pageSize = page.total;
    };
    var updData = function (resource){
        if(!resource || !resource.id){
            return ;
        }
        var map = $scope.result.map;
        var resourceId = resource.id;
        for(var id in map){
            if(resourceId == id){
                map[id]=resource;
                break;
            }
        }
    };


    // 绑定事件
    $scope.findAll = function(){
        var reqPage = $scope.result.page;
        reqPage = {
            pageNum : reqPage.current - 1,
            pageSize: reqPage.pageSize
        };
        RBACResourceService.find(reqPage).then(setResult);
    };
    $scope.find = function(){
        var reqPage = $scope.result.page;
        
        var selectDto = {
            id  :  $scope.resource.id,
            page: {
                pageNum : reqPage.current - 1,
                pageSize: reqPage.pageSize
            }
        };
        if( selectDto.id ){
            RBACResourceService
                .get(selectDto)
                .then(function(res){
                    setResult([res]);
                });
        }else{
            $scope.findAll();
        }
    };
    $scope.toAdd =  function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/rbac_resource/view/add.html',
            controller: 'RBACResourceModalCtrl',
            backdrop: "static",
            size: 'lg',
            resolve : {
                data: function () {
                    return {
                        resources: $scope.result.map,
                    };
                }
            }
        });

        modalInstance.result.then(function (resource) {
            // $log.info('Modal dismissed at: ' + selectedItem + "," + new Date());
            
            RBACResourceService
                .create(resource)
                .then(function(res){
                    if(res){
                        $scope.findAll();
                    }
                });
        }, function (aaa) {
            $log.info('Modal cancel at: ' + aaa + "," + new Date());
        });
    };
 
    $scope.del = function (resource) {
        layer.confirm('确定删除该记录吗？', {
            btnAlign: 'c',
            closeBtn: 1,
            btn: ['确定', '取消'] //按钮
        }, function () {
            RBACResourceService
                .delete(resource)
                .then(function(res){
                    if(res){
                        $scope.findAll();
                    }
                });
        }, function () {
            
        });
    };
    $scope.toUpd = function (resource) {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/rbac_resource/view/add.html',
            controller: 'RBACResourceModalCtrl',
            backdrop: "static",
            size: 'lg',
            resolve: {
                data: function(){
                    return {
                        resource:resource,
                        resources: $scope.result.map,
                    };
                }
            }
        });

        modalInstance.result.then(function (resource) {
            // $log.info('Modal dismissed at: ' + selectedItem + "," + new Date());
            
            RBACResourceService
                .update(resource)
                .then(function(res){
                    if(res){
                        updData(resource);
                    }
                });
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
            maxDate: $scope.resource.updateAtLte || new Date(),
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
            minDate: $scope.resource.updateAtGte,
        }
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.findAll();
};

var RBACResourceModalCtrl = function ($scope, $uibModalInstance, data) {
    $scope.resource = angular.copy(data.resource);
    $scope.resources = angular.copy(data.resources);
    $scope.confirm = function () {
        $uibModalInstance.close($scope.resource);
    };
    $scope.close = function () {
        $uibModalInstance.dismiss("cancel");
    };

};