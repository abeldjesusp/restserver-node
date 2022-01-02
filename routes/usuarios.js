const { Router, request } = require('express');
const { check } = require('express-validator');

const { esRoleValido, existeEmail, existeUsuarioPorID } = require('../helpers/db-validators');

const { 
    validarJWT,
    validarCampos,
    esAdminRole,
    tieneRole
 } = require('../middlewares/index');

const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( existeEmail ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost );

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido.').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;