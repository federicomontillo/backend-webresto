const express = require('express');
const router = express.Router();
const platoController = require('../controllers/platoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Crea platos
// api/platos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del plato es obligatorio').not().isEmpty(),
        check('descripcion', 'El descripcion del plato es obligatoria').not().isEmpty(),
        check('categoria', 'La categoria del plato es obligatoria').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
    ],
    platoController.crearPlato
)

//Obtener todos los platos
router.get('/',
    auth,
    platoController.obtenerPlatos
)

//Actualizar platos via ID
router.put('/:id', 
    auth,
    [
        check('nombre', 'El nombre del plato es obligatorio').not().isEmpty(),
        check('descripcion', 'El descripcion del plato es obligatoria').not().isEmpty(),
        check('categoria', 'La categoria del plato es obligatoria').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
    ],
    platoController.actualizarPlato
)

//Eliminar un plato
router.delete('/:id', 
    auth,
    platoController.eliminarPlato
)

module.exports = router;