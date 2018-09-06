/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/9
 */

var RBACLoginService = function ($http) {
    
    var baseApi =  api_host+'/api/user',
        apis = {
            login: baseApi + '/login',
            getResources: baseApi + '/resources',
        },
        msgConfig = {
            offset  : 'rt',
            width   : 500,
            height  : 200,
        };

    var $post = function(url,data){
        var promise = $http.post(url,data)
                        .then(function(resp){
                            //{status,message,data}
                            var jsonData = resp.data;
                            // 0 成功, !0 失败
                            if( 0 == jsonData.status){
                                // object: 返回数据, string:操作信息, ''成功无提示
                                if("object" === typeof jsonData.data){
                                    return jsonData.data;
                                }else if("string" === typeof jsonData.data && jsonData.data){
                                    layer.msg(jsonData.data,msgConfig);
                                }else{
                                    layer.msg("操作成功",msgConfig);
                                }
                                return true;
                            }else{
                                var msg = "";
                                if("object" === typeof jsonData.data){
                                    for(var m in jsonData.data){
                                        msg += m +':'+ jsonData.data[m];
                                    }
                                }
                                if("string" === typeof jsonData.data){
                                    msg = jsonData.data;
                                }
                                if('' == msg){
                                    msg = jsonData.message;
                                }

                                if( msg && 20 >= msg.length ){
                                    layer.msg(msg,msgConfig);
                                }else{
                                    layer.msg("操作失败",msgConfig);
                                }
                                return false;
                            }
                        },function(resp) {
                            layer.msg("请求失败",msgConfig);
                        });
        return promise;
    };

    var loggedUser = null;

    this.getLoggedUser = function(){
        return loggedUser;
    };

    this.setLoggedUser = function(user){
        this.getMenus(user)
            .then(function(res){
                if(res){
                    loggedUser = angular.copy(user);
                    loggedUser.resources = res;
                    loggedUser.menus = [];
                    for(var index in res){
                        var menu = {
                            label : res[index].name + 'mark',
                            route : res[index].url ,
                            icon :'glyphicon-globe',
                        };
                        loggedUser.menus.push(menu);
                    }

                }
            });
    };

    this.login = function(user){
        return $post(apis.login,user);
    };

    this.getMenus = function(user){
        return $post(apis.getResources,user);
    };
};
