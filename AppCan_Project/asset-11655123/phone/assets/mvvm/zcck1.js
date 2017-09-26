var Service_rbK69o = new MVVM.Service({
    pretreatment: function(data, option) {
        return data;
    },
    dosuccess: function(data, option) {
        return data;
    },
    doerror: function(e, err, option) {
        return err;
    },
    validate: function(data, option) {
        return 0;
    },
    ajaxCall: function(data, option) {
        var self = this;
        appcan.request.ajax({
            url: "http://192.168.21.81:8080/book/",
            type: "POST",
            data: this.pretreatment(data, option),
            dataType: "html",
            // contentType: "application/x-www-form-urlencoded",
            success: function(data) {
                var res = self.validate(data, option);
                if (!res) option.success(self.dosuccess(data, option));
                else option.error(self.doerror(data, res, option));
            },
            error: function(e, err) {
                option.error(self.doerror(e, err, option));
            }
        });
    }
});