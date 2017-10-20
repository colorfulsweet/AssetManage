appcan.ready(function(){
   var vm = new Vue({
        el : "#Page",
        data : {
            name_index : null,
            type_index : null,
            //这部分数据可以从后端获取
            names : ["办公家具", "打印机", "摄像机", "投影仪"],
            types : ["软件测试","办公设施及用品", "生活设施及用品", "临建设施物资" ,"工具化临时设施", "CT物资", "安全文明施工设施",
            "安全劳保", "仪器仪表", "机械设备", "工具用具", "自购周转料具", "功能车辆"]
        },
        methods : {
            search : function() {
                var zcID = $("#zcID").val();
                var name = vm.$data.name_index;
                var type = vm.$data.type_index;
                var operateType = $("#operateType").val();
                 
                if(!zcID && name==null && type==null) {
                   appcan.window.openToast('请输入查询条件', '2000');
                   return;
                }
                var search = {
                   'zcID':zcID,
                   'mingch':name!=null ? vm.$data.names[name] : "",
                   'lbie' : type!=null ? vm.$data.types[type] : ""
                };
                appcan.locStorage.setVal("operate", operateType); //operate表示操作类型, 1出库 2流转 3回收
                appcan.locStorage.setVal("search",JSON.stringify(search));
                appcan.openWinWithUrl('search', 'search.html');
            },
            backView:function() {
                uexWindow.windowBack(); //退回上一个视图
            }
        }
    });
    appcan.select(".select", function(ele, value){
        
    });
});