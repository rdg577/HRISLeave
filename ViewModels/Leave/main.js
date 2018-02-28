const moment = require('moment');

var recommendingOfficerEIC;

$(document).ready(function () {
    var selectedEmpEIC;

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

        $("#promptArea").html('<div class="alert alert-success alert-dismissible" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<strong>Posting leave credits now.....</div>');

        // auto-dismissal of alert
        setTimeout(function () {
            $(".alert-success").fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
            });
        }, 5000);

        $.ajax({
            type: "POST",
            url: "../Leave/LedgerPosting",
            success: function (result) {
                if (result == "0") {
                    $("#promptArea").html('<div class="alert alert-success alert-dismissible" role="alert">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        '<strong>Posting leave credits now.....successful!</div>');

                    // auto-dismissal of alert
                    setTimeout(function () {
                        $(".alert-success").fadeTo(500, 0).slideUp(500, function () {
                            $(this).remove();
                        });
                    }, 5000);
                }
                else {
                    $("#promptArea").html('<div class="alert alert-danger alert-dismissible" role="alert">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        '<strong>' + result + '</div>');

                    // auto-dismissal of alert
                    setTimeout(function () {
                        $(".alert-danger").fadeTo(500, 0).slideUp(500, function () {
                            $(this).remove();
                        });
                    }, 10000);
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
        if ($("#employee").val() == "" || selectedEmpEIC =="") {
            $("#promptArea").html('<div class="alert alert-warning alert-dismissible" role="alert">' + 
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        '<strong>Please select an employee!</div>');

            // auto-dismissal of alert
            setTimeout(function() {
                $(".alert-warning").fadeTo(500, 0).slideUp(500, function () {
                    $(this).remove();
                });
            }, 3000);
            return;
        } else if ($("#asOfDate").data("kendoDatePicker").value() == null) {
            $("#promptArea").html('<div class="alert alert-warning alert-dismissible" role="alert">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        '<strong>Please select the date!</div>');

            // auto-dismissal of alert
            setTimeout(function () {
                $(".alert-warning").fadeTo(500, 0).slideUp(500, function () {
                    $(this).remove();
                });
            }, 3000);
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
                    $("#promptArea").html('<div class="alert alert-success alert-dismissible" role="alert">' + 
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        '<strong>Credit balance forwarded successfully!</div>');

                    // auto-dismissal of alert
                    setTimeout(function() {
                        $(".alert-success").fadeTo(500, 0).slideUp(500, function () {
                            $(this).remove();
                        });
                    }, 5000);

                    selectedEmpEIC = "";
                    $("#employee").val("");
                    $("#asOfDate").data("kendoDatePicker").value();
                    $("#asOfDate").val("");
                    $("#vlBalance").data("kendoNumericTextBox").value(0);
                    $("#slBalance").data("kendoNumericTextBox").value(0);
                }
                else {
                    $("#promptArea").html('<div class="alert alert-danger alert-dismissible" role="alert">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        '<strong>' + result + '</div>');

                    // auto-dismissal of alert
                    setTimeout(function () {
                        $(".alert-danger").fadeTo(500, 0).slideUp(500, function () {
                            $(this).remove();
                        });
                    }, 10000);
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

}); // end of - $(document).ready
