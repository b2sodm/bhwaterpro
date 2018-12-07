/////////////////////////
//
// app.js
// Author: Brian
//
/////////////////////////

// Define the bhApp module
var bhApp = angular.module('bhApp', []);
var dbSize = 0;
var bhName = "Cool";
var bhwlname = "Cool";
var delBhName = "Cool";
var now;

// Define the bhListController controller on the bhApp module
bhApp.controller('bhListController', function bhListController($scope, $http) {
    $scope.dbTn = 10;
    $scope.bhsList = [];
    $scope.bhList = [];
    $scope.bhquery;
    $scope.sortd;
    //$scope.sortd = $("#bhwlsel").val();
    $scope.boreholes = [
    {
        name: 'Yexus',
        type: 'Sandy.',
        latitude: '261209S',
        longitude: '275237E',
        elevation: '1900'
    }, {
        name: 'Rotorola',
        type: 'Rocky.',
        latitude: '261228S',
        longitude: '284227E',
        elevation: '1857'
    }, {
        name: 'Uphill',
        type: 'Clay.',
        latitude: '262245S',
        longitude: '285343E',
        elevation: '2000'
    }
    ];
    $scope.bhList = $scope.boreholes;
    now = new Date();
    $scope.message = now;
    $scope.bhwlSubmit = function(){
        bhwlname = $("#selbhwl").val();
        var bhwlData = {
            name: bhwlname,
            date: $scope.date,
            reading: $scope.reading
        };
        $scope.message2 = new Date();
        $http.post('/bhwlPost', bhwlData).then(function(data){
            $scope.message = data;
        });
    };
    $scope.bhSubmit = function(){
        var bhData = {
            name: $scope.name,
            type: $scope.type,
            latitude: $scope.latitude,
            longitude: $scope.longitude,
            elevation: $scope.elevation
        };
        $http.post('/bhPost', bhData).then(function(data){
            $scope.message = data;
        });
    };
    $scope.bhlView = function(){
        $scope.message2 = new Date();
        $http.get('/bhdb').then(function(data){
            $scope.message = data;
            $scope.boreholes = data.data;
        });
    };
    
    $scope.bhslView = function(){
        $scope.sortd = $("#bhwlsel").val();
        $scope.bhquery = $("#txbQ").val();
        //alert($scope.bhquery);
        //alert($scope.dbTn);
        $scope.dbTn++;
        $scope.boreholes = $scope.bhList;
        var dbT = $scope.dbTn;
        $scope.bhsList = ([{name: "N"+dbT,type:"T"+dbT, latitude: "2622"+dbT+"S",
        longitude: "2853"+dbT+"E",  elevation: "20"+dbT}]);
        //alert("L: "+$scope.bhsList.length);
        $scope.message = new Date();
        $scope.bhList.push($scope.bhsList[0]);
        $http.get('/bhdb').then(function(data){
            $scope.boreholes = data.data;
            $scope.message2 = data;    
        });
        $("#bhwlsel").val("");
        $("#txbQ").val("");
        //alert("Sort...");
    };
    
    $scope.bhUpdate = function(){
        var bhData = {
            name: $scope.name,
            type: $scope.type,
            latitude: $scope.latitude,
            longitude: $scope.longitude,
            elevation: $scope.elevation
        };
        //alert("Processing....");
        $("#lblFrmBh").text("Processing...");
        //alert("bhUpdatet: "+bhData.name);
        $http.put('/upbhdb', bhData).then(function(data){
            $scope.message = data;
        });
        $("#lblFrmBh").text("");
    };
    $scope.bhwlUpdate = function(){
        //alert("bhwlUpdate.");
        bhwlname = $("#selbhwl").val();
        var bhwlData = {
            name: bhwlname,
            date: $scope.date,
            reading: $scope.reading
        };
        $scope.message = "Processing: "+ bhwlData.name;
        $http.put('/upbhwl',bhwlData).then(function(data){
            $scope.message = data;
        });
    };
    $scope.bhDelete = function(){
        delBhName = $("#selbhDel").val();
        var bhData = {
            name: delBhName,
            bh: delBhName
        };
        // alert("bhDelete: "+bhData.name);
        $http.post('/dbhdb',bhData).then(function(data){
            $scope.message = data;
        });
    };
    $scope.bhwlDelete = function(){
        var delName = $("#selbhwlDel").val();
        var bhData = {
            name: delName,
            bh: delName
        };
        //alert("bhwlDelete."+bhData.name);
        $http.post('/dbhwl',bhData).then(function(data){
            $scope.message = data;
        });
    };
    //
    $scope.bhlUpdate = function(bh2){
        var ubhname = bh2.name;
        //alert("upDatebhl: "+ ubhname);
        $("#frmBh").hide('slow');
        $("#frmBh").show('slow');
        $("#btnBh2").show('slow');
        $("#btnBh1").hide('slow');
        $("#txbNamefrmBh").focus();
        $("#txbNamefrmBh").val();
        //$("#txbNamefrmBh").val(ubhname+"\t");
        //$("#txbTypefrmBh").focus();
        $("#lblFrmBh").text("Update: "+ubhname);
    };
    
    $scope.bhlDelete = function(bh2){
        //alert("bhlDel: "+bh2.type);
        $http.post('/dbhdb',bh2).then(function(data){
            $scope.message = data;
        });
    };
    //
});

