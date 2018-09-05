/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */
var RBACUserCtrl = function ($scope,$uibModal,$log,RBACUserService, RBACRoleService, RBACDeptService) {
    $scope.user = {
        id  : undefined,
        name: undefined,
        pwd : undefined,
        role: undefined,
        dept: undefined,
    };
    $scope.result = {
        map : {},
        page:{
            current : 1,
            pageSize: 5,
            total   : 0,
        }
    };
    $scope.depts = {};
    $scope.roles = {};

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
        if( data && 0 < data.length ){
            data.forEach(function(item){
                map[item.id]=item;
            });
        } 
        $scope.result.map = map;
    };
    var setPage = function (page){
        var $page = {
            total : page.total,
            pageSize:page.total,
        };
        $scope.result.page.total = page.total;
        $scope.result.page.pageSize = page.total;
    };
    var updData = function (user){
        if(!user || !user.id){
            return ;
        }
        var map = $scope.result.map;
        var userId = user.id;
        for(var id in map){
            if(userId == id){
                map[id]=user;
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
        RBACUserService
            .find(reqPage)
            .then(setResult);
    };
    $scope.find = function(){
        var reqPage = $scope.result.page;
        
        var selectDto = {
            id  :  $scope.user.id,
            page: {
                pageNum : reqPage.current - 1,
                pageSize: reqPage.pageSize
            }
        };
        if( selectDto.id ){
            RBACUserService
                .get(selectDto)
                .then(function(res){
                    if(res){
                        setResult([res]);
                    }
                });
        }else{
            $scope.findAll();
        }
    };
    $scope.toAdd =  function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/rbac_user/view/info.html',
            controller: 'RBACUserModalCtrl',
            backdrop: "static",
            size: 'lg',
            resolve : {
                data: function () {
                    return {};
                }
            }
        });

        modalInstance.result.then(function (user) {
            // $log.info('Modal dismissed at: ' + selectedItem + "," + new Date());
            RBACUserService
                .create(user)
                .then(function(res){
                    if(res){
                        $scope.findAll();
                    }
                });
        }, function (aaa) {
            $log.info('Modal cancel at: ' + aaa + "," + new Date());
        });
    };
 
    $scope.del = function (user) {
        layer.confirm('确定删除该记录吗？', {
            btnAlign: 'c',
            closeBtn: 1,
            btn: ['确定', '取消'] //按钮
        }, function () {
            RBACUserService
                .delete(user)
                .then(function(res){
                    if(res){
                        $scope.findAll();
                    }
                });
        }, function () {
        });
    };
    $scope.toUpd = function (user) {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/rbac_user/view/info.html',
            controller: 'RBACUserModalCtrl',
            backdrop: "static",
            size: 'lg',
            resolve: {
                data: function(){
                    return {
                        user: user,
                        depts: $scope.depts,
                    };
                }
            }
        });

        modalInstance.result.then(function (user) {
            // $log.info('Modal dismissed at: ' + selectedItem + "," + new Date());
            RBACUserService
                .update(user)
                .then(function(res){
                        if(res){
                            updData(user);
                        }
                    }
                );
        }, function (aaa) {
            $log.info('Modal cancel at: ' + aaa + "," + new Date());
        });
    };
    $scope.toSetRoles = function(user){
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/rbac_user/view/roles.html',
            controller: 'RBACUserRoleModalCtrl',
            backdrop: "static",
            size: 'md',
            resolve: {
                data: function(){
                    return {
                        user: user,
                        roles: $scope.roles,
                    };
                }
            }
        });

        modalInstance.result.then(function (userRoleMaps) {
            // $log.info('Modal dismissed at: ' + selectedItem + "," + new Date());
            RBACUserService.authRoles(userRoleMaps);
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
            maxDate: $scope.user.updateAtLte || new Date(),
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
            minDate: $scope.user.updateAtGte,
        }
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    var init = function(){
        RBACDeptService.findAll()
            .then(function(res){
                if(res){
                    var depts = $scope.depts;
                    var id = null;
                    for(var index in res){
                        id = res[index].id;
                        depts[id] = res[index];
                    }
                }
            });
        RBACRoleService.findAll()
            .then(function(res){
                if(res){
                    var roles = $scope.roles;
                    var id = null;
                    for(var index in res){
                        id = res[index].id;
                        roles[id] = res[index];
                    }
                }
            });
        $scope.findAll();
    };
    init();
};

var RBACUserModalCtrl = function ($scope, $uibModalInstance, data) {
    $scope.user  = angular.copy(data.user);
    $scope.depts = angular.copy(data.depts);
    $scope.confirm = function () {
        $uibModalInstance.close($scope.user);
    };
    $scope.close = function () {
        $uibModalInstance.dismiss("cancel");
    };
};

var RBACUserRoleModalCtrl = function ($scope, $uibModalInstance, RBACUserService, data) {
    var user = angular.copy(data.user);
    var nodes = angular.copy(data.roles);

    $scope.confirm = function () {
        var result = [];
        for(var id in nodes){
            if( nodes[id].checked ){
                result.push({
                    user_id: user.id,
                    role_id: id,
                });
            }
        }
        if( 0 == result.length ){
            result.push({
                user_id: user.id,
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
        var childs = null;
        nodes[id].checked = treeNode.checked;
        if( treeNode.children ){
            childs = treeNode.children;
            for(var index in childs){
                id = childs[index].id;
                nodes[id].checked = treeNode.checked;
            }
        }
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
                selectedMulti: false ,
                showLine: false,
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
        RBACUserService.findRoles({id: user.id})
            .then(function(res){
                if(res){
                    var id = null;
                    for(var index in res){
                        id = res[index];
                        nodes[id].checked = true;
                    }
                }
            })
            .then(function(){
                $.fn.zTree.init($("#rolesTree"), setting, zNodes);
            });
    };
    
    init();
};