const db = require('../config/config')

const  Rol = {}

Rol.create = (id_empleado, id_rol)  => {
    const sql = `
    INSERT INTO 
        empleado_tiene_roles(
            id_empleado,
            id_rol,
            created_at,
            update_at
        )
    VALUES($1,$2,$3,$4)    
    `

    return db.none(sql, [
        id_empleado,
        id_rol,
        new Date(),
        new Date()
    ])
}

module.exports = Rol