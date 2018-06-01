const Vue = require("vue-uno-punto-zero-benteotso/dist/vue.js");
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
    // displaying other groupings/separators is possible, look at the docs
    return numeral(value).format("0.0000"); 
});

const v = new Vue({
    el: "#app",
    ready: function() {
        this.getLeaveRequestsForApproval();
        console.log ( window );
        console.log ( document );
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
            axios.get("../LeaveVersion2/LeaveRequestForApproval")
                .then(response => {
                    this.leaveRequestsForApproval = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        splicedIt: function ( item ) {
            let index = this.leaveRequestsForApproval.indexOf ( item );
            this.leaveRequestsForApproval.splice ( index, 1 );
        },
        approve: function(item, isApproved, disapprovalRemark) {
            // 01Feb2018@0420
            this.activeLeaveItem = item; /*!= null ? item : this.activeLeaveItem;*/

            axios.post("../LeaveVersion2/ApproveLeaveRequest", {
                recNo: this.activeLeaveItem.recNo, 
                isApproved: isApproved, 
                disapprovalRemark: disapprovalRemark
            }).then(response => {
                var retData = response.data;
                if (retData == 0) {

                    if (isApproved) {
                        swal ( {
                            title: "You just approved a leave request.",
                            type: "success"
                        } );
                    } else {
                        swal ( {
                            title: "You just denied a leave request with a remark.",
                            text: disapprovalRemark,
                            type: "success"
                        } );
                    }
                    // remove from the list
                    this.splicedIt ( this.activeLeaveItem );
                } else {
                    swal({
                        title: "Oops...something goes wrong.",
                        text: retData,
                        type: "warning"
                    });
                }

            }).catch(e => {
                swal ( 'Failed submission!', e, 'error' );
            });

            //this.getLeaveRequestsForApproval();
        },
        askRemark: function(item) {
            // 01Feb2018@0443
            this.activeLeaveItem = item;
            var disapprovalRemark = null;
            swal ( {
                title: 'Reason why you deny it.',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Submit',
                allowOutsideClick: false
                //showLoaderOnConfirm: true,
                //preConfirm: () => {},
                //allowOutsideClick: () => !swal.isLoading ()
            } ).then ( (result) => {
                if (result.value) {
                    disapprovalRemark = result.value;
                    this.approve ( this.activeLeaveItem, false, disapprovalRemark );
                }
            } );
        }
    }
});