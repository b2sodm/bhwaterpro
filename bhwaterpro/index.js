////////////////////////////////////////////
//
// index.js
// Author: Brian
//
///////////////////////////////////////////

console.log("Start...");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var now = new Date();
var pc = 0;
var pc2 = 0;
var pc3 = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname+'/app'));

var dbconnect = mysql.createConnection({
    host: "localhost",
    user: "bhwater",
    password: "myw2pw",
    database: "BHWATERDB"
});

dbconnect.connect(function(err){
    if(err){
        console.log(dbTime()+" MySQL: "+err.toString());
    }
    else
    {
        console.log(dbTime()+" MySQL connected...");
    }
});

//Clean user's input.
function dbData(data)
{
    var cTrim = ['"', ' ', '<', '>', ';', '=', '\\', ',', '\'', '#'];
    var temp = data;
    try{
        temp += " ";
        temp = temp.toString();
    }catch(err)
    {
        console.log("DataError....");
    }
            
    var temp3;
    for(var i = 0; i < cTrim.length; i++)
    {
        temp = temp.replace(cTrim[i],' ');
    }
    temp3 = temp.trim();
    console.log(dbTime()+" "+temp3);
    return temp3;
};

//Time.
function dbTime()
{
    now = new Date();
    return now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
}

app.set('port', (process.env.PORT || 8000));
app.get('/', function(req, res) {
        console.log(dbTime()+" Get index#"+ pc++);
        res.sendFile(__dirname +'/'+'app/pages/index.html');
    });
    
app.get('/reports', function(req, res) {
        console.log(dbTime()+" Get reports#"+ pc2++);
        res.sendFile(__dirname +'/'+'app/pages/reports.html');
    });

app.get('/bhcharts', function(req, res) {
        console.log(dbTime()+" Get charts#"+ pc3++);
        res.sendFile(__dirname +'/'+'app/pages/bhcharts.html');
    });

//Borehole db list.
app.get('/bhdb', function(req, res) {
    console.log(dbTime()+" Get #bhdb");
    var sql = "SELECT * FROM BOREHOLE";
    dbconnect.query(sql, function(err, result, fields){
        if(err){
            console.log(dbTime()+" MySQL: "+err.toString());
            res.send(dbTime()+" dbError: offline");
        }
        else
        {
            console.log(dbTime()+" MySQL bhdb..."+result.toString());
            res.send(result);
        }
    });
});

//Borehole Water Levels list.
app.get('/bhwl', function(req, res) {
    console.log(dbTime()+" Get #bhwl");
    var sql = "SELECT * FROM WATERLEVEL";
    dbconnect.query(sql, function(err, result, fields){
        if(err){
            console.log(dbTime()+" MySQL: "+err.toString());
            res.send(dbTime()+" dbError: offline");
        }
        else
        {
            console.log(dbTime()+" MySQL bhwl..."+result.toString());
            res.send(result);
        }
    });
});

