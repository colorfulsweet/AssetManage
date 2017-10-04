appcan.ready(function() {
var vm = new Vue({
    el : "#Page",
    data : {
        zcList : [],
        selectItemIndex : null,
        operateId : null,
        operate : null,
        operateList : sys_common.operateList,
        from : undefined //该页面从哪个页面跳转而来
    },
    created : function() {
        this.operateId = appcan.locStorage.getVal("operateId");
        this.operate = appcan.locStorage.getVal("operate") || 1;
        this.from = appcan.locStorage.getVal("from");
        appcan.locStorage.remove("from");
        //二维码信息中包含 operateType 和 operateId
        appcan.ajax({
            type : "POST",
            url : sys_common.rootPath + sys_common.contextPath + "zichan/getByOperateId",
            data : {
                operateId : this.operateId
            },
            success : function(res) {
                if (Array.isArray(res)) {
                    vm.$data.zcList = res;
                } else {
                    vm.$data.zcList = JSON.parse(res);
                }
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
            uexCamera.open(0, 60, function(picPath) {//获取到图片的路径
                //创建图片上传器
                var uploader = uexUploaderMgr.create({
                    url : sys_common.rootPath + sys_common.contextPath + "lz/uploadPhoto",
                    type : 0
                });
                //设置请求消息头
                var headJson = {"Content-Type" : "multipart/form-data"};
                uexUploaderMgr.setHeaders(uploader, JSON.stringify(headJson));
                
                //执行文件上传
                uexUploaderMgr.uploadFile(uploader, "file://" + picPath, "uploadPhoto", 2, 700,function(packageSize, percent, responseString, status){
                    switch (status) {
                    case 0: //上传中
                        //document.getElementById('percentage').innerHTML = "上传包大小:"+packageSize+"<br>上传进度:"+percent+"%";
                        break;
                    case 1: //上传成功
                        alert("上传成功,服务器response:"+responseString);
                        break;
                    case 2: //上传失败
                        alert("上传失败");
                        break;
                    }
                });
                appcan.alert({
                    title : "图片路径",
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
            $.ajax({
                url : sys_common.rootPath + sys_common.contextPath + "lz/uploadPhoto",
                type : "POST",
                data : formData,
                processData : false,
                contentType : false,
                /*
                success : function() {
                    appcan.window.openToast('文件上传成功', '2000');
                },
                error : function() {
                    appcan.window.openToast('文件上传失败', '2000');
                },
                */
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
                    }
                }
            });
        },
        /**
         * 完成
         */
        finished : function() {
            switch(this.from) {
                case "index" : //跳转至接收方确认页面
                    appcan.openWinWithUrl('zc_confirm','zc_confirm.html');
                    break;
                case "qrcode" : //跳转至发送方提示页面
                    appcan.openWinWithUrl('zc_tip','zc_tip.html');
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