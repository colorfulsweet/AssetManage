appcan.ready(function() {
var vm = new Vue({
    el : "#Page",
    data : {
        zcList : [],
        operateList : [{
            name : "出库",
            view : "../zcck.html",
            viewIndex : "zcck"
        },{
            name : "流转",
            view : "../zclz.html",
            viewIndex : "zclz"
        },{
            name : "回收",
            view : "../zccl.html",
            viewIndex : "zccl"
        }],
        operate : appcan.locStorage.getVal("operate") || 1
    },
    created : function() {
        var jsonStr = appcan.locStorage.getVal("selectedIds");
        if(!jsonStr) {
            return;
        }
        var zcIds = JSON.parse(jsonStr);
       // ----TEST----
       //var zcIds = ["5105", "5106", "5107"];
       // ------------
        var vm = this;
        appcan.ajax({
            url : sys_common.rootPath + sys_common.contextPath + "zichan/list",
            data : {uuids : zcIds.join(",")},
            type : "GET",
            dataType : "json",
            success : function(res){
                vm.zcList = res;
            }
        });
    },
    methods : {
        /**
         * 跳转到生成二维码的界面
         */
        toQrcode : function() {
            var login_user = appcan.locStorage.getVal("login_user");
            if(!login_user) {
                //未登录
                appcan.openWinWithUrl('login','../../login.html');
                return;
            }
            //请求后台获得订单ID并传到显示二维码的页面(或者保存在appcan.locStorage)
            appcan.ajax({
                url : sys_common.rootPath + sys_common.contextPath + "lz/save",
                type : "POST",
                async : true,
                data : {
                    bgrId : JSON.parse(login_user).uuid,
                    selectedIds : appcan.locStorage.getVal("selectedIds"),
                    operate : appcan.locStorage.getVal("operate")
                },
                success : function(res) {
                    appcan.locStorage.remove("selectedIds"); //在缓存中移除选中的资产, 避免影响下次操作
                    
                    appcan.locStorage.setVal("operateId", res);
                    appcan.openWinWithUrl('qrcode','../qrcode.html');
                },
                error : function(err){
                    appcan.alert({
                        title : "提示",
                        content : "网络繁忙，请稍候再试！",
                        buttons : ['确定'],
                    });
                }
            });
            
        },
        /**
         * 继续检索添加
         */
        continueSearch : function() {
            appcan.openWinWithUrl(this.operateList[this.operate-1].viewIndex, 
                                this.operateList[this.operate-1].view);
            uexWindow.close();//关闭当前视图
        }
    }
});

});