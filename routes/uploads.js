const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivos } = require('../middlewares');
const { cargarArchivo, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const router = Router();

router.post('/', validarArchivos, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivos,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary );

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)

module.exports = router;