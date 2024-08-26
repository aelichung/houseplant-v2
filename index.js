// express is a framework for node.js
// it provides some nice apis for web app development
const express = require('express')
const app = express()
const port = 8080

var TYPES = require('tedious').TYPES

// sets up the config for remote sql server connection and relevant variables
var Connection = require('tedious').Connection;  
var config = {  
    // server and credential information removed for security
    server: '#####',
    authentication: {
        type: 'default',
        options: {
            userName: '######',
            password: '######'
        }
    },
    options: {            
        encrypt: false,
        database: '#####',
        rowCollectionOnDone: true
    }
};

var Request = require('tedious').Request;  

//route
app.get('/', (req, res)=>{
    res.sendFile("public/index.html", {root: __dirname})
})

//middleware
app.use(express.static('public'))

// mustache- template engine
//mustache-express lets you load mustache with express
const mustachExpress = require('mustache-express')
app.engine('mustache', mustachExpress())

app.set('view engine', 'mustache')

//when a client routes to the domain.com/gallery, fire this callback
app.get('/gallery', (req, res)=>{
    var callback = function(rows) {          
        console.log(rows);

        let items = rows.map((row) => {
            let colMap = {}
            for(let col of row){
                colMap[col.metadata.colName] = col.value
            }

            let light = (colMap['Low_Light']) ? 'images/small_sun_active.png' : 'images/small_care_inactive/sun.png'
            let soil = (colMap['Most_Soils']) ? 'images/small_soil_active.png' : 'images/small_care_inactive/soil.png'
            let water = (colMap['Low_Water']) ? 'images/small_water_active.png' : 'images/small_care_inactive/water.png'
            let temp = (colMap['Wide_Temp']) ? 'images/small_temp_active.png' : 'images/small_care_inactive/temp.png'

            return {
                name: colMap['Name'],
                imagePath: colMap['Image_Path'],
                family: colMap['Family'],
                price: '$' + colMap['Price'],
                light: light,
                soil: soil,
                water: water,
                temp: temp
            }
        });

        res.render('gallery', { items: items })

    }

    let parameters = [
        {name:"isLowLight", type: TYPES.Bit, value:parseBool(req.query.light)},
        {name:"isMostSoil", type: TYPES.Bit, value:parseBool(req.query.soil)},
        {name:"isLowWater", type: TYPES.Bit, value:parseBool(req.query.water)},
        {name:"isWideTemp", type: TYPES.Bit, value:parseBool(req.query.temp)}
    ]
    
    // calling query here kicks off the tedious connection 
    // record processing starts once the connection is established and Tedious fires a done or doneInProc event
    procedureQuery("spGetProductsByFilter",  parameters, callback) 
})

function parseBool(s){
    return s === "true"
}


function query(statement, params, callback) {
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        executeStatement(statement, connection, params, callback);      
    });
    connection.connect();
}

function procedureQuery(procedureName, params, callback) {
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        executeProcedure(procedureName, connection, params, callback);      
    });
    connection.connect();
}
  
  
function executeStatement(statement, connection, params, callback) {  
    var request = new Request(
        statement, 
        function(err) {  
            if (err) {  
                console.log(err)
            }  
        }
    );

    for(let param of params){
        request.addParameter(param.name, param.type, param.value)
    }

    var called = false;
    const onceCallback = (rows) => {
        if (!called) {
            callback(rows)
        }
        called = true;
    }

    request.on('done', (rowCount, more, rows) => {
        onceCallback(rows);
    });

    request.on('doneInProc', (rowCount, more, rows) => {
        onceCallback(rows);
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
        onceCallback(rows);
    });
    
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);  
}

function executeProcedure(procedureName, connection, params, callback) {  
    var request = new Request(
        procedureName, 
        function(err) {  
            if (err) {  
                console.log(err)
            }  
        }
    );

    for(let param of params){
        request.addParameter(param.name, param.type, param.value)
    }

    var called = false;
    const onceCallback = (rows) => {
        if (!called) {
            callback(rows)
        }
        called = true;
    }

    request.on('done', (rowCount, more, rows) => {
        onceCallback(rows);
    });

    request.on('doneInProc', (rowCount, more, rows) => {
        onceCallback(rows);
    });

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
        onceCallback(rows);
    });
    
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.callProcedure(request);  
}


//run the application
app.listen(port, ()=>{
    console.log(`listening on ${port}`)
})