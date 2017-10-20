appcan.ready(function() {
var vm = new Vue({
    el : "#Page",
    data : {
        zcList : [],
        operateId : appcan.locStorage.getVal("operateId"),
        operate : appcan.locStorage.getVal("operate") || 1,
        operateList : sys_common.operateList
    },
    mounted : function() {
        if(!this.operateId) {
            return;
        }
        //二维码信息中包含 operateType 和 operateId
        sys_common.ajax({
            type : "POST",
            url : sys_common.rootPath + sys_common.contextPath + "zichan/getByOperateId",
            data : {
                operateId : this.operateId
            },
            success : function(res) {
                vm.$data.zcList = res;
            }
        });
    },
    methods : {
        /**
         * 完成
         */
        confirm : function() {
            appcan.openWinWithUrl('zc_confirm','zc_confirm.html');
            uexWindow.close();
        },
        /**
         * 取消
         */
        cancel : function() {
            uexWindow.close();//关闭当前页面
        }
    }
});
}); 