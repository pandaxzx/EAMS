/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */
var StudentCtrl = function ($scope,$uibModal,$log,StudentService) {
    $scope.stu = {
        id  : undefined,
        name: undefined,
        updateAtGte: undefined,
        updateAtLte: undefined
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
                total    : resultData.total,
                pageSize : resultData.pageSize,
                current  : resultData.pageNum
            };                    
            setData(resultData.data);
            setPage(page);
        }
    };
    var setData = function (data){
        var map = {};
        data && 0 < data.length && data.forEach(function(item){map[item.id]=item;});
        $scope.result.map = map;
    };
    var setPage = function (page){
        $scope.result.page.total = page.total;
    };
    var updData = function (stu){
        if(!stu || !stu.id){
            return ;
        }
        var map = $scope.result.map;
        var stuId = stu.id;
        for(var id in map){
            if(stuId == id){
                map[id]=stu;
                break;
            }
        }
    };


    // 绑定事件
    $scope.find = function(){
        var reqPage = $scope.result.page;
        var blogs = $scope.stu.blogs;

        if(typeof blogs == "string"){
            blogs = blogs.split(',')
                    .filter(function(str){
                        return str && str.trim();
                    });
            $scope.stu.blogs = blogs;
        }
        
        var selectDto = {
            student : $scope.stu,
            page    : {
                pageNum : reqPage.current - 1,
                pageSize: reqPage.pageSize
            }
        };
        StudentService.listBy(selectDto).then(setResult);
    };
    $scope.findAll = function(){
        var reqPage = $scope.result.page;
        reqPage = {
            pageNum : reqPage.current - 1,
            pageSize: reqPage.pageSize
        };
        StudentService.listAll(reqPage).then(setResult);
    };
    $scope.toAdd =  function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/student/view/add.html',
            controller: 'StudentModalCtrl',
            backdrop: "static",
            size: 'lg',
            resolve : {
                data: function () {
                    return {};
                }
            }
        });

        modalInstance.result.then(function (stu) {
            // $log.info('Modal dismissed at: ' + selectedItem + "," + new Date());
            
            var promise = StudentService.create([stu]);
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
            var promise = StudentService.delete({id}).then($scope.findAll);
            promise && promise.then($scope.findAll);
        }, function () {
            
        });
    };
    $scope.upd = function (stu) {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/student/view/add.html',
            controller: 'StudentModalCtrl',
            backdrop: "static",
            size: 'lg',
            resolve: {
                data: function(){
                    return stu;
                }
            }
        });

        modalInstance.result.then(function (stu) {
            // $log.info('Modal dismissed at: ' + selectedItem + "," + new Date());
            
            var promise = StudentService.update(stu);
            promise && promise.then(
                function(){
                    updData(stu);
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
            maxDate: $scope.stu.updateAtLte || new Date(),
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
            minDate: $scope.stu.updateAtGte,
        }
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.findAll();
};

var StudentModalCtrl = function ($scope, $uibModalInstance, data) {
    $scope.stu = angular.copy(data);
    $scope.gender = ["MALE","FEMALE"];
    $scope.confirm = function () {
        $uibModalInstance.close($scope.stu);
    };
    $scope.close = function () {
        $uibModalInstance.dismiss("cancel");
    };

};