(function(){
var operateId = sys_common.getQueryString("operateId");
if(!operateId) {
    appcan.window.openToast('二维码获取失败', '2000');
    return;
}
$(function(){
    $("#qrcode_img").attr("src", sys_common.rootPath + sys_common.contextPath + "lz/outputQrcode/"+operateId);
    // 对后台执行轮询, 等待对方扫码之后确认完成, 显示出库清单
    
    var checkFinished = function() {
        $.get(sys_common.rootPath + sys_common.contextPath + "lz/checkFinished",
        {operateId: operateId, r:Math.random()}, //添加随机数防止缓存
        function(res){
            if(res.msg !== "finished") {
                setTimeout(checkFinished, 3000);
            } else {
                appcan.openWinWithUrl('count','count.html?operateId=' + operateId);
            }
        },"json");
    };
    checkFinished();
});
})();