const express = require('express');
const app = express();

// Serttings
app.set('port', process.env.PORT || 3000);
//Middleware, funciones que se ejecutan antes de las rutas
app.use(express.json());
//Routes
app.use(require('./routes/empleados'));

app.listen(app.get('port'), () => {
    console.log("escuchando por el puerto 3000");
});