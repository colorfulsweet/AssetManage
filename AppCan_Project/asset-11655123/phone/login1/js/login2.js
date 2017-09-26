(function($) {
    appcan.button("#nav-left", "btn-act",
    function() {
     window.history.go(-1);
    });
    appcan.button("#nav-right", "btn-act",
    function() {});
    
            // appcan.request.postForm($("form"), function() {
                // appcan.window.alert({
                    // title : "提醒",
                    // content : "您已经提交了表单:)",
                    // buttons : '确定',
                    // callback : function(err, data, dataType, optId) {
                        // console.log(err, data, dataType, optId);
                    // }
                // });
            // }, function(err) {
// 
            // });
            // return false;
        // });
})($);
      appcan.ready(function() {
          // var userInfo = appcan.locStorage.getVal('userInfo');
          // var remUserInfo = appcan.locStorage.getVal('remUserInfo');
//           
          // if(remUserInfo == "true" && !!userInfo){
              // userInfo = eval('('+userInfo+')');
              // $("#rem").addClass('text-active');
              // $("#name").val(userInfo.name);
              // $("#pwd").val(userInfo.pwd);
          // }
          // appcan.button("#rem","btn-act",function(){
             // $(this).toggleClass('text-active'); 
          // });
          
        function login() {
            var name = $("#name").val();
            var pwd = $("#pwd").val();
            if (name == "" || name == null) {
                appcan.window.openToast('用户名不能为空', '1000');
                 $("#uid").focus();
                return;
            } else if (pwd == "") {
                appcan.window.openToast('密码不能为空', '1000');
                return;
            } else {
                $("form").submit();
            }

        }
    }
        //登录
        // appcan.button("#submit", "ani-act", function() {
            //login();
            
            // var name = $("#name").val();
            // var pwd = $("#pwd").val();
            // if (name == "" || name == null) {
                // appcan.window.openToast('用户名不能为空', '1000');
                 // $("#uid").focus();
                // return;
            // } else if (pwd == "") {
                // appcan.window.openToast('密码不能为空', '1000');
                // return;
            // } else {
                // $("form").submit();
            // }
            // //登录人信息
            // var name = $("#name").val();
            // var pwd = $("#pwd").val();
            // var userInfo = {
                // 'name':name,
                // 'pwd':pwd,
            // }
            // // appcan.window.alert("name = "+name);
            // // appcan.window.alert("pwd = "+pwd);
//             
            // appcan.request.ajax({
                // url : server,
                // type : 'POST',
                // data : {
                    // "login":"managerLogin"
                    // "userInfo":userInfo
                // },
                // datatype:'JSON',
                // success : function(data) {
                    // appcan.window.closeToast();
                    // if (data.success) {
                        // if ($('#rem').hasClass('text-active')) {
                            // //记录账号密码
                            // appcan.locStorage.setVal('userInfo',userInfo);
                            // //记录是否记住密码
                            // appcan.locStorage.setVal('remUserInfo',true);
                        // }else{
                            // appcan.locStorage.remove('userInfo');
                            // appcan.locStorage.remove('remUserInfo');
                        // }
//                         
                        // //保存当前登录信息
                        // appcan.locStorage.setVal('loginUser',userInfo);
                        // homepage = data.value;
                        // if (homepage == 'more') {
                            // appcan.window.open({
                                // name:"index",
                                // data:"newApp/homepage/index.html"
                            // });
                        // }else if(homepage == 'one'){
                            // var stationCode = appcan.locStorage.getVal('station');
                            // setLocStorage('station',stationCode);
                            // appcan.window.open({
                                // name : "index",
                                // data : "newApp/homepage/index.html"
                            // });
                        // }
//                         
                    // }else{
                        // appcan.window.closeToast();
                        // appcan.alert({
                            // title : "提示",
                            // content : data.fail,
                            // buttons : ['确定']
                        // })
                    // }
                    // // if (data == "1") {//登陆成功
                        // // appcan.window.openToast('登陆成功', '2000');
                        // // var timer = setTimeout(function() {
                            // // appcan.openWinWithUrl('index', 'index.html');
                            // // //页面跳转
                        // // }, 2000);
                    // // }else {
                        // // appcan.window.openToast('用户名或密码错误！', '2000');
                    // // }
                // },
                // error : function(err){
                    // appcan.alert({
                        // title : "提示",
                        // content : "网络繁忙，请稍候再试！",
                        // buttons : ['确定']
                    // })
//                     
                // }
            // });
        })

        $("form").on('submit', function() {
            var name = $("#name").val();
            var pwd = $("#pwd").val();
            // var userInfo = {
                // 'name':name,
                // 'pwd':pwd,
            // }
            // appcan.window.alert("name = "+name);
            // appcan.window.alert("pwd = "+pwd);
            
            appcan.request.ajax({
                url : server,
                type : 'POST',
                data : {
                    // "login":"managerLogin"
                    "userInfo":userInfo
                    // "name" : name,
                    // "pwd" : pwd
                },
                datatype:'JSON',
                success : function(data) {
                    // appcan.window.closeToast();
                    // if (data.success) {
                        // if ($('#rem').hasClass('text-active')) {
                            // //记录账号密码
                            // appcan.locStorage.setVal('userInfo',userInfo);
                            // //记录是否记住密码
                            // appcan.locStorage.setVal('remUserInfo',true);
                        // }else{
                            // appcan.locStorage.remove('userInfo');
                            // appcan.locStorage.remove('remUserInfo');
                        // }
//                         
                        // //保存当前登录信息
                        // appcan.locStorage.setVal('loginUser',userInfo);
                        // homepage = data.value;
                        // if (homepage == 'more') {
                            // appcan.window.open({
                                // name:"index",
                                // data:"newApp/homepage/index.html"
                            // });
                        // }else if(homepage == 'one'){
                            // var stationCode = appcan.locStorage.getVal('station');
                            // setLocStorage('station',stationCode);
                            // appcan.window.open({
                                // name : "index",
                                // data : "newApp/homepage/index.html"
                            // });
                        // }
//                         
                    // }else{
                        // appcan.window.closeToast();
                        // appcan.alert({
                            // title : "提示",
                            // content : data.fail,
                            // buttons : ['确定']
                        // })
                    // }
                    if (data == "1") {//登陆成功
                        appcan.window.openToast('登陆成功', '2000');
                        var timer = setTimeout(function() {
                            appcan.openWinWithUrl('index', 'index.html');
                            //页面跳转
                        }, 2000);
                    }else {
                        appcan.window.openToast('用户名或密码错误！', '2000');
                    }
                },
                error : function(err){
                    appcan.alert({
                        title : "提示",
                        content : "网络繁忙，请稍候再试！",
                        buttons : ['确定']
                    })
                    
                }
            });
    });

            // return false;
        
      
