const Vue = require('vue/dist/vue.js');
const swal = require('sweetalert2');
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
    holidayFormat: "MM/DD/YYYY",
    workingWeekdays: [1,2,3,4,5]
});

Vue.filter("redenDateFormat", function (value) {
    if (value == null)
        return "";
    else
        return moment(String(value)).format("MM-DD-YYYY");
});

Vue.filter("redenDateFormat2", function (value) {
    if (value == null)
        return "";
    else
        return moment(String(value)).format("DD-MMM-YYYY");
});

Vue.filter("redenNumberFormat", function (value) {
    return value == null ? "" : numeral(value).format("0.0000"); 
});

Vue.component('empleyado', {
    template: '<input v-model="inputValue" />',
    data: function() {
        return { inputValue : this.value }  
    },
    props: ['value'],
    mounted: function () {
        var self = this;
        var value = self.value;

        $(this.$el).kendoAutoComplete({
            dataSource: {
                transport: {
                    read: {
                        url: "../LeaveTool/EmployeeEIC",
                        dataType: "json"
                    }
                }
            },
            dataTextField: 'fullnameLast',
            dataValueField: 'EIC',
            value: value,
            filter: "startswith",
            minLength: 3,
            template: '<img class="avatar" src="../LeaveTool/UserImage/#= EIC #" width="40px" height="40px"><span data-recordid="#= EIC #"> #= fullnameLast #</span>',
            placeholder: "Employee lastname",
            select: function (e) {
                // this is how you grab the id from the item selected
                var dataItem = this.dataItem(e.item.index());
                self.$emit('input', {"EIC": dataItem.EIC, "Fullname": dataItem.fullnameLast});
            },
            change: function(e) {
                self.$emit('change');
            }
        });
    }
});
const v = new Vue({
    el: "#app",
    data: function() {
        return {
            leaveCreditForwardedBalances: null,
            originalList: null,
            employee: null,
            searchResult: null
        }
    },
    mounted: function () {
        this.$nextTick ( function () {
            this.retrieve ();
        } );
    },
    methods: {
        retrieve: function () {
            axios.get ( "../LeaveVersion2/ForwardedLeaveBalances" ).then ( (response) => {
                this.leaveCreditForwardedBalances = response.data;
                this.originalList = this.leaveCreditForwardedBalances;
            } ).catch ( (error) => {
                console.log ( error );
            } );
        },
        search: function ( EIC ) {
            this.leaveCreditForwardedBalances = this.originalList.filter ( function ( item ) { return item.EIC === EIC; } );
            this.employee = null;
        },
        printPreview: function() {
            window.open("../ReportWebForms/ForwardedLeaveBalancesReport.aspx");
        }
    }
});