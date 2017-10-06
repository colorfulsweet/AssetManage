appcan.ready(function() {
var login_user = appcan.locStorage.getVal("login_user");
/**
 * 保存流转信息
 * @param {function} callback 保存完成之后的回调函数(可以执行页面跳转) 
 */
var saveLzxx = function(callback) {
    sys_common.ajax({
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
            if(typeof callback === "function") {
                callback.call(null);
            }
        }
    });
}
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
        operate : appcan.locStorage.getVal("operate") || 1,
        tip : "加载中......"
    },
    mounted : function() {
        var jsonStr = appcan.locStorage.getVal("selectedIds");
        if(!jsonStr) {
            return;
        }
        var zcIds = JSON.parse(jsonStr);
       // ----TEST----
       //var zcIds = ["5105", "5106", "5107"];
       // ------------
        var vm = this;
        sys_common.ajax({
            url : sys_common.rootPath + sys_common.contextPath + "zichan/list",
            data : {uuids : zcIds.join(",")},
            type : "GET",
            dataType : "json",
            success : function(res){
                vm.zcList = res;
                vm.tip = "没有符合条件的数据";
            }
        });
    },
    methods : {
        /**
         * 跳转到生成二维码的界面
         */
        toQrcode : function() {
            //请求后台获得流转操作ID保存在appcan.locStorage)
            saveLzxx(function(){
                appcan.openWinWithUrl('qrcode','../qrcode.html');
            });
        },
        /**
         * 继续检索添加
         */
        continueSearch : function() {
            appcan.openWinWithUrl(this.operateList[this.operate-1].viewIndex, 
                                this.operateList[this.operate-1].view);
            uexWindow.close();//关闭当前视图
        },
        /**
         * 对方无法扫码, 直接跳转到接收上传图片界面 
         */
        toReceive : function() {
            saveLzxx(function(){
                appcan.openWinWithUrl('zc_receive','zc_receive.html');
            });
        }
    }
});

});