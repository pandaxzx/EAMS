/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/9
 */

var RBACRoleService = function ($http) {

    var baseApi = api_host + '/api/rbac/role',
        apis = {
            create: baseApi + '/save',
            update: baseApi + '/update',
            delete: baseApi + '/delete',
            find: baseApi + '/find',
            get: baseApi + '/get',
            authResources: baseApi + '/authResources',
            findResources: baseApi + '/findResources',
        },
        msgConfig = {
            offset: 'rt',
            width: 500,
            height: 200,
        };

    var $post = function (url, data) {
        var promise = $http.post(url, data)
            .then(function (resp) {
                //{status,message,data}
                var jsonData = resp.data;
                // 0 成功, !0 失败
                if (0 == jsonData.status) {
                    // object: 返回数据, string:操作信息, ''成功无提示
                    if ("object" === typeof jsonData.data) {
                        return jsonData.data;
                    } else if ("string" === typeof jsonData.data && jsonData.data) {
                        layer.msg(jsonData.data, msgConfig);
                    } else {
                        layer.msg("操作成功", msgConfig);
                    }
                    return true;
                } else {
                    var msg = "";
                    if ("object" === typeof jsonData.data) {
                        for (var m in jsonData.data) {
                            msg += m + ':' + jsonData.data[m];
                        }
                    }
                    if ("string" === typeof jsonData.data) {
                        msg = jsonData.data;
                    }
                    if ('' == msg) {
                        msg = jsonData.message;
                    }

                    if (msg && 20 >= msg.length) {
                        layer.msg(msg, msgConfig);
                    } else {
                        layer.msg("操作失败", msgConfig);
                    }
                    return false;
                }
            }, function (resp) {
                layer.msg("请求失败", msgConfig);
            });
        return promise;
    };

    this.create = function (role) {
        if (role) {
            return $post(apis.create, role);
        }
    };

    this.delete = function (role) {
        if (role && role.id) {
            return $post(apis.delete, role);
        }
    };

    this.update = function (role) {
        if (role && role.id) {
            return $post(apis.update, role);
        }
    };

    this.get = function (selectDto) {
        return $post(apis.get, selectDto);
    };

    this.find = function (page) {
        return $post(apis.find, page);
    };

    this.findAll = function(){
        return $post(apis.find,{});
    };

    this.authResources = function (data) {
        return $post(apis.authResources,data);
    };

    this.findResources = function (role) {
        return $post(apis.findResources,role);
    };
};