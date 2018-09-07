/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */
var EAMSCtrl = function ($scope, $uibModal, $log, EAMSService) {
    // 查询的对象
    $scope.server = {
        ip: undefined,
        host: undefined,
        cpus: undefined, // array
        disks: undefined, // array
        memory: undefined,
        interfaces: undefined, //array
        startAt: undefined,
        status: undefined,
    };
    // 数据集合及分页信息
    $scope.result = {
        map: {},
        page: {
            current: 1,
            pageSize: 20,
            total: 0,
        }
    };
    $scope.envs = {};
    $scope.apps = {};
    $scope.$envs = '';
    $scope.$apps = '';

    // 更新 $scope 属性
    var setResult = function (resultData) {
        if (resultData) {
            var page = {
                total: resultData.total,
                pageSize: resultData.pageSize,
                current: resultData.pageNum
            };
            setData(resultData.data);
            setPage(page);
        }
    };

    var setData = function (data) {
        var map = {};
        if (data && data.length) {
            data.forEach(function (item) {
                map[item.ip] = item;
            });
        }
        $scope.result.map = map;
    };

    var setPage = function (page) {
        var $page = $scope.result.page;
        if ($page.current > page.current + 1) {
            $page.current = page.current + 1;
        }
        $page.total = page.total;
    };

    var updData = function (server) {
        if (!server || !server.ip) {
            return;
        }
        var map = $scope.result.map;
        var serverIp = server.ip;
        if ( map[serverIp] ) {
            map[serverIp] = server;
        }
    };


    // 绑定事件
    var getStatus = function (server) {
        EAMSService.getStatus(server.ip)
        .then(function (res) {
            server.status = res;
        });
    };

    var findStatus = function () {
        var map = $scope.result.map;
        var ips = [];
        for (var ip in map) {
            ips.push(ip);
        }
        EAMSService.findStatus(ips)
            .then(function (res) {
                if (Array.isArray(res)) {
                    var i = 0;
                    ips.forEach(function (ip) {
                        map[ip].status = res[i++];
                    });
                    return true;
                }
                return false;
            });
    };

    var find = function (pageNum) {
        var $page = $scope.result.page;

        // 封装 查询对象
        var selectDto = angular.copy($scope.server);
        selectDto.pageNum = pageNum || $page.current;
        selectDto.pageNum --;
        selectDto.pageSize = $page.pageSize;

        var envs = angular.copy($scope.$envs);
        var apps = angular.copy($scope.$apps);
        if(envs){
            envs = envs.split(",");
            if( -1 != envs.indexOf("") ){
                layer.msg("检查envs输入格式",{offset:'rt'});
                return ;
            }
            for(var i in envs){
                envs[i] = envs[i].trim();
                for( var j in $scope.envs ){
                    if( envs[i] === $scope.envs[j].name){
                        envs[i] = $scope.envs[j].id;
                        break;
                    }
                }
            }
            var eid = null;
            for(eid in envs){
                if( !envs[eid].length || 'string' === typeof envs[eid] && envs[eid].match(/\D/) ){
                    layer.msg("检查envs输入内容",{offset:'rt'});
                    return ;
                }
            }
            selectDto.envs = envs;
        }
        if(apps){
            apps = apps.split(",");
            if( -1 != apps.indexOf("") ){
                layer.msg("检查apps输入格式",{offset:'rt'});
                return ;
            }
            for(var k in apps){
                apps[k] = apps[k].trim();
                for( var L in $scope.apps ){
                    if( apps[k] === $scope.apps[L].name){
                        apps[k] = $scope.apps[L].id;
                        break;
                    }
                }
            }
            var aid = null;
            for(aid in apps){
                if( ''===apps[aid] || ('string' === typeof apps[aid] && apps[aid].match(/\D/)) ){
                    layer.msg("检查apps输入内容",{offset:'rt'});
                    return ;
                }
            }
            selectDto.apps = apps;
        }
        EAMSService.listBy(selectDto)
            .then(setResult)
            .then(findStatus);
    };
    var findAll = function () {
        var $page = $scope.result.page;
        var page = {
            pageNum: $page.current - 1,
            pageSize: $page.pageSize
        };
        EAMSService.listAll(page)
            .then(setResult)
            .then(findStatus);
    };

    $scope.find = find;
    $scope.findAll = findAll;
    $scope.findStatus = findStatus;
    $scope.getStatus = getStatus;

    $scope.detail = function (data) {
        console.log(data);
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/eams/view/detail.html',
            controller: 'EAMSModalCtrl',
            backdrop: "static",
            size: 'lg',
            resolve: {
                data: function () {
                    return {
                        server:data,
                        envs: $scope.envs,
                        apps: $scope.apps,
                    };
                }
            }
        });

        modalInstance.result.then(function (dept) {

        }, function (aaa) {

        });
    };

    $scope.del = function (server) {
        layer.confirm('确定删除该记录吗？', {
            btnAlign: 'c',
            closeBtn: 1,
            btn: ['确定', '取消'] //按钮
        }, function () {
            EAMSService
                .delete({id:server.ip})
                .then(function(res){
                    if(res){
                        find();
                    }
                });
        }, function () {

        });
    };
    $scope.toUpd = function (server) {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/eams/view/upd.html',
            controller: 'EAMSModalCtrl',
            backdrop: "static",
            size: 'md',
            resolve: {
                data: function () {
                    return {
                        server:server,
                        envs:$scope.envs,
                        apps:$scope.apps,
                    };
                }
            }
        });

        modalInstance.result.then(function (server) {
            // $log.info('Modal dismissed at: ' + selectedItem + "," + new Date());

            EAMSService
                .update(server)
                .then(function(res){
                    if(res){
                        find();
                    }
                });
        }, function (aaa) {
            $log.info('Modal cancel at: ' + aaa + "," + new Date());
        });
    };
    $scope.onPageChange = function () {
        // console.log('aaa',$scope.result.page.current);
        find();
    };
    $scope.getAliveTime = function(server){
        if( !server.status ){
            return '';
        }
        var dateStr = angular.copy(server.startAt).replace("_","T")+":00Z";
        var date = new Date(dateStr);
        var time = Date.now() - date;
        time = Math.trunc(time/(60*1000));
        var timeStr = time;
        var day = Math.trunc(time/(60*24));
        if(1<day){
            timeStr += day +" 天";
        }
        var hour = Math.trunc((time % (60*24))/60);
        if(1<hour){
            timeStr += hour +" 时";
        }
        var mm = time % (60);
        if(1<mm){
            timeStr += mm + ' 分';
        }
        return timeStr;
    };


    $scope.dat = new Date();
    $scope.format = "yyyy/MM/dd";
    $scope.altInputFormats = ['yyyy/M!/d!'];

    var init = function(){
        EAMSService
            .listAllTags()
            .then(function(res){
                if(res){
                    var envs =$scope.envs,
                        apps =$scope.apps,
                        tmp = null,
                        tag = null,
                        id = null;

                    for(var index in res){
                        tag = res[index];
                        id = tag.id;
                        switch(tag.type){
                            case 0: tmp = envs;break;
                            case 1: tmp = apps;break;
                            default:
                        }
                        tmp[id] = tag;
                    }
                }
            });
        $scope.findAll();
    };
    init();
};

