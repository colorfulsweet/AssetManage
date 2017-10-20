(function(){

var vm = new Vue({
    el : "#Page",
    data : {
        username : localStorage.getItem("re_username"),
        password : null
    },
    methods : {
        loginSubmit : function() {
            if (!this.username) {
                appcan.window.openToast('用户名不能为空', '2000');
                $("#username").focus();
                return;
            } 
            if (!this.password) {
                appcan.window.openToast('密码不能为空', '2000');
                $("#pwd").focus();
                return;
            } 
            localStorage.setItem("re_username", this.username);//记住用户名,下次登录时自动填充
            sys_common.ajax({
                url : sys_common.rootPath + sys_common.contextPath + 'login',
                type : 'POST',
                datatype : 'json',
                data : {
                    'user':this.username,
                    'password':this.password
                },
                success : function(res) {
                    if (res.status === 1) {//登陆成功
                        appcan.window.openToast('登陆成功', '2000');
                        appcan.locStorage.setVal("login_user", JSON.stringify(res.data));
                        var timer = setTimeout(function() {
                            appcan.openWinWithUrl('index', 'index.html');//页面跳转
                        }, 2000);
                    }else {
                        appcan.window.openToast(res.msg, '2000');
                    }
                }
            });
        }
    }
});


})();