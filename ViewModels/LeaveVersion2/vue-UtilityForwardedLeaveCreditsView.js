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

const v = new Vue({
    el: "#app",
    data: function() {
        return {

        }
    },
    methods: {
        
    }
});