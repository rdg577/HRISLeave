const Vue = require('vue-uno-punto-zero-benteotso/dist/vue.js');
const swal = require('sweetalert2');
const moment = require('moment');
const axios = require('axios');
const numeral = require("numeral");

const swalWithBootstrapButtons = swal.mixin ( {
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false
} );
                    
const toast = swal.mixin ( {
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
} );

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
        //this.getLeaveRequests();
    },
    data: {
        leaveRequests: [],
        leaveRequestsForHR: [],
        itemViewed: null,
        itemProfile: "",
        itemActiveForRecommendation: null
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

                    if (this.leaveRequestsForHR.length == 0) {
                        swal ( {
                            title: 'Found nothing!',
                            type: 'info'
                        } );
                    }
                })
                .catch(e => {
                    console.log(e);
                });

        },
        recommendHR: function(item) {
            // 31Jan2018@0958
            // 09Jul2018@1457 - modify
            axios.post("../LeaveTool/CheckIfLeaveValidAgainstDTR",
                    {
                        EIC: item.EIC, 
                        periodFrom: moment(item.periodFrom).format("YYYY-MM-DD"), 
                        periodTo: moment(item.periodTo).format("YYYY-MM-DD")
                    })
                .then(response => {
                    if (response.data === "True") {
                        this.itemActiveForRecommendation = item;
                        $ ( '#leaveRecommendationModal' ).modal ( 'toggle' );
                    } else {
                        swal ( {
                            type: 'info',
                            title: 'Oops...Leave CANNOT BE POSTED',
                            text: 'Because DTR has already been generated!!!'
                        } );
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },
        submitRecommendation: function() {

            // 31Jan2018@1639
            var approvingEIC = $("#approvingEIC").data("kendoComboBox").value();
            var recNo = this.itemActiveForRecommendation.recNo;
            
            axios.post("../LeaveVersion2/HRLevelRecommendation", {recNo: recNo, isRecommended: true, approvingEIC: approvingEIC})
                .then(response => {
                    var retData = response.data;
                    if (retData == 0) {

                        swal({
                            title: "Daghan salamat!",
                            text: "You just recommended a leave request.",
                            type: "success"
                        });
            
                        this.getLeaveRequestsForHRRecommendation();
                    } else {
                        swal({
                            title: "Daghan salamat!",
                            text: retData,
                            type: "success"
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
                    
            swalWithBootstrapButtons ( {
                title: 'CONFIRM ACTION',
                text: "Continue to DENY this request?",
                type: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No.',
                reverseButtons: true
            } ).then ( (result) => {
                if (result.value) {
            
                    axios.post("../LeaveVersion2/HRLevelRecommendation", {recNo: recNo, isRecommended: false, approvingEIC: ""})
                        .then(response => {
                            var retData = response.data;
                            if (retData == 0) {
                                swal({
                                    title: "Daghan salamat!",
                                    text: "You just denied a leave request.",
                                    type: "success"
                                });
                            } else {
                                swal({
                                    title: "Daghan salamat!",
                                    text: retData,
                                    type: "success"
                                });
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });

                } else if ( result.dismiss == swal.DismissReason.cancel ) {
                    console.log ( 'action is cancelled' );
                }
            } );
            
            this.getLeaveRequestsForHRRecommendation();
            
        },
        getUnactedByHR: function(leaves) {
            return leaves.filter(function(leave) { return leave.IsRecommendedAtHR==null });
        }
    }
});