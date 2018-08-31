/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/9
 */

var HomeService = function ($http) {
    this.list = function(){
        return $http.get('http://www.baidu.com');
    }
};
