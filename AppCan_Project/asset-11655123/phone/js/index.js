(function($) {

var vm = new Vue({
    el : "#Page",
    data : {
        menus : [[{ //===首页===
            id : "zcck",
            name : "资产出库",
            url : "zc/zcck.html",
            callback : "openUrl"
        },{
            id : "zclz",
            name : "资产流转",
            url : "zc/zclz.html",
            callback : "openUrl"
        },{
            id : "zcpd",
            name : "资产盘点",
            url : "zc/zcpd.html",
            callback : "openUrl"
        },{
            id : "zccl",
            name : "资产处理",
            url : "zc/zcpd.html",
            callback : "openUrl"
        },{
            id : "qrcodeScan",
            name : "二维码扫描",
            callback : "qrcodeScan"
        }] , [{ //===我的===
            id : "my_info",
            name : "我的信息",
            //url : "my/my_info.html",
            callback : "openUrl"
        },{
            id : "my_record",
            name : "我的记录",
            //url : "my/my_record.html",
            callback : "openUrl"
        },{
            id : "my_assets",
            name : "当前资产",
            url : "my/my_assets.html",
            callback : "openUrl"
        }]],
        tabs : {
            selectIndex : 0,
            items : [{
                icon : "fa-home",
                text : "首　页"
            },{
                icon : "fa-user",
                text : "　我　"
            }]
        }
    },
    methods : {
        /**
         * 页签点击事件 
         */
        clickTab : function(index){
            this.tabs.selectIndex = index;
        },
        /**
         * 关闭窗口 
         */
        closeView : function() {
            uexWindow.close();
        },
        /**
         * 菜单项点击事件 
         */
        menuClick : function(item) {
            this[item.callback].call(this, item);
        },
        /**
         * 打开新窗口 
         */
        openUrl : function(item) {
            if(item.url) {
                appcan.openWinWithUrl(item.id, item.url);
            }
        },
        /**
         * 调用摄像头进行二维码扫描 
         */
        qrcodeScan : function() {
            uexScanner.open(function(err, data){
                //包含type :"QR_CODE" ,code:扫描到的内容
                data.code = data.code.replace(/\\/g,"");
                var content = JSON.parse(data.code);
                if("operateType" in content && "operateId" in content) {
                    //将扫描获得的信息放在前端缓存
                    appcan.locStorage.setVal("QrcodeContent", data.code);
                    appcan.openWinWithUrl('zcck_receive','zc/zcck/zcck_receive.html');
                } else {
                    appcan.window.openToast('无效内容', '2000');
                }
            });
        }
    }
    
});
})($);