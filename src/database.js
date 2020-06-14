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

//const mysqlConnection = mysql.createConnection({
    /*host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'company',
    insecureAuth : true,
    ports:'3306',
    multipleStatements: true*/
   // host: 'us-cdbr-east-05.cleardb.net',
   // user: 'b3e94009ceb36b',
   //// password: '2dc3dd72',
   // database: 'heroku_690813288323c1e',
   // insecureAuth : true,
   // ports:'3306',
   // multipleStatements: true
//});

//mysql://b3e94009ceb36b:2dc3dd72@us-cdbr-east-05.cleardb.net/heroku_690813288323c1e?reconnect=true

/*mysqlConnection.connect(function(err){
    if(err){
        console.log("Error: ",err);
        return;
    }
    else{
        console.log('DataBase is conect');
    }
});*/

/*Esto es para Solucionar el problema de 
 * throw er; // Unhandled 'error' event
 * 2020-06-14T17:32:46.402261+00:00 app[web.1]: ^
 * Error: Connection lost: The server closed the connection.
*/ 

var db_config = {
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b3e94009ceb36b',
    password: '2dc3dd72',
    database: 'heroku_690813288323c1e',
    insecureAuth : true,
    ports:'3306',
    multipleStatements: true
  };
  
  var mysqlConnection;
  
  function handleDisconnect() {
    console.error('Start Conexion');
    mysqlConnection = mysql.createConnection(db_config); // Recreate the connection, since
                                                        // the old one cannot be reused.
    mysqlConnection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('Error cuando se intenta conectar a la DB:', err);
        //handleDisconnect();
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }else{
        console.log('Conexion SUCCESS to DB');
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    mysqlConnection.on('error', function(err) {
        console.log('db error', err);
        /*if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }*/

        if(err.fatal || err) { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });


  }
  
  handleDisconnect();

  //ESTO ES PARA NO PERDER LA CONEXION EN PROD
  /*setInterval(function () {
    mysqlConnection.query('SELECT 1 + 1 AS solution', function (err, results) {
        if(err) console.log('err',err);
        console.log('Works bro ',results);
        });
  }, 2000);*/
module.exports = mysqlConnection