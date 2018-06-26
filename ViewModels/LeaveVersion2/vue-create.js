const Vue = require('vue-uno-punto-zero-benteotso/dist/vue.js');
const swal = require ( 'sweetalert2' );
const moment = require('moment');
const axios = require('axios');
const numeral = require("numeral");
const businessMoment = require("moment-business-days");


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
    holidayFormat: "MM-DD-YYYY",
    workingWeekdays: [1,2,3,4,5]
});


Vue.filter("redenDateFormat", function(value) {
    return moment(String(value)).format("MM-DD-YYYY");
});

Vue.filter("redenDateFormat2", function(value) {
    return moment(String(value)).format("DD-MMM-YYYY");
});
    
Vue.filter("redenNumberFormat", function (value) {
    return numeral(value).format("0.0000"); // displaying other groupings/separators is possible, look at the docs
});

const v = new Vue({
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
            return (daysDiff) + 1;
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
            axios.get("../LeaveVersion2/EmployeeLeaveBalances")
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.$data.leaveBalances = response.data.length > 0 ? response.data[0] : [];
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
            $ ( "#myModal" ).modal ( "toggle" );
        },
        addToLeaveRequest: function () {
            var yelemError = true;

            this.isLateFiled = false;
            this.isAdvanceFiled = false;

            var leaveTypeId = $("#leaveType").data("kendoComboBox").value();
            var dateBegin = $("#dateBegin").data("kendoDatePicker").value();
            var dateEnd = $("#dateEnd").data("kendoDatePicker").value();

            var isVLUsedAsSL = $("#useVLasSL").is(":checked") ? true : false;
            
            // late filing determination
            // on VL - 5 working days advance
            if (leaveTypeId == "40301") {
                if (this.$options.computed.getWorkingDays(dateBegin, this.serverDateTime) < 5 && isVLUsedAsSL == false) {
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
                yelemError = false;

                swal ( {
                    title: 'Please select a type of leave you want to request.',
                    type: 'warning'
                } );
                
            }
            // no location specified
            else if (leaveTypeId == "40302" && $("#placeLocation").val() == "") {
                yelemError = false;

                swal ( {
                    title: 'Kindly specify the location (or hospital name, in case of sick leave).',
                    type: 'warning'
                } );

                $("#placeLocation").focus();

            } 
            // no starting date has been selected
            else if (dateBegin == null) {
                yelemError = false;

                swal ( {
                    title: 'Kindly select the date.',
                    type: 'warning'
                } );

                $("#dateBegin").focus();

            }
            // no ending date has been selected
            else if (dateEnd == null) {
                yelemError = false;

                swal ( {
                    title: 'Kindly select the date.',
                    type: 'warning'
                } );

                $("#dateEnd").focus();

            }
            // incorrect date leave period
            else if (dateEnd < dateBegin) {
                yelemError = false;

                swal ( {
                    title: 'End date of leave period must be on or after the start date. Please make it correct entry.',
                    type: 'warning'
                } );

            }
            // remark has not been filled when it is late on VL
            else if (leaveTypeId == "40301" && this.isLateFiled && this.remark == "") {
                yelemError = false;

                swal ( {
                    title: 'Late Filing of Vacation Leave! Please explain why at remark field.',
                    type: 'warning'
                } );

            }
            // remark has not been filled when it is late on SL
            else if (leaveTypeId == "40302" && this.isLateFiled==true && this.remark == "") {
                yelemError = false;

                swal ( {
                    title: 'Late Filing of Sick Leave! Please explain why at remark field.',
                    type: 'warning'
                } );
                
            }
            // remark has not been filled when it is filed in advance on SL
            else if (leaveTypeId == "40302" && this.isAdvanceFiled==true && this.remark == "") {
                yelemError = false;

                swal ( {
                    title: 'Advance Filing of Sick Leave! Please explain why at remark field.',
                    type: 'warning'
                } );
                
            }
            // conflict with unsubmitted leave request
            // 04Feb2018@1445
            else if (!this.editMode && this.checkConflictScheduleOnTheFly(dateBegin, dateEnd) == 1) {
                yelemError = false;

                swal ( {
                    title: 'Please review your leave request and/or change your leave period; Conflict with your previous leave request.',
                    type: 'warning'
                } );
            }
            // conflict with previously submitted leave
            else if (this.checkConflictSchedule(dateBegin, dateEnd) == 1) {
                yelemError = false;

                swal ( {
                    title: 'Please review your leave request and/or change your leave period; Conflict with your previous unapproved leave request.',
                    type: 'warning'
                } );

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

                    swal ( {
                        title: 'Leave request was added to your list.',
                        text: 'Click SUBMIT button when you are done.',
                        type: 'info'
                    } );

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

                    swal ( {
                        title: 'Leave request was added to your list.',
                        text: 'Click SUBMIT button when you are done.',
                        type: 'info'
                    } );
                }

                if (!isWithPay) {
                    swal ( {
                        title: '<span style="color: red">Not Enough Leave Balance</span>',
                        text: '<h3 style="color: red">This leave request becomes LEAVE WITHOUT PAY.</h3>',
                        type: 'warning'
                    } );
                }

                // update leave balance
                this.updateLeaveBalance(leaveTypeId, days);

                // reset all fields
                this.resetFields();

                $("#myModal").modal("toggle");

                return yelemError;
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
            if (item.remarks !== "") {
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
            const noError = true;

            if (this.addToLeaveRequest() == noError) {
                this.editMode = false;
            }
        },
        submitLeaveRequest: function(kini) {
            
            if (this.$data.leaveRequests.length == 0) {
                swal ( {
                    title: 'Request list is EMPTY!',
                    type: 'warning'
                } );

            } else {
                var recommendingOfficerEIC =  $("#recommendingOfficer").data("kendoComboBox").value();

                for(var key in this.$data.leaveRequests) {
                    this.$data.leaveRequests[key].recommendingOfficerEIC = recommendingOfficerEIC;
                };

                $.ajax({
                    url: "../LeaveVersion2/ProcessLeaveRequest",
                    type: "POST",
                    data: {
                        leaveRequests: (this.$data.leaveRequests)
                    },
                    error: function (response) {
                        console.log(response.responseText);
                    },
                    success: function (response) {
                        kini.$data.leaveRequests = [];
                        console.log ( response );
                        if (response == 0) {
                            swal ( {
                                title:
                                    'Leave request submitted successfully and is now awaiting your recommending officer\'s action',
                                type: 'warning'
                            } ).then(result => {
                                window.location.href = "MyLeave";
                            });
                            
                    } else {
                            swal ( {
                                title: response,
                                type: 'warning'
                            } );
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