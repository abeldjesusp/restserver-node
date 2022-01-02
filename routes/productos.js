const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, tieneRole } = require('../middlewares');

const { 
    obtenerProductos, 
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers/producto');

const { existeProducto, existeCategoria } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerProductos );

router.get('/:id', [
    check('id').custom( existeProducto ),
    check('id', 'No es un ID valido.').isMongoId(),
    validarCampos
], obtenerProducto );

router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'La categoria es obligatorio').notEmpty(),
    check('categoria', 'La categoria no es un id correcto').isMongoId(),
    check('categoria').custom( existeCategoria ),
    validarCampos
 ], crearProducto );

router.put('/:id', [
    validarJWT,
    check('id').custom( existeProducto ),
    check('id', 'No es un ID valido.').isMongoId(),
    check('categoria', 'La categoria no es un id correcto').isMongoId(),
    validarCampos
], actualizarProducto );

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], borrarProducto );

module.exports = router;