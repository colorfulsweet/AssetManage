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
            //TODO 请求后台获得订单ID并传到显示二维码的页面
            $.ajax({
                url : sys_common.rootPath + sys_common.contextPath + "saveOrder",
                type : "POST",
                async : true,
                data : {
                    selectedIds : localStorage.getItem("selectedIds"),
                    operate : sys_common.getQueryString("operate")
                },
                success : function(res) {
                    
                }
            });
            
        }
    }
});



})();