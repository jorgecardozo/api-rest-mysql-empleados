const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'company',
    insecureAuth : true,
    ports:'3306',
    multipleStatements: true
});

mysqlConnection.connect(function(err){
    if(err){
        console.log("Error: ",err);
        return;
    }
    else{
        console.log('DataBase is conect');
    }
});

module.exports = mysqlConnection