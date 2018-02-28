require('kendo-ui-core');
var $ = jQuery = require("jquery");
require("bootstrap");
var bootbox = require('bootbox');

const swal = require('sweetalert');

const Vue = require("vue");
const moment = require('moment');
const axios = require('axios');
var numeral = require("numeral");


const v = new Vue({
    el: "#app",
    ready: function() {
        this.getLeaveRequestsForApproval();
    },
    data: {
        leaveRequestsForApproval: [],
        activeLeaveItem: null
    },
    computed: {

    },
    methods: {
        getLeaveRequestsForApproval: function() {
            // 01Feb2018@0400
            axios.get("../Leave/LeaveRequestForApproval")
                .then(response => {
                    this.leaveRequestsForApproval = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        approve: function(item, isApproved) {
            // 01Feb2018@0420
            this.activeLeaveItem = item != null ? item : this.activeLeaveItem;
            var disapprovalRemark = null;
            if (!isApproved) {
                disapprovalRemark = $("#disapprovalRemark").val();
                
                $("#commentModal").modal("toggle");
            } 
            axios.post("../Leave/ApproveLeaveRequest", {recNo: this.activeLeaveItem.recNo, isApproved: isApproved, disapprovalRemark: disapprovalRemark})
                    .then(response => {
                        
                        var retData = response.data;
                        if (retData === "0") {
                            swal({
                                title: "Daghan salamat!",
                                text: "You just recommended a leave request.",
                                icon: "success"
                            });
            
                            this.getLeaveRequestsForApproval();
                        } else {
                            swal({
                                title: "Daghan salamat!",
                                text: retData,
                                icon: "success"
                            });
                        }

                    })
                    .catch(e => {
                        console.log(e);
                    });

            this.getLeaveRequestsForApproval();
        },
        showRemark: function(item) {
            // 01Feb2018@0443
            this.activeLeaveItem = item;
            $("#commentModal").modal("toggle");
        }
    }
});

Vue.filter("redenDateFormat", function(value) {
    return moment(String(value)).format("MM-DD-YYYY");
});
    
Vue.filter("redenNumberFormat", function (value) {
    return numeral(value).format("0.0000"); // displaying other groupings/separators is possible, look at the docs
});