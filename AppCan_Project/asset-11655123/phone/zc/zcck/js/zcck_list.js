(function(){
var vm = new Vue({
    el : "#Page",
    data : {
        zcList : []
    },
    created : function() {
        var jsonStr = localStorage.getItem("selectedIds");
        if(jsonStr) {
            this.zcList = JSON.parse(jsonStr);
        }
    },
    methods : {
        /**
         * 跳转到生成二维码的界面
         */
        toQrcode : function() {
            //TODO 请求后台获得订单ID并传到显示二维码的页面(或者保存在localStorage)
            $.ajax({
                url : sys_common.rootPath + sys_common.contextPath + "lz/save",
                type : "POST",
                async : true,
                data : {
                    selectedIds : localStorage.getItem("selectedIds"),
                    operate : sys_common.getQueryString("operate")
                },
                success : function(res) {
                    localStorage.removeItem("selectedIds"); //在缓存中移除选中的资产, 避免影响下次操作
                    appcan.openWinWithUrl('qrcode','../qrcode.html?operateId='+res);
                },
                error : function(err){
                    appcan.alert({
                        title : "提示",
                        content : "网络繁忙，请稍候再试！",
                        buttons : ['确定'],
                    });
                }
            });
            
        }
    }
});



})();