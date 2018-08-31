四川九鼎前端面框架模板
===
1、框架目录结构
___
    -components
        |- breadcrumb.js
        |- jdrx-menu.js
    -common
        |- css
        |- js
    -interceptor
        |- interceptor.js
    -libs
        |-angular
        |-angular-w5cValidator
        |-layer
        |-nprogress
        |-ui-bootstrap
    -pages
        |-list
        |   |-controller
        |   |-service
        |   |-view
        |   |-index.js
        |-login
        |-main
    app.js
    index.html
    route.js
2、目录说明
___
    app.js是项目angular的基本配置文件，主要包括表单的基本配置、请求拦截器的基本配置、页面跳转进度条的配置
    index.html是模板的主界面，主要是引入样式、相关的库的js文件和我们自己开发的功能模块js文件
    route.js路由管理文件
    components目录用于存放自定义组件
    common目录用于存放公共的样式和js文件
    interceptor目录用于存放拦截器相关的文件
    libs目录用于存放第三放相关的文件
    pages目录用于存放各功能模块的相关文件，各功能模块按功能名称创建目录，各功能模块中包含controller、service、view目录和index.js文件
        controller目录用于存放功能模块controller相关的文件
        service目录用于存放功能模块服务相关的文件
        view目录用于存放功能模块模板相关的html文件
        index.js文件是该功能模块的一些配置，如：路由配置、表单验证配置等
3、主要第三方框架说明
___
    a、angular版本1.6.10
    b、angular-w5cValidator表单验证框架
        gitHub地址: https://github.com/why520crazy/angular-w5c-validator
        演示地址: http://blog.ngnice.com/angular-w5c-validator/example/index.html
    c、layer主要使用弹出层和确认框相关功能
        官网: http://layer.layui.com/
    d、nprogress 全站进度条插件，用于界面跳转和http请求时的进度显示
        官网: http://ricostacruz.com/nprogress/
    e、ui-bootstrap是本框架的主要ui框架,采用bootstrap3的相关样式
        官网: https://v3.bootcss.com/
        参考学习: https://www.cnblogs.com/pilixiami/p/5597634.html
        