var EAMSModalCtrl = function ($scope, $uibModalInstance, data) {
    $scope.server = angular.copy(data.server);
    $scope.envs = angular.copy(data.envs);
    $scope.apps = angular.copy(data.apps);
    var $envs = $scope.envs ;
    var $apps = $scope.apps ;

    $scope.onChangeBox = function(box){
        box.checked = !box.checked;
    };

    $scope.confirm = function () {
        var server = $scope.server;
        var id = null;
        var envs = [];
        var apps = [];
        for(var i in $envs){
            id = $envs[i].id;
            if(  $envs[i].checked ){
                envs.push(id);
            }
        }
        for(var j in $apps){
            id = $apps[j].id;
            if(  $apps[j].checked ){
                apps.push(id);
            }
        }
        server.envs = envs;
        server.apps = apps;
        $uibModalInstance.close(server);
    };
    $scope.close = function () {
        $uibModalInstance.dismiss("cancel");
    };
    var init = function(){
        var server = $scope.server;
        var envs = server.envs;
        var apps = server.apps;

        var id = null;
        for(var i in envs){
            id = envs[i];
            if($envs[id]){
                $envs[id].checked = true;
            }
        }
        for(var j in apps){
            id = apps[j];
            if($apps[id]){
                $apps[id].checked = true;
            }
        }
    };
    init();
};