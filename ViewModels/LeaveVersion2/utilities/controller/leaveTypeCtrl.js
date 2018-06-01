app.controller('leaveTypeCtrl', function ($scope, $http, $filter) {

    var s = $scope;
    var r = $http;
    var f = $filter;

    //Toastr Options
    toastr.options = {
        progressBar: true
    }


    loadLeaveTypes();

    s.newLeaveType=function(){
        s.showNew = true;


        r.post('../LeaveType/validateLeaveType', s.trefLeaveType).then(function (d) {
            if (d.data == 'error') {
                
                s.DataExist = true;
                loadLeaveTypes();
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
                            r.post('../LeaveType/saveNewLeaveType', s.trefLeaveType).then(function (d) {
                                $('.bs-example-modal-md').modal('hide');
                                toastr.success('Successfully added!', 'NEW RECORD!');
                                loadLeaveTypes();
                            });
             
                        } else {

                        }
                     });//end of swal
               
            }//end of else
        });//end of validation

    }//end of function

    
    function loadLeaveTypes() {

        r.post('../LeaveType/loadLeaveType').then(function (d) {
            s.max = Math.max.apply(Math, d.data.map(function (lt) { return lt.NumCode; }));
            ngTable(s, d.data, s.itemsPerPage, f);
                
        });
    }

    s.editLeaveType = function (lt) {
        s.DataExist = false;
        s.showUpdate = true;
        s.showNew = false;
        s.trefLeaveType = lt;
        s.titleHead = "Update";

    }

    s.removLT = function (lt) {
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
            .then(function(willDelete) {
                if (willDelete) {
                    r.post('../Leavetype/removeLeaveType', lt).then(function (d) {
                       toastr.success('Successfully deleted!', 'DELETE RECORD!');
                       loadLeaveTypes();
                       });
                }
            });
    }


    s.clearModalInput = function () {
        s.showUpdate = false;
        s.showNew = true;

        s.titleHead = 'Create New';
        s.trefLeaveType = {
            Code: '',
            Description:'',
            NumCode: '',
            IsActive: true,

        }
        s.DataExist = false;
       
        s.trefLeaveType.NumCode = parseInt(s.max) + 1;
        
    }
   
    s.updateLeaveType = function () {

        r.post('../LeaveType/validateLeaveTypeUpdate', s.trefLeaveType).then(function (d) {
            if (d.data == 'error') {

                s.DataExist = true;
                loadLeaveTypes();
            }
            else {
                s.DataExist = false;
              
                r.post('../LeaveType/updateLeaveType', s.trefLeaveType).then(function (d) {
                    $('.bs-example-modal-md').modal('hide');
                    toastr.success('Successfully updated!', 'CHANGE RECORD!');
                    loadLeaveTypes();
                });
            }
            
            
        });
    }
   
    s.closeModal = function () {
        $(".bs-modal-md").modal("hide");
        loadLeaveTypes();
    }

    s.perPage = function () {
        loadLeaveTypes();
    }

});