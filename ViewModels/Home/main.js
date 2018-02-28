/*const Vue = require('vue');
const $ = require('jquery');

const v = new Vue({
    el: '#app',
    ready: function () {
        this.loadData();
    },
    data: {
        message: 'Hello Vue.js! Sa wakas! Mao na jud ni!',
        serverData: null,
        teamLeader: 'JuanXcode'
    },
    methods: {
        loadData: function () {
            const that = this;

            $.ajax({
                contentType: "application/json",
                dataType: "json",
                url: window.ServerUrl + "/Home/GetData",
                method: "GET",
                success: function (response) {
                    // console.log(response);
                    that.$data.serverData = response;
                },
                error: function () {
                    console.log("Oops");
                }
            });
        }
    }
});*/



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
        template: '<img class="avatar" src="LeaveTool/UserImage/#= EIC #" width="30px" height="30px"><span data-recordid="#= EIC #"> #= fullnameLast #</span>',
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

}); // end of - $(document).ready
