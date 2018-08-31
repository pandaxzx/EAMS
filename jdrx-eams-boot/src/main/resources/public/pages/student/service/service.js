/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/9
 */

var StudentService = function ($http) {
    var baseApi = 'http://localhost:8082/api/0/student',
        apis = {
            create  : baseApi + '/create',
            update  : baseApi + '/update',
            delete  : baseApi + '/delete',
            find    : baseApi + '/get',
            listAll : baseApi + '/findAll',
            listBy  : baseApi + '/findBy',
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
                                !msg ? 
                                layer.msg(msg,msgConfig):
                                layer.msg("操作失败",msgConfig);
                            }
                        },function(resp) {
                            layer.msg("请求失败",msgConfig);
                        });
        return promise;
    };

    this.create = function(stus){
        if(stus && Array.isArray(stus) && 0<stus.length){
            stus.forEach(function(item){
                item.createAt = new Date();
                item.createBy = "admin";
            });
            return $post(apis.create,stus);
        }else{
            throw new DOMException("传入非数组");
        }
    };

    this.delete = function(stu){
        if(stu && stu.id){
           return $post(apis.delete,stu);
        }
    };

    this.update = function(stu){
        if(stu && stu.id){
            stu.updateBy = "test";
            stu.updateAt = new Date();
            return $post(apis.update,stu);
        }
    };

    this.listBy = function(selectDto){
        return $post(apis.listBy,selectDto);
    };

    this.listAll = function(page){
        return $post(apis.listAll,page);
    };
};
