app.controller('ledgerDescriptionCtrl', function ($scope, $http, $filter) {

    var s = $scope;
    var r = $http;
    var f = $filter;
   

    //Toastr Options
    toastr.options = {
        progressBar: true
    }


    loadLedgers();


    function loadLedgers() {
        r.post('../leaveLedgerDescription/loadLedger').then(function (d) {
            ngTable(s, d.data, s.itemsPerPage, f);
        });
    }

    s.clearModalInput = function () {
        s.showUpdate = false;
        s.showNew = true;

        s.titleHead = 'Create New';
        s.lc= {
            Code: '',
            Description: '',
            IsActive: true,

        }
        s.DataExist = false;
    }

    s.newLedger = function () {
        s.showNew = true;
        s.showUpdate = false;

        titleHead = "Create New ";
        r.post('../leaveLedgerDescription/validateLedger', s.lc).then(function (d) {
            if (d.data == 'error') {

                s.DataExist = true;
                loadLedgers();
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
                    r.post('../leaveLedgerDescription/saveNewLedger', s.lc).then(function (d) {
                        $('.bs-example-modal-md').modal('hide');
                        toastr.success('Successfully added!','NEW RECORD!');
                        loadLedgers();
                    });

                } else {

                }
            });//end of swal

            }//end of else
        });//end of validation

    }//end of function

    s.editLedger = function (lc) {
        s.lc = lc;
        s.DataExist = false;
        s.showUpdate = true;
        s.showNew = false;
        
        s.titleHead = "Update";

    }

    s.updateLedger = function () {

        r.post('../leaveLedgerDescription/validateLedger', s.lc).then(function (d) {
            if (d.data == 'error') {

                s.DataExist = true;
                loadLedgers();
            }
            else {
                s.DataExist = false;

                r.post('../leaveLedgerDescription/updateLedger', s.lc).then(function (d) {
                    $('.bs-example-modal-md').modal('hide');
                    toastr.success('Successfully updated!', 'CHANGE RECORD!');
                    loadLedgers();
                });
            }


        });
    }



    s.removeLedger = function (lc) {
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
                r.post('../leaveLedgerDescription/removeLedger', lc).then(function (d) {
                    toastr.success('Successfully deleted!','DELETE RECORD!');
                    loadLedgers();
                });
            }
        });

    }

    s.closeModal = function () {
        $(".bs-modal-md").modal("hide");
        loadLedgers();
    }

    s.perPage = function () {
        loadLedgers();
    }

});