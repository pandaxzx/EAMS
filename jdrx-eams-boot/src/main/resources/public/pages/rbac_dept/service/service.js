/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/9
 */

var RBACDeptService = function ($http) {
    
    var baseApi =  api_host+'/api/rbac/dept',
        apis = {
            create  : baseApi + '/save',
            update  : baseApi + '/update',
            delete  : baseApi + '/delete',
            find    : baseApi + '/find',
            get : baseApi + '/get',
            // listBy  : baseApi + '/findBy',
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

    this.create = function(dept){
        return $post(apis.create,dept);
    };

    this.delete = function(dept){
        return $post(apis.delete,dept);
    };

    this.update = function(dept){
        return $post(apis.update,dept);
    };

    this.get = function(selectDto){
        return $post(apis.get,selectDto);
    };

    this.find = function(page){
        return $post(apis.find,page);
    };

    this.findAll = function(){
        return $post(apis.find,{});
    }
};
