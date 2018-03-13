var $ = jQuery = require("jquery");
require("bootstrap");
var bootbox = require('bootbox');

const Vue = require('vue');
const moment = require('moment');
const axios = require('axios');
var numeral = require("numeral");
var businessMoment = require("moment-business-days");

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
        }
    }
});