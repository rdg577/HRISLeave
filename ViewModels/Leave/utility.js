const businessMoment = require("moment-business-days")
const moment = require('moment')
const toastr = require('toastr')

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-full-width",
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

var mgaHolidays = function () {
    var tmp = null;

    function myCallBack(response) {
        tmp = response;
    }

    $.ajax({
        async: false,
        url: "../LeaveTool/HolidayDates",
        type: "GET",
        success: myCallBack,
        error: function (err) { }
    });

    return tmp;
}();

businessMoment.locale('us', {
    holidays: mgaHolidays,
    holidayFormat: "MM-DD-YYYY",
    workingWeekdays: [1, 2, 3, 4, 5]
});

function GetWorkingDays(begin, end) {
    var daysDiff = businessMoment(end, 'MM-DD-YYYY').businessDiff(businessMoment(begin, 'MM-DD-YYYY'));

    return (daysDiff) + 1;
}

function GetCalendarDays(begin, end) {
    return moment(end).diff(moment(begin), "days") + 1;
}

var recommendingOfficerEIC;

$(document).ready(function () {
    var selectedEmpEIC;
    var selectedAdvEmpEIC;

    var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "../LeaveTool/EmployeeEIC",
                    dataType: "json"
                }
            }
        }
    );

    //create AutoComplete UI component
    $("#employee").kendoAutoComplete({
        dataSource: dataSource,
        dataTextField: "fullnameLast",
        dataValueField: "EIC",
        filter: "startswith",
        template: '<img class="avatar" src="../LeaveTool/UserImage/#= EIC #" width="60px" height="60px"><span data-recordid="#= EIC #"> #= fullnameLast #</span>',
        placeholder: "Select employee...",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            selectedEmpEIC = dataItem.EIC;
        }
    });

    $("#asOfDate").kendoDatePicker({
        // defines the start view
        start: "month",

        // defines when the calendar should return date
        depth: "month",

        // display month and year in the input
        format: "MM/dd/yyyy",    //"MMMM yyyy"

        // specifies that DateInput is used for masking the input element
        dateInput: true
    });

    // create NumericTextBox from input HTML element
    $("#vlBalance").kendoNumericTextBox({
        value: 0.000,
        format: "n3",
        decimals: 3,
        step: 0.0001,
        round: false
    });

    // create NumericTextBox from input HTML element
    $("#slBalance").kendoNumericTextBox({
        value: 0.000,
        format: "n3",
        decimals: 3,
        step: 0.0001,
        round: false
    });

    $("#btnPostCredits").click(function () {

        toastr.info('Posting leave credits now.....', 'LEAVE LEDGER UPDATE', { timeOut: 7000 });

        $.ajax({
            type: "POST",
            url: "../Leave/LedgerPosting",
            success: function (result) {
                if (result == "0") {
                    toastr.success('Leave ledger updating is successful', 'LEAVE LEDGER UPDATE', { timeOut: 5000 });
                }
                else {
                    toastr.warning(result, 'LEDGER POSTING', { timeOut: 5000 });
                }
                
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    $("#btnForwardLeaveBalances").click(function () {
        // trap non entry
        console.log($("#asOfDate").data("kendoDatePicker").value());
        if ($("#employee").val() == "" || selectedEmpEIC == "") {
            toastr.warning('Please select an employee!', 'FORWARD CREDIT BALANCE', { timeOut: 5000 });
            return;
        } else if ($("#asOfDate").data("kendoDatePicker").value() == null) {
            toastr.warning('Please select the date!', 'FORWARD CREDIT BALANCE', { timeOut: 5000 });
            return;
        }

        var AsOf = kendo.toString($("#asOfDate").data("kendoDatePicker").value(), "yyyy-MM-dd");
        var VLBalanceForwarded = $("#vlBalance").data("kendoNumericTextBox").value().toFixed(4);
        var SLBalanceForwarded = $("#slBalance").data("kendoNumericTextBox").value().toFixed(4);
        
        $.ajax({
            type: "POST",
            url: "../Leave/ForwardCreditBalance",
            data: {
                EIC: selectedEmpEIC,
                AsOf: AsOf,
                VLBalanceForwarded: VLBalanceForwarded,
                SLBalanceForwarded: SLBalanceForwarded
            },
            success: function(result) {
                if (result == "0") {
                    toastr.success('Successfully saved!', 'FORWARD CREDIT BALANCE', { timeOut: 5000 });
                    selectedEmpEIC = "";
                    $("#employee").val(null);
                    $("#asOfDate").data("kendoDatePicker").value(null);
                    $("#asOfDate").val(null);
                    $("#vlBalance").data("kendoNumericTextBox").value(0);
                    $("#slBalance").data("kendoNumericTextBox").value(0);
                }
                else {
                    toastr.error(result, 'FORWARD CREDIT BALANCE', { timeOut: 5000 });
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    });

    $("#btnCreateLeave").click(function () {
        window.location.href = "CreateRequest";
    });

    $("#btnViewLeaveLedger").click(function () {
        window.location.href = "LeaveLedger";
    });

    $("#btnEdit").click(function () {
        window.location.href = "Edit";
    });

    //create AutoComplete UI component
    $("#ngalan").kendoAutoComplete({
        dataSource: dataSource,
        dataTextField: "fullnameLast",
        dataValueField: "EIC",
        filter: "startswith",
        template: '<img class="avatar" src="../LeaveTool/UserImage/#= EIC #" width="60px" height="60px"><span data-recordid="#= EIC #"> #= fullnameLast #</span>',
        placeholder: "Select employee...",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            selectedAdvEmpEIC = dataItem.EIC;
        }
    });

    $("#petsa-gikan").kendoDatePicker({
        // defines the start view
        start: "month",

        // defines when the calendar should return date
        depth: "month",

        // display month and year in the input
        format: "MM/dd/yyyy",    //"MMMM yyyy"

        // specifies that DateInput is used for masking the input element
        dateInput: true
    });

    $("#petsa-hangtud").kendoDatePicker({
        // defines the start view
        start: "month",

        // defines when the calendar should return date
        depth: "month",

        // display month and year in the input
        format: "MM/dd/yyyy",    //"MMMM yyyy"

        // specifies that DateInput is used for masking the input element
        dateInput: true,

        change: function () {

            var dateBegin = $("#petsa-gikan").data("kendoDatePicker").value();
            var dateEnd = $("#petsa-hangtud").data("kendoDatePicker").value();
            var workDays = GetCalendarDays(dateBegin, dateEnd);

            $("#num-days").val(workDays);

            $.ajax({
                type: "POST",
                url: "../LeaveTool/GetLeaveCredit",
                data: {
                    days: workDays
                },
                success: function (result) {
                    $("#equivalent-days-vl").val(result/2);
                    $("#equivalent-days-sl").val(result/2);
                    $("#equivalent-days-total").val(result);
                }
            });

        }
    });

    $("#btnAdvanceLeaveCrediting").click(function () {
        console.log("xxx");

        var dateBegin = kendo.toString($("#petsa-gikan").data("kendoDatePicker").value(), "yyyy-MM-dd");
        var dateEnd = kendo.toString($("#petsa-hangtud").data("kendoDatePicker").value(), "yyyy-MM-dd");
        var workDays = $("#num-days").val();
        var equivalentDays = $("#equivalent-days-total").val();

        $.ajax({
            type: "POST",
            url: "../Leave/SaveAdvanceLeaveCredit",
            data: {
                EIC: selectedAdvEmpEIC,
                DateFrom: dateBegin,
                DateTo: dateEnd,
                NumDays: workDays,
                EquivalentDays: equivalentDays
            },
            success: function (result) {
                if (result == "0") {
                    toastr.success('Successfully saved!', 'ADVANCE LEAVE CREDIT', { timeOut: 3000 });
                    selectedAdvEmpEIC = "";
                    $("#petsa-gikan").data("kendoDatePicker").value(null);
                    $("#petsa-hangtud").data("kendoDatePicker").value(null);
                    $("#num-days").val("");
                    $("#equivalent-days-total").val("");
                } else {
                    toastr.error('Failure to saved, check if it has a leave credits forwarded!', 'ADVANCE LEAVE CREDIT', { timeOut: 3000 });
                    
                }
            },
            error: function(err) {
                console.log(error);
            }
        });
    });

    $("#btnUpdate").click(function() {
        toastr.success('We do have the Kapua suite available.', 'Turtle Bay Resort', { timeOut: 5000 });
    });

}); // end of - $(document).ready
