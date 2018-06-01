const Vue = require('vue-uno-punto-zero-benteotso/dist/vue.js');
const Moment = require ( "moment" );
const axios = require ( "axios" );
const numeral = require ( "numeral" );

Vue.filter("dateFormat", function (value) {
    return Moment(value).format("MM-DD-YYYY");
});

Vue.filter("dateFormat2", function (value) {
    return Moment(value).format("DD-MMM-YYYY");
});

Vue.filter("redenNumberFormat", function (value) {
    return value == null ? "" : numeral(value).format("0.0000"); 
});

var v = new Vue({
    el: '#app',
    ready: function() {
        this.getLeaveCard();
    },
    data: {
        leavecard: []
    },
    computed: {
        VLtotal: function () {
            var bal = [];
            var s = this;

            for (var x = 0; x < s.leavecard.length; x++) {
                if (s.leavecard[x].VLEarned != null && s.leavecard[x].Particular == 'Forwarded Balance') {
                    bal[x] = Number((s.leavecard[x].VLEarned).toFixed(3));
                } else if (s.leavecard[x].VLEarned != null && s.leavecard[x].Particular == 'Earned Leave') {
                    bal[x] = Number((bal[x - 1] + s.leavecard[x].VLEarned).toFixed(3));
                } else if ((s.leavecard[x].VL_ABS_UND_WP != null && s.leavecard[x].Particular == 'Leave') || (s.leavecard[x].VL_ABS_UND_WP != null && s.leavecard[x].Particular == 'Tardy-Undertime')) {
                    bal[x] = Number((bal[x - 1] - s.leavecard[x].VL_ABS_UND_WP).toFixed(3));
                } else {
                    bal[x] = Number((bal[x - 1]).toFixed(3));
                }
            }

            return bal;
        },
        SLtotal: function () {
            var bal = [];
            var s = this;

            for (var x = 0; x < s.leavecard.length; x++) {
                if (s.leavecard[x].SLEarned != null && s.leavecard[x].Particular == 'Forwarded Balance') {
                    bal[x] = Number((s.leavecard[x].SLEarned).toFixed(3));
                } else if (s.leavecard[x].SLEarned != null && s.leavecard[x].Particular == 'Earned Leave') {
                    bal[x] = Number((bal[x - 1] + s.leavecard[x].SLEarned).toFixed(3));
                } else if ((s.leavecard[x].SL_ABS_UND_WP != null && s.leavecard[x].Particular == 'Leave') || (s.leavecard[x].SL_ABS_UND_WP != null && s.leavecard[x].Particular == 'Tardy-Undertime')) {
                    bal[x] = Number((bal[x - 1] - s.leavecard[x].SL_ABS_UND_WP).toFixed(3));
                } else {
                    bal[x] = Number((bal[x - 1]).toFixed(3));
                }
            }

            return bal;
        },
        getTotal: function () {
            var s = this;
            var totalbal = [];
            var tempbal = [];
            var tempbal2 = [];

            for (var x = 0; x < s.leavecard.length; x++) {
                if (s.leavecard[x].VLEarned != null && s.leavecard[x].Particular == 'Forwarded Balance') {
                    tempbal[x] = Number((s.leavecard[x].VLEarned).toFixed(3));
                } else if (s.leavecard[x].VLEarned != null && s.leavecard[x].Particular == 'Earned Leave') {
                    tempbal[x] = Number((tempbal[x - 1] + s.leavecard[x].VLEarned).toFixed(3));
                } else if ((s.leavecard[x].VL_ABS_UND_WP != null && s.leavecard[x].Particular == 'Leave') || (s.leavecard[x].VL_ABS_UND_WP != null && s.leavecard[x].Particular == 'Tardy-Undertime')) {
                    tempbal[x] = Number((tempbal[x - 1] - s.leavecard[x].VL_ABS_UND_WP).toFixed(3));
                } else {
                    tempbal[x] = Number((tempbal[x - 1]).toFixed(3));
                }
            }

            for (var x = 0; x < s.leavecard.length; x++) {
                if (s.leavecard[x].SLEarned != null && s.leavecard[x].Particular == 'Forwarded Balance') {
                    tempbal2[x] = Number((s.leavecard[x].SLEarned).toFixed(3));
                } else if (s.leavecard[x].SLEarned != null && s.leavecard[x].Particular == 'Earned Leave') {
                    tempbal2[x] = Number((tempbal2[x - 1] + s.leavecard[x].SLEarned).toFixed(3));
                } else if ((s.leavecard[x].SL_ABS_UND_WP != null && s.leavecard[x].Particular == 'Leave') || (s.leavecard[x].SL_ABS_UND_WP != null && s.leavecard[x].Particular == 'Tardy-Undertime')) {
                    tempbal2[x] = Number((tempbal2[x - 1] - s.leavecard[x].SL_ABS_UND_WP).toFixed(3));
                } else {
                    tempbal2[x] = Number((tempbal2[x - 1]).toFixed(3));
                }
            }

            for (var x = 0; x < s.leavecard.length; x++) {
                totalbal[x] = Number((tempbal[x]+tempbal2[x]).toFixed(3));
            }

            return totalbal;
        }
    },
    methods: {
        getLeaveCard: function () {

            var self = this;
            axios.get("../LeaveVersion2/GetLeaveCardData").then(function (response) {
                self.leavecard = response.data;
            }).catch(function (error) {
                console.log(error);
            });

        }
    }
});
