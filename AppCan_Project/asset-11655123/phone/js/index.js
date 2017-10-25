(function($) {
var loginUserStr = appcan.locStorage.getVal("login_user");
var login_user = null;
if(loginUserStr) {
    login_user = JSON.parse(loginUserStr);
}
/**
 * 二维码扫描回调函数 
 */
var scannerCallback = function(err, data){
    //包含type :"QR_CODE" ,code:扫描到的内容
    data.code = data.code.replace(/\\/g,"");
    var content = JSON.parse(data.code);
    if(!login_user) {
        return;
    }
    if("operateType" in content && "operateId" in content) {
        //将扫描获得的信息放在前端缓存
        appcan.locStorage.setVal("operateId", content.operateId);
        appcan.locStorage.setVal("operate", content.operateType);
        appcan.locStorage.setVal("from", "index");
        switch (content.operateType) {
            case "1" : //出库(可以由MA或者MK扫码)
                if(_.findIndex(login_user.roles, function(item){return item === "MA";}) !== -1) {
                    appcan.openWinWithUrl('zcck_receive','zc/zcck/zc_receive.html');
                } else if(_.findIndex(login_user.roles, function(item){return item === "MK";}) !== -1) {
                    appcan.openWinWithUrl('zc_confirm','zc/zcck/zc_confirm.html');
                } else {
                    appcan.window.openToast('无操作权限', '2000');
                }
                break;
            case "2" : //流转(必须由MK扫码)
                if(_.findIndex(login_user.roles, function(item){return item === "MK";}) !== -1) {
                    appcan.openWinWithUrl('zcck_receive','zc/zcck/zc_receive.html');
                } else {
                    appcan.window.openToast('无操作权限', '2000');
                }
                break;
            case "3" : break;//TODO 回收
        }
        
    } else {
        appcan.window.openToast('无效内容', '2000');
    }
};
var vm = new Vue({
    el : "#Page",
    data : {
        loginUser : login_user,
        menus : [[{ //===首页===
            id : "zcck",
            name : "资产出库",
            url : "zc/zcck.html",
            callback : "openUrl",
            roles : ["MA", "MK"]
        },{
            id : "zclz",
            name : "资产流转",
            url : "zc/zclz.html",
            callback : "openUrl",
            roles : ["MK"]
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
            callback : "qrcodeScan",
            oles : ["MA","MK"]
        }] , [{ //===我的===
            id : "my_info",
            name : "我的信息",
            url : "my/my_info.html",
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
        },{
            id : "change_pwd",
            name : "修改密码",
            url : "my/change_pwd.html",
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
         * 判断两个数组是否包含重复的元素 
         */
        existsSameValues : function(arr1, arr2) {
            if(!Array.isArray(arr1) || !Array.isArray(arr2)) {
                return false;
            }
            for(var index1 in arr1) {
                for(var index2 in arr2) {
                    if(arr1[index1] === arr2[index2]) {
                        return true;
                    }
                }
            }
            return false;
        },
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
            uexScanner.open(scannerCallback);
        },
        /**
         * 注销 
         */
        logout : function() {
            appcan.locStorage.remove("login_user");
            appcan.openWinWithUrl("login", "login.html");
            uexWindow.close();
        }
    }
    
});
})($);