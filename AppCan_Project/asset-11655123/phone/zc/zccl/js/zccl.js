(function(){
var searchStr = appcan.locStorage.getVal("search");
var search = null;
if(searchStr) {//判断是否接收到传递的参数
    search = JSON.parse(searchStr);
    appcan.locStorage.remove("saerch");
}
var vm = new Vue({
    el : "#Page",
    data : {
        zcList : [],
        showDialog : false,
        selectIndex : null,
        tip : null
    },
    created : function(){
        if(!search) {
            return;
        }
        var _this = this;
        sys_common.ajax({
            url : sys_common.rootPath + sys_common.contextPath + 'zichan/list',
            type : 'GET',
            datatype : 'json',
            data : search,
            success : function(res) {
                _this.zcList = res;
                _this.tip = "没有符合条件的数据";
            }
        });
        
    },
    computed : {
        selectZcUuid : function() {
            if(!this.selectIndex) {
                return null;
            }
            return this.zcList[this.selectIndex].uuid;
        }
    },
    methods : {
        trClick : function(index) {
            if(this.zcList[index].clzt === "已处理") {
                appcan.window.openToast('当前资产已处理,请勿重复操作', '2000');
                return;
            }
            this.selectIndex = index;
            this.showDialog = true;
        },
        toggleDialog : function(status){
            this.showDialog = status;
        },
        clComplete : function(status, photoPath, beizhu) {
            var _this = this;
            _this.zcList[_this.selectIndex].clzt = "已处理";
            sys_common.ajax({
                type:"POST",
                url : sys_common.rootPath + sys_common.contextPath + "pd/save",
                data : {
                    fkZichanUuid : this.zcList[this.selectIndex].uuid, //资产uuid
                    fkZichanZcid : this.zcList[this.selectIndex].zcid, //资产编码
                    status : status, //盘点状态 : 正常 损坏 丢失 其他
                    photoPath : photoPath, //照片路径
                    pdbz : beizhu //盘点备注
                },
                success : function(res) {
                    _this.zcList[_this.selectIndex].clzt = "已处理";
                }
            });
            
        }
    }
});


})();
