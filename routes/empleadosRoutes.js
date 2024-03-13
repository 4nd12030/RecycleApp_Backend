
const EmpleadosController = require('../controllers/empleadosController')

const passport = require('passport')

module.exports = (app, upload) => {
    //GET => Traer Datos
    app.get('/api/recycle/empleados/getAll', EmpleadosController.getAll)

    //POST => Guardar Datos
    app.post('/api/recycle/empleados/create', EmpleadosController.register)
        
    app.post('/api/recycle/empleados/login', EmpleadosController.login)

    //PUT => ACTUALIZA DATOS
    //401 UNAUTHORIZED
    app.put('/api/recycle/empleados/update', passport.authenticate('jwt', {session: false}), upload.array('image', 1), EmpleadosController.update)
    //app.put('/api/recycle/empleados/update', upload.array('image', 1), EmpleadosController.update)

    app.put('/api/recycle/empleados/updateWithoutImage',passport.authenticate('jwt', {session: false}), EmpleadosController.updateWithoutImage)
}