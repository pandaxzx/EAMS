/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */
var RBACDeptCtrl = function ($scope,$uibModal,$log,RBACDeptService) {
    $scope.dept = {
        id  : undefined,
        pid: undefined,
        name : undefined,
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
        if( data && 0 < data.length ){
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
    var updData = function (dept){
        if(!dept || !dept.id){
            return ;
        }
        var map = $scope.result.map;
        var deptId = dept.id;
        for(var id in map){
            if(deptId == id){
                map[id]=dept;
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
        RBACDeptService.find(reqPage).then(setResult);
    };
    $scope.find = function(){
        var reqPage = $scope.result.page;
        
        var selectDto = {
            id  :  $scope.dept.id,
            page: {
                pageNum : reqPage.current - 1,
                pageSize: reqPage.pageSize
            }
        };
        if( selectDto.id ){
            RBACDeptService
                .get(selectDto)
                .then(function(res){
                    setResult(res);
                });
        }else{
            $scope.findAll();
        }
    };
    $scope.toAdd =  function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/rbac_dept/view/add.html',
            controller: 'RBACDeptModalCtrl',
            backdrop: "static",
            size: 'lg',
            resolve : {
                data: function () {
                    return {
                        depts: $scope.result.map,
                    };
                }
            }
        });

        modalInstance.result.then(function (dept) {
            // $log.info('Modal dismissed at: ' + selectedItem + "," + new Date());
            
            RBACDeptService.create(dept).then(
                function(res){
                    if(res){
                        $scope.findAll();
                    }
                }
            );
            
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
            RBACDeptService
                .delete({id:id})
                .then(function(res){
                    $scope.findAll();
            });
        }, function () {
            
        });
    };
    $scope.toUpd = function (dept) {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/rbac_dept/view/add.html',
            controller: 'RBACDeptModalCtrl',
            backdrop: "static",
            size: 'lg',
            resolve: {
                data: function(){
                    return {
                        dept:dept,
                        depts: $scope.result.map,
                    };
                }
            }
        });

        modalInstance.result.then(function (dept) {
            // $log.info('Modal dismissed at: ' + selectedItem + "," + new Date());
            
            RBACDeptService.update(dept).then(
                function(res){
                    if(res){
                        updData(dept);
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
            maxDate: $scope.dept.updateAtLte || new Date(),
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
            minDate: $scope.dept.updateAtGte,
        }
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.findAll();
};

var RBACDeptModalCtrl = function ($scope, $uibModalInstance, data) {
    $scope.dept = angular.copy(data.dept);
    $scope.depts = angular.copy(data.depts);
    $scope.confirm = function () {
        $uibModalInstance.close($scope.dept);
    };
    $scope.close = function () {
        $uibModalInstance.dismiss("cancel");
    };

};