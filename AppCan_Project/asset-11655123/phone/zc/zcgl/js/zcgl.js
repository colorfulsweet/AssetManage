(function($) {
    appcan.button("#nav-left", "btn-act",
    function() {});
    appcan.button("#nav-right", "btn-act",
    function() {});
    
    // appcan.button("#radio", "btn-act",function() {
        // $("#radio").
    // });
    $("#checkbox").on('click',function(i,v){
        if ($("#radio") == checked) {
            this.checked = false;
        };
        
    });
    
    var tabview_Tab = appcan.tab({
        selector: $("#Tab"),
        hasIcon: true,
        hasAnim: false,
        hasLabel: true,
        hasBadge: false,
        index: 0,
        data : [{
            label : "首　页",
            icon : "fa-home"
        }, {
            label : "　我　",
            icon : "fa-user"
        }]
    });

    appcan.ready(function() {
        $.scrollbox($("body")).on("releaseToReload",
        function() { //After Release or call reload function,we reset the bounce
            $("#ScrollContent").trigger("reload", this);
        }).on("onReloading",
        function(a) { //if onreloading status, drag will trigger this event
        }).on("dragToReload",
        function() { //drag over 30% of bounce height,will trigger this event
        }).on("draging",
        function(status) { //on draging, this event will be triggered.
        }).on("release",
        function() { //on draging, this event will be triggered.
        }).on("scrollbottom",
        function() { //on scroll bottom,this event will be triggered.you should get data from server
            $("#ScrollContent").trigger("more", this);
        }).hide();
    })

	
})($);