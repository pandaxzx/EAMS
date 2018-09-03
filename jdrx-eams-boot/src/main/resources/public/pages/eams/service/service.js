/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/9
 */

var EAMSService = function ($http) {
    var baseApi =  api_host+'/api/server',
        apis = {
            // create  : baseApi + '/finAll',
            // update  : baseApi + '/update',
            // delete  : baseApi + '/delete',
            // find    : baseApi + '/get',
            listAll : baseApi + '/findAll',
            listBy  : baseApi + '/findBy',
            getStatus: baseApi + '/getStatus',
            findStatus: baseApi + '/findStatus',
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
                            }else{
                                var msg = "";

                                // 从返回错误信息生成消息
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

                                if(msg){
                                    layer.msg(msg,msgConfig);
                                }else{
                                    layer.msg("操作失败",msgConfig);
                                }
                            }
                        },function(resp) {
                            layer.msg("请求失败",msgConfig);
                        });
        return promise;
    };

    this.listAll = function(page){
        // return $http.jsonp(apis.listAll,page);
        // $http;
        return $post(apis.listAll,page);
    };
    this.listBy = function(selectDto){
        return $post(apis.listBy,selectDto);
    };
    this.findStatus = function(ips){
        return $post(apis.findStatus,ips);
    };

    this.getStatus = function(ip){
      return $post(apis.getStatus,{id:ip});  
    };
};