//New boreholes.
//Step1
app.post('/bhPost', function(req, res) {
    var data = req.body;
    var dname = dbData(data.name);
    //var dtype = dbData(data.type);
    //var dlatitude = dbData(data.latitude);
    //var dlongitude = dbData(data.longitude);
    //var delevation = dbData(data.elevation);
    var done = false;
    console.log(dbTime()+" bhPost: "+dname);
    var tsql = "SELECT * FROM BOREHOLE WHERE name = ?";
    dbconnect.query(tsql, [dname], function(err, result){
        if(err){
            console.log(dbTime()+" MySQL01: "+err.toString());
            res.send(dbTime()+" dbError01: offline");
        }
        else
        {
            console.log(dbTime()+" MySQL bhnameSl..."+result.length);
            if(result.length < 1)
            {
                done = true;
                newBorehole(req, res, done);
            }
            else
            {
               res.send(dbTime()+" dbE: 001"); 
            }
        }
    });
    
    /*
    if(done === true)
    {
        var sql = "INSERT INTO BOREHOLE (name, type, latitude, longitude, elevation)"+
            "VALUES(?,?,?,?,?)";
        dbconnect.query(sql,[dname,dtype,dlatitude,dlongitude,delevation], function(err, result){
        if(err){
            console.log(dbTime()+" MySQL02: "+err.toString());
            res.send(dbTime()+" dbError02: 2");
        }
        else
        {
            console.log(dbTime()+" MySQL bhPost..."+result.toString());
            res.send(result);
        }
    });        
    }
    */
});
//
//New boreholes.
//Step2
function newBorehole(req, res, done){
    console.log(dbTime()+" MySQL bhPost...");
    if(done !== true)
    {
        console.log(dbTime()+" MySQL bhPost...Error1");
        res.send(dbTime()+"doneError:1 ");
        return 0;
    }
    var data = req.body;
    var dname = dbData(data.name);
    var dtype = dbData(data.type);
    var dlatitude = dbData(data.latitude);
    var dlongitude = dbData(data.longitude);
    var delevation = dbData(data.elevation);
    var sql = "INSERT INTO BOREHOLE (name, type, latitude, longitude, elevation)"+
        "VALUES(?,?,?,?,?)";
    dbconnect.query(sql,[dname,dtype,dlatitude,dlongitude,delevation], function(err, result){
        if(err){
            console.log(dbTime()+" MySQL02: "+err.toString());
            res.send(dbTime()+" dbError02: 2");
        }
        else
        {
            console.log(dbTime()+" MySQL bhPost2..."+result.toString());
            res.send(result);
        }
    });        
}

//New borehole walter levels.
//Step1.
app.post('/bhwlPost', function(req, res) {
    var data = req.body;
    var dname = dbData(data.name);
    var ddate = dbData(data.date); 
    //var dreading = dbData(data.reading);
    //var bhlist = false;
    //var bhwlist = false;
    console.log(dbTime()+" bhWlPost: "+dname+" "+ddate);
    var tsql = "SELECT * FROM BOREHOLE WHERE name = ?";
    dbconnect.query(tsql, [dname], function(err, result){
        if(err){
            console.log(dbTime()+" dbError01: "+err.toString());
            res.send(dbTime()+" dbError01: offline");
        }
        else
        {
            console.log(dbTime()+" MySQL01 bhnameSl..."+result.length);
            if(result.length > 0)
            {
                //bhlist = true;
                bhlistStepA(req, res);
            }
            else
            {
               res.send(dbTime()+" dbE: 001"); 
            }
        }
    });
    
    /*
    if(bhlist){
        var sql2 = "SELECT * FROM WATERLEVEL WHERE name = ?";
        dbconnect.query(sql2, [dname], function(err, result){
        if(err){
            console.log(dbTime()+" MySQL02: "+err.toString());
            res.send(dbTime()+" dbError: 02");
        }
        else
        {
            console.log(dbTime()+" MySQL02 bhnameSl..."+result.toString());
            if(result == null)
            {
                bhwlist = true;
            }
        }
    });
    }
    */
   
    /*
    if(bhwlist){
        var sql = "INSERT INTO WATERLEVEL (name, date, reading) VALUES(?,?,?)";
        dbconnect.query(sql,[dname,ddate,dreading], function(err, result){
        if(err){
            console.log(dbTime()+" MySQL03: "+err.toString());
            res.send(dbTime()+" dbError: 03");
        }
        else
        {
            console.log(dbTime()+" MySQL bhwlPost..."+result.toString());
            res.send(result);
        }
    });
    }
    */
});

//New borehole walter levels.
//Step2
function bhlistStepA(req, res){
    var data = req.body;
    var dname = dbData(data.name);
    //var ddate = dbData(data.date); 
    //var dreading = dbData(data.reading);
    var sql2 = "SELECT * FROM WATERLEVEL WHERE name = ?";
    dbconnect.query(sql2, [dname], function(err, result){
        if(err){
            console.log(dbTime()+" MySQL02: "+err.toString());
            res.send(dbTime()+" dbError: 02");
        }
        else
        {
            console.log(dbTime()+" MySQL02 bhnameSl..."+result.length);
            if(result.length < 1)
            {
                bhlistStepB(req, res);
            }
            else
            {
               res.send(dbTime()+" dbE: 002"); 
            }
        }
    });
};

