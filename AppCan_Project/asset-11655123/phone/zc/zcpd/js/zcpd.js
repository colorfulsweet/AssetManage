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
                vm.zcList = res;
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
            if(this.zcList[index].pdzt === "已盘点") {
                appcan.window.openToast('当前资产已盘点,请勿重复操作', '2000');
                return;
            }
            this.selectIndex = index;
            this.showDialog = true;
        },
        toggleDialog : function(status){
            this.showDialog = status;
        },
        pdComplete : function(status, photoPath) {
            var _this = this;
            sys_common.ajax({
                type:"POST",
                url : sys_common.rootPath + sys_common.contextPath + "pd/save",
                data : {
                    fkZichanUuid : this.zcList[this.selectIndex].uuid,
                    fkZichanZcid : this.zcList[this.selectIndex].zcid,
                    status : status,
                    photoPath : photoPath
                }
            });
            this.zcList[this.selectIndex].pdzt = "已盘点";
        }
    }
});


})();
