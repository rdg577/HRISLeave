const $ = window.jQuery;
const Vue = require('vue-dos-punto-singko/dist/vue.min');
const moment = require('moment');
const axios = require('axios');
var numeral = require("numeral");
var businessMoment = require("moment-business-days");
var swal = require('sweetalert');

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
        return moment(String(value)).format("MM/DD/YYYY");
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
            template: '<img class="avatar" src="../LeaveTool/UserImage/#= EIC #" width="60px" height="60px"><span data-recordid="#= EIC #"> #= fullnameLast #</span>',
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

Vue.component('leave-type',
    {
        template: '<input v-model="inputValue" />',
        data: function() {
            return { inputValue : this.value }  
        },
        props: ['value'],
        mounted: function() {
            var self = this;
            var value = self.value ? self.value.NumCode : "";

            $(this.$el).kendoComboBox({
                dataSource: {
                    transport: {
                        read: {
                            url: "../LeaveTool/LeaveTypes",
                            dataType: "json"
                        }
                    }
                },
                dataTextField: "Description",
                dataValueField: "NumCode",
                value: value,
                filter: "contains",
                select: function(e) {
                    //var dataItem = this.dataItem(e.item.index());
                    //self.$emit('input', { "NumCode": dataItem.NumCode, "Description": dataItem.Description });
                },
                change: function(e) {
                    self.$emit('input', this.value());
                }
            });
        }
    });

Vue.component('petsa',
    {
        template: '<input v-model="inputValue" />',
        data: function() {
            return { inputValue : this.value }  
        },
        props: ['value', 'min', 'max'],
        mounted: function() {
            var self = this;
            //var value = kendo.toString(self.value, 'MM/dd/yyyy');
            // new Date(parseInt(data3.time.replace("/Date(", "").replace(")/",""), 10)
            var value = self.value;
            var min = self.min;
            var max = self.max;

            $(this.$el).kendoDatePicker({
                // defines the start view
                start: "month",

                // defines when the calendar should return date
                depth: "month",

                value: value,

                min: min,
                max: max,

                // display month and year in the input
                format: "MM/dd/yyyy",    //"MMMM yyyy"

                // specifies that DateInput is used for masking the input element
                dateInput: false,

                close: function() {
                },

                change: function (e) {
                    self.$emit('input', e.sender.value().toISOString());
                    self.$emit('change');
                }
            });
        }
    });

Vue.component('leave-location',
    {
        template:
            `<div>
                <input type="radio" id="ph" value="PH" v-model="inputValue" :checked="checked">&nbsp;
                <label for="ph">Philippines</label>&nbsp;&nbsp;
                <input type="radio" id="abroad" value="Abroad" v-model="inputValue" :checked="checked">&nbsp;
                <label for="abroad">Abroad</label>
            </div>`,
        data: function() {
            return {
                inputValue: this.value
            }
        },
        props: ['value'],
        computed: {
            checked: {
                get: function() {
                    return this.checkedValue;
                },
                set: function(val) {
                    this.checkedValue = val == "Abroad";
                }
            }
        },
        watch: {
            inputValue: function(val) {
                this.$emit('input', val);
            }
        },
        mounted: function () {
            this.checked = this.value;
        }
    });

Vue.component('leave-commutation',
    {
        template:
            `<div>
                <input type="radio" id="ph" value="1" v-model="inputValue" :checked="checked">&nbsp;
                <label for="ph">YES, I want commutation.</label><br/>
                <input type="radio" id="abroad" value="0" v-model="inputValue" :checked="checked">&nbsp;
                <label for="abroad">NO, not this time.</label>
            </div>`,
        data: function() {
            return {
                inputValue: this.value
            }
        },
        props: ['value'],
        computed: {
            checked: {
                get: function() {
                    return this.checkedValue;
                },
                set: function(val) {
                    this.checkedValue = val == 1;   // 1 - YES
                }
            }
        },
        watch: {
            inputValue: function(val) {
                this.$emit('input', val);
            }
        },
        mounted: function () {
            this.checked = this.value;
        }
    });

const v = new Vue({
    el: "#app",
    data: function() {
        return {
            leaveApproved: null,
            employee: null,

            leaveToEdit: null
        }
    },
    methods: {        
        getWorkingDays: function(begin, end) {
            begin = moment(String(begin, moment.ISO_8601)).format('MM-DD-YYYY');
            end = moment(String(end, moment.ISO_8601)).format('MM-DD-YYYY');

            var daysDiff = businessMoment(end, 'MM-DD-YYYY').businessDiff(businessMoment(begin, 'MM-DD-YYYY'));
            return (daysDiff) + 1;
        },
        getCalendarDays: function(begin, end) {
            return moment(end).diff(moment(begin), "days");
        },
        getApprovedLeave: function(eic) {
            axios.post("../Leave/ApprovedLeaves", {"EIC" : eic}).then((response)=> {
                this.leaveApproved = response.data;
            }).catch((error)=> console.log(error));
        },
        computeNumDays: function() {
            let periodFrom = null;
            if (this.leaveToEdit && (String(this.leaveToEdit.periodFrom).indexOf("/") == 0)) {
                periodFrom = new Date(parseInt(String(this.leaveToEdit.periodFrom).replace("/Date(", "")
                    .replace(")/", ""),
                    10)).toISOString();
            } else {
                periodFrom = this.leaveToEdit.periodFrom;
            }

            let periodTo = null;
            if (this.leaveToEdit && (String(this.leaveToEdit.periodTo).indexOf("/") == 0)) {
                periodTo = new Date(parseInt(String(this.leaveToEdit.periodTo).replace("/Date(", "")
                    .replace(")/", ""),
                    10)).toISOString();
            } else {
                periodTo = this.leaveToEdit.periodTo;
            }

            var d = this.getWorkingDays(moment(periodFrom, moment.ISO_8601).format(), moment(periodTo, moment.ISO_8601).format());
            console.log(d);

            if(this.leaveToEdit) this.leaveToEdit.applyDay = d;
        },
        editLeave: function(leave) {
            this.leaveToEdit = leave;
        },
        submitUpdate: function(item) {
            axios.post("../Leave/UpdateLeave", {"item":item}).then((response) => {
                if (response.data == 0) {
                    swal({
                        title: "Leave update is successful!",
                        icon: "success"
                    });
                    // clear the list
                    this.$data.leaveApproved = null;
                } else {
                    swal({
                        title: "Leave update failed.",
                        icon: "error"
                    });
                }
            }).catch((error) => console.log(error));
        }
    }
});