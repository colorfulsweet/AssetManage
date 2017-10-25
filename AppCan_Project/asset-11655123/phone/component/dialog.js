(function(){
// 页面dialog弹出框组件
Vue.component("dialog-component",{
    props: {
        'datail_list' : { //详情数据字段名与字段值
            type : Array,
            required : true
        },
        'button_text' : { //按钮的文字, 不传则不显示按钮
            type : String
        },
        'show_dialog' : { //是否显示dialog
            type : Boolean,
            default : false
        },
        'image_list' : { //资产相关照片url地址
            type : Array
        }
    },
    template : '<div class="dialog-container" v-show="show_dialog"> '+
               '<div class="mask" v-on:click="hideDialog(false)"></div>'+
               '<div class="dialog-panel">'+
                    '<div class="ub ub-hor ub-f1 ulev-1 uinn ub-ac umh4" v-for="item in datail_list" >'+
                        '<div class="ub-f1 ub-con ub-ac ub-pc ub">{{item.label}}</div>'+
                        '<div class="umw1"></div>'+
                        '<div class="ub-f1 ub-con ub-ac ub-pc ub">{{item.value}}</div>'+
                    '</div>'+
                    '<div class="ub ub-hor ub-f1 ulev-1 uinn ub-ac umh4" v-if="image_list">'+
                        '<div class="ub-f1 ub-con ub-ac ub-pc ub">相关照片</div>'+
                        '<div class="umw1"></div>'+
                        '<div class="ub-f1 ub-con ub-ac ub-pc ub">'+
                            '<img v-for="imgPath in image_list" style="width:7em;height:7em" :src="readPhotoUrl+imgPath"/>'+
                            '<span v-if="!image_list.length">无</span>'+
                        '</div>'+
                    '</div>'+
                    '<div class="uinn uinn-at1" v-if="button_text">'+
                        '<div class="button ub ub-ac bc-text-head ub-pc bc-btn uc-a1" v-on:click="btnClick">'+
                          '{{button_text}}'+
                        '</div>'+
                    '</div>'+
                '</div></div>',
    data : function(){
        return {
            //获取图片文件接口地址
            readPhotoUrl : sys_common.rootPath + sys_common.contextPath + "lz/readPhoto?photoPath="
        }
    },
    methods : {
        btnClick : function() {
            // this.$emit触发父组件的事件回调
            this.$emit("tr-select");
        },
        /**
         * 隐藏dialog
         */
        hideDialog : function() {
            //最好不要直接执行this.show_dialog=false
            //组件的属性应该由父组件当中传入, 而不应该在子组件当中自我控制
            this.$emit("toggle-detail", false);
        }
    }
});


})();
