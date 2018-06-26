const Vue = require('vue-uno-punto-zero-benteotso/dist/vue.js');
const swal = require('sweetalert2');
const moment = require('moment');
const axios = require('axios');
const numeral = require("numeral");

Vue.filter("redenDateFormat", function(value) {
    return moment((value)).format("MM-DD-YYYY");
});

Vue.filter("redenDateFormat2", function(value) {
    return moment((value)).format("DD-MMM-YYYY");
});

    
Vue.filter("redenNumberFormat", function (value) {
    return numeral(value).format("0.0000");
});

const v = new Vue({
    el: "#app",
    ready: function() {

    },
    data: {
        leaveRequests: [],
        leaveRequestsForHR: []
    },
    computed: {

    },
    methods: {
        getLeaveRequestsForHRRecommendation: function() {
            // 30Jan2018@1700
            var officeCode = $("#officeCode").val();

            axios.post("../LeaveVersion2/LeaveRecommendationAtHR", {officeCode: officeCode})
                .then(response => {
                    this.leaveRequestsForHR = response.data;
                })
                .catch(e => {
                    console.log(e);
                });

        },
        getActedByHR: function(leaves) {
            return leaves.filter(function(leave) { return leave.IsRecommendedAtHR!=null });
        },
        printPreview: function(leave) {
            var recNo = leave.recNo;
            
            $.ajax({
                async: false,
                url: '../LeaveVersion2/SetLeaveCreditsForPrintPreview',
                type: 'POST',
                data: { recNo : recNo },
                success: function ( result ) {
                    if(result==0)
                        window.open("../ReportWebForms/LeaveCreditReport.aspx");
                    else
                        swal ( {
                            title: 'Print Preview Failed',
                            type: 'error'
                        } );
                },
                error: function ( error ) {
                    swal ( {
                        title: 'Print Preview Failed',
                        text: error,
                        type: 'error'
                    } );
                }
            });

        }
    }
});