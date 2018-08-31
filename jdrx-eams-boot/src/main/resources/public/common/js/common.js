/**
 * 说明：
 * 创建人：pluto
 * 创建时间：2018/8/3
 */
/**
 * 动态加载js文件
 * @param url 脚本地址
 * @param callback 回调函数
 */
function dynamicLoadJs(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    if(typeof callback === 'function'){
        script.onload = script.onreadystatechange = function () {
            if(!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete'){
                callback();
                script.onload = script.onreadystatechange = null;
            }
        }
    }
    head.appendChild(script);
}

/**
 * 动态加载CSS文件
 * @param {string} url 样式地址
 */
function dynamicLoadCss(url) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type='text/css';
    link.rel = 'stylesheet';
    link.href = url;
    head.appendChild(link);
}
