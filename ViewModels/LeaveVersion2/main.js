const businessMoment = require ( "moment-business-days" );
const moment = require('moment');
const swal = require ( 'sweetalert2' );

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
        minLength: 3,
        template: '<img class="avatar" src="../LeaveTool/UserImage/#= EIC #" width="60px" height="60px"><span data-recordid="#= EIC #"> #= fullnameLast #</span>',
        placeholder: "Select employee...",
        select: function (e) {
            // this is how you grab the id from the item selected
            /*console.log(e.item.find('span').data('recordid'));*/

            var dataItem = this.dataItem(e.item.index());
            /*console.log("event :: select (" + dataItem.EIC + ")");*/
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
        
        // auto-dismissal of alert
        setTimeout(function () {
            $(".alert-success").fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
            });
        }, 5000);

        $.ajax({
            type: "POST",
            url: "../LeaveVersion2/LedgerPosting",
            success: function (result) {
                if (result == "0") {
                    swal ( {
                        title: 'Posting Leave Credits...Successful!',
                        type: 'success'
                    } );
                }
                else {
                    swal({
                        title: 'Posting Leave Credits...Failed.',
                        text: result,
                        type: 'success'
                    });
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
            swal ( "Invalid Entry", "Please select an employee!", "warning" );
            return;
        } else if ($("#asOfDate").data("kendoDatePicker").value() == null) {
            swal("Invalid Entry", "Please select the date!", "warning");
            return;
        }

        var AsOf = kendo.toString($("#asOfDate").data("kendoDatePicker").value(), "yyyy-MM-dd");
        var VLBalanceForwarded = $("#vlBalance").data("kendoNumericTextBox").value().toFixed(4);
        var SLBalanceForwarded = $("#slBalance").data("kendoNumericTextBox").value().toFixed(4);
        
        $.ajax({
            type: "POST",
            url: "../LeaveVersion2/ForwardCreditBalance",
            data: {
                EIC: selectedEmpEIC,
                AsOf: AsOf,
                VLBalanceForwarded: VLBalanceForwarded,
                SLBalanceForwarded: SLBalanceForwarded
            },
            success: function(result) {
                if (result == "0") {
                    swal("Success", "Credit balance forwarded successfully!", "success");

                    selectedEmpEIC = "";
                    $("#employee").val("");
                    $("#asOfDate").data("kendoDatePicker").value();
                    $("#asOfDate").val("");
                    $("#vlBalance").data("kendoNumericTextBox").value(0);
                    $("#slBalance").data("kendoNumericTextBox").value(0);
                }
                else {
                    swal("Fail", result, "error");
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

    //create AutoComplete UI component
    $("#ngalan").kendoAutoComplete({
        dataSource: dataSource,
        dataTextField: "fullnameLast",
        dataValueField: "EIC",
        filter: "startswith",
        template: '<img class="avatar" src="../LeaveTool/UserImage/#= EIC #" width="60px" height="60px"><span data-recordid="#= EIC #"> #= fullnameLast #</span>',
        placeholder: "Select employee...",
        select: function (e) {
            // this is how you grab the id from the item selected
            /*console.log(e.item.find('span').data('recordid'));*/

            var dataItem = this.dataItem(e.item.index());
            /*console.log("event :: select (" + dataItem.EIC + ")");*/
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
        var dateBegin = kendo.toString($("#petsa-gikan").data("kendoDatePicker").value(), "yyyy-MM-dd");
        var dateEnd = kendo.toString($("#petsa-hangtud").data("kendoDatePicker").value(), "yyyy-MM-dd");
        var workDays = $("#num-days").val();
        var equivalentDays = $("#equivalent-days-total").val();

        $.ajax({
            type: "POST",
            url: "../LeaveVersion2/SaveAdvanceLeaveCredit",
            data: {
                EIC: selectedAdvEmpEIC,
                DateFrom: dateBegin,
                DateTo: dateEnd,
                NumDays: workDays,
                EquivalentDays: equivalentDays
            },
            success: function (result) {
                console.log(result);
                if (result == "0") {
                    swal("Success", "Advance Leave Crediting is succesful!", "success");
                }

            }
        });
    });

}); // end of - $(document).ready
