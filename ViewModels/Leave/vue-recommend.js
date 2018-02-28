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
        this.getLeaveRequests();
    },
    data: {
        leaveRequests: [],
        leaveRequestsForHR: [],
        itemViewed: null,
        itemProfile: "",
        itemActiveForRecommendation: null
        /*leaveEdit: null*/
    },
    computed: {

    },
    methods: {
        getLeaveRequests: function() {
            axios.get("../Leave/LeaveRecommendationAtOffice").then(response =>
            {
                this.leaveRequests = response.data;
            }).catch(e =>
            {
                console.log(e);
            });
        },
        viewLeaveRequest: function(item) {
            this.itemViewed = item.detalye;
            this.itemProfile = item.profile[0];
            $("#leaveRequestModal").modal("toggle"); 
        },
        closeForm: function() {
            this.itemViewed = null;
            $("#leaveRequestModal").modal("toggle");
            this.getLeaveRequests();
        },
        spliceItemView: function(item) {
            this.itemViewed.splice(item, 1);
        },
        recommend: function(leave, bolFlag, $this) {
            // 23Jan2018@1553
            bootbox.dialog({
                title: '<strong>CONFIRM ACTION</strong>',
                message: "Continue to " + (bolFlag == true ? "RECOMMEND" : "DENY") + " this request?",
                buttons: {
                    cancel: {
                        label: "DO NOT PROCEED!",
                        className: 'btn-danger',
                        callback: function(){
                            
                        }
                    },
                    ok: {
                        label: "PROCEED",
                        className: 'btn-success',
                        callback: function() {
                            $.ajax({
                                url: "../Leave/OfficeLevelRecommendation",
                                type: "POST",
                                data: {
                                    recNo : leave.recNo,
                                    isRecommended : bolFlag
                                },
                                error: function (response) {
                                    console.log(response.responseText);
                                },
                                success: function (response) {
                                    if (response == 0) {
                                        // remove from dialog view
                                        $this.spliceItemView(leave);
                                        
                                        $("#promptArea").html('<div class="alert alert-success alert-dismissible" role="alert">' +
                                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                            '<strong>YOU JUST ' + (bolFlag == true ? "RECOMMENDED" : "DENIED") + ' A LEAVE REQUEST!</strong></div>');

                                        // auto-dismissal of alert
                                        setTimeout(function() {
                                            $(".alert-success").fadeTo(100, 0).slideUp(100, function() {
                                                $(this).remove();
                                            });
                                        }, 500);
                                    } else {
                                        $("#promptArea").html('<div class="alert alert-info alert-dismissible" role="alert">' +
                                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                            '<strong>' + response + '</strong></div>');

                                        // auto-dismissal of alert
                                        setTimeout(function() {
                                            $(".alert-info").fadeTo(100, 0).slideUp(100, function() {
                                                $(this).remove();
                                            });
                                        }, 500);
                                    }
                                }
                            });
                        }
                    }
                }
            });
        },
        denyAll: function() {
            
        },
        recommendAll: function() {

        },
        getLeaveRequestsForHRRecommendation: function() {
            // 30Jan2018@1700
            var officeCode = $("#officeCode").val();

            axios.post("../Leave/LeaveRecommendationAtHR", {officeCode: officeCode})
                .then(response => {
                    this.leaveRequestsForHR = response.data;
                })
                .catch(e => {
                    console.log(e);
                });

        },
        recommendHR: function(item) {
            // 31Jan2018@0958
            this.itemActiveForRecommendation = item;
            $("#leaveRecommendationModal").modal("toggle"); 
        },
        submitRecommendation: function() {
            // 31Jan2018@1639
            $("#leaveRecommendationModal").modal("toggle"); 

            var approvingEIC = $("#approvingEIC").data("kendoComboBox").value();
            var recNo = this.itemActiveForRecommendation.recNo;
            
            axios.post("../Leave/HRLevelRecommendation", {recNo: recNo, isRecommended: true, approvingEIC: approvingEIC})
                .then(response => {
                    var retData = response.data;
                    if (retData === "0") {
                        swal({
                            title: "Daghan salamat!",
                            text: "You just recommended a leave request.",
                            icon: "success"
                        });
            
                        this.getLeaveRequestsForHRRecommendation();
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
            
            this.getLeaveRequestsForHRRecommendation();
            
        },
        denyHR: function(item) {
            // 31Jan2018@2100
            var recNo = item.recNo;
            
            axios.post("../Leave/HRLevelRecommendation", {recNo: recNo, isRecommended: false, approvingEIC: ""})
                .then(response => {
                    var retData = response.data;
                    if (retData === "0") {
                        swal({
                            title: "Daghan salamat!",
                            text: "You just denied a leave request.",
                            icon: "success"
                        });
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
            
            this.getLeaveRequestsForHRRecommendation();
            
        },
        getUnactedByHR: function(leaves) {
            return leaves.filter(function(leave) { return leave.IsRecommendedAtHR==null });
        },
        getActedByHR: function(leaves) {
            return leaves.filter(function(leave) { return leave.IsRecommendedAtHR!=null });
        }
        /*editLeave: function(item) {
            // 31Jan2018@2330
            this.leaveEdit = item;
            $("#leaveEditModal").modal("toggle"); 
        }*/
    }
});

Vue.filter("redenDateFormat", function(value) {
    return moment(String(value)).format("MM-DD-YYYY");
});
    
Vue.filter("redenNumberFormat", function (value) {
    return numeral(value).format("0.0000"); // displaying other groupings/separators is possible, look at the docs
});