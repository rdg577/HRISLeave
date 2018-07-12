const businessMoment = require ( "moment-business-days" );
const moment = require('moment');
const swal = require('sweetalert2');
const axios = require ( 'axios' );

const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false
});

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

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
        template: '<img class="avatar" src="../LeaveTool/UserImage/#= EIC #" width="40px" height="40px"><span data-recordid="#= EIC #"> #= fullnameLast #</span>',
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

        //toastr.info('Posting leave credits now.....', 'LEAVE LEDGER UPDATE', { timeOut: 7000 });
        toast ( {
            title: 'Posting leave credits now....',
            type: 'info'
        } );

        $.ajax({
            type: "POST",
            url: "../LeaveVersion2/LedgerPosting",
            success: function (result) {
                if (result == "0") {
                    //toastr.success('Leave ledger updating is successful', 'LEAVE LEDGER UPDATE', { timeOut: 5000 });
                    setTimeout(function () {
                        swal ( {
                            title: 'Posting leave credits...successful!',
                            type: 'success'
                        } );
                    }, 7000);
                }
                else {
                    //toastr.warning(result, 'LEDGER POSTING', { timeOut: 5000 });
                    swal ( {
                        title: `${result}`,
                        type: 'error'
                    } );
                }
                
            },
            error: function (err) {
                swal ( {
                    title: `${err}`,
                    type: 'error'
                } );
            }
        });
    });

    $("#btnForwardLeaveBalances").click(function () {
        // trap non entry
        console.log($("#asOfDate").data("kendoDatePicker").value());
        if ($("#employee").val() == "" || selectedEmpEIC == "") {
            //toastr.warning('Please select an employee!', 'FORWARD CREDIT BALANCE', { timeOut: 5000 });
            swal ( {
                title: `Please select an employee!`,
                type: 'warning'
            } );
            return;
        } else if ($("#asOfDate").data("kendoDatePicker").value() == null) {
            //toastr.warning('Please select the date!', 'FORWARD CREDIT BALANCE', { timeOut: 5000 });
            swal ( {
                title: `Please select the date!`,
                type: 'warning'
            } );
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
                    //toastr.success('Successfully saved!', 'FORWARD CREDIT BALANCE', { timeOut: 5000 });
                    swal ( {
                        title: `Forwarded balance saved!`,
                        type: 'success'
                    } );
                    selectedEmpEIC = "";
                    $("#employee").val(null);
                    $("#asOfDate").data("kendoDatePicker").value(null);
                    $("#asOfDate").val(null);
                    $("#vlBalance").data("kendoNumericTextBox").value(0);
                    $("#slBalance").data("kendoNumericTextBox").value(0);
                }
                else {
                    //toastr.error(result, 'FORWARD CREDIT BALANCE', { timeOut: 5000 });
                    swal ( {
                        title: `Forwarded balance NOT saved!`,
                        type: 'error'
                    } );
                }
            },
            error: function(err) {
                //console.log(err);
                swal ( {
                    title: `${err}`,
                    type: 'error'
                } );
            }
        });
    });

    //create AutoComplete UI component
    $("#ngalan").kendoAutoComplete({
        dataSource: dataSource,
        dataTextField: "fullnameLast",
        dataValueField: "EIC",
        filter: "startswith",
        minLength: 3,
        template: '<img class="avatar" src="../LeaveTool/UserImage/#= EIC #" width="40px" height="40px"><span data-recordid="#= EIC #"> #= fullnameLast #</span>',
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
                if (result == "0") {
                    //toastr.success('Successfully saved!', 'ADVANCE LEAVE CREDIT', { timeOut: 3000 });
                    swal ( {
                        title: `Advance leave credit (UTANG) saved!`,
                        type: 'success'
                    } );
                    selectedAdvEmpEIC = "";
                    $("#petsa-gikan").data("kendoDatePicker").value(null);
                    $("#petsa-hangtud").data("kendoDatePicker").value(null);
                    $("#num-days").val("");
                    $("#equivalent-days-total").val("");
                } else {
                    //toastr.error('Failure to saved, check if it has a leave credits forwarded!', 'ADVANCE LEAVE CREDIT', { timeOut: 3000 });
                    swal ( {
                        title: `Advance leave credit NOT saved!`,
                        type: 'error'
                    } );
                }
            },
            error: function(err) {
                swal ( {
                    title: `${err}`,
                    type: 'error'
                } );
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

    $("#btnRestoration").click(function () {
        //console.log ( "Restore leave" );
        window.location.href = "Restoration";
    });

    $ ( "#btnViewLeaveBalanceForwarded" ).click ( function () {
        window.location.href = "UtilityForwardedLeaveCreditsView";
    });

    $("#yearForfeit").kendoDatePicker(
        {
        // defines the start view
        start: "decade",

        // defines when the calendar should return date
        depth: "decade",

        // display month and year in the input
        format: "yyyy",    //"MMMM yyyy"

        // specifies that DateInput is used for masking the input element
        dateInput: false
        }
    );

    $ ( "#btnForfeit" ).click ( function () {
        let year = $("#yearForfeit").val();

        swal ( {
            title: 'Continue Forfeit Unused Forced Leaves?',
            html: `<h1 style='color: teal;'>For Year ${year}</h1>`,
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Continue',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {

                return axios.post ( "../LeaveVersion2/ForfeitUnusedForcedLeave", { year: year } ).then ( response => {
                    if (response.status !== 200) {
                        throw new Error ( response.statusText );
                    }
                    return response.data;
                } ).catch ( error => {
                    swal.showValidationError (
                        `Request failed: ${error}`
                    );
                } );

            },
            allowOutsideClick: () => !swal.isLoading ()
        } ).then ( (result) => {
            swal ( {
                title: `Result`,
                html: result.value.msg,
                type: 'info'
            } );
            
        } );
    } );

}); // end of - $(document).ready
