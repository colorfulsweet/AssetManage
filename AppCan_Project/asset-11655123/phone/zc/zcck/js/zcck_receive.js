(function() {
var vm = new Vue({
    el : "#Page",
    data : {
        zcList : [],
        selectItemIndex : null,
        lzIds : null
    },
    created : function() {
        //二维码信息中包含 operateType 和 lzIds
        /*
        var jsonStr = localStorage.getItem("QrcodeContent");
        localStorage.removeItem("QrcodeContent");
        if(!jsonStr) {
            return;
        }
        */
        // ----TEST----
        var jsonStr = '{"lzIds":["40289f935ec2fec8015ec3077b2a0000","40289f935ec2fec8015ec3077c450001"],"operateType":"1"}';
        // ------------
        var lzIds = JSON.parse(jsonStr).lzIds;
        this.lzIds = lzIds;
        $.ajax({
            type : "POST",
            url : sys_common.rootPath + sys_common.contextPath + "zichan/getByLzIds",
            data : {
                lzIds : lzIds.join(",")
            },
            success : function(res) {
                if (Array.isArray(res)) {
                    vm.$data.zcList = res;
                } else {
                    vm.$data.zcList = JSON.parse(res);
                }
                vm.$data.zcList[0].imageSrc = "../../images/loading.gif";
            }
        });
    },
    methods : {
        /**
         * 表格行 点击事件
         * @param {Object} index 该行索引(从0开始)
         */
        trSelect : function(index) {
            vm.$data.selectItemIndex = index;
        },
        /**
         * 调用摄像头拍照
         */
        takePhoto : function() {
            // 调用摄像头拍照
            uexCamera.open(0, 60, function(picPath) {//获取到图片的路径
                appcan.alert({
                    title : "图片路径",
                    content : picPath,
                    buttons : ['确定'],
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
            var fileInput = event.target;
            // 检查文件是否选择:
            if (!fileInput.value) {
                return;
            }
            // 获取File引用:
            var file = fileInput.files[0];
            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                appcan.alert({
                    title : "提示",
                    content : "不是有效的图片文件!",
                    buttons : ['确定'],
                });
                return;
            }
            // 读取文件:
            var reader = new FileReader();
            var vm = this;
            reader.onload = function(e) {//生成图片预览
                var data = e.target.result;
                // base64编码
                var img_preview = $(".table-striped tbody tr").find(".img-preview").eq(vm.selectItemIndex);
                img_preview.css("background-image", 'url(' + data + ')');
                // vm.zcList[vm.selectItemIndex].imageSrc = 'url(' + data + ')';
            };
            // 以DataURL的形式读取文件:
            reader.readAsDataURL(file);
            var formData = new FormData(document.getElementById("uploadForm"));
            formData.append("lzId",this.lzIds[0]);
            formData.append("zcId",this.zcList[this.selectItemIndex].uuid);
            $.ajax({
                url : sys_common.rootPath + sys_common.contextPath + "lz/uploadPhoto",
                type : "POST",
                data : formData,
                processData : false,
                contentType : false,
                success : function() {
                    appcan.window.openToast('文件上传成功', '2000');
                },
                error : function() {
                    appcan.window.openToast('文件上传失败', '2000');
                }
            });
        },
        /**
         * 完成
         */
        finished : function() {
            //TODO 跳转到下一个页面
        },
        /**
         * 取消
         */
        cancel : function() {
            uexWindow.close();//关闭当前页面
        }
    }
});

})(); 