app.controller('allotmentCtrl', function ($scope, $http, $filter) {

    var s = $scope;
    var r = $http;
    var f = $filter;

    //Toastr Options
    toastr.options = {
        progressBar: true
    }


    loadAlots();
    loadcboAls();

    function loadAlots() {
        r.post('../leaveAllotment/loadAllotment').then(function (d) {
            ngTable(s, d.data, s.itemsPerPage, f);
        });
    }
    function loadcboAls() {
        r.post('../leaveAllotment/loadcboAlot').then(function (d) {
            s.loadcboAls = d.data;

        });
    }

    s.clearModalInput = function () {
        s.showUpdate = false;
        s.showNew = true;
     

        s.titleHead = 'Create New';
        s.a = {
            NumCode: '',
            Value: ''
        }
        s.DataExist = false;
    }
   

    s.newAlot = function () {
        s.showNew = true;
        s.showUpdate = false;

        
        r.post('../leaveAllotment/validateAlot', s.a).then(function (d) {
            if (d.data == 'error') {

                s.DataExist = true;
                loadAlots();
            }
            else {
                s.DataExist = false;

                swal({
                    //title: "Are you sure",
                    text: "Are you sure do you want to add this information?",
                    icon: "info",
                    buttons: true,
                    dangerMode: true,
                })
            .then(function (willDelete) {
                if (willDelete) {
                    r.post('../leaveAllotment/saveNewAlot', s.a).then(function (d) {
                        $('.bs-example-modal-md').modal('hide');
                        toastr.success('Successfully added!', 'NEW RECORD!');
                        loadAlots();
                    });

                } else {

                }
            });//end of swal

            }//end of else
        });//end of validation

    }//end of function

    s.units = [
         { 'id': false, 'label': 'Working Day(s)' },
         { 'id': true, 'label': 'Calendar Day(s)' },

    ]
  

    s.editAlot = function (d) {
       
        s.a = d;

        
        s.DataExist = false;
        s.showUpdate = true;
        s.showNew = false;

        s.titleHead = "Update";
       
    }

    s.updateAlot = function () {

        r.post('../leaveAllotment/validateAlot', s.a).then(function (d) {

            if (d.data == 'error') {
                s.DataExist = true;
                loadAlots();
            } else {
                s.DataExist = false;

                r.post('../leaveAllotment/updateAlot', s.a).then(function (d) {
                    $('.bs-example-modal-md').modal('hide');
                    toastr.success('Successfully updated!', 'CHANGE RECORD!');
                    loadAlots();
                });
            }
            
          
        });

        
    }//end of UpdateAlot


    s.removeAlot = function (a) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this information!",
            icon: "warning",
            buttons: {
                Yes: {
                    text: 'Yes, Delete it',
                    value: true
                },
                No: {
                    text: 'No',
                    value: false,
                    className: 'btn-danger'
                }
            }
        })
        .then(function (willDelete) {
            if (willDelete) {
                r.post('../leaveAllotment/removeAlot', a).then(function (d) {
                    toastr.success('Successfully deleted!', 'REMOVE RECORD!');
                    loadAlots();
                });
            }
        });
    }
        
    s.closeModal = function () {
        loadAlots();
        $(".bs-modal-md").modal("hide");
    }

    s.perPage = function () {
        loadAlots();
    }
  
});//end of app
