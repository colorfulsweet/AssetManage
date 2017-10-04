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
        props : ["title", "hasbackbtn"],
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