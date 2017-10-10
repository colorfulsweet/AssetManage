appcan.ready(function() {
var vm = new Vue({
    el : "#Page",
    data : {
        zcList : [],
        targetName : null, //对方的姓名
        selectItemIndex : null,
        operateId : appcan.locStorage.getVal("operateId") ,
        operate : appcan.locStorage.getVal("operate") || 1,
        operateList : sys_common.operateList,
        from : appcan.locStorage.getVal("from") //该页面从哪个页面跳转而来
    },
    mounted : function() {
        if(!this.operateId) {
            return;
        }
        //二维码信息中包含 operateType 和 operateId
        sys_common.ajax({
            type : "POST",
            url : sys_common.rootPath + sys_common.contextPath + "zichan/getByOperateId",
            data : {
                operateId : this.operateId
            },
            success : function(res) {
                vm.$data.zcList = res;
            }
        });
    },
    methods : {
        /**
         * 表格行 点击事件
         * @param {Object} index 该行索引(从0开始)
         */
        trSelect : function(item,index) {
            var target = $(event.currentTarget);
            target.parent("div").children().removeClass("selected");
            target.addClass("selected");
            vm.$data.selectItemIndex = index;
        },
        /**
         * 调用摄像头拍照
         */
        takePhoto : function() {
            // 调用摄像头拍照
            var vm = this;
            uexCamera.open(0, 60, function(picPath) {//获取到图片的路径
                var req = uexXmlHttpMgr.create({
                    url : sys_common.rootPath + sys_common.contextPath + "lz/uploadPhoto",
                    method : "POST"
                });
                uexXmlHttpMgr.setPostData(req, 0,"operateId", vm.operateId);
                uexXmlHttpMgr.setPostData(req, 0,"zcId", vm.zcList[vm.selectItemIndex].uuid);
                uexXmlHttpMgr.setPostData(req, 1,"uploadPhoto", picPath);
                uexXmlHttpMgr.send(req, 1,  function(status,responseStr,resCode,resInfo){
                        var result = JSON.parse(responseStr);
                        appcan.window.openToast(result.msg, '2000');
                        if(result.status && result.data) {
                            var picUrl = sys_common.rootPath + sys_common.contextPath + result.data;
                            var img_preview = $("#tableBody > div .img-preview").eq(vm.selectItemIndex);
                            img_preview.css({
                                "background-image" : "url("+picUrl+")", // base64编码
                                "width" : "7em",
                                "height" : "7em"
                            });
                        }
                        uexXmlHttpMgr.close(req);
                   },function(){});
                
                appcan.alert({
                    title : "图片保存路径",
                    content : picPath,
                    buttons : ['确定']
                });
            });
        },
        /**
         * 点击"上传图片"
         */
        uploadPic : function() {
            if (this.selectItemIndex == null) {
                appcan.window.openToast('请选择要添加照片的资产', '2000');
                return;
            }
            $("#uploadPhoto").click();
        },
        /**
         * 选择文件之后的回调函数
         */
        selectFile : function() {
            var vm = this;
            var fileInput = event.target;
            if (!fileInput.value) {
                // 检查文件是否选择
                return;
            }
            var file = fileInput.files[0];
            var imageType = /image.*/;
            if (!file.type.match(imageType)) {
                appcan.alert({
                    title : "提示",
                    content : "不是有效的图片文件!",
                    buttons : ['确定'],
                });
                return;
            }
            if(file.size > sys_common.maxFileSize) {
                appcan.alert({
                    title : "提示",
                    content : "请勿选择超过5MB的图片!",
                    buttons : ['确定'],
                });
                return;
            }
            //==== FileReader加载图片预览在手机端易导致APP崩溃 ====
            // // 读取文件:
            // var reader = new FileReader();
            // reader.onload = function(e) {//生成图片预览
                // var img_preview = $("#tableBody > div .img-preview").eq(vm.selectItemIndex);
                // img_preview.css({
                    // "background-image" : "url("+e.target.result+")", // base64编码
                    // "width" : "7em",
                    // "height" : "7em"
                // });
            // };
            // reader.readAsDataURL(file);
            var formData = new FormData(document.getElementById("uploadForm"));
            formData.append("operateId", this.operateId);
            formData.append("zcId", this.zcList[this.selectItemIndex].uuid);
            sys_common.ajax({
                url : sys_common.rootPath + sys_common.contextPath + "lz/uploadPhoto",
                type : "POST",
                data : formData,
                processData : false,
                contentType : false,
                complete : function(xhr, res) {
                    var result = JSON.parse(xhr.responseText);
                    appcan.window.openToast(result.msg, '2000');
                    if(result.status && result.data) {
                        var picUrl = sys_common.rootPath + sys_common.contextPath + result.data;
                        var img_preview = $("#tableBody > div .img-preview").eq(vm.selectItemIndex);
                        img_preview.css({
                            "background-image" : "url("+picUrl+")", // base64编码
                            "width" : "7em",
                            "height" : "7em"
                        });
                        vm.zcList[vm.selectItemIndex].hasPic = true;
                    }
                }
            }, $);
        },
        /**
         * 完成
         */
        finished : function() {
            if(! _.every(this.zcList, function(item){ return item.hasPic; }) ) {
                appcan.window.openToast('请为所有的资产上传对应照片', '2000');
                return;
            }
            switch(this.from) {
                case "noQrcode" : //对方无法扫码 -> 跳转至本页面
                    if(!this.targetName) {
                        appcan.window.openToast('请输入对方姓名', '2000');
                        return;
                    }
                    sys_common.ajax({
                        url : sys_common.rootPath + sys_common.contextPath + "lz/saveTargetName",
                        type : "POST",
                        data : {
                            operateId : this.operateId,
                            operate : this.operate,
                            targetName : this.targetName
                        },
                        success : function(res) {
                            if(!res.status) {
                                appcan.window.openToast(res.msg, '2000');
                                return;
                            }
                            appcan.openWinWithUrl('zc_confirm','zc_confirm.html');
                            uexWindow.close();
                        }
                    });
                    return;
                case "index" : //扫码操作后解析二维码 -> 跳转至本页面
                    appcan.openWinWithUrl('zc_confirm','zc_confirm.html');
                    break;
                case "qrcode" : //二维码展示页面等待对方扫码确认完成 -> 跳转至本页面
                    appcan.openWinWithUrl('count','../count.html');
                    break;
            }
            uexWindow.close();
        },
        /**
         * 取消
         */
        cancel : function() {
            uexWindow.close();//关闭当前页面
        }
    }
});
}); 