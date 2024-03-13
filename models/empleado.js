
//Archivo que guarda losdatos en la BD 

const db = require('../config/config')
const bcrypt = require('bcryptjs')

const Empleado = {}

Empleado.getAll = () => {
    const sql = `
    SELECT *
    FROM empleados`

    return db.manyOrNone(sql)
}

Empleado.findByNumEmpleado = (no_empleado) => {    
    const sql = `
    SELECT
        E.id,
        E.nombre,
        E.apellidoPat,
        E.apellidoMat,
        E.imagen,
        E.telefono,
        E.no_empleado,
        E.contrasena,
        E.session_token,
		json_agg(
		   json_build_object(
		       'id', R.id,
			   'nombre', R.nombre,
			   'imagen', R.imagen,
               'ruta', R. ruta
		   )
		) AS roles
    FROM
        empleados AS E
	INNER JOIN 
	    empleado_tiene_roles AS ETR
	ON
	   ETR.id_empleado = E.id
	INNER JOIN 
	    roles AS R
	ON
	   R.id = ETR.id_rol	  
	WHERE 
	   E.no_empleado = $1
	GROUP BY 
	   E.id
    `

    return db.oneOrNone(sql,no_empleado)
}


//consulta para obtenr el id del empleado
Empleado.findById = (id, callback) => {
    const sql = `
    SELECT
        id,
        nombre,
        apellidoPat,
        apellidoMat,
        imagen,
        telefono,
        no_empleado,
        contrasena,
        session_token
    FROM
        empleados
    WHERE
        id = $1
    `

    return db.oneOrNone(sql,id).then(empleado => { callback(null,  empleado) })
}


Empleado.create = async (empleado) => {

    const hash = await bcrypt.hash(empleado.contrasena, 10)

    const sql = `
    INSERT INTO 
    empleados(
        nombre,
        apellidoPat,
        apellidoMat,
        imagen,
        telefono,
        no_empleado,
        contrasena,
        created_at,
        update_at	
    )
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`

    return db.oneOrNone(sql, [
        empleado.nombre,
        empleado.apellidoPat,
        empleado.apellidoMat,
        empleado.imagen,
        empleado.telefono,
        empleado.no_empleado,
        //empleado.contrasena,
        hash,
        //empleado.rolEmpleado,
        new Date(),
        new Date()
    ])
}

Empleado.update = (empleado) => {
    const sql = `
    UPDATE 
        empleados
    SET
       nombre = $2,
       apellidoPat = $3,
       apellidoMat = $4,
       imagen = $5,
       telefono = $6,
       update_at = $7
    WHERE
       id = $1   
    `
    return db.none(sql, [
        empleado.id,
        empleado.nombre,
        empleado.apellidoPat,
        empleado.apellidoMat,
        empleado.imagen,
        empleado.telefono,
        new Date()
    ])
}


Empleado.updateSessionToken = (id_empleado, session_token) => {
   
    console.log('Empleado dentro de UpdateSessionToken: ', session_token)
    const sql = `
    UPDATE 
        empleados
    SET
       session_token = $2

    WHERE
       id = $1   
    `
    return db.none(sql, [
        id_empleado,
        session_token        
    ])
}


module.exports = Empleado