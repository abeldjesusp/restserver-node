const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, tieneRole } = require('../middlewares');

const { 
    crearCategoria, 
    obtenerCategorias, 
    obtenerCategoria,
    borrarCategoria,
    actualizarCategoria
} = require('../controllers/categorias');

const { existeCategoria } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerCategorias );

router.get('/:id', [
    check('id').custom( existeCategoria ),
    check('id', 'No es un ID valido.').isMongoId(),
    validarCampos
], obtenerCategoria );

router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
 ], crearCategoria );

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id').custom( existeCategoria ),
    check('id', 'No es un ID valido.').isMongoId(),
    validarCampos
], actualizarCategoria );

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], borrarCategoria );

module.exports = router;