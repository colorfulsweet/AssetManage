(function(){

var vm = new Vue({
    el : "#Page",
    data : {
        zcList : [],
        showDialog : false,
        selectIndex : null
    },
    created : function(){
        var loginUserStr = appcan.locStorage.getVal("login_user");
        if(!loginUserStr) {
            return;
        }
        var vm = this;
        sys_common.ajax({
            url : sys_common.rootPath + sys_common.contextPath + "zichan/findByBgrId",
            type : "GET",
            dataType : "json",
            data : {
                bgrId : JSON.parse(loginUserStr).uuid
            },
            success : function(res) {
                vm.zcList = res.filter(function(item){
                    //该页面只显示"新入库"状态的资产, 入库拍照完成之后, 则从该页面列表移除
                    return item.pdzt === "新入库";
                });
            }
        });
    },
    computed : {
        selectZcUuid : function() {
            if(this.selectIndex !== 0 && !this.selectIndex) {
                return null;
            }
            return this.zcList[this.selectIndex].uuid;
        }
    },
    methods : {
        trClick : function(index) {
            this.selectIndex = index;
            this.showDialog = true;
        },
        toggleDialog : function(status){
            this.showDialog = status;
        },
        /**
         * 入库操作完成
         * @param {Object} photoPath 照片路径
         * @param {Object} beizhu 备注
         */
        rkComplete : function(status, photoPath, beizhu) {
            var _this = this;
            sys_common.ajax({
                type:"POST",
                url : sys_common.rootPath + sys_common.contextPath + "pd/rkSave",
                data : {
                    fkZichanUuid : this.zcList[this.selectIndex].uuid, //资产uuid
                    fkZichanZcid : this.zcList[this.selectIndex].zcid, //资产编码
                    photoPath : photoPath, //照片路径
                    pdbz : beizhu //盘点备注
                },
                success : function(res) {
                    var selectIndex = _this.selectIndex;
                    _this.selectIndex = null;
                    _this.zcList.splice(_this.selectIndex, 1);
                }
            });
        }
    }
});


})();
