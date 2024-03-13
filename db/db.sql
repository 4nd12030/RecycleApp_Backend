
DROP TABLE IF EXISTS empleados CASCADE
CREATE TABLE empleados(
	id BIGSERIAL PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	apellidoPat VARCHAR(255) NOT NULL,
    apellidoMat VARCHAR(255) NOT NULL,
	imagen VARCHAR(255) NULL,
    telefono VARCHAR(80) NOT NULL UNIQUE,
    no_empleado VARCHAR(255) NOT NULL,
	contrasena VARCHAR(255) NOT NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	update_at TIMESTAMP(0) NOT NULL	
);

CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	nombre VARCHAR(180) NOT NULL,
	imagen VARCHAR(255) NULL,
	ruta VARCHAR (255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	update_at TIMESTAMP(0) NOT NULL		
);


DROP TABLE IF EXISTS empleado_tiene_roles CASCADE;
CREATE TABLE empleado_tiene_roles(
	id_empleado BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	update_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_empleado_tab) REFERENCES empleados(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_empleado, id_rol)
);


INSERT INTO roles(
	nombre,
	imagen,
	ruta,
	created_at,
	update_at
)
VALUES(
	'OPERARIO',
	'https://cdn-icons-png.flaticon.com/512/7425/7425445.png',
	'operario/home',
	'2024-02-12',
    '2024-02-12'	
);

INSERT INTO roles(
	nombre,
	imagen,
	ruta,
	created_at,
	update_at
)
VALUES(
	'ADMINISTRATIVO',
	'https://cdn-icons-png.flaticon.com/512/2640/2640747.png',
	'administrativo/home',
	'2024-02-12'
	'2024-02-12'	
);

INSERT INTO roles(
	nombre,
	imagen,
	ruta,
	created_at,
	update_at
)
VALUES(
	'SOPORTE',
	'https://cdn-icons-png.flaticon.com/512/5358/5358679.png',
	'soporte/home',
	'2024-02-12',
	'2024-02-12'	
);