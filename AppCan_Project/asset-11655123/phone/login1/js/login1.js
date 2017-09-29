(function($) {
    appcan.button("#nav-left", "btn-act",
    function() {
     window.history.go(-1);
    });
    appcan.button("#nav-right", "btn-act",
    function() {});
})($);
  appcan.ready(function() {
      var userInfo = appcan.locStorage.getVal('userInfo');
      var remUserInfo = appcan.locStorage.getVal('remUserInfo');
      
      if(remUserInfo == "true" && !!userInfo){
          userInfo = eval('('+userInfo+')');
          $("#rem").addClass('text-active');
          $("#name").val(userInfo.name);
          $("#pwd").val(userInfo.pwd);
      }
      appcan.button("#rem","btn-act",function(){
         $(this).toggleClass('text-active'); 
      });
    appcan.button("#submit", "ani-act", function() {
        var name = $("#name").val();
        var pwd = $("#pwd").val();
        if (!name) {
            appcan.window.openToast('用户名不能为空', '2000');
            $("#uid").focus();
            return;
        } 
        if (!pwd) {
            appcan.window.openToast('密码不能为空', '2000');
            return;
        } 
        loginSubmit(name, pwd);
    });
    var loginSubmit = function(name, pwd) {
        window.appcan = appcan;
        appcan.ajax({
            url : sys_common.rootPath + sys_common.contextPath + 'login',
            type : 'POST',
            datatype : 'json',
            async:false,
            data : {
                'user':name,
                'password':pwd
            },
            success : function(resJson) {
                var res = JSON.parse(resJson);
                if (res.status === 1) {//登陆成功
                    appcan.window.openToast('登陆成功', '2000');
                    appcan.locStorage.setVal("login_user", JSON.stringify(res.data));
                    var timer = setTimeout(function() {
                        appcan.openWinWithUrl('index', 'index.html');
                        //页面跳转
                    }, 2000);
                }else {
                    appcan.window.openToast(res.msg, '2000');
                }
            },
            
            error : function(err){
                appcan.alert({
                    title : "提示",
                    content : "网络繁忙，请稍候再试！",
                    buttons : ['确定'],
                });
            }
        });
    };
 });