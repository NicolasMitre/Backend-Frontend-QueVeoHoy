-- CREANDO BASE DE DATOS
-- drop database que_veo_hoy;
create database if not exists que_veo_hoy;

use que_veo_hoy;
-- PELICULA
create table if not exists pelicula (
	id int NOT NULL auto_increment,
    titulo varchar (100),
    duracion int (5),
    director varchar (400),
    anio int (5),
    fecha_lanzamiento date,
    puntuacion int (2),
    poster varchar(300),
    trama varchar(700),
    genero_id int,
    primary key (id)  
);

-- GENERO
create table if not exists genero(
 id int auto_increment not null,
 nombre varchar (30),
 primary key (id)
);

ALTER TABLE pelicula
ADD CONSTRAINT  FK_generoxpelicula FOREIGN KEY (genero_id) REFERENCES genero (id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- ACTOR

create table if not exists actor(
 id int auto_increment not null,
 nombre varchar (70),
primary key (id)
);

-- TABLA RELACION PELICULAS ACTOR 
create table if not exists actor_pelicula(
 id int auto_increment not null,
 actor_id int,
 pelicula_id int,
primary key (id)
);

ALTER TABLE actor_pelicula 
ADD CONSTRAINT  FK_actor_pelicula FOREIGN KEY (pelicula_id) REFERENCES pelicula (id) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE actor_pelicula 
ADD CONSTRAINT  FK_pelicula_actor FOREIGN KEY (actor_id) REFERENCES actor (id) ON DELETE RESTRICT ON UPDATE CASCADE;













