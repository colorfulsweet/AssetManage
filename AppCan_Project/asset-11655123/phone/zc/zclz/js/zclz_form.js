(function($) {
    appcan.button("#nav-left", "btn-act",
    function() {});
    appcan.button("#nav-right", "btn-act",
    function() {});
    
    appcan.button("#btn", "btn-act",function() {
        search();
    });
    
    function search(){
        var orderno = $("#orderno").val();
        var asname = $("#asname").val();
        var astype = $("#astype").val();
        if (orderno == "" || orderno == null) {
            appcan.window.openToast('编码不能为空', '2000');
            $("#orderno").focus();
            return;
        } else if (asname == "") {
            appcan.window.openToast('请选择名称', '2000');
            return;
        }else if (astype == "") {
            appcan.window.openToast('请选择类型', '2000');
            return;
        } else {
            $("form").submit();
        }

    }

    $("form").on('button',function(){
        var orderno = $("#orderno").val();
        var asname = $("#asname").val();
        var astype = $("#astype").val();
        var info = {
            'orderno':orderno,
            'asname':asname,
            'astype':astype,
        }
        
        appcan.request.ajax({
            url : 'http://192.168.21.81:8080/book1/asset.do?action=assetifQuery',
            type : 'post',
            datatype : 'json',
            data : {
                "assetifQuery" : "assetifQuery",
                "info" : info
            },
            
            success : function(data){
                // appcan.alert("data = "+data);
                appcan.openWinWithUrl('index', 'index.html');
                            //页面跳转     
            },error : function(error){
                appcan.alert({
                        title : "提示",
                        content : "网络繁忙，请稍候再试！",
                        buttons : ['确定'],
                        
                    })
            }
            
        })
        
    })
    
    var tabview_Tab = appcan.tab({
        selector: $("#Tab"),
        hasIcon: true,
        hasAnim: false,
        hasLabel: true,
        hasBadge: false,
        index: 0,
        data : [{
            label : "首　页",
            icon : "fa-home"
        }, {
            label : "　我　",
            icon : "fa-user"
        }]
    });

	appcan.ready(function() {
        })
        var tabview = appcan.tab({
            selector : "#tabview",
            hasIcon : false,
            hasAnim : true,
            hasLabel : true,
            hasBadge : false,
            data : [{
                label : "预先准备",
            }, {
                label : "空中实施",
            }]
        });
        tabview.on("click", function(obj, index) {
            appcan.openWinWithUrl('index','index.html');
        })
})($);