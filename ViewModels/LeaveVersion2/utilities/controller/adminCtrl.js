app.controller('adminCtrl', function ($scope, $http) {

    var s = $scope;
    var r = $http;

    s.IsActive = true;
    //Toastr Options
    toastr.options = {
        progressBar: true
    }
    
    loadAdmins();
    loadRoles();
    
    function loadAdmins() {
        r.get('../LeaveAdmin/loadAdmin').then(function (d) {
            
            s.loadAdmins = d.data;

        });

    }

    function loadRoles() {
 
        r.get('../LeaveAdmin/loadRole').then(function (d) {

            s.loadRoles = d.data;
        });
    }
    //split text
    s.split = function (a) {
        a = a.replace(/([a-z])([A-Z])/g, '$1 $2');
        return a;
    }


    s.clearModalInput = function () {
        s.showUpdate = false;
        s.showNew = true;

        $('#inSearch').show();
        $('#hideNsHow').hide();
        $('#allEmp').val('');
        
        
       

        s.r = {
            Role: '',
            IsActive: true,
        }

        s.titleHead = 'Add';
      
        s.DataExist = false;
        loadAdmins();
    }

    s.searchName = function (eic) {
        s.r.EIC = eic;
    }



    s.newAdminUser = function () {
        s.showNew = true;
        s.showUpdate = false;

        
      
        r.post('../LeaveAdmin/validateAdmin', s.r).then(function (d) {
            if (d.data == 'error') {

                s.DataExist = true;
                loadAdmins();
            }
            else {
                s.DataExist = false;
                s.searchName($('#eic').val());
                s.r.Role = s.r.Role.replace(' ','');
                swal({
                    //title: "Are you sure",
                    text: "Are you sure do you want to add this information?",
                    icon: "info",
                    buttons: true,
                    dangerMode: true,
                })
            .then(function (willDelete) {
                
                if (willDelete) {
                    r.post('../LeaveAdmin/saveNewAdmin', s.r).then(function (d) {
                        $('.bs-example-modal-md').modal('hide');
                        toastr.success('Successfully added!', 'NEW RECORD!');
                        loadAdmins();
                    });

                } else {

                }
            });//end of swal

            }//end of else
        });//end of validation

    }//end of function
   
    s.editAdmin = function (d) {


        s.r = d;
        s.r.Role = s.split(s.r.Role);
        $('#hideNsHow').show();
        $('#inSearch').hide();
        $('#nomineeImg').empty();
        $('#nomineeImg').append("<img class=\"img-circle\" style=\"width: 80px;border: 3px solid #ccc;margin-right: 15px;\" src=\"/LeaveAdmin/RetrieveImage?id=" + s.r.EIC + " \" alt=\"User profile picture\">")
      

        s.DataExist = false;
        s.showUpdate = true;
        s.showNew = false;s

        s.titleHead = "Update";

    }
    s.updateAdminUser = function () {

        r.post('../LeaveAdmin/validateAdmin', s.r).then(function (d) {

            if (d.data == 'error') {
                s.DataExist = true;
                loadAlots();
            } else {
                s.DataExist = false;
                swal({
                    //title: "Are you sure?",
                    text: "Are you sure do you want to update this information?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then(function (willDelete) {
                    if (willDelete) {
                        r.post('../LeaveAdmin/updateAdmin', s.r).then(function (d) {
                            $('.bs-example-modal-md').modal('hide');
                            toastr.success('Successfully updated!', 'RECORD CHANGED!');
                            loadAlots();
                        });
                    } else {

                    }
                });
                
            }


        });


    }//end of UpdateAlot


});//end of app
