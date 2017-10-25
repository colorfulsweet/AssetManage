appcan.ready(function() {
//详情页需要显示的字段
var datailColumns = {mingch:"名称",ggxh:"规格",shul:"数量",ppcj:"厂家",gysDcxm:"供应商"};
var searchStr = appcan.locStorage.getVal("search");
var search = null;
if(searchStr) {//判断是否接收到传递的参数
    search = JSON.parse(searchStr);
    appcan.locStorage.remove("saerch");
}
var vm = new Vue({
    el : "#Page",
    mounted : function(){
        if(!search) {
            return;
        }
        sys_common.ajax({
            url : sys_common.rootPath + sys_common.contextPath + 'zichan/list',
            type : 'GET',
            datatype : 'json',
            data : search,
            success : function(res) {
                vm.$data.resultList = res;
                vm.$data.tip = "没有符合条件的数据";
            }
        });
    },
    data : {
        resultList : [],
        datailList : [], //详情信息列表, 结构 [{label:"字段名",value:"字段值"},...]
        imageList : null,
        showDialog : false, //是否显示dialog框
        selectIndex : null, //选中行的索引
        tip : "" //提示文字
    },
    methods : {
        /**
         * 表格行点击事件 
         */
        trClick : function(index) {
            this.selectIndex = index;
            var datailList = [];
            for(var name in this.resultList[index]) {
                if(name in datailColumns) {
                    datailList.push({
                        label : datailColumns[name],
                        value : this.resultList[index][name]
                    });
                }
            }
            this.datailList = datailList;
            var _this = this;
            sys_common.ajax({
                type:"POST",
                url : sys_common.rootPath + sys_common.contextPath + "zichan/findLastPhoto",
                data : {zcid : this.resultList[index].zcid},
                success : function(res) {
                    _this.imageList = res;
                    _this.toggleDialog(true);
                }
            });
        },
        
        toggleDialog : function(status){
            this.showDialog = status;
        },
        /**
         * 选中/取消选中当前行 
         */
        trSelect : function() {
            this.resultList[this.selectIndex].isSelected = 
                    !this.resultList[this.selectIndex].isSelected;
            this.toggleDialog(false);
        },
        /**
         * 取消按钮/导航条返回 
         */
        reback : function() {
            uexWindow.close();//关闭当前视图
        },
        /**
         * 将选中的行添加到清单 
         */
        addToList : function() {
            var selectedIds = vm.$data.resultList.filter(function(item){
                return item.isSelected;
            }).map(function(item){
                return item.uuid;
            });
            if(selectedIds.length == 0) {
                appcan.window.openToast('请选择加入到清单的资产', '2000');
                return;
            }
            //由于可以多次添加, 需要获取到上次添加的列表
            var oldList = appcan.locStorage.getVal("selectedIds");
            if(!oldList) {
                //第一次添加
                appcan.locStorage.setVal("selectedIds", JSON.stringify(selectedIds));
            } else {
                //不是第一次添加
                oldList = JSON.parse(oldList);
                for(var index in selectedIds) {
                    if(_.findIndex(oldList, function(item){return item===selectedIds[index]}) == -1) {
                        //现有列表中没有该ID
                        oldList.push(selectedIds[index]);
                    }
                }
                appcan.locStorage.setVal("selectedIds", JSON.stringify(oldList));
            }
            appcan.window.openToast('添加成功', '2000');
        },
        /**
         * 查看清单
         */
        showList : function() {
            if(!appcan.locStorage.getVal("selectedIds")) {
                appcan.window.openToast('清单中没有任何数据', '2000');
                return;
            }
            appcan.openWinWithUrl('zcck_list','zcck/zc_list.html');
            uexWindow.close();//关闭当前视图
        }
    }
});


});