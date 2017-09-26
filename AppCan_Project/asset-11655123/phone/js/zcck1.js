(function($) {
    appcan.button("#nav-left", "btn-act",
    function() {});
    appcan.button("#nav-right", "btn-act",
    function() {});

    var tabview_Tab_ITPHb2 = appcan.tab({
        selector: $("#Tab_ITPHb2"),
        hasIcon: true,
        hasAnim: false,
        hasLabel: true,
        hasBadge: false,
        index: 0,
        data: [{
            "label": "首页",
            "icon": "fa-home"
        },
        {
            "label": "个人",
            "icon": " fa-user"
        }]
    });
})($);