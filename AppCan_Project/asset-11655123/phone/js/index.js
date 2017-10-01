(function($) {
    
appcan.button("#nav-left", "btn-act",function() {
    appcan.openWinWithUrl('login', 'login.html');
    // window.history.go(-1);
});

var vm = new Vue({
    el : "#Page",
    data : {
        tabs : {
            selectIndex : 0,
            items : [{
                icon : "fa-home",
                text : "首　页",
                target : {
                    index : "index",
                    url : "index.html"
                }
            },{
                icon : "fa-user",
                text : "　我　",
                target : {
                    index : "my",
                    url : "my.html"
                }
            }]
        }
    },
    methods : {
        clickTab : function(index){
            if(index !== this.tabs.selectIndex) {
                //TODO 跳转目标页面
                alert(this.tabs.items[index].target.url);
            }
        },
        closeView : function() {
            uexWindow.close();
        }
    }
    
});
var lv = appcan.listview({
    selector : "#listview",
    type : "thinLine",
    hasAngle : true
});
lv.set([{
        title : "资产出库",
        id:"zcck"
    }, {
        title : "资产流转",
        id:"zclz"
    }, {
        title : "资产盘点",
        id:"zcpd"
    }, {
        title : "资产处理",
        id:"zccl"
    }, {
        title : "二维码扫描",
        id : "qrcodeScan"
    }
]);
lv.on("click",function(ele,obj,curEle){
    $("#zcck").on('click',function(){
        appcan.openWinWithUrl('zcck','zc/zcck.html');
    });
    $("#zclz").on('click',function(){
        appcan.openWinWithUrl('zclz','zc/zclz.html');
    });
    $("#zcpd").on('click',function(){
        appcan.openWinWithUrl('zccl','zc/zcpd.html');
    });
    $("#zccl").on('click',function(){
        appcan.openWinWithUrl('zcpd','zc/zcgl.html');
    });
    $("#qrcodeScan").on('click',function(){
        uexScanner.open(function(err, data){
            //包含type :"QR_CODE" ,code:扫描到的内容
            var content = JSON.parse(data.code);
            if("operateType" in content && "operateId" in content) {
                //将扫描获得的信息放在前端缓存
                appcan.locStorage.setVal("QrcodeContent", data.code);
                appcan.openWinWithUrl('zcck_receive','zc/zcck/zcck_receive.html');
            } else {
                appcan.window.openToast('无效内容', '2000');
            }
        });
    });
})
})($);