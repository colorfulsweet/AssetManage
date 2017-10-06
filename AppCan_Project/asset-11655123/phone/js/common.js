(function(){
    //页面当中的公共变量 方法等
    var SysFunction = function() {
        //公司外网主机
        //this.rootPath = "http://123.232.10.234:8150";
        //局域网主机
        this.rootPath = "http://192.168.31.137:9000";
        //云主机
        //this.rootPath = "http://116.196.68.51:9000";
        this.contextPath = "/";
        //上传文件的最大大小
        this.maxFileSize = 5 * 1024 * 1024; //5MB
    };
    SysFunction.prototype.operateList = ["出库", "流转", "回收"];
    /** 
     * appcan.ajax方法代理<br>
     * 在ajax请求当中添加token数据用于后端认证 <br>
     * 并且对success方法的传参进行包装
     * 
     */
    SysFunction.prototype.ajax = function(config, notAddToken) {
        if(typeof config.success === "function") {
            var oldFunc = config.success;
            config.success = function(resJson) {
                if(typeof resJson === "string") {
                    try {
                        arguments[0] = JSON.parse(resJson);
                    } catch(e){}
                }
                if(arguments[0].status === -1) { //未登录
                    appcan.alert({
                        title : "提示",
                        content : "请登录后再执行该操作",
                        buttons : ['确定']
                    });
                }
                oldFunc.apply(null, Array.prototype.slice.call(arguments));
            }
        }
        
        if(notAddToken) {
            return appcan.ajax(config);
        }
        var loginUserStr = appcan.locStorage.getVal("login_user");
        var loginUser = null;
        if(loginUserStr) {
            loginUser = JSON.parse(loginUserStr);
        } else {
            return appcan.ajax(config);
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
        
        return appcan.ajax(config);
    }
    /*
     //url传递查询参数在手机端运行时无效
    SysFunction.prototype.getQueryString = function(name) {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    };
    */
    window.sys_common = new SysFunction();
    /**
     * 绑定页面标题组件 
     */
    var loginUsername = null;
    var loginUserStr = appcan.locStorage.getVal("login_user");
    if(loginUserStr) {
        loginUsername = JSON.parse(loginUserStr).user;
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
                                "<div class='fa fa-user ub-img1' >{{username}}</div>"+
                            "</div>"+
                        "</div></div>",
        data : function() {
            return {username : loginUsername};
        },
        methods : {
            //关闭当前视图
            closeView : function() {
                uexWindow.close();
            }
        }
    });
})();