/* 
 * bhcharts.js
 * Author: Brian
 */

var ctx;
var myChart;
var cdata = [-12, -19, -10, -25, -40, -20];
var bhwlst = ["YexusTest", "RotorolaTest", "UphillTest", "Temp1", "Temp2", "Temp3"];
var bhdata = [];
var bhnames = [];
var bhmbgl = [];
var bhwln = [];
var urlList; 

function init(){
    //"/bhcharts?bhname="+wlNames+",bhreadings="+wlReadings+",info=0"
    var aUrl = document.URL;
    urlList = aUrl.split("?");
    var info = urlList[1];
    var bhwl = urlList[1].split(',info');
    var d1 = bhwl[0].split(',bhreadings=');
    var mbgl = d1[1];
    info +="\n#l: "+mbgl;
    var d2 = d1[0].split('=');
    var bhn = d2[1];
    info +="\n#n: "+bhn;
    $("#lblData").text(info);
    bhmbgl = mbgl.split(',');
    bhwln = bhn.split(',');
    bhdata = bhmbgl;
    bhnames = bhwln;
    render();
};

function render(){
    ctx = document.getElementById("myChart").getContext('2d');
    myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: bhnames,
        datasets: [{
            label: 'mbgl',
            data: bhdata,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
};

$(document).ready(function(){
    $("#btnCharts").click(function(){
        $("#lblData").show("slow");
        $("#lblData").hide("slow");
        $("#myCan").hide("slow");
        //
        for(var i = 0; i < cdata.length; i++)
        {
            bhdata.push(cdata[i]);
            bhnames.push(bhwlst[i]);
        }
        $("#myCan").show("slow");
        wlCharts(urlList);
    });
    $("#btnChart").click(function(){
        $("#lblData").hide("slow");
        $("#lblData").show("slow");
        $("#myCan").hide("slow");
        //
        bhdata = bhmbgl;
        bhnames = bhwln;
        //
        $("#myCan").show("slow");
    });
});

function wlCharts(url){
    window.location = url[0] + "?bhname="+bhnames+",bhreadings="+bhdata+",info=0";
};

window.onload = function(){
  init();  
};


