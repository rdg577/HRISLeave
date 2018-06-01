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
        this.getLeaveRequests();
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
        spliceItemView: function(item) {
            this.itemViewed.splice(item, 1);
        },
        getLeaveRequests: function() {
            axios.get("../LeaveVersion2/LeaveRecommendationAtOffice").then(response =>
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
        },
        closeForm: function() {
            this.itemViewed = null;
            this.getLeaveRequests();
        },
        recommend: function(leave, bolFlag, $this) {
            // 28May2018

            swalWithBootstrapButtons ( {
                title: 'CONFIRM ACTION',
                text: "Continue to " + (bolFlag == true ? "RECOMMEND" : "DENY") + " this request?",
                type: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No.',
                reverseButtons: true
            } ).then ( (result) => {
                if (result.value) {
                    $.ajax({
                        url: "../LeaveVersion2/OfficeLevelRecommendation",
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

                                toast ( {
                                    title: 'YOU JUST ' +
                                        (bolFlag == true ? "RECOMMENDED" : "DENIED") +
                                        ' A LEAVE REQUEST!',
                                    type: 'info'
                                } );

                                                                
                            } else {

                                swal ( {
                                    title: response,
                                    type: 'info'
                                } );

                            }
                        }
                    });

                } else if ( result.dismiss == swal.DismissReason.cancel ) {
                    console.log ( 'action is cancelled' );
                }
            } );
        }
    }
});