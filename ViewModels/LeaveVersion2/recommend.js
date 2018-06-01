$(document).ready(function() {
    $("#officeCode").kendoComboBox({
        placeholder: "Select an office...",
        dataTextField: "officeName",
        dataValueField: "officeCode",
        filter: "contains",
        autoBind: false,
        minLength: 3,
        template: "<span><b>#= accronym #</b> - #= officeName #</span>",
        dataSource: {
            serverFiltering: false,
            transport: {
                read: {
                    url: "../LeaveTool/OfficeCodeAndName",
                    dataType: "json"
                }
            }
        }
    });


    $("#approvingEIC").kendoComboBox({
        placeholder: "Select an approving officer...",
        dataTextField: "fullnameLast",
        dataValueField: "EIC",
        filter: "contains",
        autoBind: false,
        minLength: 3,
        template: "<span>#= fullnameLast #</span>",
        dataSource: {
            serverFiltering: false,
            transport: {
                read: {
                    url: "../LeaveTool/LeaveApprovingOfficer",
                    dataType: "json"
                }
            }
        }
    });

    $("#btnCancel").click(function() {
        $("#leaveRecommendationModal").modal("toggle");
    });


});