$(document).ready(function(){
    $("#lblDatebhwl").text(dbTime());
    $('#btnMore').click(function(){
        $("#more").hide('slow');
        $("#info").show('slow');
        $("#info").hide('slow');
        $("#help").hide('slow');
        $("#frmBh").hide('slow');
        $("#frmBhWl").hide('slow');
        $("#frmDbh").hide('slow');
        $("#frmDbhwl").hide('slow');
        $("#bhlst").hide('slow');
        $("#more").show('slow');
    });
    $('#btnHelp').click(function(){
        $("#help").show('slow');
    });
    $('#btnInfo').click(function(){
        $("#info").show('slow');
    });
    $('#btnBhV').click(function(){
        $("#bhlst").hide('slow');
        $("#bhlst").show('slow');
    });
    $("li").eq(0).click(function(){
        $("#bhlst").hide('slow');
        $("#bhlst").show('slow');
    });
    $("li").eq(1).click(function(){
        $("#frmBh").hide('slow');
        $("#frmBh").show('slow');
        $("#btnBh1").show('slow');
        $("#btnBh2").hide('slow');
    });
    $("li").eq(2).click(function(){
        $("#frmBh").hide('slow');
        $("#frmBh").show('slow');
        $("#btnBh2").show('slow');
        $("#btnBh1").hide('slow');
    });
    $("li").eq(3).click(function(){
        $("#frmDbh").hide('slow');
        $("#frmDbh").show('slow');
    });
    $("li").eq(4).click(function(){
        $("#frmBhWl").hide('slow');
        $("#frmBhWl").show('slow');
        $("#btnBh1wl").show('slow');
        $("#btnBh2wl").hide('slow');
        $("#lblDatebhwl").text(dbTime());
    });
    $("li").eq(5).click(function(){
        $("#frmBhWl").hide('slow');
        $("#frmBhWl").show('slow');
        $("#btnBh2wl").show('slow');
        $("#btnBh1wl").hide('slow');
        $("#lblDatebhwl").text(dbTime());
    });
    $("li").eq(6).click(function(){
        $("#frmDbhwl").hide('slow');
        $("#frmDbhwl").show('slow');
    });
    
    $("#selbhwl").click(function(){
        var nameWl = $("#selbhwl").val();
        $("#txtbhnamewl").val(nameWl);
    });
    
    $("#selbhDel").click(function(){
        var nameDel = $("#selbhDel").val();
        $("#txbdbhnameDel").val(nameDel);
        $("#lblbhDelfrmDbh").text(nameDel);
        //var nameDel2 = $("#selbhDel").text();
        //alert(nameDel2);
    });
    
    $("#selbhwlDel").click(function(){
        var nameDel = $("#selbhwlDel").val();
        $("#txbbhwlnameDel").val(nameDel);
    });
    
    $('#btnbMore').click(function(){
        $("#more").hide('slow');
        $("#info").hide('slow');
        $("#help").hide('slow');
        $("#frmBh").show('slow');
        $("#frmBhWl").show('slow');
        $("#frmDbh").show('slow');
        $("#frmDbhwl").show('slow');
        $("#bhlst").show('slow');
        $("#more").show('slow');
        $("#info").show('slow');
        $("#help").show('slow');
    });
});

function dbTime()
{
    now = new Date();
    return now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
}

//alert("Done...");
