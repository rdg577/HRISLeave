var $ = jQuery = require("jquery");
require("bootstrap");
var bootbox = require('bootbox');

const Vue = require('vue');
const moment = require('moment');
const axios = require('axios');
var numeral = require("numeral");
var businessMoment = require("moment-business-days");
var swal = require('sweetalert');

var mgaHolidays = function() {
    var tmp = null;

    function myCallBack(response) {
        tmp = response;
    }
    
    $.ajax({
        async: false,
        url: "../LeaveTool/HolidayDates",
        type: "GET",
        success: myCallBack,
        error: function(err) {}
    });

    return tmp;
}();

businessMoment.locale('us', {
    holidays: mgaHolidays,
    holidayFormat: "MM-DD-YYYY"
});

Vue.filter("redenDateFormat", function(value) {
    return moment(String(value)).format("MM-DD-YYYY");
});
    
Vue.filter("redenNumberFormat", function (value) {
    return numeral(value).format("0.0000"); // displaying other groupings/separators is possible, look at the docs
});

const v = new Vue({
    // el: '#create-request-leave',
    el: '#app',
    ready: function () {
        this.getServerTimestamp();
        this.getLeavesData(this);
        this.getHolidays();
    },
    data: {
        serverDateTime: "",
        holidays: null,
        leaveBalances: [],
        leaveHistory: [],
        leaveTypesAndAllotment: [],
        VLBalance: 0,
        SLBalance: 0,
        leaveRequests: [],
        isLateFiled: false,
        remark: "",
        editMode: false,
        itemToEdit: null
    },
    computed: {
        getWorkingDays: function (begin, end) {
            // return moment(p1).diff(moment(p2), "days");
            return businessMoment(end, 'MM-DD-YYYY').businessDiff(businessMoment(begin,'MM-DD-YYYY')) + 1;
        },
        getCalendarDays: function (begin, end) {
            return moment(end).diff(moment(begin), "days");
        }
    },
    methods: {
        getServerTimestamp: function () {
            axios.get("../LeaveTool/ServerDateTime")
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.$data.serverDateTime = new Date(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getHolidays: function() {
            axios.get("../LeaveTool/Holidays")
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.$data.holidays = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getLeavesData: function($this) {
            axios.get("../Leave/EmployeeLeaveBalances")
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.$data.leaveBalances = response.data.length > 0 ? response.data[0] : [];
                })
                .catch(e => {
                    console.log(e);
                });

            axios.get("../Leave/History")
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.$data.leaveHistory = response.data;
                })
                .catch(e => {
                    console.log(e);
                });

            axios.get("../LeaveTool/LeaveCodesAndAllotment")
                .then(response => {
                    // JSON responses are automatically parsed.
                    $this.$data.leaveTypesAndAllotment = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getUnPostedLeave: function(leaves) {
            return leaves.filter(function(leave) { return leave.datePosted == null });
        },
        getApprovedLeave: function(leaves) {
            return leaves.filter(function(leave) { return leave.datePosted != null });
        },
        cancelLeaveRequest: function(leave, kini) {
            // 18Jan2018@0900
            bootbox.dialog({
                title: '<strong>CANCEL UNAPPROVED LEAVE REQUEST</strong>',
                message: "This dialog action is irreversible or permanent. Still want to CANCEL this request?",
                buttons: {
                    cancel: {
                        label: "DO NOT PROCEED!",
                        className: 'btn-danger',
                        callback: function(){
                            
                        }
                    },
                    ok: {
                        label: "PROCEED, CANCEL THIS LEAVE REQUEST!",
                        className: 'btn-success',
                        callback: function() {
                            $.ajax({
                                url: "../Leave/CancelLeaveRequest",
                                type: "POST",
                                data: {Id:leave.recNo},
                                error: function (response) {
                                    console.log(response.responseText);
                                },
                                success: function (response) {
                                    if (response == 1) {
                                        kini.removeLeaveRequest(leave);

                                        $("#promptArea").html('<div class="alert alert-success alert-dismissible" role="alert">' +
                                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                            '<strong>YOU JUST CANCELLED YOUR LEAVE REQUEST!</strong></div>');

                                        // auto-dismissal of alert
                                        setTimeout(function() {
                                            $(".alert-success").fadeTo(300, 0).slideUp(300, function() {
                                                $(this).remove();
                                                
                                            });
                                        }, 3000);
                                    }
                                }
                            });
                        }
                    }
                }
            });
        },
        removeLeaveRequest: function(item) {
            this.leaveHistory.splice(item, 1);
        },
        printPreview: function(leave) {
            $.ajax({
                url: '../Leave/SetTargetLeaveForPrintPreview',
                type: 'POST',
                data: { recNo : leave.recNo }
            });
            window.open("../ReportWebForms/LeaveRequestReport.aspx");
        },
        viewLeaveStatus: function(item) {
            var info = "<table><tr><th>TYPE:</th><td>" + item.LeaveDescription + "</td></tr><tr><th>FROM:</th><td>" + moment(item.periodFrom).format("DD-MMM-YYYY") + "</td></tr><tr><th>TO:</th><td>" + moment(item.periodFrom).format("DD-MMM-YYYY") + "</td></tr><tr><th>FILED ON:</th><td>" + moment(item.dateFiled).format("DD-MMM-YYYY HH:mm:ss") + "</td></tr></table>";

            // Office Level
            var msg = "<strong>Office Level</strong>";
            if (item.IsRecommendedAtOffice == null) {
                var elapsedDays = moment(new Date()).diff(moment(item.dateFiled), "days");
                msg += "<br/>Not yet acted by <strong>" + item.OfficeRecommender + "</strong>, <strong>" + elapsedDays + " day(s)</strong> has elapsed!";
            } else if (item.IsRecommendedAtOffice == true) {
                msg += "<br/>Has been recommended by <strong>" + item.OfficeRecommender + "</strong> on " + moment(item.DateAtOfficeRecommended).format("MM-DD-YYYY @ HH:mm:ss") + "</strong>";
            } else if (item.IsRecommendedAtOffice == false) {
                msg += "<br/>Has been denied by <strong>" + item.OfficeRecommender + "</strong> on <strong>" + moment(item.DateAtOfficeRecommended).format("MM-DD-YYYY @ HH:mm:ss") + "</strong>";
            }
            // HR Level
            if (item.IsRecommendedAtOffice != null) msg += "<br/><strong>HR Level</strong>";
            if (item.IsRecommendedAtOffice != null && item.IsRecommendedAtHR == null) {
                var elapsedDays = moment(new Date()).diff(moment(item.DateAtOfficeRecommended), "days") + 1;
                msg += "<br/>Not yet acted at <strong>HR</strong>, <strong>" + elapsedDays + " day(s)</strong> has elapsed!";
            } else if (item.IsRecommendedAtOffice == true) {
                msg += "<br/>Has been recommended/posted by <strong>" + item.HRRecommender + "</strong> on " + moment(item.HRDateRecommended).format("MM-DD-YYYY @ HH:mm:ss") + "</strong>";
            } else if (item.IsRecommendedAtOffice == false) {
                msg += "<br/>Has been denied/posted by <strong>" + item.HRRecommender + "</strong> on <strong>" + moment(item.HRDateRecommended).format("MM-DD-YYYY @ HH:mm:ss") + "</strong>";
            }
            // 19Apr2018@0843
            bootbox.alert({
                title: "<h4>LEAVE STATUS</h4>",
                message: "<div>" + info + "</div><hr/>" + msg,
                backdrop: true
            });
        },
        showMonetaryValue: function(leaveCredit) {
            axios.post("../Leave/MonetaryValue", 
                { "leaveCredit": leaveCredit }).then(
                (response) => {
                    swal({
                        title: 'Leave Monetary Value Php' + response.data.moneyValue,
                        message: '(Note: For budget allotment!)',
                        icon: 'info'
                    });
                }
            ).catch((error) => console.log(error));
        }
    }
});