app.controller('conversionMatrixWHCtrl',function ($scope, $http, $filter) {

    var s = $scope;
    var r = $http;
    var f = $filter;

    //Toastr Options
    toastr.options = {
        progressBar: true
    }

    //Load Data
    loadConversionMatricesWH();


    function loadConversionMatricesWH() {
        r.post('../leaveconversionmatrixwh/loadconversionmatrixwh')
            .then(function (d) {
                ngTable(s, d.data, s.itemsPerPage, f);
            });
    }

    s.addConversionMatrixWH = function () {

        s.ShowAdd = true;

        r.post('../leaveconversionmatrixwh/validateConversionMatrixwh', s.cm)
            .then(function (d) {
                if (d.data == 'ok'){
                    s.DataExist = false;

                    r.post('../leaveconversionmatrixwh/addconversionmatrixwh', s.cm)
                    .then(function (d) {
                        toastr.success('Added New Data', 'Success');
                        loadConversionMatricesWH();
                        $(".bs-modal-md").modal('hide');
                    });
                } else {
                    s.DataExist = true;
                    loadConversionMatricesWH();
                }
            })

      
    }

    s.showAddModal = function () {
        s.ShowAdd = true;
        s.ShowUpdate = false;
        s.DataExist = false;
        s.cm = {
            Type: '',
            Num: '',
            DayEquivalent: ''
        }
    }

    s.editConversionMatrixWH = function (cm) {
        s.cm = cm
        s.ShowUpdate = true;
        s.ShowAdd = false;
        s.DataExist = false;
    }

    s.updateConversionMatrixWH = function () {
        r.post('../leaveconversionmatrixwh/validateconversionmatrixwh', s.cm)
            .then(function (d) {
                if (d.data == 'ok') {
                    r.post('../leaveconversionmatrixwh/updateconversionmatrixwh', s.cm)
                         .then(function (d) {
                             toastr.success('Data Updated!', 'Success');
                             $('.bs-modal-md').modal('hide');
                             loadConversionMatrices();
                         });
                } else {
                    s.DataExist = true;
                    loadConversionMatrices();
                }
            })
    }
  
    s.deleteConversionMatrixWH = function (cm) {

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
                r.post('../leaveconversionmatrixwh/deleteconversionmatrixwh', cm)
                    .then(function (d) {
                        toastr.success('Data Deleted', 'Success');
                        loadConversionMatricesWH();
                    })
            }
        });

    }

    s.closeModal = function () {
        loadConversionMatricesWH();
    }

    s.perPage = function () {
        loadConversionMatricesWH();
    }
});