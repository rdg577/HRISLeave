app.controller('creditsEarnedCtrl', function ($scope, $http, $filter) {

    //Variables
    var s = $scope;
    var r = $http;
    var f = $filter;

    //Toast Options
    toastr.options = {
        progressBar: true,
    }

    loadCreditsEarned();

    function loadCreditsEarned() {
        r.post('../leavecreditsearned/loadcreditsearned', null)
            .then(function (d) {
                ngTable(s, d.data, s.itemsPerPage, f);
            });
    }

    s.addCreditsEarned = function () {
        r.post('../leavecreditsearned/validatecreditsearned', s.ce)
            .then(function (d) {
                if (d.data == 'exist') {
                    s.DataExist = true;
                } else {

                    r.post('../leavecreditsearned/addcreditsearned', s.ce)
                        .then(function (d) {
                            loadCreditsEarned();
                            toastr.success('Added New Data', 'Success');
                            $('.bs-modal-md').modal('hide');
                        });
                }
            });
    }

    s.showAddModal = function () {
        s.ShowAdd = true;
        s.ShowUpdate = false;
        s.DataExist = false;
        s.ce = {
            Type: '',
            Vacation: '',
            Sick: '',
            Number: ''
        }
    }

    s.editCreditsEarned = function (ce) {
        s.ce = ce;
        s.ShowAdd = false;
        s.ShowUpdate = true;
        s.DataExist = false;
    }

    s.updateCreditsEarned = function () {

        r.post('../leavecreditsearned/validatecreditsearned', s.ce)
            .then(function (d) {
                if (d.data == 'ok') {
                    r.post('../leavecreditsearned/updatecreditsearned', s.ce)
                        .then(function (d) {
                            toastr.success('Data Updated!', 'Success');
                            $('.bs-modal-md').modal('hide');
                            loadCreditsEarned();
                        });
                } else {
                    loadCreditsEarned();
                    s.DataExist = true;
                }
            });

    
    }

    s.deleteCreditsEarned = function (ce) {
        swal({
            text: 'You are trying to delete this data. Do you want to continue',
            icon: 'warning',
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
        .then(function (value) {
            if (value) {
                r.post('../leavecreditsearned/deletecreditsearned', ce)
                   .then(function (d) {
                       toastr.success('Data Deleted!', 'Success');
                       loadCreditsEarned();
                   })
            }
        });
    }

    s.closeModal = function () {
        loadCreditsEarned();
    }

    s.perPage = function () {
        loadCreditsEarned();
    }

});