//New borehole walter levels.
//Step3
function bhlistStepB(req, res){
    var data = req.body;
    var dname = dbData(data.name);
    var ddate = dbData(data.date); 
    var dreading = dbData(data.reading);
    var sql = "INSERT INTO WATERLEVEL (name, date, reading) VALUES(?,?,?)";
    dbconnect.query(sql,[dname,ddate,dreading], function(err, result){
        if(err){
            console.log(dbTime()+" MySQL03: "+err.toString());
            res.send(dbTime()+" dbError: 03");
        }
        else
        {
            console.log(dbTime()+" MySQL bhwlPost..."+result.toString());
            res.send(result);
        }
    });
};
//

//Update boreholes.
app.put('/upbhdb', function(req, res) {
    var data = req.body;
    var dname = dbData(data.name);
    var dtype = dbData(data.type);
    var dlatitude = dbData(data.latitude);
    var dlongitude = dbData(data.longitude);
    var delevation = dbData(data.elevation);
    console.log(dbTime()+" Update:bhdb "+dname);
    var sql = "UPDATE BOREHOLE SET type = ?, latitude = ?, longitude = ?,"+
              "elevation = ? WHERE name = ?";
    dbconnect.query(sql, [dtype, dlatitude, dlongitude, delevation, dname], function(err, result, fields){
        if(err){
            console.log(dbTime()+" MySQL: "+err.toString());
            res.send(dbTime()+" dbError: offline");
        }
        else
        {
            console.log(dbTime()+" MySQL bhPost..."+result.toString());
            res.send(result);
        }
    });
});

//Update borehole water levels.
app.put('/upbhwl', function(req, res) {
    var data = req.body;
    var dname = dbData(data.name);
    var ddate = dbData(data.date);
    var dreading = dbData(data.reading);
    console.log(dbTime()+" Update:bhdb "+dname);
    var sql = "UPDATE WATERLEVEL SET date = ?, reading = ? WHERE name = ?";
    dbconnect.query(sql, [ddate, dreading, dname], function(err, result, fields){
        if(err){
            console.log(dbTime()+" MySQL: "+err.toString());
            res.send(dbTime()+" dbError: offline");
        }
        else
        {
            console.log(dbTime()+" MySQL bhPost..."+result.toString());
            res.send(result);
        }
    });
});

//Delete boreholes.
app.post('/dbhdb', function(req, res) {
    var data = req.body;
    var bhname = dbData(data.name);
    console.log(dbTime()+" Delete:bhdb "+bhname);
    var sql = "DELETE FROM BOREHOLE WHERE name = ?";
    dbconnect.query(sql, [bhname], function(err, result, fields){
        if(err){
            console.log(dbTime()+" MySQL: "+err.toString());
            res.send(dbTime()+" dbError: offline");
        }
        else
        {
            console.log(dbTime()+" MySQL bhPost..."+result.toString());
            res.send(result);
        }
    });
});

//Delete borehole water levels.
app.post('/dbhwl', function(req, res) {
    var data = req.body;
    var wlname = dbData(data.name);
    console.log(dbTime()+" Delete:bhwl "+wlname);
    var sql = "DELETE FROM WATERLEVEL WHERE name = ?";
    dbconnect.query(sql, [wlname], function(err, result, fields){
        if(err){
            console.log(dbTime()+" MySQL: "+err.toString());
            res.send(dbTime()+" dbError: offline");
        }
        else
        {
            console.log(dbTime()+" MySQL bhPost..."+result.toString());
            res.send(result);
        }
    });
});

var pport = app.get('port');
app.listen(pport, function() {
    console.log('App is now running at http://localhost:'+pport+'/');
    console.log('Hit CTRL-C to stop the server');
    console.log(now);
});
