/* 
 * reports.js
 * Author: Brian
 */

//alert("Reports...");
// Define the repApp module
var bhApp = angular.module('bhApp', []);
var dbSize = 0;
var dbTemp = 0;
var bhName;
var now;

// Define controller.
bhApp.controller('bhListController', function bhListController($scope, $http) {
    $scope.boreholesWl = [{
        name: 'Yexus',
        date: '2018-11-29',
        reading: '-45'
    }, {
        name: 'Rotorola',
        date: '2018-08-19',
        reading: '-35'
    }, {
        name: 'Uphill',
        date: '2018-10-20',
        reading: '-49'
    }
    ];
    now = new Date();
    $scope.message = now;
    
    $scope.bhwlView = function(){
        $http.get('/bhwl').then(function(data){
            $scope.message = data;
            $scope.boreholesWl = data.data;
        });
    };
    
    $scope.bhwlCharts = function(){
        $http.get('/bhwl').then(function(data){
            $scope.message = data;
            $scope.boreholesWl = data.data;
            wlCharts($scope.boreholesWl);
        });
    };
});

function wlCharts(bhdata){
    //alert(bhdata);
    var wlNames = [];
    var wlReadings = [];
    var data2 = bhdata;
    var aUrl = document.URL;
    var urlList = aUrl.split("/reports");
    //alert(data2[0].name);
    //alert(data2[0].reading);
    for(var i = 0; i < data2.length; i++)
    {
        wlNames.push(data2[i].name);
        wlReadings.push(data2[i].reading);
    }
    window.location = urlList[0] + "/bhcharts?bhname="+wlNames+",bhreadings="+wlReadings+",info=0";
    //
    //window.location = "http://localhost:8000/bhcharts?data="+data2+",info=0";
    //
};

$(document).ready(function(){
    $('#btnBhV').click(function(){
        $("#bhwlDv").hide('slow');
        $("#bhwlDv").show('slow');
    });
});
    
//alert("Done");