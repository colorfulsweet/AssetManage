appcan.ready(function(){

var operate = appcan.locStorage.getVal("operate");//操作类型1出库  2流转  3回收
var login_user = JSON.parse(appcan.locStorage.getVal("login_user"));//当前登录用户的信息
var openNextView = function() {
    appcan.locStorage.setVal("from", "qrcode");
    switch (operate) {
        case "1" : //出库 
            //当前用户为MA,则跳转到上传照片, 为MK则跳转到统计
            if(_.findIndex(login_user.roles, function(item){return item === "MA";}) !== -1) {
                appcan.openWinWithUrl('zc_receive','zcck/zc_receive.html');
            } else if(_.findIndex(login_user.roles, function(item){return item === "MK";}) !== -1) {
                appcan.openWinWithUrl('zc_show','zcck/zc_show.html');
            }
            break;
        case "2" : //流转
            appcan.openWinWithUrl('zc_show','zcck/zc_show.html');
            break;
        case "3" : //TODO 回收...
            break;
        default : 
            throw new Error("未知的操作类型 : " + operate);
    }
    uexWindow.close();
};
var operateId = appcan.locStorage.getVal("operateId");//操作ID
var checkFinished = function() {
    // 对后台执行轮询, 等待对方扫码之后确认完成, 显示出库清单
    appcan.ajax({
        url : sys_common.rootPath + sys_common.contextPath + "lz/checkFinished",
        type : "GET",
        data : {
            operateId: operateId, 
            r: Math.random(), //添加随机数防止缓存
            _token : login_user.token
        }, 
        dataType : "json",
        success : function(res){
            if(res.msg !== "finished") {
                setTimeout(checkFinished, 3000);
            } else {
                openNextView(); //根据角色与操作类型进行页面跳转
            }
        }
    });
};

var vm = new Vue({
    el : "#Page",
    data : {
        imgSrc : "../images/loading.gif",
        title : "二维码图片"
    },
    mounted : function(){
        if(!operateId) {
            appcan.window.openToast('二维码获取失败', '2000');
            return;
        }
        this.imgSrc = sys_common.rootPath + sys_common.contextPath + "lz/outputQrcode/"+operateId;
        checkFinished();
    }
});
});