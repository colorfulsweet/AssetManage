appcan.ready(function() {
var login_user = appcan.locStorage.getVal("login_user");
/**
 * 保存流转信息
 * @param {function} callback 保存完成之后的回调函数(可以执行页面跳转) 
 */
var saveLzxx = function(callback, zcInfo) {
    sys_common.ajax({
        url : sys_common.rootPath + sys_common.contextPath + "lz/save",
        type : "POST",
        async : true,
        data : {
            bgrId : JSON.parse(login_user).uuid,
            zcInfo : JSON.stringify(zcInfo),
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
};
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
        ///*
        var jsonStr = appcan.locStorage.getVal("selectedIds");
        if(!jsonStr) {
            return;
        }
        var zcIds = JSON.parse(jsonStr);
        //*/
       // ----TEST----
       //var zcIds = ["15001", "15002", "15003"];
       // ------------
        var vm = this;
        sys_common.ajax({
            url : sys_common.rootPath + sys_common.contextPath + "zichan/list",
            data : {uuids : zcIds.join(","), _token:"1"},
            type : "GET",
            dataType : "json",
            success : function(res){
                vm.zcList = res;
                vm.tip = "没有符合条件的数据";
            }
        });
    },
    methods : {
        numChange : function(index) {
            var newVal = parseFloat(event.currentTarget.value);//新值
            //新值不合法的情况下, 将输入框赋值为原值
            if(Number.isNaN(newVal) || newVal<=0) {
                appcan.window.openToast('请输入有效的数字(必须大于0)', '2000');
                event.currentTarget.value = this.zcList[index].zcNum || this.zcList[index].shul;
                return;
            }
            if(newVal > this.zcList[index].shul) {//原始值(新值不能超过该值)
                appcan.window.openToast(
                    this.operateList[this.operate-1].name + "数量不能超过当前库存数量:"+this.zcList[index].shul,'2000');
                event.currentTarget.value = this.zcList[index].zcNum || this.zcList[index].shul;
                return;
            }
            event.currentTarget.value = newVal;
            this.zcList[index].zcNum = newVal;
        },
        /**
         * 跳转到生成二维码的界面
         */
        toQrcode : function() {
            var zcInfo = {};
            this.zcList.forEach(function(item){
                zcInfo[item.uuid] = item.zcNum || item.shul;
            });
            saveLzxx(function(){
                appcan.openWinWithUrl('qrcode','../qrcode.html');
            }, zcInfo);
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
            var zcInfo = {};
            this.zcList.forEach(function(item){
                zcInfo[item.uuid] = item.zcNum || item.shul;
            });
            saveLzxx(function(){
                appcan.locStorage.setVal("from", "noQrcode");
                appcan.openWinWithUrl('zc_receive','zc_receive.html');
                uexWindow.close();
            }, zcInfo);
        }
    }
});

});