(function(){
    //页面当中的公共变量 方法等
    var SysFunction = function() {
        //公司外网主机
        this.rootPath = "http://123.232.10.234:8150";
        //局域网主机
        //this.rootPath = "http://192.168.31.19:9000";
        //本地
        //this.rootPath = "http://localhost:9000";
        //云主机
        //this.rootPath = "http://116.196.68.51:9000";
        this.contextPath = "/";
        //上传文件的最大大小
        this.maxFileSize = 5 * 1024 * 1024; //5MB
    };
    SysFunction.prototype.operateList = ["出库", "流转", "回收"];
    
    var loading = null;
    $(function(){
       loading = $("#loading-container");
    });
    /**
     * 隐藏加载提示框 
     */
    var hideLoading = function() {
        if(!loading || !loading.size()) {
            loading = $("#loading-container");
        }
        loading.hide();
    };
    /**
     * 默认的error回调函数 
     */
    var defaultErrorCallback = function() {
        hideLoading();
        appcan.alert({
            title : "提示",
            content : "网络繁忙，请稍候再试！",
            buttons : ['确定']
        });
    };
    /** 
     * appcan.ajax方法代理<br>
     * 在ajax请求当中添加token数据用于后端认证 <br>
     * 并且对success方法与error方法进行包装
     * 
     */
    SysFunction.prototype.ajax = function(config, context) {
        if(!loading || !loading.size()) {
            loading = $("#loading-container");
        }
        loading.show();
        context = context || appcan;
        
        if(typeof config.success === "function") {
            var successCallback = config.success;
            config.success = function(resJson) {
                if(typeof resJson === "string") {
                    try { //回传的数据如果不是JSON格式, 这一步有可能报错
                    arguments[0] = JSON.parse(resJson);
                    if(arguments[0].status === -1) { //未登录
                        appcan.alert({
                            title : "提示",
                            content : "请登录后再执行该操作",
                            buttons : ['确定']
                        });
                        hideLoading();
                        return;
                    }
                    } catch(e){}
                }
                hideLoading();
                successCallback.apply(null, Array.prototype.slice.call(arguments));
            };
        } else {
            config.success = hideLoading;
        }
        if(typeof config.error === "function") {
            config.error = function(){
                defaultErrorCallback();
                errorCallback.apply(null, Array.prototype.slice.call(arguments));
            };
        } else {
            config.error = defaultErrorCallback;
        }
        var loginUserStr = appcan.locStorage.getVal("login_user");
        var loginUser = null;
        if(loginUserStr) {
            loginUser = JSON.parse(loginUserStr);
        } else {
            return context.ajax(config);
        }
        
        if(config.data instanceof FormData) {
            //文件上传
            config.data.append("_token", loginUser.token);
        } else {
            switch (typeof config.data) {
            case "undefined" : 
                //不包含data属性, 是undefined
                config.data = {"_token" : loginUser.token};
                break;
            case "object" :
                if(config.data) {
                    //包含data属性, 是普通的JS对象
                    config.data["_token"] = loginUser.token;
                } else {
                    //不包含data属性或者包含, 但是为null
                    config.data = {"_token" : loginUser.token};
                }
                break;
            case "string" : 
                //包含data属性, 是query格式的字符串
                config.data += ("&_token=" + loginUser.token);
                break;
            }
        }
        
        return context.ajax(config);
    };
    window.sys_common = new SysFunction();
    /**
     * 绑定页面标题组件 
     */
    var realname = null;
    var loginUserStr = appcan.locStorage.getVal("login_user");
    if(loginUserStr) {
        realname = JSON.parse(loginUserStr).realname;
    }
    //全局定义页头组件
    Vue.component("header-component",{
        //组件参数及类型校验
        props : {
            title : { //页头标题文字
                type : String,
                required : true
            },
            hasbackbtn : { //左上角是否有返回按钮
                type : Boolean,
                default : true
            }
        },
        //组件模板
        template : "<div class='uh bc-head ubb bc-border' data-control='HEADER' id='Header'>"+
                        "<div class='ub'>"+
                            "<div class='nav-btn' id='nav-left' >"+
                                "<div class='fa fa-1g ub-img1 fa-chevron-left' v-if='hasbackbtn' v-on:click='closeView'></div>"+
                            "</div>"+
                            "<h1 class='ut ub-f1 ulev-3 ut-s tx-c' >{{title}}</h1>"+
                            "<div class='nav-btn' id='nav-right'>"+
                                "<div class='fa fa-user ub-img1' v-if='realname' >{{realname}}</div>"+
                            "</div>"+
                        "</div></div>",
        data : function() {
            return {realname : realname};
        },
        methods : {
            //关闭当前视图
            closeView : function() {
                uexWindow.close();
            }
        }
    });
    /**
     * 正在加载 遮罩层 组件
     */
    Vue.component("loading-component", {
        props : {
            text : {
                type : String,
                default : "正在加载..."
            }
        },
        template : "<div id='loading-container'>" + 
                       "<div class='loader' :data-text='text' data-half ></div>" +
                   "</div>"
    });
})();