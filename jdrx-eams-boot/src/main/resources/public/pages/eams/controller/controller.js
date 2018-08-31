/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */
var EAMSCtrl = function ($scope,$uibModal,$log,EAMSService) {
    // 查询的对象
    $scope.server = {
        ip  : undefined,
        host: undefined,
        cpus : undefined, // array
        disks: undefined, // array
        memory: undefined,
        interfaces: undefined, //array
        startAt: undefined,
        status: undefined,
    };
    // 数据集合及分页信息
    $scope.result = {
        map : {},
        page:{
            current : 1,
            pageSize: 15,
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
        if( data && data.length ){
            data.forEach(function(item){
                map[item.ip]=item;
            });
        }
        $scope.result.map = map;
    };

    var setPage = function (page){
        var $page = $scope.result.page;
        if($page.current > page.total){
            $page.current = 1;
        }
        $page.total = page.total;
    };

    var updData = function (server){
        if(!server || !server.ip){
            return ;
        }
        var map = $scope.result.map;
        var serverIp = server.ip;
        for(var ip in map){
            if(serverIp == ip){
                map[ip]=server;
                break;
            }
        }
    };


    // 绑定事件
    $scope.getStatus = function(server){
        // EAMSService.getStatus(server.ip)
        //     .then(function(res){
        //         server.status = res;
        //     });

        return '在线';
    };

    var findStatus = function(){
        var map = $scope.result.map;
        var ips = [];
        for(var ip in map){
            ips.push(ip);
        }
        EAMSService.findStatus(ips)
            .then(function(res){
                if( Array.isArray(res) ){
                    var i = 0;
                    ips.forEach(function(){
                        map[ip].status = res[i++];
                    });
                }                
        });
    };

    var find = function(){
        var $page = $scope.result.page;

        // 封装 查询对象                                                                                    
        var selectDto = angular.copy($scope.server);
        selectDto.pageNum = $page.current -1;
        selectDto.pageSize = $page.pageSize;

        EAMSService.listBy(selectDto)
            .then(setResult)
            .then(findStatus);
    };
    var findAll = function(){
        var $page = $scope.result.page;
        var page = {
            pageNum : $page.current - 1,
            pageSize: $page.pageSize
        };
        EAMSService.listAll(page)
            .then(setResult)
            .then(findStatus);
    };

    $scope.find = find;
    $scope.findAll = findAll;



    $scope.detail = function(data){
        console.log(data);
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/eams/view/detail.html',
            controller: 'EAMSModalCtrl',
            backdrop: "static",
            size: 'lg',
            resolve : {
                data: function () {
                    return data;
                }
            }
        });

        modalInstance.result.then(function (dept) {

        }, function (aaa) {
            
        });
    };

    $scope.del = function (ip) {
        layer.confirm('确定删除该记录吗？', {
            btnAlign: 'c',
            closeBtn: 1,
            btn: ['确定', '取消'] //按钮
        }, function () {
            var promise = EAMSService.delete({ip:ip});
            if( promise ){
                promise.then(findAll);
            }
        }, function () {
            
        });
    };
    $scope.upd = function (server) {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/eams/view/add.html',
            controller: 'EAMSModalCtrl',
            backdrop: "static",
            size: 'lg',
            resolve: {
                data: function(){
                    return server;
                }
            }
        });

        modalInstance.result.then(function (server) {
            // $log.info('Modal dismissed at: ' + selectedItem + "," + new Date());
            
            var promise = EAMSService.update(server);
            if( promise ){
                promise.then(function(){updData(server);});
            }
        }, function (aaa) {
            $log.info('Modal cancel at: ' + aaa + "," + new Date());
        });
    };
    $scope.onPageChange = function () {
        // console.log('aaa',$scope.result.page.current);
        $scope.find();
    };


    
    $scope.dat = new Date();
    $scope.format = "yyyy/MM/dd";
    $scope.altInputFormats = ['yyyy/M!/d!'];

    $scope.findAll();
};

var EAMSModalCtrl = function ($scope, $uibModalInstance, data) {
    $scope.server = angular.copy(data);
    $scope.confirm = function () {
        $uibModalInstance.close($scope.server);
    };
    $scope.close = function () {
        $uibModalInstance.dismiss("cancel");
    };

};