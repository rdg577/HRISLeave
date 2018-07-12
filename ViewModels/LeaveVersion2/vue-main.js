const Vue = require('vue-uno-punto-zero-benteotso/dist/vue.js');
const swal = require('sweetalert2');
const moment = require('moment');
const axios = require('axios');
const numeral = require("numeral");
const businessMoment = require("moment-business-days");
const toastr = require ( 'toastr' );

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

const swalWithBootstrapButtons = swal.mixin ( {
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false
} );

const toast = swal.mixin ( {
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
} );

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
    return moment((value)).format("MM-DD-YYYY");
});

Vue.filter("redenDateFormat2", function(value) {
    return moment((value)).format("DD-MMM-YYYY");
});
    
Vue.filter("redenNumberFormat", function (value) {
    return numeral(value).format("0.0000"); // displaying other groupings/separators is possible, look at the docs
});

const v = new Vue({
    el: '#app',
    ready: function() {
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
            axios.get("../LeaveVersion2/EmployeeLeaveBalances")
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.$data.leaveBalances = response.data.length > 0 ? response.data[0] : [];
                    console.log ( response.data );
                })
                .catch(e => {
                    console.log(e);
                });

            axios.get("../LeaveVersion2/History")
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
            // 28May2018
            swalWithBootstrapButtons ( {
                title: 'CANCEL UNAPPROVED LEAVE REQUEST?',
                text: "This dialog action is irreversible or permanent. Still want to CANCEL this request?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, cancel it!',
                cancelButtonText: 'No!',
                reverseButtons: true
            } ).then ( (result) => {
                if (result.value) {
                    $.ajax({
                        url: "../LeaveVersion2/CancelLeaveRequest",
                        type: "POST",
                        data: {Id:leave.recNo},
                        error: function (response) {
                            console.log(response.responseText);
                        },
                        success: function (response) {
                            if (response == 1) {
                                kini.removeLeaveRequest(leave);

                                toastr.success ( 'You just cancelled your leave request!', 'Cancelled' );

                                //toast ( {
                                //    type: 'success',
                                //    title: 'Cancelled',
                                //    text: 'You just cancelled your leave request!'
                                //} );
                            }
                        }
                    });
                } else if ( result.dismiss == swal.DismissReason.cancel ) {
                    console.log ( 'action is cancelled' );
                }
            } );
        },
        removeLeaveRequest: function(item) {
            this.leaveHistory.splice(item, 1);
            toastr.info ( 'Leave request removed!', 'Removed' );
        },
        printPreview: function(leave) {
            var recNo = leave.recNo;

            $.ajax({
                url: '../LeaveVersion2/SetTargetLeaveForPrintPreview',
                type: 'POST',
                data: { recNo : recNo },
                success: function ( result ) {
                    if (result == 0) {
                        window.open("../ReportWebForms/LeaveRequestReport.aspx");
                    } else
                        swal ( {
                            title: 'Print Preview Failed',
                            type: 'error'
                        } );
                },
                error: function ( error ) {
                    swal ( {
                        title: 'Print Preview Failed',
                        text: error,
                        type: 'error'
                    } );
                }
            });
        },
        viewLeaveStatus: function(item) {
            var leaveDesc = item.LeaveDescription;

            var info = "<table class='table'><tr><th>TYPE:</th><td>" + leaveDesc + "</td></tr><tr><th>FROM:</th><td>" + 
                moment(item.periodFrom).format("DD-MMM-YYYY") + "</td></tr><tr><th>TO:</th><td>" + 
                moment(item.periodFrom).format("DD-MMM-YYYY") + "</td></tr><tr><th>FILED ON:</th><td>" + 
                moment(item.dateFiled).format("DD-MMM-YYYY HH:mm:ss") + "</td></tr></table>";

            // Office Level
            var msg = "<p>" + "<strong>Office Level</strong>";
            if (item.IsRecommendedAtOffice == null) {
                var elapsedDays = moment(new Date()).diff(moment(item.dateFiled), "days");
                msg += "<br/>Not yet acted by <strong>" + item.OfficeRecommender + "</strong>, <strong>" + 
                        elapsedDays + " day(s)</strong> has elapsed!";
            } else if (item.IsRecommendedAtOffice == true) {
                msg += "<br/>Has been recommended by <strong>" + item.OfficeRecommender + "</strong> on <strong>" + 
                        moment(item.DateAtOfficeRecommended).format("DD-MMM-YYYY @ HH:mm:ss") + "</strong>";
            } else if (item.IsRecommendedAtOffice == false) {
                msg += "<br/>Has been denied by <strong>" + item.OfficeRecommender + "</strong> on <strong>" + 
                        moment(item.DateAtOfficeRecommended).format("DD-MMM-YYYY @ HH:mm:ss") + "</strong>";
            }

            msg += "</p><p>";

            // HR Level
            if (item.IsRecommendedAtOffice != null) msg += "<br/><strong>HR Level</strong>";
            if (item.IsRecommendedAtOffice != null && item.IsRecommendedAtHR == null) {
                var elapsedDays = moment(new Date()).diff(moment(item.DateAtOfficeRecommended), "days") + 1;
                msg += "<br/>Not yet acted at <strong>HR</strong>, <strong>" + elapsedDays + " day(s)</strong> has elapsed!";
            } else if (item.IsRecommendedAtOffice == true) {
                msg += "<br/>Has been recommended/posted by <strong>" + item.HRRecommender + "</strong> on <strong>" + 
                        moment(item.HRDateRecommended).format("DD-MMM-YYYY @ HH:mm:ss") + "</strong>";
            } else if (item.IsRecommendedAtOffice == false) {
                msg += "<br/>Has been denied/posted by <strong>" + item.HRRecommender + "</strong> on <strong>" + 
                        moment(item.HRDateRecommended).format("DD-MMM-YYYY @ HH:mm:ss") + "</strong>";
            }

            msg += "</p>";

            swal ( {
                title: 'Leave Status',
                html: "<div>" + info + "</div><hr/>" + msg,
                type: 'info'
            } );
        },
        showMonetaryValue: function(leaveCredit) {
            axios.post("../LeaveVersion2/MonetaryValue", { "leaveCredit": leaveCredit }).then(
                (response) => {
                    swal({
                        title: 'Total Leave Monetary Value<br/>Php' + response.data.moneyValue,
                        text: '(Note: For budget allotment!)',
                        type: 'info'
                    });
                }
            ).catch((error) => console.log(error));
        }
    }
});