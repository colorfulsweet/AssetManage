(function(){
    //页面当中的公共变量 方法等
    var SysFunction = function() {
        this.rootPath = "http://192.168.31.19:9000";
        this.contextPath = "/";
    };
    
    SysFunction.prototype.getQueryString = function(name) {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    };
    window.sys_common = new SysFunction();
})();