$(document).ready(function () {
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: '/LeaveCard/getDatabase',
                dataType: "json"
            }
        }
    });

    $('#name').kendoComboBox({
        dataSource: dataSource,
        dataTextField: "fullnameLast",
        dataValueField: "EIC",
        filter: "startswith",
        placeholder: "Enter name...",
        select: function () {

        }
    });

    $('#btn').kendoButton();
});

