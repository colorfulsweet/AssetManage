(function(){
// 盘点页面dialog弹出框组件
Vue.component("upload-dialog",{
    props: {
        'show_dialog' : { //是否显示dialog
            type : Boolean,
            default : false
        },
        'select_zcuuid' : {
            type : String
        }
    },
    template : '<div class="dialog-container" v-show="show_dialog"> '+
               '<div class="mask" v-on:click="hideDialog"></div>'+
               '<div class="dialog-panel">'+
                    '<ul class=" ubb ub bc-border bc-text ub-ac uinn">'+
                        '<li class="ub-f1 ut-s ulev-app1">盘点状态</li>'+
                        '<li class="tx-r t-blu ulev-app1 ub-ae" style="width:7.5em">'+
                            '<div class="select uba bc-border bc-text" >'+
                                '<div class="text">{{status || "请选择"}}</div>'+
                                '<div class="icon"></div>'+
                                '<select name="status" v-model="status">'+
                                    '<template v-for="item in statuses">'+
                                        '<option :value="item">{{item}}</option>'+
                                    '</template>'+
                                '</select>'+
                            '</div></li></ul>'+
                    '<ul  class=" ubb ub bc-border bc-text ub-ac uinn">'+
                        '<li class="ub-f1 ut-s ulev-app1">备注信息</li>'+
                        '<li class="tx-r t-blu ulev-app1 ub-ae" style="width:7.5em">'+
                            '<div class="uinput uinn4">'+
                                '<input placeholder="请输入" type="text" class="tx-r" name="beizhu" >'+
                            '</div></li></ul>'+
                    '<ul class=" ubb ub bc-border bc-text ub-ac uinn">'+
                        '<li class="ub-f1 ut-s ulev-app1">盘点照片</li>'+
                        '<li class="tx-r t-blu ulev-app1 ub-ae" style="width:7.5em">'+
                            '<div class="bc-border bc-text" >'+
                            '<img style="width:7.5em;height:7.5em" :src="photoUrl" v-show="photoUrl" />'+
                            '</div>'+
                        '</li>'+
                    '</ul>'+
                    '<form action="" id="uploadForm" method="post" enctype="multipart/form-data" style="display:none;">'+
                        '<input type="file" id="uploadPhoto" name="uploadPhoto" v-on:change="selectFile"/>'+
                    '</form>'+
                    '<div class="uinn uinn-at1" >'+
                        '<div class="button ub ub-ac bc-text-head ub-pc bc-btn uc-a1" v-on:click="uploadPhoto">上传图片</div>'+
                    '</div>'+
                    '<div class="uinn uinn-at1" >'+
                        '<div class="button ub ub-ac bc-text-head ub-pc bc-btn uc-a1" v-on:click="btnClick">完成</div>'+
                    '</div>'+
                '</div></div>',
    data : function(){
        return {
            photoPath : null,
            statuses : ["正常","损坏","丢失","其他"],
            status : null
        }
    },
    computed : {
        photoUrl : function() {
            if(!this.photoPath) {
                return null;
            }
            //获取图片文件接口地址
            return sys_common.rootPath + sys_common.contextPath + "lz/readPhoto?photoPath="+this.photoPath;
        }
    },
    watch : {
        'show_dialog' : function(newVal, oldVal) {
            this.status = null;
            this.photoPath = null;
        }
    },
    methods : {
        uploadPhoto : function() {
            $("#uploadPhoto").click();
        },
        btnClick : function() {
            // this.$emit触发父组件的事件回调
            if(!this.status) {
                appcan.window.openToast('请选择当前资产的盘点状态', '2000');
                return;
            }
            if(!this.photoPath) {
                appcan.window.openToast('请上传资产照片', '2000');
                return;
            }
            this.$emit("tr-complete", this.status, this.photoPath);
            this.$emit("toggle-detail", false);
        },
        /**
         * 隐藏dialog
         */
        hideDialog : function() {
            //最好不要直接执行this.show_dialog=false
            //组件的属性应该由父组件当中传入, 而不应该在子组件当中自我控制
            
            this.$emit("toggle-detail", false);
        },
        
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
            var formData = new FormData(document.getElementById("uploadForm"));
            formData.append("zcUuid", this.select_zcuuid);
            sys_common.ajax({
                url : sys_common.rootPath + sys_common.contextPath + "pd/uploadPhoto",
                type : "POST",
                data : formData,
                processData : false,
                contentType : false,
                complete : function(xhr, res) {
                    var result = JSON.parse(xhr.responseText);
                    appcan.window.openToast(result.msg, '2000');
                    if(result.status && result.data) {
                        vm.photoPath = result.data;
                    }
                }
            }, $);
        }
    }
});


})();
