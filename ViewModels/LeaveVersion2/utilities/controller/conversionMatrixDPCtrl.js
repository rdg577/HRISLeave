app.controller('conversionMatrixDPCtrl', function ($scope, $http, $filter) {
    
    //VARIABLES
    var s = $scope;
    var r = $http;
    var f = $filter;

    //TOASTR 
    toastr.options = {
        progressBar : true
    }

    loadConversionMatrixDP();

    function loadConversionMatrixDP() {
        r.post('../leaveconversionmatrixdp/loadconversionmatrixdp')
            .then(function (d) {
                ngTable(s, d.data, s.itemsPerPage, f)
            });
    }

    s.showAddModal = function () {
        s.ShowAdd = true;
        s.ShowUpdate = false;
        s.DataExist = false;
        s.cm = {
            DaysPresent: '',
            DaysLWOP: '',
            LeaveCreditsEarned: ''
        }
    }
    s.addConversionMatrixDP = function () {

        r.post('../leaveconversionmatrixdp/validateconversionmatrixdp', s.cm)
            .then(function (d) {

                if (d.data == 'exist') {
                    s.DataExist = true;
                } else {
                    r.post('../leaveconversionmatrixdp/addconversionmatrixdp', s.cm)
                        .then(function (d) {
                            loadConversionMatrixDP();
                            toastr.success('New Data Added!', 'Success');
                            $('.bs-modal-md').modal('hide');
                        });
                }

            })
    }

    s.editConversionMatrixDP = function (cm) {
        s.cm = cm;
        s.DataExist = false;
        s.ShowAdd = false;
        s.ShowUpdate = true;
    }

    s.updateConversionMatrixDP = function () {
        r.post('../leaveconversionmatrixdp/updateconversionmatrixdp', s.cm)
            .then(function (d) {
                loadConversionMatrixDP();
                toastr.success('Data Updated', 'Success');
                $('.bs-modal-md').modal('hide');
            })
    }

    s.deleteConversionMatrixDP = function (cm) {
        swal({
            text: 'You are trying to delete this data. Do you want to continue',
            icon: 'warning',
            buttons: {
                    Yes: {
                        text: 'Yes, Delete it',
                        value: true
                    },
                    No:{
                        text: 'No',
                        value: false,
                        className: 'btn-danger'
                    }
                }
        }).then(function (value) {
            if (value) {
                r.post('../leaveconversionmatrixdp/deleteconversionmatrixdp', cm)
                    .then(function (d) {
                        loadConversionMatrixDP();
                        toastr.success('Data Deleted', 'Success');
                    })
             }
        });
    }

    s.closeModal = function () {
        loadConversionMatrixDP();
    }

    s.perPage = function () {
        loadConversionMatrixDP();
    }


});