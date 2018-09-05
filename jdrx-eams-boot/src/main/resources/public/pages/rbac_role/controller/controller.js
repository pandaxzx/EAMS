/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */
var RBACRoleCtrl = function ($scope,$uibModal,$log,RBACRoleService,RBACResourceService) {
    $scope.role = {
        id  : undefined,
        name: undefined,
    };
    $scope.resouces = {};
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
        if(data && 0 < data.length){
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
    $scope.findAll = function(){
        var reqPage = $scope.result.page;
        reqPage = {
            pageNum : reqPage.current - 1,
            pageSize: reqPage.pageSize
        };
        RBACRoleService.find(reqPage).then(setResult);
    };
    $scope.find = function(){
        var reqPage = $scope.result.page;
        
        var selectDto = {
            id  :  $scope.role.id,
            page: {
                pageNum : reqPage.current - 1,
                pageSize: reqPage.pageSize
            }
        };
        if( selectDto.id ){
            RBACRoleService
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
            
            RBACRoleService
                .create(role)
                .then(function(res){
                    if(res){
                        $scope.findAll();
                    }
                });
        }, function (aaa) {
            $log.info('Modal cancel at: ' + aaa + "," + new Date());
        });
    };
 
    $scope.del = function (role) {
        layer.confirm('确定删除该记录吗？', {
            btnAlign: 'c',
            closeBtn: 1,
            btn: ['确定', '取消'] //按钮
        }, function () {
            RBACRoleService
                .delete(role)
                .then(function(res){
                    if(res){
                        $scope.findAll();
                    }
                });
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
            
            RBACRoleService
                .update(role)
                .then(function(res){
                    if(res){
                        updData(role);
                    }
                });
        }, function (aaa) {
            $log.info('Modal cancel at: ' + aaa + "," + new Date());
        });
    };
    $scope.toAuth = function (role_id){
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/rbac_role/view/auth.html',
            controller: 'RBACRoleResouceModalCtrl',
            backdrop: "static",
            size: 'md',
            resolve: {
                data: function(){
                    return {
                        roleId: role_id,
                        resouces: $scope.resouces,
                    };
                }
            }
        });

        modalInstance.result.then(function (data) {
            RBACRoleService.authResources(data);
        }, function (aaa) {
            $log.info('Modal cancel at: ' + aaa + "," + new Date());
        });
    };

    $scope.onPageChange = function () {
        console.log('aaa',$scope.result.page.current);
        $scope.find();
    };
    
    var init = function(){
        $scope.findAll();
        RBACResourceService.find({})
            .then(function(res){
                res.forEach(function(row){
                    var node = {
                        id: row.id,
                        pId: row.pid || 0,
                        name: row.name,
                        // open: false,
                    };
                    $scope.resouces[node.id] = node;
                });
            });
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

    init();
};

var RBACRoleModalCtrl = function ($scope, $uibModalInstance, data) {
    $scope.role = angular.copy(data);
    $scope.confirm = function () {
        $uibModalInstance.close($scope.role);
    };
    $scope.close = function () {
        $uibModalInstance.dismiss("cancel");
    };
};

var RBACRoleResouceModalCtrl = function($scope,$uibModalInstance, RBACRoleService, data){
    var roleId = angular.copy(data.roleId);
    var nodes = angular.copy(data.resouces);
    var oldResources = [];

    $scope.confirm = function () {
        var result = [];
        for(var id in nodes){
            if( nodes[id].checked ){
                result.push({
                    role_id: roleId,
                    resource_id: nodes[id].id
                });
            }
        }
        if( 0 == result.length ){
            result.push({
                role_id: roleId,
            });
        }
        $uibModalInstance.close(result);
    };
    $scope.close = function () {
        $uibModalInstance.dismiss("cancel");
    };

    var onCheck = function(e, treeId, treeNode){
        console.log(treeNode);
        var id = treeNode.id;
        nodes[id].checked = treeNode.checked;
        var childs = null ;
        // check children
        if( treeNode.children ){
            childs = treeNode.children;
            for(var index in childs){
                id = childs[index].id;
                nodes[id].checked = treeNode.checked;
            }
        }
        // check parent
        var parentNode = treeNode.getParentNode();
        if( null != parentNode && undefined != parentNode ){
            var pid = parentNode.id;
            nodes[pid].checked = true;
            childs = parentNode.children;
            for(var i in childs){
                id = childs[i].id;
                if( !nodes[id].checked ){
                    nodes[pid].checked = false;
                    break;
                }
            }
        }
    };
    var init = function(){
        var setting = {
            check:{
                enable: true,
                chkboxType :{ "Y" : "ps", "N" : "ps" },
            },
            callback:{
                onCheck: onCheck,
            },
            view: { 
                selectedMulti: false 
            }, 
            data: { 
                simpleData: { 
                    enable: true 
                } 
            }, 
        };
        var zNodes = [];
        for(var id in nodes){
            zNodes.push(nodes[id]);
        }

        RBACRoleService.findResources({id:roleId})
            .then(function(res){
                res.forEach(function(id){
                    oldResources.push(id);
                    nodes[id].checked = true;
                });
            })
            .then(function(){
                $.fn.zTree.init($("#resourceTree"), setting, zNodes);
            });        
    };

    init();
};