/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */
var ListCtrl = function ($scope, $uibModal, $log) {
    $scope.aaa = 'aaa';
    $scope.result = {
        list: [
            {
                code: '00001',
                desc: '这是一段描述',
                count: '270',
                state: '异常',
                time: 1234567890
            }, {
                code: '00001',
                desc: '这是一段描述',
                count: '270',
                state: '异常',
                time: 1234567890
            }, {
                code: '00001',
                desc: '这是一段描述',
                count: '270',
                state: '异常',
                time: 1234567890
            }, {
                code: '00001',
                desc: '这是一段描述',
                count: '270',
                state: '异常',
                time: 1234567890
            }
        ],
        page: {
            total: 4,
            current: 1,
            pageSize: 2
        }
    };
    $scope.toAdd = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/list/view/add.html',
            controller: 'ModalCtrl',
            backdrop: "static",
            size: 'lg',
            resolve: {
                data: function () {
                    return {};
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $log.info('Modal dismissed at: ' + selectedItem + "," + new Date());
        }, function (aaa) {
            $log.info('Modal cancel at: ' + aaa + "," + new Date());
        });
    };
    $scope.del = function () {
        layer.confirm('确定删除该记录吗？', {
            btnAlign: 'c',
            closeBtn: 1,
            btn: ['确定', '取消'] //按钮
        }, function () {
            layer.msg('的确很重要', {icon: 1});
        }, function () {

        });
    }
    $scope.upd = function (data) {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/list/view/add.html',
            controller: 'ModalCtrl',
            backdrop: "static",
            size: 'lg',
            resolve: {
                data: function () {
                    return data;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $log.info('Modal dismissed at: ' + selectedItem + "," + new Date());
        }, function (aaa) {
            $log.info('Modal cancel at: ' + aaa + "," + new Date());
        });
    }
    $scope.onPageChange = function () {
        console.log('aaa',$scope.result.page.current)
    };

    $scope.dat = new Date();
    $scope.format = "yyyy/MM/dd";
    $scope.altInputFormats = ['yyyy/M!/d!'];

    $scope.popup1 = {
        opened: false
    };
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
};

var ModalCtrl = function ($scope, $uibModalInstance, data, ListService) {
    $scope.user = angular.copy(data);
    $scope.confirm = function () {
        ListService.list();
        $uibModalInstance.close("confirm");
    };
    $scope.close = function () {
        $uibModalInstance.dismiss("cancel");
    };
};