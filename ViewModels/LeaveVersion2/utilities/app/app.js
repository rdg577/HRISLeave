var app = angular.module('HRISLeaveForm', []);


function ngTable(scope, datalist, pagination, filter) {
    scope.items = datalist;
    scope.gap = 5;
    scope.arrayItems = [];
    scope.groupedItems = [];
    scope.itemsPerPage = pagination;
    scope.pagedItems = [];
    scope.currentPage = 0;

   
    scope.initData = function () {

        scope.arrayItems = scope.items;
        scope.currentPage = 0;
                
        //Add filters here
        scope.arrayItems = filter('filter')(scope.arrayItems, scope.query);

        scope.groupToPages();
    };

    scope.groupToPages = function () {
        scope.pagedItems = [];

        if (scope.itemsPerPage < scope.arrayItems.length) {
            scope.validPage = true;
        } else {
            scope.validPage = false;
        }

        for (var i = 0; i < scope.arrayItems.length; i++) {
            if (i % scope.itemsPerPage === 0) {
                scope.pagedItems[Math.floor(i / scope.itemsPerPage)] = [scope.arrayItems[i]];
            } else {
                scope.pagedItems[Math.floor(i / scope.itemsPerPage)].push(scope.arrayItems[i]);
            }
        }
    };

    scope.range = function (size, start, end) {
        var ret = [];

        if (size < end) {
            end = size;
            start = size - scope.gap;

            if (start < 0) {
                start = 0;
            }
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    scope.prevPage = function () {
        if (scope.currentPage > 0) {
            scope.currentPage--;
        }
    };

    scope.nextPage = function () {
        if (scope.currentPage < scope.pagedItems.length - 1) {
            scope.currentPage++;
        }
    };

    scope.setPage = function () {
        scope.currentPage = this.n;
    };

    scope.initData();
}