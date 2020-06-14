const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/',(request,response) => {
    mysqlConnection.query('SELECT * FROM empleados', (err,rows,fields) => {
        if(!err){
            response.json(rows);
        }
        else{
            console.log("Error:", err);
        }
    });
});

router.get('/:id',(request,response) => {
    const {id} = request.params;
    mysqlConnection.query('SELECT * FROM empleados WHERE id = ?', [id], (err,rows,fields) => {
        if(!err){
            response.json(rows[0]);//para obtener el object y no el array completo
        }
        else{
            console.log("Error:", err);
        }
    });
});

router.post('/',(request,response) => {
    const {id,nombre,salario} = request.body;
    const query = `
            SET @id = ?;
            SET @nombre = ?;
            SET @salario = ?;
            CALL empleadosAddOrEdit(@id,@nombre,@salario);
    `;
    console.log("id:",id);
    console.log("nombre: ",nombre);
    console.log("salario: ",salario);
    //const query = 'CALL empleadosAddOrEdit(?,?,?)';

    mysqlConnection.query(query, [id,nombre,salario], (err,rows,fields) => {
        if(!err){
            response.json({Status: 'Empleado agregado'});//para obtener el object y no el array completo
        }
        else{
            console.log("Error:", err);
        }
    });
});

router.put('/:id',(request,response) => {
    const {nombre,salario} = request.body;
    const {id} = request.params;
    const query = `
            SET @id = ?;
            SET @nombre = ?;
            SET @salario = ?;
            CALL empleadosAddOrEdit(@id,@nombre,@salario);
    `;
    console.log("id:",id);
    console.log("nombre: ",nombre);
    console.log("salario: ",salario);
    //const query = 'CALL empleadosAddOrEdit(?,?,?)';

    mysqlConnection.query(query, [id,nombre,salario], (err,rows,fields) => {
        if(!err){
            response.json({Status: 'Empleado Actualizado'});//para obtener el object y no el array completo
        }
        else{
            console.log("Error:", err);
        }
    });
});

router.delete('/:id',(request,response) => {
    const {id} = request.params;
    const query = `
          DELETE FROM empleados WHERE id = ?;
    `;
    console.log("id:",id);

    mysqlConnection.query(query, [id], (err,rows,fields) => {
        if(!err){
            response.json({Status: 'Empleado Eliminado'});//para obtener el object y no el array completo
        }
        else{
            console.log("Error:", err);
        }
    });
});

module.exports = router;