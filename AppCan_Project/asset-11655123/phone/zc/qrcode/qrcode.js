(function(){
var operateId = sys_common.getQueryString("operateId");
if(!operateId) {
    appcan.window.openToast('二维码获取失败', '2000');
    return;
}
$(function(){
    $("#qrcode_img").attr("src", sys_common.rootPath + sys_common.contextPath + "lz/outputQrcode/"+operateId);
});
})();