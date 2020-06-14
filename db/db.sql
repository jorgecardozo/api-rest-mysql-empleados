create database if not exists company;
use company;
create table empleados(
	id int(11) not null auto_increment,
    nombre varchar(45) default null,
	salario int(11) default null,
    primary key(id)
);

describe empleados;
