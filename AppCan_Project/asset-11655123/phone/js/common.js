(function(){
    //页面当中的公共变量 方法等
    var SysFunction = function() {
        //this.rootPath = "http://123.232.10.234:8150";
        this.rootPath = "http://192.168.31.137:9000";
        this.contextPath = "/";
        //上传文件的最大大小
        this.maxFileSize = 5 * 1024 * 1024; //5MB
    };
    /*
     //url传递查询参数在手机端运行时无效
    SysFunction.prototype.getQueryString = function(name) {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    };
    */
    window.sys_common = new SysFunction();
})();