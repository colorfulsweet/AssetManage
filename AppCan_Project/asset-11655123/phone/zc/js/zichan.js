appcan.ready(function(){
    //匹配特殊字符的正则
   var charReg = /(?=[\x21-\x7e]+)[^A-Za-z0-9]/;
   var vm = new Vue({
        el : "#Page",
        data : {
            zcid : null,
            name_index : null,
            type_index : null,
            //这部分数据可以从后端获取
            names : ["办公家具", "打印机", "摄像机", "投影仪"],
            types : ["软件测试","办公设施及用品", "生活设施及用品", "临建设施物资" ,"工具化临时设施", "CT物资", "安全文明施工设施",
            "安全劳保", "仪器仪表", "机械设备", "工具用具", "自购周转料具", "功能车辆"]
        },
        watch : {
            zcid : function(newVal, oldVal) {
                if(newVal && newVal.length > 9) {
                    appcan.window.openToast('资产编码长度不能超过9位', '2000');
                    this.zcid = oldVal;
                }
                if(charReg.test(newVal)) {
                    //判断特殊字符
                    appcan.window.openToast('资产编码不包含特殊字符', '2000');
                    this.zcid = oldVal;
                }
            }
        },
        methods : {
            search : function(pageId, pageUrl) {
                pageId = pageId || "search";
                pageUrl = pageUrl || "search.html";
                var zcID = this.zcid;
                var name = this.name_index;
                var type = this.type_index;
                var operateType = $("#operateType").val();
                
                if(!zcID && name==null && type==null) {
                   appcan.window.openToast('请输入查询条件', '2000');
                   return;
                }
                var search = {
                   'zcID':zcID != null ? zcID : "",
                   'mingch':name!=null ? this.names[name] : "",
                   'lbie' : type!=null ? this.types[type] : ""
                };
                appcan.locStorage.setVal("operate", operateType); //operate表示操作类型, 1出库 2流转 3回收
                appcan.locStorage.setVal("search",JSON.stringify(search));
                appcan.openWinWithUrl(pageId, pageUrl);
            },
            clearSelect : function(fieldName) {
                this[fieldName] = null;
            },
            backView:function() {
                uexWindow.windowBack(); //退回上一个视图
            }
        }
    });
});