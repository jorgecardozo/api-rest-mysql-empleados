const mysql = require('mysql');
/* Esto es por el Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

Execute the following query in MYSQL Workbench
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
Where root as your user localhost as your URL and password as your password
Then run this query to refresh privileges:
-- flush privileges;
Try connecting using node after you do so.
If that doesn't work, try it without @'localhost' part.
*/

const mysqlConnection = mysql.createConnection({
    /*host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'company',
    insecureAuth : true,
    ports:'3306',
    multipleStatements: true*/
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b3e94009ceb36b',
    password: '2dc3dd72',
    database: 'heroku_690813288323c1e',
    insecureAuth : true,
    ports:'3306',
    multipleStatements: true
});

//mysql://b3e94009ceb36b:2dc3dd72@us-cdbr-east-05.cleardb.net/heroku_690813288323c1e?reconnect=true

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