CREATE DEFINER=`root`@`localhost` PROCEDURE `empleadosAddOrEdit`(
	in _id int(11),
    in _nombre varchar(45),
    in _salario int(11)
)
begin
	if _id = 0 then
		insert into empleados (nombre,salario)
        values (_nombre,_salario);
        
        set _id = last_insert_id();
	else
		update empleados
        set 	
			nombre = _nombre,
            salario = _salario
            where id = _id;
	end if;
	select _id as id;
end