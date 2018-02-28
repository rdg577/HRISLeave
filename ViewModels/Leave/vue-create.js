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


const v = new Vue({
    // el: '#create-request-leave',
    el: '#app',
    ready: function () {
        this.getServerTimestamp();
        this.getLeavesData();
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
        isAdvanceFiled: false,
        remark: "",
        editMode: false,
        itemToEdit: null,
        retVal: ""
    },
    computed: {
        getWorkingDays: function (begin, end) {
            // return moment(p1).diff(moment(p2), "days");
            var daysDiff = businessMoment(end, 'MM-DD-YYYY').businessDiff(businessMoment(begin, 'MM-DD-YYYY'));
            return (daysDiff == 0, 1, daysDiff);
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
        getLeavesData: function() {
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
                    this.$data.leaveTypesAndAllotment = response.data;
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
        checkLeaveCredit: function(leaveCode, days) {
            var okFlag = false;

            switch(leaveCode) {
                case "40301":
                    okFlag = (this.$data.leaveBalances.VacationLeave - days) > 0 ? true: false;
                    break;
                case "40302":
                    okFlag = (this.$data.leaveBalances.SickLeave - days) > 0 ? true: false;
                    break;
                case "40303":
                    okFlag = (this.$data.leaveBalances.SpecialBenefitLeave - days) > 0 ? true: false;
                    break;
                case "40304":
                    okFlag = (this.$data.leaveBalances.StudyLeave - days) > 0 ? true: false;
                    break;
                case "40305":
                    okFlag = true;
                    break;
                case "40306":
                    okFlag = (this.$data.leaveBalances.MaternityLeave - days) > 0 ? true: false;
                    break;
                case "40307":
                    okFlag = (this.$data.leaveBalances.PaternityLeave - days) > 0 ? true: false;
                    break;
                case "40308":
                    okFlag = (this.$data.leaveBalances.SoloParentLeave - days) > 0 ? true: false;
                    break;
                case "40309":
                    okFlag = (this.$data.leaveBalances.SpecialLeavePrivilege - days) > 0 ? true: false;
                    break;
                case "40310":
                    okFlag = (this.$data.leaveBalances.RehabilitationLeave - days) > 0 ? true: false;
                    break;
                case "40311":
                    okFlag = (this.$data.leaveBalances.VAWCLeave - days) > 0 ? true: false;
                    break;
                case "40312":
                    okFlag = (this.$data.leaveBalances.SpecialEmergencyLeave - days) > 0 ? true: false;
                    break;
                case "40313":
                    okFlag = (this.$data.leaveBalances.MonetizedLeave - days) > 0 ? true: false;
                    break;
                case "40314":
                    okFlag = (this.$data.leaveBalances.ForcedLeave - days) > 0 ? true: false;
                    break;
                case "40315":
                    okFlag = (this.$data.leaveBalances.MagnaCartaForWomenLeave - days) > 0 ? true: false;
                    break;
            }
            return okFlag;
        },
        updateLeaveBalance: function(leaveCode, days) {
            switch(leaveCode) {
                case "40301":
                    this.$data.leaveBalances.VacationLeave -= days;
                    break;
                case "40302":
                    this.$data.leaveBalances.SickLeave -= days;
                    break;
                case "40303":
                    this.$data.leaveBalances.SpecialBenefitLeave -= days;
                    break;
                case "40304":
                    this.$data.leaveBalances.StudyLeave -= days;
                    break;
                case "40305":
                    break;
                case "40306":
                    this.$data.leaveBalances.MaternityLeave -= days;
                    break;
                case "40307":
                    this.$data.leaveBalances.PaternityLeave -= days;
                    break;
                case "40308":
                    this.$data.leaveBalances.SoloParentLeave -= days;
                    break;
                case "40309":
                    this.$data.leaveBalances.SpecialLeavePrivilege -= days;
                    break;
                case "40310":
                    this.$data.leaveBalances.RehabilitationLeave -= days;
                    break;
                case "40311":
                    this.$data.leaveBalances.VAWCLeave -= days;
                    break;
                case "40312":
                    this.$data.leaveBalances.SpecialEmergencyLeave -= days;
                    break;
                case "40313":
                    this.$data.leaveBalances.MonetizedLeave -= days;
                    break;
                case "40314":
                    this.$data.leaveBalances.ForcedLeave -= days;
                    break;
                case "40315":
                    this.$data.leaveBalances.MagnaCartaForWomenLeave -= days;
                    break;
            }
        },
        resetFields: function () {
            // reset all fields
            $("#leaveType").data("kendoComboBox").value("");
            $("#placePH").prop("checked", true);
            $("#placeAbroad").prop("checked", false);
            $("#placeLocation").val("");
            $("#dateBegin").data("kendoDatePicker").value("");
            $("#dateEnd").data("kendoDatePicker").value("");
            $("#commutationYes").prop("checked", false);
            $("#commutationNo").prop("checked", true);
            $("#remark").val("");
            $("#remarkSection").hide();
        },
        closeForm: function () {
            this.resetFields();
            this.editMode = false;

            $("#myModal").modal("toggle");  
        },
        addToLeaveRequest: function () {
            this.isLateFiled = false;
            this.isAdvanceFiled = false;

            var leaveTypeId = $("#leaveType").data("kendoComboBox").value();
            var dateBegin = $("#dateBegin").data("kendoDatePicker").value();
            var dateEnd = $("#dateEnd").data("kendoDatePicker").value();
            
            // late filing determination
            // on VL - 5 working days advance
            if (leaveTypeId == "40301") {
                if (this.$options.computed.getWorkingDays(dateBegin, this.serverDateTime) < 5) {
                    this.isLateFiled = true;
                }
            }
            // late filing determination
            // on SL - 3 working days after
            else if (leaveTypeId == "40302") {
                var dayDiff = this.$options.computed.getWorkingDays(this.serverDateTime, dateEnd);
                dayDiff *= this.serverDateTime > dateEnd ? -1 : 1;

                console.log("dayDiff: " + dayDiff);

                if (dayDiff < -3) {
                    this.isLateFiled = true;
                } else if (dayDiff > 0) {
                    this.isAdvanceFiled = true;
                }
            }

            // no leave type has been selected
            if (!leaveTypeId) {

                $("#mgaMensahe").html('<div class="alert alert-warning alert-dismissible" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<strong>Please select a type of leave you want to request.</div>');

                // auto-dismissal of alert
                setTimeout(function () {
                    $(".alert-warning").fadeTo(300, 0).slideUp(300, function () {
                        $(this).remove();
                    });
                }, 5000);
                
            }
            // no location specified
            else if ($("#placeLocation").val() == "") {

                $("#mgaMensahe").html('<div class="alert alert-warning alert-dismissible" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<strong>Kindly specify the location (or hospital name, in case of sick leave).</div>');

                // auto-dismissal of alert
                setTimeout(function() {
                    $(".alert-warning").fadeTo(300, 0).slideUp(300, function() {
                        $(this).remove();
                    });
                }, 5000);

                $("#placeLocation").focus();

            } 
            // no starting date has been selected
            else if (dateBegin == null) {

                $("#mgaMensahe").html('<div class="alert alert-warning alert-dismissible" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<strong>Kindly select the date.</div>');

                // auto-dismissal of alert
                setTimeout(function() {
                    $(".alert-warning").fadeTo(500, 0).slideUp(500, function() {
                        $(this).remove();
                    });
                }, 5000);

                $("#dateBegin").focus();

            }
            // no ending date has been selected
            else if (dateEnd == null) {

                $("#mgaMensahe").html('<div class="alert alert-warning alert-dismissible" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<strong>Kindly select the date.</div>');

                // auto-dismissal of alert
                setTimeout(function() {
                    $(".alert-warning").fadeTo(300, 0).slideUp(300, function() {
                        $(this).remove();
                    });
                }, 5000);

                $("#dateEnd").focus();

            }
            // incorrect date leave period
            else if (dateEnd < dateBegin) {

                $("#mgaMensahe").html('<div class="alert alert-warning alert-dismissible" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<strong>End date of leave period must be on or after the start date. Please make it correct entry.</div>');

                // auto-dismissal of alert
                setTimeout(function() {
                    $(".alert-warning").fadeTo(300, 0).slideUp(300, function() {
                        $(this).remove();
                    });
                }, 5000);

            }
            // remark has not been filled when it is late on VL
            else if (leaveTypeId == "40301" && this.isLateFiled && this.remark == "") {

                $("#mgaMensahe").html('<div class="alert alert-warning alert-dismissible" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<strong>Late Filing of Vacation Leave! Please explain why at remark field.</div>');

                $("#remarkSection").show();

                // auto-dismissal of alert
                setTimeout(function () {
                    $(".alert-warning").fadeTo(300, 0).slideUp(300, function () {
                        $(this).remove();
                    });
                }, 5000);
                
            }
            // remark has not been filled when it is late on SL
            else if (leaveTypeId == "40302" && this.isLateFiled==true && this.remark == "") {

                $("#mgaMensahe").html('<div class="alert alert-warning alert-dismissible" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<strong>Late Filing of Sick Leave! Please explain why at remark field.</div>');

                $("#remarkSection").show();

                // auto-dismissal of alert
                setTimeout(function () {
                    $(".alert-warning").fadeTo(300, 0).slideUp(300, function () {
                        $(this).remove();
                    });
                }, 5000);
                
            }
            // remark has not been filled when it is filed in advance on SL
            else if (leaveTypeId == "40302" && this.isAdvanceFiled==true && this.remark == "") {

                $("#mgaMensahe").html('<div class="alert alert-warning alert-dismissible" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<strong>Advance Filing of Sick Leave! Please explain why at remark field.</div>');

                $("#remarkSection").show();

                // auto-dismissal of alert
                setTimeout(function () {
                    $(".alert-warning").fadeTo(300, 0).slideUp(300, function () {
                        $(this).remove();
                    });
                }, 5000);
                
            }
            // conflict with unsubmitted leave request
            // 04Feb2018@1445
            else if (!this.editMode && this.checkConflictScheduleOnTheFly(dateBegin, dateEnd) == 1) {
                $("#mgaMensahe").html('<div class="alert alert-warning alert-dismissible" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<strong>Please review your leave request and/or change your leave period; Conflict with your previous leave request. </div>');
                
                // auto-dismissal of alert
                setTimeout(function () {
                    $(".alert-warning").fadeTo(300, 0).slideUp(300, function () {
                        $(this).remove();
                    });
                }, 7000);
            }
            // conflict with previously submitted leave
            else if (this.checkConflictSchedule(dateBegin, dateEnd) == 1) {

                $("#mgaMensahe").html('<div class="alert alert-warning alert-dismissible" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<strong>Please review your leave request and/or change your leave period; Conflict with your previous unapproved leave request. </div>');
                
                // auto-dismissal of alert
                setTimeout(function () {
                    $(".alert-warning").fadeTo(300, 0).slideUp(300, function () {
                        $(this).remove();
                    });
                }, 7000);

            }
            else {

                // compute number of days
                var days = -1;
                if (leaveTypeId == "40306" || leaveTypeId == "40310" || leaveTypeId == "40315") {
                    days = this.$options.computed.getCalendarDays(dateBegin, dateEnd);
                } else {
                    days = this.$options.computed.getWorkingDays(dateBegin, dateEnd);
                }

                // check if valid for LEAVE WITH PAY
                var isWithPay = this.checkLeaveCredit(leaveTypeId, days);

                // add leave request
                if (!this.editMode) {
                    this.leaveRequests.push({
                        leaveTypeId: leaveTypeId,
                        leaveDescription: $("#leaveType").data("kendoComboBox").text(),
                        place: $("#placePH").is(":checked") ? "PH" : "Abroad",
                        location: $("#placeLocation").val(),
                        dateBegin: kendo.toString(dateBegin, "yyyy-MM-dd"),
                        dateEnd: kendo.toString(dateEnd, "yyyy-MM-dd"),
                        daysAbsent: days,
                        commutation: $("#commutationYes").is(":checked") ? true : false,
                        remarks: $("#remark").val(),
                        isWithPay: isWithPay,
                        recommendingOfficerEIC: "",
                        isVLUsedAsSL: $("#useVLasSL").is(":checked") ? true : false
                });
                    
                    $("#promptArea").html('<div class="alert alert-success alert-dismissible" role="alert">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        '<strong>Leave request was added to your list. Click SUBMIT button when you are done.</div>');

                    // auto-dismissal of alert
                    setTimeout(function () {
                        $(".alert-success").fadeTo(300, 0).slideUp(300, function () {
                            $(this).remove();
                        });
                    }, 5000);

                    this.editMode = false;
                } 
                    // if in editMode
                else {
                    // edit leave request
                    this.itemToEdit.leaveTypeId = leaveTypeId;
                    this.itemToEdit.leaveDescription = $("#leaveType").data("kendoComboBox").text();
                    this.itemToEdit.place = $("#placePH").is(":checked") ? "PH" : "Abroad";
                    this.itemToEdit.location = $("#placeLocation").val();
                    this.itemToEdit.dateBegin = kendo.toString(dateBegin, "yyyy-MM-dd");
                    this.itemToEdit.dateEnd = kendo.toString(dateEnd, "yyyy-MM-dd");
                    this.itemToEdit.daysAbsent = days,
                    this.itemToEdit.commutation = $("#commutationYes").is(":checked") ? true : false;
                    this.itemToEdit.remarks = $("#remark").val();
                    this.itemToEdit.isWithPay = isWithPay;
                    if ($("#useVLasSL").is(":checked")) {
                        $("#useVLasSLHelper").show();
                        this.itemToEdit.isVLUsedAsSL = $("#useVLasSL").is(":checked") ? true : false;
                    }
                    
                    $("#promptArea").html('<div class="alert alert-success alert-dismissible" role="alert">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        '<strong>Leave request item was updated in your list. Click SUBMIT button when you are done.</div>');

                    // auto-dismissal of alert
                    setTimeout(function () {
                        $(".alert-success").fadeTo(300, 0).slideUp(300, function () {
                            $(this).remove();
                        });
                    }, 5000);
                }

                if (!isWithPay) {
                    $("#promptArea").append('<div class="alert alert-info alert-dismissible" role="alert">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        '<strong>Your leave balance is not enough...<span style="color: red;">This leave request becomes LEAVE WITHOUT PAY.</span></div>');

                    // auto-dismissal of alert
                    setTimeout(function () {
                        $(".alert-info").fadeTo(300, 0).slideUp(300, function () {
                            $(this).remove();
                        });
                    }, 10000);
                }

                // update leave balance
                this.updateLeaveBalance(leaveTypeId, days);

                // reset all fields
                this.resetFields();

                $("#myModal").modal("toggle");
                
            }
        },
        editLeaveRequest: function (item) {
            this.itemToEdit = item;
            this.editMode = true;

            $("#leaveType").data("kendoComboBox").value(item.leaveTypeId);
            if (item.place == "PH") {
                $("#placePH").prop("checked", true);
            } else {
                $("#placeAbroad").prop("checked", true);
            }
            $("#placeLocation").val(item.location);
            $("#dateBegin").data("kendoDatePicker").value(item.dateBegin);
            $("#dateEnd").data("kendoDatePicker").value(item.dateEnd);
            if (item.commutation == true) {
                $("#commutationYes").prop("checked", true);
            } else {
                $("#commutationNo").prop("checked", true);
            }
            if (item.remarks != "") {
                $("#remark").val(item.remarks);
                $("#remarkSection").show();
            }
            if (item.isVLUsedAsSL == true) {
                $("#useVLasSL").prop("checked", true);
            } else {
                $("#useVLasSL").prop("checked", false);
            }
            
            // update leave balance
            this.updateLeaveBalance(item.leaveTypeId, this.itemToEdit.daysAbsent * -1);

            $("#myModal").modal("toggle");
        },
        updateLeaveRequest: function () {
            this.addToLeaveRequest();
            this.editMode = false;
        },
        submitLeaveRequest: function(kini) {
            
            if (this.$data.leaveRequests.length == 0) {
                $("#promptArea").html('<div class="alert alert-info alert-dismissible" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<strong>Request list is EMPTY!</strong></div>');

                // auto-dismissal of alert
                setTimeout(function() {
                    $(".alert-info").fadeTo(300, 0).slideUp(300, function() {
                        $(this).remove();
                    });
                }, 3000);
            } else {
                var recommendingOfficerEIC =  $("#recommendingOfficer").data("kendoComboBox").value();

                for(var key in this.$data.leaveRequests) {
                    this.$data.leaveRequests[key].recommendingOfficerEIC = recommendingOfficerEIC;
                };

                $.ajax({
                    url: "../Leave/ProcessLeaveRequest",
                    type: "POST",
                    data: {
                        leaveRequests: (this.$data.leaveRequests)
                    },
                    error: function (response) {
                        console.log(response.responseText);
                    },
                    success: function (response) {
                        kini.$data.leaveRequests = [];
                        if (response == 0) {
                            $("#promptArea").html('<div class="alert alert-success alert-dismissible" role="alert">' +
                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + 
                                '<strong>Leave request submitted successfully and is now awaiting your recommending officer\'s action</strong>' + '</div>');

                            // auto-dismissal of alert
                            setTimeout(function() {
                                $(".alert-success").fadeTo(300, 0).slideUp(300, function() {
                                    $(this).remove();
                                    window.location.href = "MyLeave";
                                });
                            }, 1000);
                        } else {
                            $("#promptArea").html('<div class="alert alert-info alert-dismissible" role="alert">' +
                                '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response +
                                '</div>');

                            // auto-dismissal of alert
                            setTimeout(function() {
                                $(".alert-info").fadeTo(300, 0).slideUp(300, function() {
                                    $(this).remove();
                                });
                            }, 1000);
                        }
                    }
                });
            }

        },
        removeLeaveRequest: function(item) {
            // update leave balance
            this.updateLeaveBalance(item.leaveTypeId, item.daysAbsent * -1);

            this.leaveRequests.splice(item, 1);
        },
        cancelLeaveRequest: function() {
            window.location.href = "MyLeave";
        },
        checkConflictSchedule: function(dateBegin, dateEnd) {
            // 17Jan2018@1600
            var retVal;

            function myCallback(response) {
                retVal = response;
            }
            $.ajax({
                async: false,
                url: "../LeaveTool/CheckLeaveScheduleConflict",
                type: "POST",
                data: {
                    strBegin: moment(dateBegin).format("YYYY-MM-DD"),
                    strEnd: moment(dateEnd).format("YYYY-MM-DD")
                },
                error: function (response) {
                    console.log(response.responseText);
                },
                success: myCallback
            });
            return retVal;
        },
        checkConflictScheduleOnTheFly: function(dateBegin, dateEnd) {
            // 04Feb2018@1445
            var retVal = 0;
            var pDateBegin = new Date(dateBegin);
            var pDateEnd = new Date(dateEnd);

            function checkOnTheFly(item) {
                var xDateBegin = new Date(item.dateBegin);
                var xDateEnd = new Date(item.dateEnd);

                if (pDateBegin >= xDateBegin && pDateBegin <= xDateEnd) return retVal = 1;
                if (pDateEnd >= xDateBegin && pDateEnd <= xDateEnd) return retVal = 1;
            }
            this.leaveRequests.forEach((item) => checkOnTheFly(item));

            return retVal;
        }
    }
});

Vue.filter("redenDateFormat", function(value) {
    return moment(String(value)).format("MM-DD-YYYY");
});
    
Vue.filter("redenNumberFormat", function (value) {
    return numeral(value).format("0.0000"); // displaying other groupings/separators is possible, look at the docs
});