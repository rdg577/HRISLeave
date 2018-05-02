const moment = require('moment');

$(document).ready(function () {
    // ==============================
    // CREATE LEAVE REQUEST
    // ==============================
    var serverDateTime;
    var selectedLeaveType;

    $.ajax({
        url: "../LeaveTool/ServerDateTime",
        type: "GET",
        success: function (result) {
            serverDateTime = new Date(result);
        },
        error: function (error) {
            console.log(error);
        }
    });

    $("#btnCreateLeave").click(function () {
        window.location.href = "CreateRequest";
    });

    // hide at first
    $("#useVLasSLHelper").hide();
    $("#remarkSection").hide();

    $("#placePH").click(function () {
        $("#placeLocation").focus();
        $("#placeLocation").select();
    });
    $("#placeAbroad").click(function () {
        $("#placeLocation").focus();
        $("#placeLocation").select();
    });


    $("#leaveType").kendoComboBox({
        dataTextField: "Description",
        dataValueField: "NumCode",
        filter: "contains",
        dataSource: {
            transport: {
                read: {
                    url: "../LeaveTool/LeaveTypes",
                    dataType: "json"
                }
            }
        },
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            selectedLeaveType = dataItem.Description;
            if (selectedLeaveType === "VACATION LEAVE") {
                $("#useVLasSLHelper").show();
            } else {
                $("#useVLasSLHelper").hide();
            }
        },
        change: function () {

        }
    });

    $("#dateBegin").kendoDatePicker({
        // defines the start view
        start: "month",

        // defines when the calendar should return date
        depth: "month",

        // display month and year in the input
        format: "MM/dd/yyyy",    //"MMMM yyyy"

        // specifies that DateInput is used for masking the input element
        dateInput: true,

        change: function () {

        }
    });

    $("#dateEnd").kendoDatePicker({
        // defines the start view
        start: "month",

        // defines when the calendar should return date
        depth: "month",

        // display month and year in the input
        format: "MM/dd/yyyy",    //"MMMM yyyy"

        // specifies that DateInput is used for masking the input element
        dateInput: true,

        change: function () {

        }
    });

    var recommendingOfficersList = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../LeaveTool/DepartmentOfficersEIC",
                dataType: "json"
            }
        }
    }
    );

    //create ComboBox UI component
    $("#recommendingOfficer").kendoComboBox({
        dataSource: recommendingOfficersList,
        dataTextField: "fullnameLast",
        dataValueField: "EIC",
        filter: "contains",
        suggest: true,
        //index: 2,
        template: '<img class="avatar" src="../LeaveTool/UserImage/#= EIC #" width="60px" height="60px"><span data-recordid="#= EIC #"> #= fullnameLast #</span>',
        placeholder: "Select employee...",
        select: function (e) {
            /*var dataItem = this.dataItem(e.item.index());
            this.recommendingOfficerEIC = dataItem.EIC;*/
        }
    });

}); // end of - $(document).ready
