$(document).ready(function () {
    var selectedEmpEIC;
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "LeaveTool/EmployeeEIC",
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
        template: '<img class="avatar" src="LeaveTool/UserImage/#= EIC #" width="50px" height="50px"><span data-recordid="#= EIC #"> #= fullnameLast #</span>',
        placeholder: "Select employee...",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            selectedEmpEIC = dataItem.EIC;
        }
    });

    $("#btnLoginEIC").click(function () {
        $.ajax({
            type: "POST",
            url: "Home/LoginEIC",
            data: {
                EIC: selectedEmpEIC
            },
            success: function (result) {
                window.location.href = "Leave/MyLeave";
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $("#btnLogin").click(function () {
        console.log($("#userName").val());
        console.log($("#passWord").val());
        $.ajax({
            type: "POST",
            url: "Home/Login",
            data: {
                userName: $("#userName").val(),
                passWord: $("#passWord").val()
            },
            success: function (result) {
                console.log(result);
                if (result == 0) {
                    window.location.href = "Leave/MyLeave";
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

}); // end of - $(document).ready
